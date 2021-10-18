import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
	providedIn: 'root'
})
export class WaitingService {
	public waitingRequestCount: number = 0;

	constructor(private spinnerService: NgxSpinnerService) {
		//
	}

	public showWaitingIndicator() {
		this.waitingRequestCount++;
		this.spinnerService.show(undefined, {
			type: 'line-spin-fade',
			bdColor: 'rgba(255, 255, 255, 0)',
			color: '#333333'
		});
	}

	public hideWaitingIndicator() {
		this.waitingRequestCount--;
		if (this.waitingRequestCount <= 0) {
			this.waitingRequestCount = 0;
			this.spinnerService.hide();
		}
	}
}
