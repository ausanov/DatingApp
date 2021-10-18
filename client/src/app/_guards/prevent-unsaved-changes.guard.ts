import { Injectable } from '@angular/core';
import { CanDeactivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
	providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
	canDeactivate(component: MemberEditComponent): Observable<boolean | UrlTree> | boolean {
		if (component.editMemberForm.dirty) {
			return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
		}

		return true;
	}
  
}
