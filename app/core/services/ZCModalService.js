import {ZCModalDefaults, ZCModalOptions} from '../templates/models/ZCModalModel';
import {setItemFocus} from './ZCUtilService';

class ZCModalService {
    constructor($q, $modal, $translate, $translatePartialLoader) {
        'ngInject';
        this.$q = $q;
        this.$modal = $modal;
        this.$translate = $translate;

        $translatePartialLoader.addPart('core/templates');

        this.modalDefaults = new ZCModalDefaults();
    }

    showModal(customModalDefaults, customModalOptions) {
        angular.extend(this.modalDefaults, customModalDefaults);
        this.modalDefaults.resolve = {
            customModalOptions: function () {
                return this.getText(customModalOptions);
            }.bind(this)
        };
        this.modalDefaults.controller = 'ZCModalController';
        this.modalDefaults.controllerAs = 'zcmc';
        return this.$modal.open(this.modalDefaults).result;

    }

    showSuccess(){
        let deferred = this.$q.defer();
        let modalOptions = {
            type: 'OK',
            bodyText: ''
        };
        this.$translate('TXT_ZC_MODAL_DEFAULT_OK').then(function (translation) {
            modalOptions.bodyText = translation;
            this.showModal({}, modalOptions).then(function (result) {
                deferred.resolve(result);
            });
        }.bind(this));
        return deferred.promise;
    }

    showDelete() {
        let deferred = this.$q.defer();
        let modalOptions = {
            type: 'QUSETION',
            bodyText: ''
        };
        this.$translate('TXT_ZC_MODAL_DEFAULT_DELETE').then(function (translation) {
            modalOptions.bodyText = translation;
            this.showModal({}, modalOptions).then(function (result) {
                deferred.resolve(result);
            });
        }.bind(this));
        return deferred.promise;
    }

    showError(err) {
        let deferred = this.$q.defer();
        var tempModalOptions = {
            type: 'WARN',
            bodyText: ''
        };
        this.$translate('TXT_ZC_MODAL_DEFAULT_WARN').then(function (translation) {
            tempModalOptions.bodyText = translation;
            if(angular.isArray(err)){
                tempModalOptions.bodyText = err[0].errorMessage;
            }
            this.showModal({}, tempModalOptions).then(function (result) {
                if(err[0].errorDomId) {
                    setItemFocus(err[0].errorDomId) ;
                }
                deferred.resolve(result);
            }.bind(this));
        }.bind(this));
        return deferred.promise;
    }

    getText(customModalOptions) {
        let tempModalOptions = {};
        let modalOptions = new ZCModalOptions();
        let type = customModalOptions.type || modalOptions.type;
        let promptText = customModalOptions.promptText || modalOptions.promptText;

        let deferred = this.$q.defer();
        this.$translate('TXT_ZC_MODAL_CLOSE').then(function (translation) {
            modalOptions.closeButtonText = translation;
            this.$translate('TXT_ZC_MODAL_CONFIRM').then(function (translation) {
                modalOptions.actionButtonText = translation;
                this.$translate('TXT_ZC_MODAL_TEXT').then(function (translation) {
                    modalOptions.bodyText = translation;

                    if (type === 'INFO') {
                        modalOptions.iconClass = 'glyphicon glyphicon-info-sign zc-modal-info';
                        modalOptions.showPrompt = false;
                        modalOptions.showConfirm = false;
                        this.$translate('TXT_ZC_MODAL_INFO').then(function (translation) {
                            modalOptions.headerText = translation;
                            angular.extend(tempModalOptions, modalOptions, customModalOptions);
                            deferred.resolve(tempModalOptions);
                        }.bind(this));
                    } else if (type === 'OK') {
                        modalOptions.iconClass = 'glyphicon glyphicon-ok-sign zc-modal-info';
                        modalOptions.showPrompt = false;
                        modalOptions.showConfirm = false;
                        this.$translate('TXT_ZC_MODAL_OK').then(function (translation) {
                            modalOptions.headerText = translation;
                            angular.extend(tempModalOptions, modalOptions, customModalOptions);
                            deferred.resolve(tempModalOptions);
                        }.bind(this));

                    } else if (type === 'QUSETION') {
                        modalOptions.iconClass = 'glyphicon glyphicon-question-sign zc-modal-info';
                        modalOptions.showPrompt = false;
                        modalOptions.showConfirm = true;
                        this.$translate('TXT_ZC_MODAL_QUESTION').then(function (translation) {
                            modalOptions.headerText = translation;
                            this.$translate('TXT_ZC_MODAL_CONFIRM_YES').then(function (translation) {
                                modalOptions.actionButtonText = translation;
                                this.$translate('TXT_ZC_MODAL_CONFIRM_NO').then(function (translation) {
                                    modalOptions.closeButtonText = translation;
                                    angular.extend(tempModalOptions, modalOptions, customModalOptions);
                                    deferred.resolve(tempModalOptions);
                                }.bind(this));
                            }.bind(this));
                        }.bind(this));

                    } else if (type === 'WARN') {
                        modalOptions.iconClass = 'glyphicon glyphicon-exclamation-sign zc-modal-warn';
                        modalOptions.showPrompt = false;
                        modalOptions.showConfirm = false;
                        this.$translate('TXT_ZC_MODAL_WARN').then(function (translation) {
                            modalOptions.headerText = translation;
                            angular.extend(tempModalOptions, modalOptions, customModalOptions);
                            deferred.resolve(tempModalOptions);
                        }.bind(this));

                    } else if (type === 'PROMPT') {
                        modalOptions.iconClass = '';
                        modalOptions.showPrompt = true;
                        modalOptions.showConfirm = true;
                        this.$translate('TXT_ZC_MODAL_PROMPT').then(function (translation) {
                            modalOptions.headerText = translation;
                            if (promptText.length <= 0) {
                                this.$translate('TXT_ZC_MODAL_PROMPT_INFO').then(function (translation) {
                                    modalOptions.promptText = translation;
                                    angular.extend(tempModalOptions, modalOptions, customModalOptions);
                                    deferred.resolve(tempModalOptions);
                                }.bind(this));
                            }
                        }.bind(this));
                    }
                }.bind(this));
            }.bind(this));
        }.bind(this));
        return deferred.promise;
    }

}

export default ZCModalService;
