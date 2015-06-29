import {setItemFocus} from './ZCUtilService';

class ZCCheckService {
    constructor($q, $translate, $translatePartialLoader, ZCModalService) {
        'ngInject';
        this.$q = $q;
        this.ZCModalService = ZCModalService;
        this.$translate = $translate;

        $translatePartialLoader.addPart('core/messages');

    }

    isNotNull(data, message, focus) {
        let modalOptions = {
            type: 'WARN',
            bodyText: ''
        };

        if(data.length < 1){
            this.$translate('TXT_ZC_MESSAGE_NULL').then(function (translation) {
                modalOptions.bodyText = translation.replace('$1', message);
                this.ZCModalService.showModal({}, modalOptions).then(function () {
                    if(focus){
                        setItemFocus(focus);
                    }
                }.bind(this));
            }.bind(this));
            return true;
        }
        return false;
    }

    isNotArrayNull(data, message, focus){
        let deferred = this.$q.defer();
        let modalOptions = this.ZCModalService.getModalOption('WARN');

        if(data.length <= 0){
            this.$translate('TXT_ZC_MESSAGE_NULL').then(function (translation) {
                modalOptions.bodyText = translation.replace('$1', message);
                this.ZCModalService.showModal({}, modalOptions).then(function () {
                    if(focus){
                        setItemFocus(focus);
                    }
                    deferred.resolve(true);
                }.bind(this));
            }.bind(this));
        } else {
            deferred.resolve(false);
        }
        return deferred.promise;
    }


}

export default ZCCheckService;
