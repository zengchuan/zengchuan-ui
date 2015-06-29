class SecurityUserResource {

    constructor(ZCHttpService) {
        'ngInject';
        this.ZCHttpService = ZCHttpService;
    }

    createSimpleAccount(createSimpleAccountVO) {
        return this.ZCHttpService.post('security-user/simple-account', createSimpleAccountVO);
    }

    login(loginVO) {
        return this.ZCHttpService.post('security-user/login', loginVO);
    }

    getLoginInfo(userId, languageId){
        return this.ZCHttpService.get('security-user/login-info' + '/' + userId + '/' + languageId);
    }

    getRolesInfo(roleId, languageId){
        return this.ZCHttpService.get('security-user/login-info-role' + '/' + roleId  + '/' + languageId);
    }
}


export default SecurityUserResource;