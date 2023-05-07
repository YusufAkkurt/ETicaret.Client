import { Injectable } from '@angular/core';
import { HttpClientService, ServiceOptions } from '../http-client.service';
import { CreateProduct } from '@contracts/products/create-product';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, firstValueFrom } from 'rxjs';
import { ListProduct } from '@contracts/products/list-product';

@Injectable({ providedIn: 'root' })
export class ProductService {
	private controller = "products";

	constructor(private httpClientService: HttpClientService) { }

	create(product: CreateProduct, successCallback?: () => void, errorCallback?: (message?: string) => void, completeCallback?: () => void) {
		this.httpClientService.postData({ controller: this.controller }, product).pipe(finalize(() => completeCallback?.())).subscribe(
			_ => successCallback?.(),
			(errorResponse: HttpErrorResponse) => {
				const errors: { key: string, value: string[] }[] = errorResponse.error;
				let message = "";

				errors.forEach((error, index) => {
					error.value.forEach((value, index) => {
						message += `${value}<br />`;
					})
				});

				errorCallback?.(message);
			});
	}

	async read(page = 0, size = 5, options?: Partial<ServiceOptions>): Promise<{ totalCount: number, products: ListProduct[] }> {
		try {
			const promiseData: Promise<{ totalCount: number, products: ListProduct[] } | undefined> = this.httpClientService.getData<{ totalCount: number, products: ListProduct[] }>({
				controller: this.controller,
				queryString: `page=${page}&size=${size}`
			}).toPromise();

			const response = await promiseData;

			options?.successCallback?.();

			return response || { totalCount: 0, products: [] };
		} catch (errorResponse: HttpErrorResponse | unknown) {
			if (errorResponse instanceof HttpErrorResponse) options?.errorCallback?.(errorResponse.message);

			return { totalCount: 0, products: [] };
		} finally { options?.completeCallback?.(); }
	}

	async delete(id: string) {
		const deleteObservable = this.httpClientService.deleteData({ controller: this.controller }, id);

		await firstValueFrom(deleteObservable);
	}
}