import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss']
})
export class OrdersComponent extends BaseComponent implements OnInit {
	constructor(spinnerService: NgxSpinnerService) { super(spinnerService); }

	ngOnInit(): void {  }
}
