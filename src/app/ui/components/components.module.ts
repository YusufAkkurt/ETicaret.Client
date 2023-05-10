import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketsModule } from './baskets/baskets.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './products/products.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';

const exportList = [
	BasketsModule,
	HomeModule,
	ProductsModule,
	RegisterModule,
	LoginModule
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		...exportList
	],
	exports: [...exportList]
})
export class ComponentsModule { }
