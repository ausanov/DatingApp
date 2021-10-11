import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
	public model: any = {};

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(public accountService: AccountService) {
		//
	}

	ngOnInit(): void {
		//
	}
	
	public login() {
		this.accountService.login(this.model).pipe(takeUntil(this.onDestroy$)).subscribe(
			(response: any) => {
				console.log(response);
			},
			(error: string | any) => {
				console.log(error);
			});
	}

	public logout() {
		this.accountService.logout();
	}
}
