import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {PlaceService} from '../../_service/place/place.service';
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.css']
})
export class PlaceAutocompleteComponent implements OnInit, OnChanges {

  control = new FormControl('');

  public places: Observable<any[]>;
  public place = '';
  @Input() Place = '';
  @Input() State = '';
  @Output('optionSelected') optionSelected = new EventEmitter<any>();

  constructor(private placeService: PlaceService,
              private tranService: TranslateService,
  ) {
  }

  doFilter(value) {
    const ret = this.getPlaces(value)
      .pipe(
        map(response => response['predictions']));
    ret.filter(option => {
          return option.country.toLowerCase().indexOf(value.toLowerCase()) === 0;
        });
    return ret;
  }

  ngOnInit() {
    this.places = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      switchMap(value => this.doFilter(this.place))
    );
  }

  get formValid() {
    return this.control;
  }

  getPlaces(val: string) {
    return this.placeService.getPlaces(val);
  }

  changeSelection(data) {
    this.optionSelected.emit(data);
  }

  changeSelectionValue() {
    this.optionSelected.emit(this.place);
    // if (this.place === '') {
    //   this.optionSelected.emit('');
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.State === 'edit') {
      this.control.enable();
    } else if (this.State === 'save') {
      this.control.disable();
    }
  }

  displayFn(thisC): string {
    return thisC['description'];
  }

}
