import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
    public usersData: Array<UserEntity>;

    constructor (
        private userServiceData: UserService,
        private router: Router
    ) {
        this.userServiceData.getUsersData()
            .subscribe(
                (data: Array<any>) => {
                    this.usersData = data;

                    if (this.usersData && this.usersData[0]) {
                        this.router.navigate(['user', this.usersData[0].id]);
                    }
                },
                (error: any) => {
                    this.usersData = [];
                }
            );
    }

    ngOnInit() {
        this.userServiceData.usersData.subscribe(users => this.usersData = users);
    }

    public resetActiveClass(event: MouseEvent) {
        const el = event.srcElement;

        const leElms = Array.prototype.slice.call(document.getElementById('values-list').getElementsByTagName('li'));
        leElms.forEach(function (e) {
            e.className = e.className.replace(/\bactive\b/, '');
        });

        leElms[0].className = 'active';
    }
}
