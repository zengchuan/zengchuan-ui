import {CreateSimpleAccountVO, CreateSimpleAccountInfo} from '../models/CreateSimpleAccountModel';
import {zcTrim, setItemFocus} from '../../../core/services/ZCUtilService';

class CreateSimpleAccountController {
    constructor($q, $state,  $translatePartialLoader, $translate, languageId, commGenderList, ZCModalService, ZCCheckService, SecurityUserResource) {
        'ngInject';
        this.languageId = languageId;
        this.$q = $q;
        this.$state = $state;
        this.ZCModalService = ZCModalService;
        this.ZCCheckService = ZCCheckService;
        this.SecurityUserResource = SecurityUserResource;
        this.$translate = $translate;
        $translatePartialLoader.addPart('security/create-simple-account');
        this.commGenderList = commGenderList;
        this.createSimpleAccountVO = new CreateSimpleAccountVO();
        this.createSimpleAccountInfo = new CreateSimpleAccountInfo();

    }

    saveSimpleAccount(){
        this.createSimpleAccountVO = zcTrim(this.createSimpleAccountVO);

        this.checkForm().then(function (data) {
            if(data){
                this.SecurityUserResource.createSimpleAccount(this.createSimpleAccountVO).then(function () {
                    this.ZCModalService.showSuccess().then(function () {
                        this.$state.go('login');
                    }.bind(this));
                }.bind(this));
            }
        }.bind(this));

    }

    checkForm(){
        let deferred = this.$q.defer();
        let modalOptions = {
            type: 'WARN',
            bodyText: ''
        };
        this.$translate('TXT_CREATE_SIMPLE_ACCOUNT_USER_CODE').then(function (translation) {
            if (this.ZCCheckService.isNotNull(this.createSimpleAccountVO.securityUser.userCode, translation, 'userCode')) {
                deferred.resolve(false);
            } else {
                this.$translate('TXT_CREATE_SIMPLE_ACCOUNT_PASSWORD').then(function (translation) {
                    if (this.ZCCheckService.isNotNull(this.createSimpleAccountVO.password, translation, 'password')) {
                        deferred.resolve(false);
                    } else {
                        if(this.createSimpleAccountVO.password !== this.createSimpleAccountInfo.passwordConfirm){
                            this.$translate('TXT_CREATE_SIMPLE_ACCOUNT_WARN_PASSWORD').then(function (translation) {
                                modalOptions.bodyText = translation;
                                this.ZCModalService.showModal({}, modalOptions).then(function () {
                                    setItemFocus('password') ;
                                });
                            }.bind(this));
                            deferred.resolve(false);
                        } else {
                            if(this.createSimpleAccountInfo.checked !== 1){
                                this.$translate('TXT_CREATE_SIMPLE_ACCOUNT_WARN_CHECK').then(function (translation) {
                                    modalOptions.bodyText = translation;
                                    this.ZCModalService.showModal({}, modalOptions).then(function () {
                                        setItemFocus('isCheckPolicies') ;
                                    });
                                }.bind(this));
                                deferred.resolve(false);
                            } else {
                                deferred.resolve(true);
                            }
                        }
                    }
                }.bind(this));
            }
        }.bind(this));

        return deferred.promise;
    }
}

export default CreateSimpleAccountController;
