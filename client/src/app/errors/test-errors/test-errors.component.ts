import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-test-errors',
	templateUrl: './test-errors.component.html',
	styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
	public validationErrors: string[] = [];

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(private http: HttpClient) {
		//
	}

	ngOnInit(): void {
		//
	}

	public get404Error() {
		this.http.get(`${environment.apiUrl}buggy/not-found`).pipe(takeUntil(this.onDestroy$)).subscribe((response) => {
			console.log(response);
		}, (error) => {
			console.log(error);
		});
	}

	public get400Error() {
		this.http.get(`${environment.apiUrl}buggy/bad-request`).pipe(takeUntil(this.onDestroy$)).subscribe((response) => {
			console.log(response);
		}, (error) => {
			console.log(error);
		});
	}

	public get500Error() {
		this.http.get(`${environment.apiUrl}buggy/server-error`).pipe(takeUntil(this.onDestroy$)).subscribe((response) => {
			console.log(response);
		}, (error) => {
			console.log(error);
		});
	}

	public get401Error() {
		this.http.get(`${environment.apiUrl}buggy/auth`).pipe(takeUntil(this.onDestroy$)).subscribe((response) => {
			console.log(response);
		}, (error) => {
			console.log(error);
		});
	}

	public get400ValidationError() {
		this.http.post(`${environment.apiUrl}account/register`, {}).pipe(takeUntil(this.onDestroy$)).subscribe((response) => {
			console.log(response);
		}, (error) => {
			console.log(error);
			this.validationErrors = error;
		});
	}
}
