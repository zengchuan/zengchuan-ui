'use strict';
import SecurityRolePermissionId from './SecurityRolePermissionId';

class SecurityRolePermission {
    constructor(){
        this.id = new SecurityRolePermissionId();
        this.centerId = '';
        this.createDate = null;
        this.createUserId = '';
        this.createCompId = '';
        this.updateDate = null;
        this.updateUserId = '';
        this.updateCompId = '';
    }
}

export default SecurityRolePermission;
