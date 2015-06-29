class ContentController {
    constructor($state, $stateParams) {
        'ngInject';
        this.$state = $state;
        this.$stateParams = $stateParams;
        this.initNewPage();
    }

    initNewPage() {
        let index = this.$state.current.name + '.index';
        this.$state.go(index, this.$stateParams);
    }


}

export default ContentController;
