import { Injectable } from '@angular/core';

declare const alertify: any;

enum AlertifyMessageType {
	Error = "error",
	Message = "message",
	Notify = "notify",
	Success = "success",
	Warning = "warning"
}

enum AlertifyMessagePosition {
	TopRight = "top-right",
	TopCenter = "top-center",
	TopLeft = "top-left",
	BottomRight = "bottom-right",
	BottomCenter = "bottom-center",
	BottomLeft = "bottom-left",
}

class AlertifyOptions {
	messageType: `${AlertifyMessageType}` = `${AlertifyMessageType.Message}`;
	position: `${AlertifyMessagePosition}` = `${AlertifyMessagePosition.BottomRight}`;
	delay: number = 3;
	dismissOthers: boolean = false;
}

@Injectable({ providedIn: 'root' })
export class AlertifyService {
	constructor() { }

	message(message: string, options?: Partial<AlertifyOptions>) {
		alertify.set('notifier', 'delay', options?.delay);
		alertify.set('notifier', 'position', options?.position);

		const alertMessage = alertify[options?.messageType || AlertifyMessageType.Message](message);
		if (options?.dismissOthers) alertMessage.dismissOthers();
	}

	dismiss() {
		alertify.dismissAll();
	}
}