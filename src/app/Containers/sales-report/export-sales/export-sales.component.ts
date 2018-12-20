import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {INgxMyDpOptions, IMyDateModel} from 'ngx-mydatepicker';
import {SaleOrder} from '../../../entities/interfaces/saleOrder';
import {Router} from '@angular/router';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {SaleOrderService} from '../../../entities/services/saleOrder/sale-order.service';
import {PaginationService} from '../../../shared/pagination/pagination.service';
import {ProductService} from '../../../entities/services/product/product.service';
import {ExcelService} from '../../../entities/services/excel.service';
import {CURRENTADMINROLE, MANAGERROLE} from '../../../static/constants/site.constants';

@Component({
    selector: 'app-export-sales',
    templateUrl: './export-sales.component.html',
    styleUrls: ['./export-sales.component.css']
})
export class ExportSalesComponent implements OnInit {
    filterForm: FormGroup;
    userRole: string;
    /* paganation */
    pageSize = 10;
    currentPage = 0;
    pager: any = {};
    totalItems: any = 0;
    isAllOrder = false;
    isFilterOrder = false;

    dataSource;
    saleOrders: SaleOrder[] = [];
    displayedColumns: string[] = [
        'id',
        'basePrice',
        'dateCreated',
        'dateUpdated',
        'productId',
        'happyOrderId',
    ];

    minValue = 2;
    maxValue = 10;
    options: Options = {
        floor: 0,
        ceil: 1000,
        step: 2
    };

    dateOptions: INgxMyDpOptions = {
        dateFormat: 'yyyy-mm-dd',
    };

    constructor(
        private fb: FormBuilder,
        private router: Router,
        public dialog: MatDialog,
        private saleOrdeService: SaleOrderService,
        private pagination: PaginationService,
        private productService: ProductService,
        private excelService: ExcelService
    ) {
    }

    ngOnInit() {
        // chck if staff is logged in
        this.userRole = localStorage.getItem(CURRENTADMINROLE) || 'non';
        console.log('currently' + this.userRole);

        if (this.userRole === 'non' || this.userRole !== MANAGERROLE) {
            this.router.navigate(['/admin/login']);
        }


        this.buildForm();
        this.getAllSales();
    }

    getAllSales() {
        this.isAllOrder = true;
        this.isFilterOrder  = false;
        const query = {
            size: this.pageSize,
            page: this.currentPage
        };
        this.saleOrdeService.query(query).subscribe(res => {
            this.processToShow(res);
        });
    }

    processToShow(res) {
        this.pager = this.pagination.getPager(
            this.currentPage,
            this.pageSize,
            res.totalElements
        );
        console.log('pager', this.pager);
        console.log(res);
        this.dataSource = new MatTableDataSource(res.content);
        this.saleOrders = res.content;
        this.totalItems = res.totalElements;
    }

    setPage(number) {
        this.currentPage = number;
        if (this.isAllOrder) {
            this.getAllSales();
        }

        if (this.isFilterOrder) {
            this.searchValue();
        }
    }

    changePageSize(value) {
        console.log('Page size to show ' + value);
        this.pageSize = value;
    }

    buildForm() {
        this.filterForm = this.fb.group({
            maxValue: [this.maxValue],
            minValue: [this.maxValue],
            dateCreated: [null]
        });
    }

    // date
    onDateChanged(event: IMyDateModel): void {
        console.log('event date', event);
        console.log(this.maxValue)
    }

    searchValue() {
        this.isAllOrder = false;
        this.isFilterOrder  = true;
        const data = this.filterForm.value;
        console.log(data)

        const query = {
            size: this.pageSize,
            page: this.currentPage
        };

        if (data.dateCreated === null || data.dateCreated.formatted === '') {
            this.saleOrdeService.findAllByPrice(query, data.minValue, data.maxValue).subscribe(res => {
                this.processToShow(res);
            });
        } else {
            const  dateCheck =  data.dateCreated.formatted;
            this.saleOrdeService.findAllByDateAndPrice(query, dateCheck, data.minValue, data.maxValue).subscribe(res => {
                this.processToShow(res);
            });
        }
    }

    allSales() {
        this.getAllSales();
    }


    exportSales(): void {
        this.excelService.exportAsExcelFile(this.saleOrders, 'happyhour');
    }

}


export interface Options {
    floor: number;
    ceil: number,
    step: number
}
