'use strict';
import SecurityPermissionProgramId from './SecurityPermissionProgramId';

class SecurityPermissionProgram {
    constructor(){
        this.id = new SecurityPermissionProgramId();
        this.centerId = '';
        this.createDate = null;
        this.createUserId = '';
        this.createCompId = '';
        this.updateDate = null;
        this.updateUserId = '';
        this.updateCompId = '';
    }
}

export default SecurityPermissionProgram;
