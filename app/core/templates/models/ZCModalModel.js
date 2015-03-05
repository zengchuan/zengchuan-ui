'use strict';
import template from '../views/zc-modal.html!text';

export function ZCModal() {
    this.status = '1';
    this.data = '';
}

export function ZCModalDefaults() {
    this.backdrop = 'static';
    this.keyboard = true;
    this.modalFade = true;
    this.windowClass = 'zc-modal-window';
    this.template = template;
}

export function ZCModalOptions() {
    this.type = 'INFO';
    this.iconClass = '';
    this.closeButtonText = 'Close';
    this.actionButtonText = 'OK';
    this.headerText = 'Proceed?';
    this.bodyText = 'Perform this action?';
    this.promptText = '';
    this.promptData = '';
    this.showPrompt = false;
    this.showConfirm = false;
}


