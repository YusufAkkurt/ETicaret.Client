import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { DashboardModule } from './dashboard/dashboard.module';

const exportList = [
	CustomersModule,
	OrdersModule,
	ProductsModule,
	DashboardModule
];

@NgModule({
	declarations: [],
	imports: [
		...exportList,
		CommonModule,
	],
})
export class ComponentsModule { }
