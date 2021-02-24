import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {InfoDialogComponent} from "../../shared/dialogs/info-dialog/info-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import { DataService } from 'src/app/shared/_service/data/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input()
  currShortcuts: object[] = [];
  @Input()
  shortcutImages: object[] = [];
  vidComp: boolean;
  showmenu: boolean = false;

  query: string;

  constructor(protected infoDialog: MatDialog,
    protected data: DataService) { }

  ngOnInit() {
    this.data.getchangeVidcomp().subscribe(vidEnd => {
      this.vidComp = vidEnd
    });
  }

  openInfo() {
    this.infoDialog.open(InfoDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        'title': 'Info Dialog',
        'content': 'Info Content'
      }
    });
  }

  togglemenu(){
    this.showmenu = !this.showmenu;
  }
}
