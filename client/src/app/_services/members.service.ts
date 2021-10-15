import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/Member';

@Injectable({
	providedIn: 'root'
})
export class MembersService {
	constructor(private http: HttpClient) {
		//
	}

	public getMemebers(): Observable<Member[]> {
		return this.http.get<Member[]>(`${environment.apiUrl}users`);
	}

	public getMember(userId: number): Observable<Member> {
		return this.http.get<Member>(`${environment.apiUrl}users/${userId}`);
	}
}
