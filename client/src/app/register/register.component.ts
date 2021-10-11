import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AccountService } from '../_services/account.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	@Output() cancelRegister = new EventEmitter<boolean>();
	
	public model: any = {};

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(private accountService: AccountService, private toastrService: ToastrService) {
		//
	}

	ngOnInit(): void {
		//
	}

	public register() {
		this.accountService.register(this.model).pipe(takeUntil(this.onDestroy$)).subscribe((user) => {
			console.log(user);
			this.cancel();
		}, (error: { error: string | { title: string } }) => {
			console.log(error);
			let msg: string = typeof error.error === "string" ? error.error : error.error.title;
			this.toastrService.error(msg);
		});
	}

	public cancel() {
		this.cancelRegister.emit(false);
	}
}
