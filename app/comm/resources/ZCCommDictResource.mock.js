'use strict';

import commGenderEn from './fixtures/comm-gender-en.json!json';
import commGenderZhCN from './fixtures/comm-gender-zh-CN.json!json';
import commNewsformatZhCN from './fixtures/comm-newsformat-zh-CN.json!json';
import commNewstypeZhCN from './fixtures/comm-newstype-zh-CN.json!json';

function ZCCommLanguageResourceMock($httpBackend) {
    'ngInject';
    $httpBackend.whenGET(/\/comm-dict\/CommGender\/en/)
        .respond( (method, url) => {
            console.log('GET',url);
            return [200, commGenderEn];
        });

    $httpBackend.whenGET(/\/comm-dict\/CommGender\/zh-CN/)
        .respond( (method, url) => {
            console.log('GET',url);
            return [200, commGenderZhCN];
        });

    $httpBackend.whenGET(/\/comm-dict\/CommNewsType\/zh-CN/)
        .respond( (method, url) => {
            console.log('GET',url);
            return [200, commNewstypeZhCN];
        });

    $httpBackend.whenGET(/\/comm-dict\/CommNewsFormat\/zh-CN/)
        .respond( (method, url) => {
            console.log('GET',url);
            return [200, commNewsformatZhCN];
        });

}

export default ZCCommLanguageResourceMock;


