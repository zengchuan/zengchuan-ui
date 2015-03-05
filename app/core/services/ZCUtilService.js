'use strict';

export function zcTrim(o) {
    if (o instanceof String || typeof o === 'string') {
        o = o.trim();
    } else if (o instanceof Object || typeof o === 'object') {
        for (var i in o) {
            if (o[i] instanceof String || typeof o === 'string') {
                o[i] = o[i].trim();
            }
            if (o[i] instanceof Object || typeof o === 'object') {
                o[i] = zcTrim(o[i]);
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
    /*jslint evil: true */
    var str = 'document.getElementById(\'' + elementId + '\').type.toLowerCase()';
    str = eval(str);
    switch (str) {
        case 'text':
            str = 'document.getElementById(\'' + elementId + '\').focus()';
            str = eval(str);
            str = 'document.getElementById(\'' + elementId + '\').select()';
            str = eval(str);
            break;

        case 'password':
            str = 'document.getElementById(\'' + elementId + '\').focus()';
            str = eval(str);
            str = 'document.getElementById(\'' + elementId + '\').select()';
            str = eval(str);
            break;

        case 'select-one':
            str = 'document.getElementById(\'' + elementId + '\').focus()';
            str = eval(str);
            break;

        case 'radio':
            str = 'document.getElementById(\'' + elementId + '\').focus()';
            str = eval(str);
            break;

        case 'select-multiple':
        case 'radio':
        case 'file':
        case 'textarea':
            str = 'document.getElementById(\'' + elementId + '\').focus()';
            str = eval(str);
            str = 'document.getElementById(\'' + elementId + '\').select()';
            str = eval(str);
            break;

        case 'button':
            str = 'document.getElementById(\'' + elementId + '\').focus()';
            str = eval(str);
            break;

        case 'checkbox':
            str = 'document.getElementById(\'' + elementId + '\').focus()';
            str = eval(str);
            break;
        case 'submit':
            break;
        default:
            break;
    }
}


