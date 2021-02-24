import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {PlaceService} from '../../_service/place/place.service';
import { startWith, debounceTime, switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {QueryService} from "../../_service/query/query.service";
import { NewsSectionComponent } from 'src/app/dashboard/news-section/news-section.component';
import { DataService } from '../../_service/data/data.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-query-autocomplete',
  templateUrl: './query-autocomplete.component.html',
  styleUrls: ['./query-autocomplete.component.css']
})
export class QueryAutocompleteComponent implements OnInit, OnChanges {

  control = new FormControl('');
  @ViewChild(MatAutocompleteTrigger, {read: MatAutocompleteTrigger}) inputAutoComplete: MatAutocompleteTrigger;

  public queries: Observable<any[]>;
  public query = '';
  @Input() Query = '';
  @Input() State = '';
  loader: boolean = false;
  constructor(private queryService: QueryService,
    private tranService: TranslateService,
    private comp:NewsSectionComponent,
    protected data: DataService
  ) {
  }

  doFilter(value) {
    console.log("this.query", value);
    if(value !== ''){
      let globalRet = {
        'globalResults' : []
      };
      const ret = this.getQueries(value)
        .pipe(
          map(response =>
            globalRet['globalResults'].concat(response['clientQueriesAutocomplete'],response['allQueriesAutocomplete'],
              response['googleAutocomplete'])
          ));

      console.log(ret);

      ret.filter(option => {
            return option['globalResults'];
          });
      return ret;
    }
    else{
      return [];
    }
  }

  ngOnInit() {
    this.queries = this.control.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      switchMap(value => this.doFilter(this.query))
    );

    this.data.getLoader().subscribe(loader => {
      this.data.isLangChange().subscribe(langchanges => {
        console.log('langchanges', langchanges)
        if(langchanges === true){
          this.query = '';
        }
      });
      this.data.getQueryLoader().subscribe(Loader => {
        console.log('QueryLoader', Loader)
        this.loader = Loader;
        if(this.loader === false){
          this.query = '';
        }
      });
    });
  }

  get formValid() {
    return this.control;
  }

  getQueries(val: string) {
    return this.queryService.getQueries(val);
  }

  changeSelection(data) {
    this.comp.querySelected(data);
  }

  closePanel(evt): void {
    evt.stopPropagation();
    this.inputAutoComplete.closePanel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.State === 'edit') {
      console.log('edit state');
      this.control.enable();
    } else if (this.State === 'save') {
      console.log('save state');
      this.control.disable();
    }
  }

  displayFn(thisC): string {
    return thisC['description'];
  }

}
