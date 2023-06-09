import moment from 'moment';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { IInfoSessionFormValues } from '@this/data/types/infoSession';
import { ISessionDates } from '@this/pages-api/infoSession/dates';
import { FormDataSignup } from '@this/pages-api/infoSession/user';
import { Form, Input, useForm } from '@this/components/Form';
import Button from '@this/components/Elements/Button';
import unitedStates from './formData/unitedStates.json';
import Spinner from '../components/Elements/Spinner';
import { pixel } from '@this/lib/pixel';
import useKeyCombo from '../hooks/useKeyCombo';
import { getStateFromZipCode } from '../components/Form/helpers';

interface WorkforceFormProps {
  sessionDates: ISessionDates[];
}

const WorkforceForm = ({ sessionDates }: WorkforceFormProps) => {
  const form = useForm<IInfoSessionFormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [locationMessage, setLocationMessage] = useState('');

  const isKeyComboActive = useKeyCombo('o', 's');

  const currentValues = form.values();

  const handleSubmit = () => {
    const hasErrors = form.hasErrors();

    if (hasErrors) {
      return form.toggleShowErrors();
    }

    setIsSubmitting(true);
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
          startDateTime: session.times.start.dateTime,
          googlePlace: session.googlePlace,
          locationType: session.locationType,
        },
      }),
    };

    pixel.event('Lead', {
      sessionId: session?._id ?? 'NO_SESSION',
      sessionTime: session?.times?.start?.dateTime || null,
    });

    axios
      .post('/api/infoSession/user', body)
      .then(() => {
        form.notifySuccess({
          msg: 'Info session registration for submitted. You should receive an email and text message shortly.',
        });
        form.clear();
      })
      .catch(() => {
        form.notifyError({
          title: 'Error',
          msg: 'There was an error signing you up\nPlease reach out to us at "admissions@operationspark.org" or give us a call at 504-534-8277',
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  const sessionDateOptions = [
    ...sessionDates
      .filter((s) => !s.private || isKeyComboActive)
      .map((session) => {
        const dateTime = moment(session.times.start.dateTime).format('dddd, MMMM Do h:mma');
        const locationType = session.locationType
          .split('_')
          .map((word) => `${word[0]}${word.slice(1).toLocaleLowerCase()}`)
          .join(' ');
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValues.zipCode]);

  useEffect(() => {
    const sessionId = currentValues.sessionDate?.value;

    if (!sessionId) {
      return;
    }
    if (sessionId === 'future') {
      setLocationMessage('We will reach out to you when we have more sessions scheduled');
      return;
    }
    const session = sessionDates.find((s) => s._id === sessionId);
    if (!session) {
      return;
    }
    const locationTypeChange = form.onChange('attendingLocation');
    if (session.locationType === 'IN_PERSON') {
      setLocationMessage('This session is in person only');
      return locationTypeChange('IN_PERSON', true);
    }

    if (session.locationType === 'VIRTUAL') {
      setLocationMessage('This session is virtual only');
      return locationTypeChange('VIRTUAL', true);
    }
    setLocationMessage('');
    locationTypeChange('', true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Ignore form
  }, [currentValues.sessionDate, currentValues.attendingLocation, sessionDates]);

  return (
    <Form onSubmit={handleSubmit}>
      {isSubmitting ? (
        <div
          className='form-overlay'
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            backdropFilter: 'blur(1.5px)',
            background: 'rgba(125,125,125,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spinner text='Submitting' />
        </div>
      ) : null}
      {workforceFormInputs.map((field, i) => (
        <field.Element
          key={field.name}
          {...field}
          value={form.get(field.name)}
          onChange={form.onChange(field.name)}
          isValid={form.isValid(field.name)}
          isErr={form.isErr(field.name)}
          animation={{
            initial: { x: 100, opacity: 0 },
            animate: { x: 0, opacity: 1 },
            transition: { duration: 0.2, delay: 0.25 * i },
          }}
        />
      ))}
      {form.getSelect('userLocation').value && (
        <div style={{ paddingBottom: '1rem', lineHeight: '1em' }}>
          <b>{form.getSelect('userLocation').value}</b>
        </div>
      )}
      {/* <Input.Select
        label='Where are you located?'
        name='userLocation'
        options={userLocationOptions}
        option={form.getSelect('userLocation')}
        isErr={form.isErr('userLocation')}
        isValid={form.isValid('userLocation')}
        onChange={form.onSelectChange('userLocation')}
        required
        delay={workforceFormInputs.length * 0.15}
      /> */}

      <Input.Select
        label='How did you hear about us?'
        name='referencedBy'
        options={referencedByOptions}
        option={form.getSelect('referencedBy')}
        isErr={form.isErr('referencedBy')}
        isValid={form.isValid('referencedBy')}
        onChange={form.onSelectChange('referencedBy')}
        required
        delay={workforceFormInputs.length * 0.25}
      />

      <Input.Select
        label='Select an info session date'
        name='sessionDate'
        option={form.getSelect('sessionDate')}
        onChange={form.onSelectChange('sessionDate')}
        isErr={form.isErr('sessionDate')}
        isValid={form.isValid('sessionDate')}
        options={sessionDateOptions}
        required
      />

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
          label='Are you attending in person or virtually?'
          options={[
            {
              name: 'IN_PERSON',
              label: (
                <span>
                  In Person{' '}
                  <a
                    className='anchor'
                    href='https://goo.gl/maps/X6eQ54sWbbH2RbVd8'
                    target='_blank'
                    rel='noreferrer'
                  >
                    (514 Franklin Avenue, New Orleans)
                  </a>
                </span>
              ),
            },
            { name: 'VIRTUAL', label: 'Virtually (via Zoom)' },
          ]}
          value={form.get('attendingLocation')}
          isValid={form.isValid('attendingLocation')}
          isErr={form.isErr('attendingLocation')}
          onChange={form.onChange('attendingLocation')}
          delay={(workforceFormInputs.length + 1) * 0.3}
          required
        />
      )}

      {form.showErrors() && form.hasErrors() && (
        <div className='form-error'>
          <AiOutlineInfoCircle /> <p>Please complete required fields</p>
        </div>
      )}

      <Button
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
      >
        Register!
      </Button>
    </Form>
  );
};

export default WorkforceForm;

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
  {
    Element: Input.ZipCode,
    label: 'Zip Code',
    name: 'zipCode',
    placeholder: '70119',
    required: true,
  },
];

const referencedByOptions = [
  {
    value: 'google',
    name: 'Google',
  },
  {
    value: 'facebook',
    name: 'Facebook',
  },
  {
    value: 'instagram',
    name: 'Instagram',
  },
  {
    value: 'flyer',
    name: 'Flyer',
  },
  {
    value: 'radio',
    name: 'Radio Advertising',
  },
  {
    value: 'tv-streaming',
    name: 'T.V. or Streaming Service',
  },
  {
    value: 'other-advertising',
    name: 'Other Advertising',
    additionalInfo: 'Where did you hear about us?',
  },
  {
    value: 'verbal',
    name: 'Word of mouth',
    additionalInfo: 'Who told you about us?',
  },
  {
    value: 'event',
    name: 'Community Event',
    additionalInfo: 'Which event?',
  },
  {
    value: 'organization',
    name: 'Community Organization',
    additionalInfo: 'Which organization?',
  },
];

const userLocationOptions = [
  {
    value: 'other',
    name: 'Outside United States',
    additionalInfo: 'What country do you live in?',
  },
  ...Object.entries(unitedStates).map(([abbr, state]) => ({
    value: abbr,
    name: state,
  })),
];
