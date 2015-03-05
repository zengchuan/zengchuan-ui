'use strict';
import SecurityUserRoleId from './SecurityUserRoleId';

class SecurityUserRole {
    constructor(){
        this.id = new SecurityUserRoleId();
        this.centerId = '';
        this.isDefault = 0;
        this.createDate = null;
        this.createUserId = '';
        this.createCompId = '';
        this.updateDate = null;
        this.updateUserId = '';
        this.updateCompId = '';
    }
}

export default SecurityUserRole;
