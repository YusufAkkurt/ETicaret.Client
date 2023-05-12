import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from '@contracts/users/user-login.response';

export let _isAuthenticated: boolean;

@Injectable({ providedIn: 'root' })
export class AuthService {
	get isAuthenticated(): boolean { return _isAuthenticated; }

	constructor(private jwtHelperService: JwtHelperService) { }

	identityCheck() {
		const token = JSON.parse(localStorage.getItem('token') || 'null') as Token | undefined;

		let isExpired = true;

		try { isExpired = this.jwtHelperService.isTokenExpired(token?.accessToken || ""); }
		catch { isExpired = true; }

		_isAuthenticated = !!token && !isExpired;
	}

	logOut() {
		localStorage.removeItem('token');
		this.identityCheck();
	}
}
