'use strict';
import SecurityPermissionConfigId from './SecurityPermissionConfigId';

class SecurityPermissionConfig {
    constructor(){
        this.id = new SecurityPermissionConfigId();
        this.configValue = '';
        this.centerId = '';
        this.createDate = null;
        this.createUserId = '';
        this.createCompId = '';
        this.updateDate = null;
        this.updateUserId = '';
        this.updateCompId = '';
    }
}

export default SecurityPermissionConfig;
