export interface IGradShowcase {
  startDateTime: string;
  cohortName: string;
  eventbriteUrl: string;
  isActive: boolean;
}

export type Showcase = {
  id: string;
  cohortName: string;
  startDateTime: Date;
  timezone: string;
  /** Minutes before event start time */
  doorsOffset: number;
  /** Minutes after start to disable registration/zoom */
  disableOffset: number; // TODO
  zoomUrl: string;
  teams: Record<string, unknown>[];
  promoBanner?: { url: string };
  active: boolean;
  signups: string[];
  ticketCount: number;
  websiteActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
