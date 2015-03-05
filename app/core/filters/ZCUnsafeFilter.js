'use strict';

export function ZCUnsafeFilter($sce) {
    'ngInject';
    return function(html) {
        return $sce.trustAsHtml(html);
    };
}