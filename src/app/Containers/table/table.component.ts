import { TableType } from './../../entities/interfaces/tableType';
import { TableTypeService } from './../../entities/services/tableType/table-type.service';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TableService } from 'app/entities/services/table/table.service';
import { Router } from '@angular/router';
import { Table } from 'app/entities/interfaces/table';
import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'app/shared/pagination/pagination.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'tableTypeId', 'isAvaliable', 'edit', 'delete'];

  dataSource;

  tables: Table[] = [];
  tableTypes: TableType[] = [];
  /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;

  constructor(
    private router: Router,
    private tableService: TableService,
    private pagination: PaginationService,
    public dialog: MatDialog,
    private tableTypeService: TableTypeService
  ) { }

  ngOnInit() {
    this.getAllTables();
    this.getAllTableTypess();
  }

  getAllTables() {
    const query = {
      size: this.pageSize,
      page: this.currentPage
    }
    this.tableService.query(query).subscribe(res => {
      this.processToShow(res);
    });
  }

  getAllTableTypess() {
    const query = {
      size: this.pageSize,
      page: this.currentPage
    }
    this.tableTypeService.findAll().subscribe(res => {
      this.processToShowTableTypes(res);
    });
  }

  processToShowTableTypes(res) {
    this.tableTypes = res;
  }

  processToShow(res) {
    this.pager = this.pagination.getPager(this.currentPage, this.pageSize, res.totalElements);
    console.log('pager', this.pager);
    this.dataSource = new MatTableDataSource(res);
    this.tables = res;
    this.totalItems = res.totalElements;
  }

  setPage(number) {
    this.currentPage = number;
    this.getAllTables();
  }

  changePageSize(value) {
    console.log('Page size to show ' + value);
    this.pageSize = value;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  confirmDelete(id) {
    const title = 'Delete';
    const dialogRef = this.dialog.open(TableDialogComponent, {
      data: {
        tableId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllTables();
    });

  }

  getTableTypeCode(id) {
    let types;
    for (types in this.tableTypes) {
      if (this.tableTypes[types].id === id) {
          return this.tableTypes[types].description;
      }
    }
    return 'Null';
  }

  addNewTable() {
    this.router.navigate(['admin/table/add']);
  }

  editTable(id) {
    this.router.navigate(['admin/table/edit', id]);
  }
}
