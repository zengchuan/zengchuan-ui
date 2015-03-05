import {ZCModal} from '../models/ZCModalModel';

class ZCModalController {
    constructor($modalInstance, customModalOptions) {
        'ngInject';
        this.$modalInstance = $modalInstance;
        this.zcModal = new ZCModal();
        this.modalOptions = customModalOptions;
    }

    close(){
        this.zcModal.status = '0';
        this.$modalInstance.close(this.zcModal);
    }

    ok(){
        this.zcModal.status = '1';
        if(this.modalOptions.type === 'PROMPT'){
            this.zcModal.data = this.modalOptions.promptData;
            this.$modalInstance.close(this.zcModal);
        } else {
            this.$modalInstance.close(this.zcModal);
        }
    }
}

export default ZCModalController;
