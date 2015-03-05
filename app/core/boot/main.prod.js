'use strict';

import mainModule from './main';
import prodModule from '../configs/ZCConfig.prod';


let mainModuleProd = angular.module('zcAppTest', [
    // modules
    mainModule.name,
    prodModule.name


]);

export default mainModuleProd;
