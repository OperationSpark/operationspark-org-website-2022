import config from '@this/config';
import { FormDataSignup, ISessionSignup } from '@this/types/signups';

export const formatSignupPayload = (form: FormDataSignup): ISessionSignup => {
  const {
    session,
    email,
    firstName,
    lastName,
    phone,
    referencedBy,
    zipCode,
    userLocation: location,
    attendingLocation,
    smsOptIn,
  } = form;

  // Sometimes greenlight returns an empty string rather than a google place object
  if (typeof session?.googlePlace === 'string') {
    session.googlePlace = undefined;
  }

  return {
    nameFirst: firstName,
    nameLast: lastName,
    email,
    cell: phone,
    sessionId: session?.id || '',
    programId: session?.programId || '',
    startDateTime: session?.startDateTime,
    cohort: session?.cohort || '',
    referrerResponse: referencedBy?.additionalInfo || '',
    referrer: referencedBy?.value || '',
    locationType: session?.locationType,
    googlePlace: session?.googlePlace,
    token: config.GREENLIGHT_API_TOKEN,
    smsOptIn: smsOptIn === 'true',
    zipCode: zipCode || '',
    userLocation: location?.additionalInfo || location?.value || '',
    attendingLocation,
    joinCode: session?.code,
  };
};
