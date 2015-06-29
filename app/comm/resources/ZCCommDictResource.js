class ZCCommDictResource {

    constructor(ZCHttpService) {
        'ngInject';
        this.ZCHttpService = ZCHttpService;
    }

    getCommDictByLanguageId(dictName, languageId) {
        return this.ZCHttpService.get('comm-dict' + '/' + dictName + '/' + languageId);
    }
}


export default ZCCommDictResource;