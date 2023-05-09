import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserRegister } from '@app/requests/user-register';
import { ToastService } from '@services/ui/toast.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerForm: FormGroup | undefined = undefined;

	get controls() { return this.registerForm?.controls; }

	constructor(private formBuilder: FormBuilder, private toastService: ToastService) { }

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

	submitForm() {
		if (!this.registerForm || this.registerForm.invalid) {
			this.toastService.message("Alanları kontrol edin", "Geçersiz Bilgi", { messageType: 'warning' });
			return;
		}

		const request: UserRegister = this.registerForm.value;
		console.log(request);
	}

	ngOnInit(): void { this.initForm(); }
}
