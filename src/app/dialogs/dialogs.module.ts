import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadModule } from '@services/_common/file-upload/file-upload.module';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';

@NgModule({
	declarations: [DeleteDialogComponent, FileUploadDialogComponent],
	imports: [
		CommonModule,
		MatButtonModule,
		MatDialogModule,
		FileUploadModule,
	],
	exports: [DeleteDialogComponent, FileUploadDialogComponent]
})
export class DialogsModule { }
