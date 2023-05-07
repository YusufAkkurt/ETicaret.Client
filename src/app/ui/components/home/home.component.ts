import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent implements OnInit {
	constructor(spinnerService: NgxSpinnerService) { super(spinnerService); }

	ngOnInit(): void { }
}
