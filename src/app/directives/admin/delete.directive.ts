import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { DialogState } from '@app/dialogs/base/base-dialog';
import { DeleteDialogComponent } from '@app/dialogs/delete-dialog/delete-dialog.component';
import { SpinnerType } from '@base/base.component';
import { DialogService } from '@services/_common/dialog.service';
import { HttpClientService } from '@services/_common/http-client.service';
import { AlertifyService } from '@services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

declare const $: any;

@Directive({ selector: '[appDelete]' })
export class DeleteDirective {
	@Input() id: string = "";
	@Input() controller: string = "";
	@Output() callback: EventEmitter<boolean> = new EventEmitter(false);

	constructor(
		private renderer2: Renderer2,
		private elementRef: ElementRef,
		private dialogService: DialogService,
		private alertifyService: AlertifyService,
		private spinnerService: NgxSpinnerService,
		private httpClientService: HttpClientService,
	) {
		const img = this.renderer2.createElement("img") as HTMLImageElement;

		img.setAttribute("src", "/assets/svgs/delete-icon.svg");
		img.setAttribute("class", "btn btn-danger btn-delete-icon p-1");

		this.renderer2.appendChild(this.elementRef.nativeElement, img);
	}

	delete() {
		this.spinnerService.show(SpinnerType.BallScalePulse);

		const td: HTMLTableCellElement = this.elementRef.nativeElement;

		this.httpClientService.deleteData({ controller: this.controller }, this.id).subscribe(
			_ => $(td.parentElement).fadeOut(250, () => {
				this.callback.emit(true);
				this.alertifyService.message("Silme işlemi başarılı", { messageType: 'success', dismissOthers: true });
			}),
			errorResponse => {
				this.alertifyService.message(errorResponse.message, { messageType: 'error', dismissOthers: true });
				this.spinnerService.hide(SpinnerType.BallScalePulse);
			});
	}

	@HostListener("click")
	onClick() {
		this.dialogService.openDialog({
			data: DialogState.Yes,
			componentType: DeleteDialogComponent,
			acceptedCallback: async result => result === DialogState.Yes && await this.delete(),
		});
	}
}