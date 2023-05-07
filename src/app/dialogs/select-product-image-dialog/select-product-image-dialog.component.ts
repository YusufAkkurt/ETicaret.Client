import { Component, Inject, Output } from '@angular/core';
import { BaseDialog, DialogState } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '@services/_common/file-upload/file-upload.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {
	constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogState | string) { super(dialogRef); }

	@Output() fileUploadOptions: Partial<FileUploadOptions> = {
		accept: ".png, .jpg, .jpeg, .gif",
		controller: 'products',
		action: 'upload',
		queryString: `id=${this.data}`,
		isAdminPage: true
	};
}
