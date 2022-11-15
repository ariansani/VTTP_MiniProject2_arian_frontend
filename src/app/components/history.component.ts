import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../services/package.service';
import { StorageService } from '../services/storage.service';
import { History } from '../models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  history!: History[];

  displayedColumns: string[] = [
    'gymName',
    'dateUsed',
    'passesUsed',
    'packageUUID',
  ];

  constructor(
    private packageSvc: PackageService,
    private router: Router,
    private storageSvc: StorageService
  ) {}

  ngOnInit(): void {
    this.packageSvc
      .getHistory(this.storageSvc.getUserId())
      .then((result) => {
        this.history = result;
      })
      .catch((error) => {
        console.info('>>>> error:' + error);

      });
  }

}
