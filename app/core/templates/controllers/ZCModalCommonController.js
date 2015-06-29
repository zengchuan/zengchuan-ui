
class ZCModalCommonController {
    constructor($modalInstance, $translatePartialLoader) {
        'ngInject';
        this.$modalInstance = $modalInstance;
        $translatePartialLoader.addPart('core/templates');
    }

    close(){
        this.$modalInstance.close('0');
    }
}

export default ZCModalCommonController;
