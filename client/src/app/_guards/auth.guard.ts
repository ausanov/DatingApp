import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private accountService: AccountService, private toastrService: ToastrService) {
		//
	}

	canActivate(): Observable<boolean | UrlTree> {
		return this.accountService.currentUser$.pipe(
			map((user: User) => {
				if (user) {
					// this.toastrService.success('You are under login.');
					return true;
				}

				this.toastrService.error('You are not logged in into the app.');
				return false;
			})
		);
	}
}
