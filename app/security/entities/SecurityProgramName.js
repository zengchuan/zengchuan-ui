'use strict';
import SecurityProgramNameId from './SecurityProgramNameId';

class SecurityProgramName {
    constructor(){
        this.id = new SecurityProgramNameId();
        this.programName = '';
    }
}

export default SecurityProgramName;
