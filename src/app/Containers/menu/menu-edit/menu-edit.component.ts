import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'app/entities/services/category/category.service';
import { Category } from 'app/entities/interfaces/category';
import { Product } from './../../../entities/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'app/entities/services/product/product.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  id: any;
  private _product: Product;
  isSaving: boolean;

  categories: Category[];
  createdDate: string;
  updatedDate: string;

  constructor(
      private productService: ProductService,
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
      this.isSaving = false;
      this._product = {};

      this.activatedRoute.paramMap.subscribe(params => {
        if (params.has('id')) {
          this.id = params.get('id');
          this.getAllByProduct(this.id);
        } else {
          // error handling
        }
      });

      this.categoryService.findAll().subscribe(
          res => {
            this.categories = res;
            console.log(res)
          },
          (res: HttpErrorResponse) => this.onError(res.message)
      );
  }


  getAllByProduct(id) {
    this.productService.find(id).subscribe(res => {
      this._product = res;
    })
  }

  previousState() {
      window.history.back();
  }

  save() {
      this.isSaving = true;
      this._product.restaurantId = 1;
      if (this.product.id !== undefined) {
          this.subscribeToSaveResponse(this.productService.update(this.product));
      } else {
          this.subscribeToSaveResponse(this.productService.create(this.product));
      }
  }

  private subscribeToSaveResponse(result) {
      result.subscribe(
          (res: HttpResponse<Product>) => this.onSaveSuccess(),
           (res: HttpErrorResponse) => this.onSaveError()
         );
  }

  private onSaveSuccess() {
      this.isSaving = false;
      this.previousState();
  }

  private onSaveError() {
      this.isSaving = false;
  }

  private onError(errorMessage: string) {
      // this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCategoryById(index: number, item: Category) {
      return item.id;
  }
  get product() {
      return this._product;
  }

  set product(product: Product) {
      this._product = product;
  }

}
