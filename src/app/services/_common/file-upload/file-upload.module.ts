import { NgModule } from '@angular/core';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SelectProductImageDialogComponent } from '@app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';



@NgModule({
	declarations: [
		FileUploadComponent,
		SelectProductImageDialogComponent
	],
	imports: [
		CommonModule,
		MatButtonModule,
		MatCardModule,
		MatDialogModule,
		NgxFileDropModule,
	],
	exports: [
		FileUploadComponent,
	]
})
export class FileUploadModule { }
