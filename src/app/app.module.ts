import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminModule } from '@admin/admin.module';
import { UiModule } from '@ui/ui.module';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { Token } from '@contracts/users/user-login.response';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		HttpClientModule,
		AdminModule,
		UiModule,
		ToastrModule.forRoot(),
		NgxSpinnerModule,
		JwtModule.forRoot({
			config: {
				tokenGetter: () => (JSON.parse(localStorage.getItem('token') || 'null') as Token)?.accessToken,
				allowedDomains: ["localhost:5000", "localhost:5001"]
			}
		}),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
