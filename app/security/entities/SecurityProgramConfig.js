'use strict';
import SecurityProgramConfigId from './SecurityProgramConfigId';

class SecurityProgramConfig {
    constructor(){
        this.id = new SecurityProgramConfigId();
        this.configName = '';
        this.configValue = '';
    }
}

export default SecurityProgramConfig;
