'use strict';

import commLanguagesEn from './fixtures/comm-language-en.json!json';
import commLanguagesZhCN from './fixtures/comm-language-zh-CN.json!json';

function ZCCommLanguageResourceMock($httpBackend) {
    'ngInject';
    $httpBackend.whenGET(/\/comm-language\/en/)
        .respond( (method, url) => {
            console.log('GET',url);
            return [200, commLanguagesEn];
        });

    $httpBackend.whenGET(/\/comm-language\/zh-CN/)
        .respond( (method, url) => {
            console.log('GET',url);
            return [200, commLanguagesZhCN];
        });


}

export default ZCCommLanguageResourceMock;


