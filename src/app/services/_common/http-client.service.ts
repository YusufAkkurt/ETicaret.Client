import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

class RequestParameters {
	controller?: string;
	action?: string;
	queryString?: string;
	headers?: HttpHeaders;
	baseUrl?: string;
	fullEndPoint?: string;
}

@Injectable({ providedIn: 'root' })
export class HttpClientService {
	private baseUrl: string = environment.baseUrl;

	constructor(private httpClient: HttpClient) { }

	private createUrl(requestParameters: Partial<RequestParameters>): string {
		return `${requestParameters.baseUrl || this.baseUrl}/${requestParameters.controller}${!!requestParameters.action ? `/${requestParameters.action}` : ''}`;
	}

	getData<T>(requestParameters: Partial<RequestParameters>, id?: string): Observable<T> {
		const url: string = requestParameters?.fullEndPoint || `${this.createUrl(requestParameters)}${!!id ? `/${id}` : ''}${requestParameters.queryString ? `?${requestParameters.queryString}` : ''}`;

		return this.httpClient.get<T>(url, { headers: requestParameters.headers });
	}

	postData<T>(requestParameters: Partial<RequestParameters>, body: T): Observable<T> {
		const url: string = requestParameters?.fullEndPoint || `${this.createUrl(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ''}`;

		return this.httpClient.post<T>(url, body, { headers: requestParameters.headers });
	}

	putData<T>(requestParameters: Partial<RequestParameters>, body: T): Observable<T> {
		const url: string = requestParameters?.fullEndPoint || `${this.createUrl(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` : ''}`;

		return this.httpClient.put<T>(url, body, { headers: requestParameters.headers });
	}

	deleteData<T>(requestParameters: Partial<RequestParameters>, id: string): Observable<T> {
		const url: string = requestParameters?.fullEndPoint || `${this.createUrl(requestParameters)}${!!id ? `/${id}` : ''}${requestParameters.queryString ? `?${requestParameters.queryString}` : ''}`;

		return this.httpClient.delete<T>(url, { headers: requestParameters.headers });
	}
}

export class ServiceOptions {
	successCallback?: () => void;
	errorCallback?: (message: string) => void;
	completeCallback?: () => void;
}