import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Weather } from '../models';

@Component({
  selector: 'app-dialog-content-example-dialog',
  templateUrl: './dialog-content-example-dialog.component.html',
  styleUrls: ['./dialog-content-example-dialog.component.css']
})
export class DialogContentExampleDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<DialogContentExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Weather,) { }

  ngOnInit(): void {

  }
  reverseString(str: string): string {
    return str.split('-').reverse().join('-');
  }

}
