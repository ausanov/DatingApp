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
		this.accountService.login(this.model).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
			this.router.navigateByUrl('/members');
		});
	}

	public logout() {
		this.accountService.logout();
		this.router.navigateByUrl('/');
	}
}
