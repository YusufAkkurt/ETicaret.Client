import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav'

import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';


@NgModule({
	declarations: [
		LayoutComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		ComponentsModule,
		MatSidenavModule,
	],
	exports: [
		LayoutComponent,
	]
})
export class LayoutModule { }
