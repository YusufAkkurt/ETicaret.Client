import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '@base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ListComponent } from './list/list.component';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent implements OnInit {
	@ViewChild(ListComponent) listComponent: ListComponent | undefined = undefined;

	constructor(spinnerService: NgxSpinnerService) { super(spinnerService); }

	createdProduct(event: boolean) { event && !!this.listComponent && this.listComponent.getProducts(); }

	ngOnInit(): void { }
}
