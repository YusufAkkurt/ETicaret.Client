import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog, DialogState } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '@services/_common/file-upload/file-upload.component';
import { ProductService } from '@services/_common/models/product.service';
import { ListProductImage } from '@contracts/products/list-product-image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '@base/base.component';
import { DialogService } from '@services/_common/dialog.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
	selector: 'app-select-product-image-dialog',
	templateUrl: './select-product-image-dialog.component.html',
	styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> implements OnInit {

	productImages: ListProductImage[] = [];

	constructor(
		dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogState | string,
		private dialogService: DialogService,
		private productService: ProductService,
		private spinnerService: NgxSpinnerService,
	) { super(dialogRef); }

	@Output() fileUploadOptions: Partial<FileUploadOptions> = {
		accept: ".png, .jpg, .jpeg, .gif",
		controller: 'products',
		action: 'upload',
		queryString: `id=${this.data}`,
		isAdminPage: true,
		onAcceptFinnalyCallback: () => this.readImages()
	};

	async readImages() {
		this.spinnerService.show(SpinnerType.BallScalePulse);
		this.productImages = await this.productService.readImages(this.data);
		this.spinnerService.hide(SpinnerType.BallScalePulse);
	}

	async confirmedDelete(imageId: string) {
		this.spinnerService.show(SpinnerType.BallScalePulse);
		await this.productService.deleteImage(this.data, imageId);
		this.spinnerService.hide(SpinnerType.BallScalePulse);
		await this.readImages();
	}

	async deleteImage(imageId: string) {
		this.dialogService.openDialog({
			componentType: DeleteDialogComponent,
			data: DialogState.Yes,
			acceptedCallback: async (data) => data === DialogState.Yes && await this.confirmedDelete(imageId)
		});
	}

	ngOnInit(): void { this.readImages(); }
}
