import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@base/base.component';
import { AuthService } from '@services/_common/auth.service';
import { UserService } from '@services/_common/models/user.service';
import { ToastService } from '@services/ui/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
	loginForm: FormGroup | undefined = undefined;

	get controls() { return this.loginForm?.controls; }

	constructor(
		spinnerService: NgxSpinnerService,
		private router: Router,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private authService: AuthService,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute
	) { super(spinnerService); }

	initForm() {
		this.loginForm = this.formBuilder.group({
			userNameOrEmail: [null, [Validators.required]],
			password: [null, [Validators.required, Validators.minLength(6)]],
		});
	}

	checkReturnUrl() { this.activatedRoute.queryParams.subscribe(param => !!param["returnUrl"] ? this.router.navigateByUrl(param["returnUrl"]) : this.router.navigateByUrl("/")); }

	async submitForm() {
		try {
			if (!this.loginForm || this.loginForm.invalid) {
				this.toastService.message("Alanları kontrol edin", "Geçersiz Bilgi", { messageType: 'warning' });
				return;
			}

			this.showSpinner('ball-scale-pulse');

			const response = await this.userService.login(this.loginForm.value);
			response.succeeded
				? this.toastService.message(response.message, 'Başarılı', { messageType: 'success' })
				: this.toastService.message(response.message, 'Başarısız', { messageType: 'error' });
		} catch (errorResponse: HttpErrorResponse | any) {
			this.toastService.message(errorResponse instanceof HttpErrorResponse ? errorResponse.error : 'Bilinmeyen Hata', 'Başarısız', { messageType: 'error' });
		} finally {
			this.authService.identityCheck();
			this.checkReturnUrl();
			this.hideSpinner('ball-scale-pulse');
		}
	}

	ngOnInit(): void { this.initForm(); }
}
