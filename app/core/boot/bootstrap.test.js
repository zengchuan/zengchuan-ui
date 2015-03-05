'use strict';

//import angular from 'angular';
import mainModule from './main.test';

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainModule.name], {
        //strictDi: true
    });
});
