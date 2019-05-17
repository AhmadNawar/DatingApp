import { Injectable } from '@angular/core'
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{
    // tslint:disable-next-line: max-line-length
    constructor(private userService: UserService, private authService: AuthService, private router: Router, private alertify: AlertifyService) {
    }
    // tslint:disable-next-line: max-line-length
    resolve(route: ActivatedRouteSnapshot): Observable<User> {// Resolve automaticly subscribe to observables, so we don't need .subscribe after getUser. But since we want to catch any errors, we will use pipes which just pipe whatever we write to the end of the command
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return of(null); // This is how to return a false for an observable (aka return null)
            })
        );
    }
}