import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

enum ToastrMessageType {
	Success = "success",
	Info = "info",
	Warning = "warning",
	Error = "error",
}

enum ToastrMessagePosition {
	TopRight = "toast-top-right",
	TopLeft = "toast-top-left",
	TopFullWidth = "toast-top-full-width",
	TopCenter = "toast-top-center",
	BottomRight = "toast-bottom-right",
	BottomLeft = "toast-bottom-left",
	BottomFullWidth = "toast-bottom-full-width",
	BottomCenter = "toast-bottom-center"
}

class ToastrOptions {
	messageType: `${ToastrMessageType}` = `${ToastrMessageType.Info}`;
	position: `${ToastrMessagePosition}` = `${ToastrMessagePosition.BottomRight}`;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
	constructor(private toastrService: ToastrService) { }

	message(message: string, title: string, options?: Partial<ToastrOptions>) {
		this.toastrService[options?.messageType || ToastrMessageType.Info](message, title, { positionClass: options?.position || ToastrMessagePosition.BottomRight });
	}
}