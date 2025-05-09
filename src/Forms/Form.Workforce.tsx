import * as Sentry from '@sentry/nextjs';
import axios from 'axios';
import kebabCase from 'lodash/kebabCase';
import moment from 'moment';
import { Fragment, KeyboardEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { IoMdCloseCircleOutline as CloseIcon } from 'react-icons/io';
import { MdOpenInNew as NewTabIcon } from 'react-icons/md';

import Button from '@this/components/Elements/Button';
import Spinner from '@this/components/Elements/Spinner';
import { Form, Input, useForm } from '@this/components/Form';

import { TOption } from '@this/data/types/bits';
import { IInfoSessionFormValues } from '@this/data/types/infoSession';
import { getStateFromZipCode } from '@this/helpers/zipLookup';
import useKeyCombo from '@this/hooks/useKeyCombo';
import ga from '@this/lib/googleAnalytics/gtag';
import { pixel } from '@this/lib/pixel';
import { ISessionDates } from '@this/pages-api/infoSession/dates';
import { FormDataSignup } from '@this/types/signups';
import { referencedByOptions } from './formData/referenceOptions';

interface WorkforceFormProps {
  sessionDates: ISessionDates[];
  referredBy?: TOption;
}

const WorkforceForm = ({ sessionDates, referredBy }: WorkforceFormProps) => {
  const mainRef = useRef<HTMLDivElement>(null);
  const form = useForm<IInfoSessionFormValues>({
    fieldOrder: [
      'firstName',
      'lastName',
      'email',
      'phone',
      'zipCode',
      'referencedBy',
      'sessionDate',
      'attendingLocation',
      'smsOptIn',
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [renderUrl, setRenderUrl] = useState<string | null>(null);

  const [locationMessage, setLocationMessage] = useState('');
  const isKeyComboActive = useKeyCombo('o', 's');
  const currentValues = form.values();

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const hasErrors = form.hasErrors();

    if (hasErrors) {
      setIsSubmitting(false);
      return form.toggleShowErrors();
    }

    const { sessionDate, userLocation, firstName, lastName, ...values } = form.values();

    userLocation.value = userLocation.name;
    const session = sessionDates.find((s) => s._id === sessionDate.value);
    const body: FormDataSignup = {
      ...values,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      userLocation,
      ...(session && {
        session: {
          id: session._id,
          cohort: session.cohort,
          programId: session.programId,
          code: session.code,
          startDateTime: session.times.start.dateTime as string,
          googlePlace: session.googlePlace,
          locationType: session.locationType,
        },
      }),
    };

    pixel.event('Lead', {
      sessionId: session?._id ?? 'NO_SESSION',
      sessionTime: session?.times?.start?.dateTime || null,
    });

    ga.event('generate_lead', {
      lead_source: `Info Session Signup: ${session?._id || 'NO_SESSION'}`,
    });

    try {
      const { data } = await axios.post('/api/signups/info', body);

      const textMessage = currentValues.smsOptIn === 'true' ? ' and text message' : '';

      if (currentValues.sessionDate.value === 'future') {
        form.notifySuccess({
          msg: `Thank you for signing up! We will reach out soon. You will receive an email ${textMessage} shortly.`,
        });
        setRenderUrl(data.url);
        return setIsSubmitting(false);
      }

      const sessionDate = currentValues.sessionDate.name;

      form.notifySuccess({
        msg: `You have successfully registered for an info session on ${sessionDate}. You will receive an email ${textMessage} shortly.`,
      });

      setRenderUrl(data.url);
    } catch (error) {
      Sentry.captureException(error);
      form.notifyError({
        title: 'Error',
        msg: 'There was an error signing you up\nPlease reach out to us at "admissions@operationspark.org" or give us a call at 504-233-3838',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const getLocationType = (session: ISessionDates) => {
    const locationType = session.locationType
      .split('_')
      .map((word) => `${word[0]}${word.slice(1).toLocaleLowerCase()}`)
      .join(' ');
    return locationType;
  };

  const selectNextInputOrSubmit = (
    e: KeyboardEvent<HTMLInputElement | HTMLFormElement | HTMLSelectElement | HTMLDivElement>,
  ) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    e.stopPropagation();

    const nextInvalidKey = form.nextInvalidKey();
    const ref = mainRef.current;

    if (!nextInvalidKey || !ref) {
      return handleSubmit();
    }

    const nextInput = ref.querySelector<HTMLInputElement>(`[name='${nextInvalidKey}']`);

    if (nextInput) {
      nextInput?.focus();
    }

    const nextContainerInput = ref.querySelector<HTMLInputElement>(`#${nextInvalidKey} input`);

    nextContainerInput?.focus();
  };

  const sessionDateOptions = [
    ...sessionDates
      .filter((s) => !s.private || isKeyComboActive)
      .map((session) => {
        const dateTime = moment(session.times.start.dateTime).format('dddd, MMMM Do h:mma');
        const locationType = getLocationType(session);
        return {
          name: `${dateTime} (${locationType})`,
          value: session._id,
        };
      }),
    {
      name: 'None of these fit my schedule',
      value: 'future',
    },
  ];

  const closeDetails = () => {
    setRenderUrl(null);
    form.clear();
  };

  useEffect(() => {
    const zipChange = form.onSelectChange('userLocation');
    const zipCode = Number(currentValues.zipCode);

    if (String(currentValues.zipCode)?.length !== 5) {
      zipChange({
        option: {
          name: 'Please select your state',
          value: '',
        },
        isValid: false,
      });
      return;
    }

    if (isNaN(Number(zipCode))) {
      return;
    }

    const state = getStateFromZipCode(zipCode);

    form.set('userLocation', state ?? 'unknown');
    zipChange({
      option: {
        name: state,
        value: state,
      },
      isValid: true,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps -- Ignore form change
  }, [currentValues.zipCode]);

  useEffect(() => {
    const sessionId = currentValues.sessionDate?.value;
    const locationTypeChange = form.onChange('attendingLocation');

    if (!sessionId) {
      setLocationMessage('');
      locationTypeChange('', false);
      return;
    }
    if (sessionId === 'future') {
      setLocationMessage('We will reach out to you when we have more sessions scheduled');
      return;
    }
    const session = sessionDates.find((s) => s._id === sessionId);

    if (!session || !session.locationType) {
      return;
    }

    if (session.locationType === 'IN_PERSON') {
      setLocationMessage('This session is in person only');
      return locationTypeChange('IN_PERSON', true);
    }

    if (session.locationType === 'VIRTUAL') {
      setLocationMessage('This session is virtual only');
      return locationTypeChange('VIRTUAL', true);
    }
    setLocationMessage('');

    // eslint-disable-next-line react-hooks/exhaustive-deps -- Ignore form change
  }, [currentValues.sessionDate, currentValues.attendingLocation, sessionDates]);

  useEffect(() => {
    if (!referredBy) return;
    form.onSelectChange('referencedBy')({
      option: referredBy,
      additionalInfo: referredBy.additionalInfo,
      additionalInfoLabel: referredBy.additionalInfoLabel,
      isValid: true,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps -- Ignore form change
  }, [referredBy]);

  return (
    <WorkforceFormStyles ref={mainRef}>
      <Form>
        {workforceFormInputs.map((field, i) => (
          <field.Element
            key={field.name}
            {...field}
            value={form.get(field.name)}
            onChange={form.onChange(field.name)}
            isValid={form.isValid(field.name)}
            isErr={form.isErr(field.name)}
            testId={`info-session-input-${kebabCase(field.name)}`}
            onEnter={selectNextInputOrSubmit}
            animation={{
              initial: { x: 100, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              transition: { duration: 0.2, delay: 0.25 * i },
            }}
          />
        ))}

        <div className='user-location-row'>
          <Input.ZipCode
            label='Zip Code'
            name='zipCode'
            placeholder='70119'
            required={true}
            value={form.get('zipCode')}
            onChange={form.onChange('zipCode')}
            isValid={form.isValid('zipCode')}
            isErr={form.isErr('zipCode')}
            onEnter={selectNextInputOrSubmit}
            testId={`info-session-input-zip-code`}
            animation={{
              initial: { x: 100, opacity: 0 },
              animate: { x: 0, opacity: 1 },
              transition: { duration: 0.2, delay: 0.25 * workforceFormInputs.length },
            }}
          />
          {form.getSelect('userLocation').value && (
            <div className='user-location-state' data-test-id='info-session-user-state'>
              {form.getSelect('userLocation').value}
            </div>
          )}
        </div>

        <Input.Select
          label='How did you hear about us?'
          name='referencedBy'
          options={referencedByOptions}
          option={form.getSelect('referencedBy')}
          isErr={form.isErr('referencedBy')}
          isValid={form.isValid('referencedBy')}
          onEnter={selectNextInputOrSubmit}
          onChange={form.onSelectChange('referencedBy')}
          required
          delay={workforceFormInputs.length * 0.25}
          testId='info-session-input-referenced-by'
        />

        <Input.Select
          label='Select an info session date'
          name='sessionDate'
          option={form.getSelect('sessionDate')}
          onChange={form.onSelectChange('sessionDate')}
          onEnter={selectNextInputOrSubmit}
          isErr={form.isErr('sessionDate')}
          isValid={form.isValid('sessionDate')}
          options={sessionDateOptions}
          delay={(workforceFormInputs.length - 1) * 0.25}
          required
          testId='info-session-input-session-date'
        />
        {currentValues.sessionDate?.value && (
          <Fragment>
            {locationMessage ? (
              <div
                className='primary-secondary location-message'
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                {locationMessage}
              </div>
            ) : (
              <Input.RadioGroup
                name='attendingLocation'
                label='Are you attending in person or virtually?'
                value={form.get('attendingLocation')}
                onEnter={selectNextInputOrSubmit}
                isValid={form.isValid('attendingLocation')}
                isErr={form.isErr('attendingLocation')}
                onChange={form.onChange('attendingLocation')}
                delay={(workforceFormInputs.length + 1) * 0.3}
                required
                options={[
                  {
                    name: 'IN_PERSON',
                    label: (
                      <span>
                        In Person at{' '}
                        <a
                          className='primary-secondary location-option'
                          href='https://goo.gl/maps/X6eQ54sWbbH2RbVd8'
                          target='_blank'
                          rel='noreferrer'
                          tabIndex={-1}
                        >
                          514 Franklin Ave, New Orleans
                        </a>
                      </span>
                    ),
                  },
                  { name: 'VIRTUAL', label: 'Virtually (via Zoom)' },
                ]}
              />
            )}
          </Fragment>
        )}

        {/* Checkbox to opt-in to receiving SMS messages */}
        <div className='sms-opt-in-row'>
          <Input.RadioGroup
            name='smsOptIn'
            label='Would you like to receive text message reminders?'
            value={form.get('smsOptIn')}
            isValid={form.isValid('smsOptIn')}
            onEnter={selectNextInputOrSubmit}
            isErr={form.isErr('smsOptIn')}
            onChange={form.onChange('smsOptIn')}
            delay={(workforceFormInputs.length + 1) * 0.3}
            required
            options={[
              {
                name: 'true',
                label: 'Yes, send SMS reminders',
              },
              { name: 'false', label: 'No, do not send SMS reminders' },
            ]}
          />
          {form.get('smsOptIn') === 'true' && (
            <p className='sms-disclaimer' data-test-id='sms-disclaimer'>
              {`By providing your phone number, you agree to receive text messages from Operation Spark. We'll send you information and reminders about your upcoming session. You can also text us with any additional questions. Message and data rates may apply. Message frequency varies. Reply "STOP" to opt-out.`}
            </p>
          )}
          {form.get('smsOptIn') === 'false' && (
            <p
              className='sms-disclaimer sms-decline'
              data-test-id='sms-disclaimer'
            >{`By opting out of text messages, you acknowledge that you may miss important information about upcoming sessions and registrations.`}</p>
          )}

          {form.get('smsOptIn') === '' && (
            <p
              className='sms-disclaimer'
              data-test-id='sms-disclaimer'
            >{`You can opt out of text messages at any time by replying "STOP"`}</p>
          )}
        </div>

        {form.showErrors() && form.hasErrors() && (
          <div className='form-error'>
            <AiOutlineInfoCircle /> <p>Please complete required fields</p>
          </div>
        )}

        <Button
          data-test-id='info-session-submit-button'
          className={form.hasErrors() ? 'info disabled' : 'info'}
          color='yellow'
          style={{
            marginTop: '1rem',
            transition: 'background-color 250ms',
            width: '100%',
            position: 'relative',
            zIndex: 1,
          }}
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          Register!
        </Button>

        {isSubmitting ? (
          <div className='form-overlay'>
            <Spinner text='Submitting' />
          </div>
        ) : null}
        {renderUrl && !isSubmitting ? (
          <div className='form-overlay' data-test-id='info-session-submit-overlay'>
            <div className='form-complete-response'>
              <h2>Success!</h2>
              {currentValues.sessionDate.value === 'future' ? (
                <p data-test-id='info-session-submit-message'>
                  Thank you for signing up! We will reach out soon. You will receive an email{' '}
                  {currentValues.smsOptIn === 'true' ? 'and text message' : ''} shortly.
                </p>
              ) : (
                <p data-test-id='info-session-submit-message'>
                  You have successfully registered for an info session on{' '}
                  <b className='primary-secondary'>{currentValues.sessionDate.name}</b>. You will
                  receive an email {currentValues.smsOptIn === 'true' ? 'and text message' : ''}{' '}
                  shortly.
                </p>
              )}
              <a
                href={renderUrl}
                className='anchor'
                target='_blank'
                rel='noreferrer'
                data-test-id='info-session-registration-link'
              >
                {currentValues.sessionDate.value === 'future'
                  ? 'View details'
                  : 'View your registration details'}
                <NewTabIcon />
              </a>
              <button onClick={closeDetails} data-test-id='info-session-details-close-button'>
                <CloseIcon className='close-button' />
              </button>
            </div>
          </div>
        ) : null}
      </Form>
    </WorkforceFormStyles>
  );
};

export default WorkforceForm;

const WorkforceFormStyles = styled.div`
  .form-overlay {
    position: absolute;
    inset: 0;
    z-index: 100;
    backdrop-filter: blur(1.5px);
    background: rgba(125, 125, 125, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form-complete-response {
    position: relative;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.bg};
    padding: 1.5rem;
    border-radius: 0.5rem;
    max-width: 90%;
    text-align: center;
    h2 {
      font-size: 2rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1.1rem;
      font-weight: 300;
      margin-bottom: 1rem;
    }
    a {
      display: flex;
      align-items: center;
      font-weight: 600;
      margin-top: 1rem;
      gap: 0.5rem;
    }
    .close-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      font-size: 1.5rem;
      cursor: pointer;
      color: ${({ theme }) => theme.red[300]};
      transition: all 225ms;
      :hover {
        color: ${({ theme }) => theme.red[500]};
        transform: scale(1.1);
      }

      :active {
        transform: scale(0.9);
      }
    }
  }

  .user-location-row {
    display: flex;
    width: 100%;
    position: relative;
  }
  .user-location-state {
    padding: 1rem;
    position: absolute;
    z-index: 100;
    right: 2rem;
    pointer-events: none;
    font-weight: 300;
    color: ${({ theme }) => theme.alpha.fg50};
  }
  .location-option {
    font-size: calc(0.7rem + 0.25vw);
    font-weight: 500;
    border-bottom: 1px solid transparent;
    transition: border-bottom 175ms;
    margin-bottom: 0.75rem;
    :hover {
      border-bottom: 1px solid
        ${({ theme: { isLightMode, primary, secondary } }) =>
          isLightMode ? primary[0] : secondary[0]} !important;
    }
  }
  .location-message {
    margin-bottom: 0.75rem;
  }
  .sms-opt-in-row {
    display: flex;
    flex-flow: column;
    width: 100%;
  }
  .sms-disclaimer {
    font-size: calc(0.7rem + 0.25vw);
    font-weight: 300;
    color: ${({ theme }) => theme.alpha.fg50};
    padding: 0.25rem 0.5rem;
  }
  .sms-decline {
    color: ${({ theme }) => theme.red[0]};
  }
`;

const workforceFormInputs = [
  {
    Element: Input.Text,
    label: 'First Name',
    name: 'firstName',
    placeholder: 'Joe',
    required: true,
    autoCapitalize: true,
  },
  {
    Element: Input.Text,
    label: 'Last Name',
    name: 'lastName',
    placeholder: 'Smith',
    required: true,
    autoCapitalize: true,
  },
  {
    Element: Input.Email,
    label: 'Email',
    name: 'email',
    placeholder: 'joesmith@gmail.com',
    required: true,
  },
  {
    Element: Input.Phone,
    label: 'Phone Number',
    name: 'phone',
    placeholder: '303-123-9876',
    required: true,
  },
];
