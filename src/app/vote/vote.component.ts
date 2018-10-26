import {Component, OnInit } from '@angular/core';
import {UserService} from '../user/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'vote-cmp',
    templateUrl: './vote.component.html',
    styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

    constructor(
        private userServiceData: UserService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
    }

    vote() {
        this.userServiceData.voteUser(this.route.snapshot.params.id);
    }
}
