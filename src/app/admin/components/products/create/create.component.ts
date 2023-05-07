import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '@base/base.component';
import { CreateProduct } from '@contracts/products/create-product';
import { FileUploadOptions } from '@services/_common/file-upload/file-upload.component';
import { ProductService } from '@services/_common/models/product.service';
import { AlertifyService } from '@services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-create',
	templateUrl: './create.component.html',
	styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {
	@Output() createdProduct: EventEmitter<boolean> = new EventEmitter(false);

	constructor(spinnerService: NgxSpinnerService, private productService: ProductService, private alertify: AlertifyService) { super(spinnerService); }

	create(inputName: HTMLInputElement, inputStock: HTMLInputElement, inputPrice: HTMLInputElement) {
		const createProduct = new CreateProduct();

		createProduct.name = inputName.value;
		createProduct.stock = parseInt(inputStock.value);
		createProduct.price = parseFloat(inputPrice.value);

		this.showSpinner('ball-scale-ripple-multiple');

		this.productService.create(createProduct,
			() => {
				this.alertify.message("Urün Başarıyla Eklenmiştir.", { dismissOthers: true, messageType: 'success' });
				this.createdProduct.emit(true);
			},
			(errorMessage) => this.alertify.message(errorMessage || "", { messageType: 'warning' }),
			() => this.hideSpinner('ball-scale-ripple-multiple'));
	}

	ngOnInit(): void { }
}
