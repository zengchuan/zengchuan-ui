
class ZCCommLanguageResource {
    constructor(ZCHttpService) {
        'ngInject';
        this.ZCHttpService = ZCHttpService;
    }

    getCommLanguageById(id) {
        return this.ZCHttpService.get('comm-language/' + id);
    }
}


export default ZCCommLanguageResource;