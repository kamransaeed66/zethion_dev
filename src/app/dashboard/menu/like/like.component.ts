import { Component, OnInit } from '@angular/core';
import {ThumbDialogComponent} from "../../../shared/dialogs/thumb-dialog/thumb-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  constructor(private likeDialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLike() {
    this.likeDialog.open(ThumbDialogComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        'title': 'Thumb Dialog',
        'content': 'Thumb Content'
      }
    })
  }


}
