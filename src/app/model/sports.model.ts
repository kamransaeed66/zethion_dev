// String identifiers for supported sports
export type SportType = 'FOOTBALL' | 'BASKETBALL' | 'FORMULA1' | 'TENNIS';

export type Location = 'HOME' | 'AWAY';

export type MatchResultType = 'WON' | 'LOST';

export type Gender = 'M' | 'F';

export interface Athlete {
  type: string;
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  gender: Gender;
  birthDate: Date;
  height: string;
}
