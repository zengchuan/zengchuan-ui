'use strict';

export function ZCHeight() {
    let directive = {
        restrict: 'EA',
        link: link
    };
    return directive;


    function link(scope, element, attrs) {
        /*jslint evil: true */

        let zcHeight = attrs.zcHeight;
        let zcHeightPara = attrs.zcHeightPara;
        scope.onResizeFunction = function(tElement, zcHeight) {
            if (typeof zcHeight === 'number') {
                tElement.height(zcHeight);
            } else if (zcHeight.indexOf('$(window)') !== -1) {
                tElement.height(eval(zcHeight));
            } else {
                tElement.height(scope.$eval(zcHeight));
            }
        }.bind(scope);

        scope.onResizeFunction(element, zcHeight);

        angular.element(window).bind('resize', function() {
            scope.onResizeFunction(element, zcHeight);
        });

        scope.$watch(zcHeightPara, function () {
            scope.onResizeFunction(element, zcHeight);
        }, true);
    }
}
