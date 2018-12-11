import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from 'app/entities/services/table/table.service';
import { Table } from 'app/entities/interfaces/table';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {

  id: any;
  private _bookTable: Table;
  isSaving: boolean;

  constructor(
      private bookTableService: TableService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit() {
      this.isSaving = false;
      this.bookTable = {};

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.getAllByTable(this.id);
      } else {
        // error handling
      }
    });
  }
  getAllByTable(id) {
    this.bookTableService.find(id).subscribe(res => {
      this._bookTable = res;
    });
  }
  previousState() {
      window.history.back();
  }

  save() {
      this.isSaving = true;
      if (this.bookTable.id !== undefined) {
          this.subscribeToSaveResponse(this.bookTableService.update(this.bookTable));
      } else {
          this.subscribeToSaveResponse(this.bookTableService.create(this.bookTable));
      }
  }

  private subscribeToSaveResponse(result: Observable <Table>) {
      result.subscribe((res) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  private onSaveSuccess() {
      this.isSaving = false;
      this.router.navigate(['/admin/table']);
  }

  private onSaveError() {
      this.isSaving = false;
  }

  private onError(errorMessage: string) {
      // c
  }

  get bookTable() {
      return this._bookTable;
  }

  set bookTable(bookTable: Table) {
      this._bookTable = bookTable;
  }
}
