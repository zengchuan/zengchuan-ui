'use strict';

export function ZCIs() {
    return getZCIs;
}

export function getZCIs(input) {
    if(angular.equals(input, 1)){
        return true;
    }
    return false;
}

export function ZCCommonName() {
    return getZCCommonName;
}

export function getZCCommonName(input, list) {
    if(!list){
        return '';
    }

    for(var i = 0; i < list.length; i++){
        var item = list[i];
        if(item.id.code === input){
            return item.name;
        }
    }
    return '';
}

