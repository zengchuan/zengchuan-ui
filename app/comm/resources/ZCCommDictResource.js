class ZCCommDictResource {

    constructor(Restangular) {
        'ngInject';
        this.Restangular = Restangular;
    }

    getCommDictByLanguageId(dictName, languageId) {
        return this.Restangular
            .all('comm-dict').all(dictName).all(languageId).getList();
    }
}


export default ZCCommDictResource;