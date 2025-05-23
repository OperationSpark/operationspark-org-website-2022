import { SelectItem } from '@this/data/types/bits';
import { AttendingLocation } from '@this/data/types/infoSession';

export type ISession = {
  id: string;
  programId: string;
  cohort: string;
  code?: string;
  startDateTime: string;
  locationType: LocationType;
  googlePlace?: GooglePlace;
};

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
  zipCode?: string;
  userLocation?: SelectItem;
  referencedBy?: SelectItem;
  attendingLocation: AttendingLocation;
  smsOptIn: 'true' | 'false';
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
  zipCode: string;
  userLocation: string;
  attendingLocation: AttendingLocation;
  joinCode?: string;
  smsOptIn: boolean;
}
