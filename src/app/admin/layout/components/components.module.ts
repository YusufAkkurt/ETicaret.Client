import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

const exportList = [
	HeaderComponent,
	SidebarComponent,
	FooterComponent
];

@NgModule({
	declarations: [...exportList],
	imports: [
		CommonModule,
		RouterModule,
		MatListModule,
		MatIconModule
	],
	exports: [...exportList],
})
export class ComponentsModule { }
