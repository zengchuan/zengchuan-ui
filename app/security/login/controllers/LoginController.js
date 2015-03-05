import {LoginVO} from '../models/LoginModel';
import {zcTrim} from '../../../core/services/ZCUtilService';

class LoginController {
    constructor($q, $state, $translatePartialLoader, $translate, languageId, commLanguageList, ZCCommLanguageResource, ZCModalService, ZCCheckService, SecurityUserResource) {
        'ngInject';
        this.loginVO = new LoginVO();
        this.loginVO.languageId = languageId;
        this.$translate = $translate;
        this.$q = $q;
        this.ZCCommLanguageResource = ZCCommLanguageResource;
        this.commLanguageList = commLanguageList;
        console.log(this.commLanguageList);
        $translate.use(this.loginVO.languageId);
        $translatePartialLoader.addPart('security/login');
        this.$state = $state;
        this.ZCModalService = ZCModalService;
        this.ZCCheckService = ZCCheckService;
        this.SecurityUserResource = SecurityUserResource;

    }

    changeI18n(){
        this.$translate.use(this.loginVO.languageId);
        this.commLanguageList = this.ZCCommLanguageResource.getCommLanguageById(this.loginVO.languageId).$object;
            console.log(this.commLanguageList);
    }

    login(){
        this.loginVO = zcTrim(this.loginVO);

        this.checkForm().then(function (data) {
            if(data){
                this.SecurityUserResource.login(this.loginVO).then(function (response) {
                    console.debug(response.securityUser);
                }.bind(this), function errorCallback(response) {
                    console.debug(response);
                    this.ZCModalService.showError(response.data);
                }.bind(this)
                );
            }
        }.bind(this));

    }

    checkForm(){
        let deferred = this.$q.defer();
        this.$translate('TXT_LOGIN_USER').then(function (translation) {
            if (this.ZCCheckService.isNotNull(this.loginVO.userCode, translation, 'userCode')) {
                deferred.resolve(false);
            } else {
                this.$translate('TXT_LOGIN_PASSWORD').then(function (translation) {
                    if (this.ZCCheckService.isNotNull(this.loginVO.password, translation, 'password')) {
                        deferred.resolve(false);
                    } else {
                        deferred.resolve(true);
                    }
                }.bind(this));
            }
        }.bind(this));

        return deferred.promise;
    }

}

export default LoginController;
