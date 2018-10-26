import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserEntity } from '../entities/user.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private observable: Observable<any>;
    private usersDataSource = new BehaviorSubject([ ]);

    usersData = this.usersDataSource.asObservable();

    constructor(
        private http: HttpClient,
        @Inject('API_URL') private apiUrl: string
    ) {

    }

    public getUsersData() {
        const ls = JSON.parse(localStorage.getItem('usersData'));

        if (ls) {
            this.usersDataSource.next(ls);

            return of(ls);
        } else if (this.observable) {
            return this.observable;
        } else {
            this.observable = this.http.get(this.apiUrl + '/api?results=10&nat=us,dk,fr,gb&exc=cell,registered')
                .pipe(
                    map((usersData: any) => {
                        this.observable = null;

                        const usersCollection = [];

                        usersData.results.forEach((value: UserEntity) => {
                            usersCollection.push(new UserEntity(value));
                        });

                        localStorage.setItem('usersData', JSON.stringify(usersCollection));

                        return usersCollection;
                    }),
                    catchError(this.handleError.bind(this))
                );
            return this.observable;
        }
    }

    public getUserData(id: string) {
        const ls = JSON.parse(localStorage.getItem('usersData'));
        let user = new UserEntity({});

        if (ls) {
            ls.forEach((value: UserEntity) => {
                if (value.id === id) {
                    user = value;
                }
            });
        }

        return of(user);
    }

    public voteUser(id: string) {
        this.getUserData(id)
            .subscribe(
                (data: UserEntity) => {
                    const usersCollection = JSON.parse(localStorage.getItem('usersData'));

                    if (usersCollection) {
                        usersCollection.forEach((value: UserEntity, idx: number) => {
                            if (value.id === id) {
                                usersCollection[idx].vote += 1;
                            }
                        });

                        this.usersDataSource.next(usersCollection);
                    }

                    localStorage.setItem('usersData', JSON.stringify(usersCollection));
                },
                (error: any) => {
                    catchError(this.handleError.bind(this));
                }
            );
    }

   /**
     * Displays the error message
     *
     * @param {Response | any} error
     * @returns {throwError}
     */
    private handleError(error: Response | any) {
        return throwError(error.error);
    }
}
