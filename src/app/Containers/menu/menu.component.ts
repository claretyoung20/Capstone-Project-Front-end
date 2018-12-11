import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';
import { ConformDeleteDialogComponent } from './../account/customer/conform-delete-dialog/conform-delete-dialog.component';
import { ProductService } from 'app/entities/services/product/product.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CategoryService } from 'app/entities/services/category/category.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'app/entities/interfaces/product';
import { PaginationService } from 'app/shared/pagination/pagination.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'price', 'createdDate', 'updatedDate',
  'isAvailable', 'edit', 'delete'];

  dataSource;

  products: Product[] = [];
  /* paganation */
  pageSize = 10;
  currentPage = 0;
  pager: any = {};
  totalItems: any = 0;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService,
    private pagination: PaginationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    const query = {
      size: this.pageSize,
      page: this.currentPage
    }
    this.productService.query(query).subscribe(res => {
      this.processToShow(res);
    });
  }

  processToShow(res) {
    this.pager = this.pagination.getPager(this.currentPage, this.pageSize, res.totalElements);
    console.log('pager', this.pager);
    console.log(res);
    this.dataSource = new MatTableDataSource(res);
    this.products = res;
    this.totalItems = res.totalElements;
  }

  setPage(number) {
    this.currentPage = number;
    this.getAllProduct();
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
    const dialogRef = this.dialog.open(MenuDialogComponent, {
      data: {
        productId: id,
        title: title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllProduct();
    });

  }

  addNewdish() {
    this.router.navigate(['admin/menu/add']);
  }

  editProduct(id) {
    this.router.navigate(['admin/menu/edit', id]);
  }

  deleteProduct(id) {
    this.confirmDelete(id);
  }

  allProdcut() {
    console.log('ALL PRODUCTS');
    this.getAllProduct();
  }

  isAvailable() {
    this.productService.findAll().subscribe(res => {
      this.processToShow(res);
      console.log('IS AVAILABLE');
    });
  }

  isNotAvailable() {
    this.productService.findAll().subscribe(res => {
      this.processToShow(res);
      console.log('IS NOT AVAILABLE');
    });
  }

  isOnHomePage() {
    this.productService.findAll().subscribe(res => {
      this.processToShow(res);
      console.log('IS ON HOMEPAGE');
    });
  }
}
