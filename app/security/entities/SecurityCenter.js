'use strict';

class SecurityCenter {
    constructor(){
        this.centerId = '';
        this.parentCenterId = '';
        this.centerCode = '';
        this.centerName = '';
        this.centerNameAlias = '';
        this.inputCode = '';
        this.address = '';
        this.zipcode = '';
        this.tel1 = '';
        this.tel2 = '';
        this.fax = '';
        this.homepage = '';
        this.remark = '';
        this.deleteFlag = 0;
        this.createDate = null;
        this.createUserId = '';
        this.createCompId = '';
        this.updateDate = null;
        this.updateUserId = '';
        this.updateCompId = '';
    }
}

export default SecurityCenter;
