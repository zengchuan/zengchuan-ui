class ZCLanguageService {
    constructor($window, $translateLocalStorage) {
        'ngInject';
        this.$window = $window;
        this.$translateLocalStorage = $translateLocalStorage;
    }

    get() {
        var zclanguage = this.$translateLocalStorage.get('NG_TRANSLATE_LANG_KEY');
        if(zclanguage === undefined || zclanguage === 'undefined' || zclanguage === ''){
            zclanguage = this.getLocale();
            if(zclanguage === undefined  || zclanguage === 'undefined' || zclanguage === ''){
                zclanguage = 'en';
            }
        }
        return zclanguage;
    }

    getLocale() {
        var nav = this.$window.navigator;
        return (angular.isArray(nav.languages) ? nav.languages[0] : nav.language || nav.browserLanguage || nav.systemLanguage || nav.userLanguage) || '';
    }

    getLanguageForTinymce(languageId) {
        if(languageId === 'en'){
            return 'en_GB';
        }
        if(languageId === 'zh-CN'){
            return 'zh_CN';
        }
        return languageId;
    }

    getLanguageForDate(languageId) {
        if(languageId === 'en'){
            return 'en-GB';
        }
        return languageId;
    }

}

export default ZCLanguageService;
