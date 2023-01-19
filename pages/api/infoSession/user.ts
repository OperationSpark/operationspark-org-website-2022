import type { NextApiRequest, NextApiResponse } from 'next';
import { SelectItem } from '@this/data/types/bits';
import { runCloudFunction } from '@this/api/googleFunctions';
import { config } from '../config';
import { AttendingLocation } from '@this/data/types/infoSession';

const { SIGNUP_API_ENDPOINT, GREENLIGHT_API_TOKEN = '' } = config;

export interface ISessionUser extends NextApiRequest {
  body: FormDataSignup;
}
interface ISession {
  id: string;
  programId: string;
  cohort: string;
  code?: string;
  startDateTime: string;
  locationType: LocationType;
  googlePlace?: GooglePlace;
}

export type LocationType = 'HYBRID' | 'IN_PERSON' | 'VIRTUAL';

export type GooglePlace = {
  placesId: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  geometry: {
    lat: number;
    lng: number;
  };
};

export type FormDataSignup = {
  session?: ISession;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  userLocation: SelectItem;
  referencedBy: SelectItem;
  attendingLocation: AttendingLocation;
};

export interface ISessionSignup {
  programId: string;
  nameFirst: string;
  nameLast: string;
  email: string;
  cell: string;
  referrer: string;
  referrerResponse: string;
  startDateTime?: string;
  cohort: string;
  googlePlace?: GooglePlace;
  locationType?: LocationType;
  sessionId: string;
  token: string;
  userLocation: string;
  attendingLocation: AttendingLocation;
  code?: string;
}

export default async function handleInfoSessionForm(req: ISessionUser, res: NextApiResponse) {
  try {
    const payload: ISessionSignup = formatPayload(req.body);

    await runCloudFunction({
      url: SIGNUP_API_ENDPOINT,
      body: payload,
      headers: {
        'X-Greenlight-Signup-Api-Key': GREENLIGHT_API_TOKEN,
      },
    });

    res.status(200).end();
  } catch (error) {
    console.error('Could not POST to signup service', error);
    res.status(500).end();
  }
}

function formatPayload(form: FormDataSignup): ISessionSignup {
  const {
    session,
    email,
    firstName,
    lastName,
    phone,
    referencedBy,
    userLocation: location,
    attendingLocation,
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
    sessionId: session?.id ?? '',
    programId: session?.programId ?? '',
    startDateTime: session?.startDateTime,
    cohort: session?.cohort ?? '',
    referrerResponse: referencedBy.additionalInfo,
    referrer: referencedBy?.value,
    locationType: session?.locationType,
    googlePlace: session?.googlePlace,
    token: GREENLIGHT_API_TOKEN ?? '',
    userLocation: location.additionalInfo || location.value,
    attendingLocation,
    code: session?.code,
  };
}
