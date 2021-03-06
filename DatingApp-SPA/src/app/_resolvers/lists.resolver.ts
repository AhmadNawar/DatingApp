import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListsResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    likesParam = 'Likers';
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) {
    }
    // tslint:disable-next-line: max-line-length
    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {// Resolve automaticly subscribe to observables, so we don't need .subscribe after getUser. But since we want to catch any errors, we will use pipes which just pipe whatever we write to the end of the command allowing us to use rxjs operators like catchError here or map in other examples
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likesParam).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return of(null); // This is how to return a false for an observable (aka return null)
            })
        );
    }
}
