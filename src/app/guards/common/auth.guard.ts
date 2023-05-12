import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { _isAuthenticated } from '@services/_common/auth.service';
import { ToastService } from '@services/ui/toast.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private toastService: ToastService) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (_isAuthenticated) return true;

		this.router.navigate(["/login"], { queryParams: { returnUrl: state.url } });
		this.toastService.message("Oturum açmanız gerekiyor", "Yetkisiz Erişim", { messageType: 'warning' });
		return false;
	}
}