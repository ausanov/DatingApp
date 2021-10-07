import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	public title: string = 'Dating App';
	public users: any | any[] = [];

	private readonly apiUrl: string = 'https://localhost:5001/api/';
	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(private http: HttpClient) {
		//
	}

	public ngOnInit() {
		this.getUsers();
	}

	private getUsers() {
		this.http.get(`${this.apiUrl}users`)
		// .pipe(takeUntil(this.onDestroy$))
		.subscribe(
			(response) => {
				this.users = response;
			},
			(error: string | any[]) => {
				console.log(error);
			}
		);
	}
}
