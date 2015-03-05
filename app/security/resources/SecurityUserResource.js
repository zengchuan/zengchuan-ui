class SecurityUserResource {

    constructor(Restangular) {
        'ngInject';
        this.Restangular = Restangular;
    }

    createSimpleAccount(createSimpleAccountVO) {
        return this.Restangular
            .all('security-user').all('simple-account').post(createSimpleAccountVO);
    }

    login(loginVO) {
        return this.Restangular
            .all('security-user').all('login').post(loginVO);
    }
}


export default SecurityUserResource;