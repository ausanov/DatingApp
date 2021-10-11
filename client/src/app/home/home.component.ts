import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppConstants } from '../_models/DatingConstantsAndEnums';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	public registerMode: boolean = false;

	constructor(private http: HttpClient) {
		//
	}

	ngOnInit(): void {
		//
	}

	public registerToggle() {
		this.registerMode = !this.registerMode;
	}

	public cancelRegisterMode(registerMode: boolean) {
		this.registerMode = registerMode;
	}
}
