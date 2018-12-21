import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { TableService } from 'app/entities/services/table/table.service';
import { Table } from 'app/entities/interfaces/table';
import { Component, OnInit, ElementRef } from '@angular/core';
import { TableType } from 'app/entities/interfaces/tableType';
import { TableTypeService } from 'app/entities/services/tableType/table-type.service';
import { JhiDataUtils } from 'ng-jhipster';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {

  id: any;
  private _bookTable: Table;
  isSaving: boolean;

  tabletypes: TableType[];

  constructor(
      private bookTableService: TableService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private tableTypeService: TableTypeService,
      private dataUtils: JhiDataUtils,
      private elementRef: ElementRef
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

    this.tableTypeService.findAll().subscribe(
        (res) => {
            this.tabletypes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
    );
  }
  getAllByTable(id) {
    this.bookTableService.find(id).subscribe(res => {
      this._bookTable = res;
    });
  }
  previousState() {
      window.history.back();
  }
  onError(res) {
      // do nothing
  }
  save() {
      this.isSaving = true;
    if (!this.bookTable.isAvaliable) {
        this.bookTable.isAvaliable = false;
    }
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

  trackTableTypeById(index: number, item: TableType) {
    return item.id;
}

  get bookTable() {
      return this._bookTable;
  }

  set bookTable(bookTable: Table) {
      this._bookTable = bookTable;
  }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.bookTable, this.elementRef, field, fieldContentType, idInput);
    }
}
