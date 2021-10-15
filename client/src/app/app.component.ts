import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from './_models/User';
import { AccountService } from './_services/account.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
	public title: string = 'Dating App';
	public users: any | any[] = [];

	constructor(private accountService: AccountService) {
		//
	}

	public ngOnInit() {
		this.setCurrentUser();
	}

	private setCurrentUser() {
		let storedUser = localStorage.getItem('user');
		if (storedUser) {
			const user: User = JSON.parse(storedUser);
			this.accountService.setCurrentUser(user);
		}
	}
}
