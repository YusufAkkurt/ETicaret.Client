import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { UserRegister } from '@app/requests/user-register';
import { CreateUser } from '@contracts/users/create-user';
import { firstValueFrom } from 'rxjs';
import { UserLogin } from '@app/requests/user-login';
import { UserLoginResponse } from '@contracts/users/user-login.response';

@Injectable({ providedIn: 'root' })
export class UserService {
	private controller = "users";

	constructor(private httpClientService: HttpClientService) { }

	async login(request: UserLogin): Promise<UserLoginResponse> {
		const observable = this.httpClientService.postData<UserLoginResponse | UserLogin>({ controller: this.controller, action: 'login' }, request);

		const response = await firstValueFrom(observable) as UserLoginResponse;

		if (!!response?.token)
			localStorage.setItem('token', JSON.stringify(response.token));

		return response;
	}

	async create(request: UserRegister): Promise<CreateUser> {
		const observable = this.httpClientService.postData<CreateUser | UserRegister>({ controller: this.controller }, request);

		return await firstValueFrom(observable) as CreateUser;
	}
}
