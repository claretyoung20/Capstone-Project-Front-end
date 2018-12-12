import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { ConformDeleteDialogComponent } from './../account/customer/conform-delete-dialog/conform-delete-dialog.component';
import { CategoryService } from './../../entities/services/category/category.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Category } from 'app/entities/interfaces/category';
import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'app/shared/pagination/pagination.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['id', 'dateCreated', 'dateUpdated', 'name', 'edit', 'delete'];

  dataSource;

  categories: Category[] = [];
  /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private pagination: PaginationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllCustomer();
  }

  getAllCustomer() {
    const query = {
      size: this.pageSize,
      page: this.currentPage
    }
    this.categoryService.query(query).subscribe(res => {
      this.processToShow(res);
    });
  }

  processToShow(res) {
    this.pager = this.pagination.getPager(this.currentPage, this.pageSize, res.totalElements);
    console.log('pager', this.pager);
    this.dataSource = new MatTableDataSource(res);
    this.categories = res;
    this.totalItems = res.totalElements;
  }

  setPage(number) {
    this.currentPage = number;
    this.getAllCustomer();
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
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        categoryId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllCustomer();
    });

  }

  addNewCategory() {
    this.router.navigate(['admin/category/add']);
  }

  editCategory(id) {
    this.router.navigate(['admin/category/edit', id]);
  }

}
