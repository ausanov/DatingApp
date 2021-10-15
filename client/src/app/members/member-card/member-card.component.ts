import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Member } from 'src/app/_models/Member';

@Component({
	selector: 'app-member-card',
	templateUrl: './member-card.component.html',
	styleUrls: ['./member-card.component.css'],
	// encapsulation: ViewEncapsulation.Emulated
})
export class MemberCardComponent implements OnInit {
	@Input() public member: Member;

	constructor() {
		this.member = {} as Member;
	}

	ngOnInit(): void {
		//
	}

}
