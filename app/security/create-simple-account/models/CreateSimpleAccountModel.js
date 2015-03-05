import SecurityUser from '../../entities/SecurityUser';

export class CreateSimpleAccountVO {
    constructor(){
        this.securityUser = new SecurityUser();
        this.password = '';
        this.languageId = '';
    }
}

export class CreateSimpleAccountInfo {
    constructor(){
        this.passwordConfirm = '';
        this.checked = 0;
    }
}


