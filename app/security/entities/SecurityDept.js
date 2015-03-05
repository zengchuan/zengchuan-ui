'use strict';

class SecurityDept {
    constructor(){
        this.deptId = '';
        this.parentDeptId = '';
        this.centerId = '';
        this.deptCode = '';
        this.deptName = '';
        this.inputCode = '';
        this.location = '';
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

export default SecurityDept;
