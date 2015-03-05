'use strict';
import SecurityCenterProgramId from './SecurityCenterProgramId';

class SecurityCenterProgram {
    constructor(){
        this.id = new SecurityCenterProgramId();
        this.createDate = null;
        this.createUserId = '';
        this.createCompId = '';
        this.updateDate = null;
        this.updateUserId = '';
        this.updateCompId = '';
    }
}

export default SecurityCenterProgram;
