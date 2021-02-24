import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-newsdialog',
  templateUrl: './newsdialog.component.html',
  styleUrls: ['./newsdialog.component.css']
})
export class NewsdialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewsdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
