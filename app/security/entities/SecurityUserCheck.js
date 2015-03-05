'use strict';

class SecurityUserCheck {
    constructor(){
        this.userId = '';
        this.password = '';
        this.verifyCode = '';
        this.verifyFlag = 0;
        this.startDate = null;
        this.endDate = null;
        this.permitFlag = 0;
        this.createDate = null;
        this.createUserId = '';
        this.createCompId = '';
        this.updateDate = null;
        this.updateUserId = '';
        this.updateCompId = '';
    }
}

export default SecurityUserCheck;
