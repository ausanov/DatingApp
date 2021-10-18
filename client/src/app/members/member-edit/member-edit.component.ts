import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Member } from 'src/app/_models/Member';
import { User } from 'src/app/_models/User';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
	selector: 'app-member-edit',
	templateUrl: './member-edit.component.html',
	styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
	@ViewChild('editMemberForm') public editMemberForm: NgForm = {} as NgForm;

	public member: Member = {} as Member;
	public user: User = {} as User;

	private onDestroy$: Subject<void> = new Subject<void>();

	constructor(private accountService: AccountService, private membersService: MembersService, private toastrService: ToastrService) {
		this.accountService.currentUser$.pipe(take(1)).subscribe((u) => this.user = u);
	}

	ngOnInit(): void {
		this.loadMember();
	}

	@HostListener('window:beforeunload', ['$event']) public unloadNotification($event: { returnValue: boolean }) {
		if (this.editMemberForm.dirty) {
			$event.returnValue = true;
		}
	}

	public updateMember() {
		this.membersService.updateMember(this.member).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
			this.toastrService.success('Profile was successfully updated.');
			this.editMemberForm.reset(this.member);
		});
	}

	private loadMember() {
		this.membersService.getMember(this.user.userId).pipe(takeUntil(this.onDestroy$)).subscribe((m) => {
			this.member = m;
		});
	}
}
