import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
	public model: any = {};

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(public accountService: AccountService, private router: Router, private toastrService: ToastrService) {
		//
	}

	ngOnInit(): void {
		//
	}
	
	public login() {
		this.accountService.login(this.model).pipe(takeUntil(this.onDestroy$)).subscribe(
			(response: any) => {
				this.router.navigateByUrl('/members');
			},
			(error: { error: string, title: string }) => {
				console.log(error);
				let msg: string = typeof error.error === "string" ? error.error : error.title;
				this.toastrService.error(msg);
			});
	}

	public logout() {
		this.accountService.logout();
		this.router.navigateByUrl('/');
	}
}
