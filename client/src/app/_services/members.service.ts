import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/Member';

@Injectable({
	providedIn: 'root'
})
export class MembersService {
	public members: Member[];

	constructor(private http: HttpClient) {
		this.members = [];
	}

	public getMemebers(): Observable<Member[]> {
		if (this.members.length > 0) {
			return of(this.members);
		}

		return this.http.get<Member[]>(`${environment.apiUrl}users`).pipe(
			map(members => {
				this.members = members;
				return this.members;
			})
		);
	}

	public getMember(userId: number): Observable<Member> {
		const member = this.members.find((m) => m.id === userId);
		if (member != null) {
			return of(member);
		}

		return this.http.get<Member>(`${environment.apiUrl}users/${userId}`);
	}

	public updateMember(member: Member) {
		return this.http.put(`${environment.apiUrl}users`, member).pipe(
			map(() => {
				const index = this.members.indexOf(member);
				this.members[index] = member;
			})
		);
	}
}
