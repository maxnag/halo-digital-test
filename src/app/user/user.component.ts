import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './user.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html',
    styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

    public userData: UserEntity;
    public title: string;
    public value: string;

    constructor (
        private userServiceData: UserService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe( params => {
            this.userServiceData.getUserData(this.route.snapshot.params.id)
                .subscribe(
                    (data: UserEntity) => {
                        this.userData = data;
                        this.title = 'Hi, My name is';
                        this.value = this.userData.name;
                    },
                    (error: any) => {
                        this.userData = new UserEntity({});
                    }
                );
        });
    }

    ngOnInit() {
    }

    public changeData(event: MouseEvent, label: string) {
        const el = event.srcElement;
        let data = this.userData[label];

        const leElms = Array.prototype.slice.call(document.getElementById('values-list').getElementsByTagName('li'));
        leElms.forEach(function (e) {
            e.className = e.className.replace(/\bactive\b/, '');
        });

        if (label === 'birthday') {
            const datePipe = new DatePipe('en');
            data = datePipe.transform(this.userData[label], 'dd/MM/yyyy');
        }

        el.className += ' active';
        this.title = el.getAttribute('data-title');
        this.value = el.getAttribute('data-caps')
            ? data.toLowerCase()
            : data.charAt(0).toUpperCase() + data.substring(1)
        ;
    }
}
