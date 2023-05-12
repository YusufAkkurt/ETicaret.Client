import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@services/_common/auth.service';
import { ToastService } from '@services/ui/toast.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(public authService: AuthService, private router: Router, private toastService: ToastService) { this.authService.identityCheck(); }

	logOut() {
		this.authService.logOut();
		this.toastService.message("Oturum kapatıldı.", "Uyarı", { messageType: 'warning' });
		this.router.navigateByUrl("/login");
	}
}
