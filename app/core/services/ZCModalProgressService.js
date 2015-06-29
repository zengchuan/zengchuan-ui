import template from '../templates/views/zc-modal-progress.html!text';

class ZCModalProgressService {
    constructor($modal) {
        'ngInject';
        this.$modal = $modal;
        this.modalDefaults = {
            template: template,
            controller: 'ZCModalProgressController',
            controllerAs: 'zcmpc',
            backdrop: 'static',
            windowClass: 'zc-modal-progress'
        };

        this.modalInstance = null;
    }

    go() {
        this.modalInstance = this.$modal.open(this.modalDefaults);
    }

    close(){
        this.modalInstance.close('');
    }

}

export default ZCModalProgressService;
