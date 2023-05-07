import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog } from '@angular/material/dialog';

export class DialogOptions {
	width?: string;
	height?: string;
	position?: DialogPosition;
}

export class DialogParameters {
	componentType: ComponentType<any> | any;
	data: any;
	acceptedCallback: (result: any) => void = () => { }
	options?: Partial<DialogOptions>;
}

@Injectable({ providedIn: 'root' })
export class DialogService {

	constructor(private matDialog: MatDialog) { }

	openDialog(dialogParameters: Partial<DialogParameters>) {
		const dialogRef = this.matDialog.open(dialogParameters.componentType, {
			data: dialogParameters.data,
			width: dialogParameters?.options?.width || '40rem',
			height: dialogParameters?.options?.height,
			position: dialogParameters?.options?.position
		});

		dialogRef.afterClosed().subscribe((result: typeof dialogParameters.data) => dialogParameters.acceptedCallback?.(result));
	}
}
