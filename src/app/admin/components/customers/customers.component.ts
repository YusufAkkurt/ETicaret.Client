import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends BaseComponent implements OnInit {
	constructor(spinnerService: NgxSpinnerService) { super(spinnerService); }

	ngOnInit(): void {  }
}
