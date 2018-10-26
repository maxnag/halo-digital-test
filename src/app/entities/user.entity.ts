import { Common } from './common';

export class UserEntity implements Common {

    id: string;
    name: string;
    email: string;
    birthday: string;
    location: string;
    phone: string;
    pass: string;
    gender: string;
    vote: number;
    avatar: string;

    constructor(userInfo: any) {
        this.id = userInfo.login ? userInfo.login.uuid || '' : '';
        this.name = userInfo.name ? userInfo.name.first + ' ' + userInfo.name.last || '' : '';
        this.email = userInfo.email || '';
        this.birthday = userInfo.dob ? userInfo.dob.date || '' : '';
        this.location = userInfo.location ? userInfo.location.street || '' : '';
        this.phone = userInfo.phone || '';
        this.pass = userInfo.login ? userInfo.login.password || '' : '';
        this.gender = userInfo.gender || '';
        this.vote = userInfo.vote || 0;
        this.avatar = userInfo.picture ? userInfo.picture.large : '';
    }
}
