class ZCModalProgressController {
    constructor($modalInstance, $interval) {
        'ngInject';
        this.$modalInstance = $modalInstance;
        this.valuenow = 0;

        $interval(function () {
            if(this.valuenow === 100){
                this.valuenow = 0;
            } else {
                ++this.valuenow;
            }
        }.bind(this), 500);
    }

    close(){
        this.$modalInstance.close('');
    }

}

export default ZCModalProgressController;
