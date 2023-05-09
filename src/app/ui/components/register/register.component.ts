import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserRegister } from '@app/requests/user-register';
import { BaseComponent } from '@base/base.component';
import { UserService } from '@services/_common/models/user.service';
import { ToastService } from '@services/ui/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {
	registerForm: FormGroup | undefined = undefined;

	get controls() { return this.registerForm?.controls; }

	constructor(
		spinnerService: NgxSpinnerService,
		private formBuilder: FormBuilder,
		private userService: UserService,
		private toastService: ToastService,
	) { super(spinnerService); }

	initForm() {
		this.registerForm = this.formBuilder.group({
			nameSurname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			userName: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			email: [null, [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]],
			password: [null, [Validators.required, Validators.minLength(6)]],
			passwordConfirm: [null, [Validators.required, Validators.minLength(6)]],
		}, {
			validators: (group: AbstractControl): ValidationErrors | null => {
				const password = group.get('password')?.value;
				const passwordConfirm = group.get('passwordConfirm')?.value;

				return password === passwordConfirm ? null : { notSame: true };
			}
		});
	}

	async submitForm() {
		try {
			if (!this.registerForm || this.registerForm.invalid) {
				this.toastService.message("Alanları kontrol edin", "Geçersiz Bilgi", { messageType: 'warning' });
				return;
			}

			this.showSpinner('ball-scale-pulse');

			const response = await this.userService.create(this.registerForm.value);
			response.succeeded
				? this.toastService.message(response.message, 'Başarılı', { messageType: 'success' })
				: this.toastService.message(response.message, 'Başarısız', { messageType: 'error' });
		} catch (errorResponse: HttpErrorResponse | any) {
			this.toastService.message(errorResponse instanceof HttpErrorResponse ? errorResponse.error : 'Bilinmeyen Hata', 'Başarılı', { messageType: 'error' });
		} finally { this.hideSpinner('ball-scale-pulse'); }
	}

	ngOnInit(): void { this.initForm(); }
}
