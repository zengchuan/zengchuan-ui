class ZCCommLanguageResource {
    constructor(Restangular) {
        'ngInject';
        this.Restangular = Restangular;
    }

    getCommLanguageById(id) {
        return this.Restangular
            .all('comm-language').all(id).getList();
    }
}


export default ZCCommLanguageResource;