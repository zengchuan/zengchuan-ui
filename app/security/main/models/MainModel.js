export class LoginInfoVO {
    constructor(){
        this.securityRoleVOList = [];
        this.securityRoleVO = {};
        this.programVOListOne = [];
        this.programVOListTwo = [];
        this.programVOListThree = [];
    }
}

export class MenuInfo {
    constructor(){
        this.programId = '';
        this.url = '';
        this.tabName = '';
        this.uriType = '';
        this.parameters = {};
        this.name = '';
        this.isDivider = 0;
        this.isActive = 0;
    }
}



