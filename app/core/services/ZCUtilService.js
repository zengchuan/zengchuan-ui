'use strict';
import $ from 'jquery';

export class ZCCheckModel{
    constructor(){
        this.isRight = false;
        this.data = {};
    }
}

export function zcTrim(o) {
    if (o instanceof String || typeof o === 'string') {
        o = o.trim();
    } else if (o instanceof Object || typeof o === 'object') {
        for (var i in o) {
            if (o[i] instanceof String || typeof o === 'string') {
                o[i] = o[i].trim();
            }
            if (o[i] instanceof Array) {
                for (var j = 0; j < o[i].length; j++) {
                    o[i][j] = zcTrim(o[i][j]);
                }
            }
        }
    }
    return o;
}

export function setItemFocus(elementId) {
    var ele = $('#' + elementId);
    var str = ele[0].type.toLowerCase();
    switch (str) {
        case 'text':
            $('#' + elementId).focus();
            $('#' + elementId).select();
            break;
        case 'password':
            $('#' + elementId).focus();
            $('#' + elementId).select();
            break;

        case 'select-one':
            $('#' + elementId).focus();
            break;

        case 'radio':
            $('#' + elementId).focus();
            break;

        case 'select-multiple':
        case 'radio':
        case 'file':
        case 'textarea':
            $('#' + elementId).focus();
            $('#' + elementId).select();
            break;

        case 'button':
            $('#' + elementId).focus();
            break;

        case 'checkbox':
            $('#' + elementId).focus();
            break;
        case 'submit':
            $('#' + elementId).focus();
            break;
        default:
            break;
    }
}


