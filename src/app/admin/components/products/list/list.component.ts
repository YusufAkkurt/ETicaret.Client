import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '@services/_common/models/product.service';
import { ListProduct } from '@contracts/products/list-product';
import { BaseComponent } from '@base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService } from '@services/admin/alertify.service';
import { MatPaginator } from '@angular/material/paginator';
import { DialogService } from '@services/_common/dialog.service';
import { SelectProductImageDialogComponent } from '@app/dialogs/select-product-image-dialog/select-product-image-dialog.component';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
	@ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

	displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'photos', 'edit', 'delete'];
	dataSource: MatTableDataSource<ListProduct> | undefined = undefined;

	constructor(
		spinnerService: NgxSpinnerService,
		private dialogService: DialogService,
		private productService: ProductService,
		private alertfyService: AlertifyService,
	) { super(spinnerService); }

	async getProducts() {
		this.showSpinner('ball-scale-pulse');

		const errorCallback = (errorMessages: string) => this.alertfyService.message(errorMessages || "", { dismissOthers: true, messageType: 'error' });
		const completeCallback = () => this.hideSpinner('ball-scale-pulse')

		const response = await this.productService.read(this.paginator.pageIndex || 0, this.paginator.pageSize || 5, { errorCallback, completeCallback });

		this.dataSource = new MatTableDataSource<ListProduct>(response.products);
		this.paginator.length = response.totalCount;
	}

	addProductImage(productId: string) {
		this.dialogService.openDialog({
			componentType: SelectProductImageDialogComponent,
			data: productId,
			options: {
				width: '50rem'
			}
		});
	}

	async onPageChange() { await this.getProducts(); }

	ngOnInit(): void { this.getProducts(); }
}
