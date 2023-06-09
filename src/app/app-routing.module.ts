import { LayoutComponent } from '@admin/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@ui/components/home/home.component';
import { AuthGuard } from './guards/common/auth.guard';

const routes: Routes = [
	{
		path: 'admin', component: LayoutComponent, children: [
			{ path: '', loadChildren: () => import("@admin/components/dashboard/dashboard.module").then(module => module.DashboardModule), canActivate: [AuthGuard] },
			{ path: 'customers', loadChildren: () => import("@admin/components/customers/customers.module").then(module => module.CustomersModule), canActivate: [AuthGuard] },
			{ path: 'orders', loadChildren: () => import("@admin/components/orders/orders.module").then(module => module.OrdersModule), canActivate: [AuthGuard] },
			{ path: 'products', loadChildren: () => import("@admin/components/products/products.module").then(module => module.ProductsModule), canActivate: [AuthGuard] },
		], canActivate: [AuthGuard]
	},
	{ path: '', component: HomeComponent },
	{ path: 'basket', loadChildren: () => import("@ui/components/baskets/baskets.module").then(module => module.BasketsModule) },
	{ path: 'products', loadChildren: () => import("@ui/components/products/products.module").then(module => module.ProductsModule) },
	{ path: 'login', loadChildren: () => import("@ui/components/login/login.module").then(module => module.LoginModule) },
	{ path: 'register', loadChildren: () => import("@ui/components/register/register.module").then(module => module.RegisterModule) },
	{ path: '**', redirectTo: '/' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
