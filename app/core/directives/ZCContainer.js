'use strict';

export function ZCContainer() {
    let directive = {
        restrict: 'AC',
        link: link
    };
    return directive;


    function link(scope, element) {
        element.addClass('container-fluid');
        //element.addClass('container');
    }
}
