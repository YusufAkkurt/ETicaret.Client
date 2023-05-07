import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@base/base.component';
import { AlertifyService } from '@services/admin/alertify.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
	constructor(spinnerService: NgxSpinnerService) { super(spinnerService); }

	ngOnInit(): void {  }
}
