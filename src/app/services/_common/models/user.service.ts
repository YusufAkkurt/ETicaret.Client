import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { UserRegister } from '@app/requests/user-register';
import { CreateUser } from '@contracts/users/create-user';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
	private controller = "users";

	constructor(private httpClientService: HttpClientService) { }

	async create(request: UserRegister): Promise<CreateUser> {
		const observable = this.httpClientService.postData<CreateUser | UserRegister>({ controller: this.controller }, request);

		return await firstValueFrom(observable) as CreateUser;
	}
}
