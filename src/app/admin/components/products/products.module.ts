import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { DeleteDirective } from '@app/directives/admin/delete.directive';

import { ProductsComponent } from './products.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component'
import { DialogsModule } from '@app/dialogs/dialogs.module';

@NgModule({
	declarations: [
		ProductsComponent,
		CreateComponent,
		ListComponent,
		DeleteDirective
	],
	imports: [
		CommonModule,
		RouterModule.forChild([{ path: '', component: ProductsComponent }]),
		MatSidenavModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatTableModule,
		MatPaginatorModule,
		DialogsModule
	]
})
export class ProductsModule { }
