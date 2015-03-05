'use strict';

//import angular from 'angular';
import mainModule from './main.prod';

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainModule.name], {
        //strictDi: true
    });
});
