import { Component, Input } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from '@services/admin/alertify.service';
import { ToastService } from '@services/ui/toast.service';
import { FileUploadDialogComponent } from '@app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogState } from '@app/dialogs/base/base-dialog';
import { DialogService } from '../dialog.service';
import { BaseComponent } from '@base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

export class FileUploadOptions {
	controller?: string;
	action?: string;
	queryString?: string;
	explanation?: string;
	accept?: string;
	isAdminPage?: boolean = false;
	onAcceptFinnalyCallback?: () => void;
}

@Component({
	selector: 'app-file-upload',
	templateUrl: './file-upload.component.html',
	styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent extends BaseComponent {
	@Input() options: Partial<FileUploadOptions> = new FileUploadOptions();

	fileDropEntries: NgxFileDropEntry[] = [];

	constructor(
		spinner: NgxSpinnerService,
		private toastService: ToastService,
		private dialogService: DialogService,
		private alertifyService: AlertifyService,
		private httpClientService: HttpClientService
	) { super(spinner); }

	uploadFiles(formData: FormData) {
		this.showSpinner('ball-clip-rotate-pulse');

		this.httpClientService.postData({
			controller: this.options.controller,
			action: this.options.action,
			queryString: this.options.queryString,
			headers: new HttpHeaders({ "responseType": "blob" })
		}, formData).subscribe(
			_ => {
				const message = "Dosyalar başarıyla yüklendi.";

				this.options.isAdminPage
					? this.alertifyService.message(message, { messageType: 'success', dismissOthers: true })
					: this.toastService.message(message, "Başarılı", { messageType: 'success' });;

			},
			(errorResponse: HttpErrorResponse) => {
				this.hideSpinner('ball-clip-rotate-pulse');

				this.options.isAdminPage
					? this.alertifyService.message(errorResponse.message, { messageType: 'error', dismissOthers: true })
					: this.toastService.message("Dosyalar yüklenirken bir hata ile karşılaşıldı", "Başarısız", { messageType: 'error' });
			},
			() => {
				this.fileDropEntries = [];
				this.hideSpinner('ball-clip-rotate-pulse');
				this.options?.onAcceptFinnalyCallback?.();
			}
		);
	}

	selectedFiles(fileDropEntries: NgxFileDropEntry[]) {
		this.fileDropEntries = fileDropEntries;

		const formData = new FormData();

		for (const fileDropEntry of fileDropEntries) {
			(fileDropEntry.fileEntry as FileSystemFileEntry).file(file => formData.append(file.name, file, file.name));
		}

		this.dialogService.openDialog({
			componentType: FileUploadDialogComponent,
			data: DialogState.Yes,
			acceptedCallback: (result) => result === DialogState.Yes && this.uploadFiles(formData),
		})
	}
}
