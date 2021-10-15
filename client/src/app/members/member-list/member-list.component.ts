import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Member } from 'src/app/_models/Member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
	selector: 'app-member-list',
	templateUrl: './member-list.component.html',
	styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
	public members: Member[] = [];

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(private membersService: MembersService) {
		//
	}

	ngOnInit(): void {
		this.loadMembers();
	}

	public memberTrackFunc(index: number, el: Member): number {
		return el.id;
	}

	private loadMembers() {
		this.membersService.getMemebers().pipe(takeUntil(this.onDestroy$)).subscribe((members) => {
			this.members = members;
		});
	}
}
