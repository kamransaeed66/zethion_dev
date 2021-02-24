import {Component, Input, OnInit} from '@angular/core';

import {SelectYearsParams} from '../shared/form-custom/select-year/select-year.component';
import {AthleteService} from '../shared/_service/athlete/athlete.service';

export interface Sport {
  sport: string;
}

@Component({
  selector: 'app-news',
  templateUrl: './match.component.html'
})
export class MatchComponent implements OnInit {

  public yearSelectData: SelectYearsParams = {
    preSelection: new Date().getFullYear(),
    range: 2,
    shift: 0,
    min: 1980
  };
  public selectedYear: number;
  public selectedSport: Sport;
  public selectedCompetition: any;

  constructor(private athleteService: AthleteService) {}

  ngOnInit() {
    this.selectedYear = this.yearSelectData.preSelection;
  }

  sportChanged(selected) {
    this.selectedSport = selected;
  }

  yearChanged(selected) {
    this.selectedYear = selected;
  }

  competitionChanged(selected) {
    this.selectedCompetition = selected;
  }

}
