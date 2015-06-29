'use strict';

export function ZCFile($parse) {
    'ngInject';
    let directive = {
        restrict: 'EA',
        template: '<input type=\'file\'  />',
        replace: true,
        link: link
    };
    return directive;

    function link(scope, element, attrs) {
        let accept = attrs.zcFileAccept;
        if(accept !== undefined){
            element[0].setAttribute('accept', accept);
        }

        let modelGet = $parse(attrs.zcFile);
        let modelSet = modelGet.assign;
        let onChange = $parse(attrs.zcFileChange);

        let updateModel = function () {
            scope.$apply(function () {
                modelSet(scope, element[0].files[0]);
                onChange(scope);
            });
        };
        element.bind('change', updateModel);
    }
}
