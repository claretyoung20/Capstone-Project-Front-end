import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'app/entities/services/category/category.service';
import { Category } from 'app/entities/interfaces/category';
import { Product } from './../../../entities/interfaces/product';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ProductService } from 'app/entities/services/product/product.service';
import { JhiDataUtils } from 'ng-jhipster';

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
      private activatedRoute: ActivatedRoute,
      private dataUtils: JhiDataUtils,
      private elementRef: ElementRef,
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
            this.categories = res.content;
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
        this.dataUtils.clearInputImage(this.product, this.elementRef, field, fieldContentType, idInput);
    }

  previousState() {
      window.history.back();
  }

  save() {
      this.isSaving = true;
      this._product.restaurantId = 1;

      if (!this.product.isAvailable) {
          this.product.isAvailable = false;
      }
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
