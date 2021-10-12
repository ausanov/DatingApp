import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpStatusCode } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private router: Router, private toastrService: ToastrService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request).pipe(
			catchError((error) => {
				if (error) {
					switch (error.status) {
						case HttpStatusCode.BadRequest:
							if (error.error.errors) {
								const modalStateError = [];
								for (const key in error.error.errors) {
									if (error.error.errors[key]) {
										modalStateError.push(error.error.errors[key]);
									}
								}

								throw modalStateError.flat();
							} else {
								this.toastrService.error(error.statusText, error.status);
							}
							break;
						case HttpStatusCode.Unauthorized:
							this.toastrService.error(error.statusText, error.status);
							break;
						case HttpStatusCode.NotFound:
							this.router.navigateByUrl('/not-found');
							break;
						case HttpStatusCode.InternalServerError:
							const navExtras: NavigationExtras = { state: { error: error.error } };
							this.router.navigateByUrl('/server-error', navExtras);
							break;
						default:
							this.toastrService.error('Something unexpected went wrong.');
							console.log(error);
							break;
					}
				}

				return throwError(error);
			})
		);
	}
}
