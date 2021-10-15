import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/User';

@Injectable({
	providedIn: 'root'
})
export class AccountService {
	public currentUser$: Observable<User>;

	private currentUserSource = new ReplaySubject<User>(1);

	constructor(private http: HttpClient) {
		this.currentUser$ = this.currentUserSource.asObservable();
	}

	public login(model: any) {
		return this.http.post(`${environment.apiUrl}account/login`, model).pipe(
			map((response: Object) => {
				const user: User = response as User;
				if (user) {
					localStorage.setItem('user', JSON.stringify(user));
					this.currentUserSource.next(user);
				}
			})
		); 
	}

	public setCurrentUser(user: User) {
		this.currentUserSource.next(user);
	}

	public logout() {
		localStorage.removeItem('user');
		this.currentUserSource.next();
	}

	public register(model: any) {
		return this.http.post(`${environment.apiUrl}account/register`, model).pipe(
			map((response: Object) => {
				if (response) {
					localStorage.setItem('user', JSON.stringify(response));
					this.currentUserSource.next(response as User);
				}
			})
		);
	}
}
