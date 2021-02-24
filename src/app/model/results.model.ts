import { SportType } from './sports.model';

export interface ResultsBase {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  numberOfElements?: number;
  first?: boolean;
  last?: boolean;
}

export interface ResultParamsTable extends ResultsBase {
  selectedSport: SportType;
  tableData: any[];
}


// vvv Universal
export interface TournamentStage {
  tournament: Tournament;
  stageType: string; // TODO change to literal stirng type
  stageDay: number;
}

// vvv Universal
export interface Tournament {
  id: number;
  competition: Competition;
  place: Place;
  startingYear: number;
}

// vvv Universal
export interface Competition {
  id: number;
  competitionName: string;
  country: Country;
}

// vvv Universal
export interface Country {
  code: string;
  country: string;
  alpha2Code: string;
  // ...
}

// vvv Universal
export interface Place {
  placeId: string;
  description: string;
  latitude: number;
  longtitude: number;
}

// vvv Universal, extended per sport
export interface ResultsEntryBase {
  id: any;
  matchDate: Date;
  time?: string;
  tournamentStage: TournamentStage;
}

export class Team {
  id: any;
  name: string;
  mainCode?: string;
  country?: string;
}

export interface EventResult {
  idOrig?: number;
  event: string;
  time: string;
  minute: number;
}
