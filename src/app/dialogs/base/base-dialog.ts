import { MatDialogRef } from "@angular/material/dialog";

export enum DialogState {
	Yes = "yes",
	No = "no"
}

export class BaseDialog<T> {
	constructor(public dialogRef: MatDialogRef<T>) { }

	cancel(): void {
		this.dialogRef.close(DialogState.No);
	}
}
