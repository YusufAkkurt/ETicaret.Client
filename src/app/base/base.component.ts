import { NgxSpinnerService } from "ngx-spinner";

export enum SpinnerType {
	BallScalePulse = "ball-scale-pulse",
	ballClipRotatePulse = "ball-clip-rotate-pulse",
	BallScaleRipplemultiple = "ball-scale-ripple-multiple",
}

export class BaseComponent {
	constructor(private spinnerService: NgxSpinnerService) { }

	hideSpinner(spinnerType: `${SpinnerType}`) { this.spinnerService.hide(spinnerType); }

	showSpinner(spinnerType: `${SpinnerType}`) { this.spinnerService.show(spinnerType); }
}