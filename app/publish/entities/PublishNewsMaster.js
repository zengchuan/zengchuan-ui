'use strict';

class PublishNewsMaster {
    constructor(){
        this.newsId = '';
        this.newsTitle = '';
        this.centerId = '';
        this.languageId = '';
        this.status = '';
        this.newsTypeId = '';
        this.authorId = '';
        this.authorName = '';
        this.homeHeaderFlag = 0;
        this.homeFlag = 0;
        this.typeHeaderFlag = 0;
        this.createDate = null;
        this.createUserId = '';
        this.createCompId = '';
        this.updateDate = null;
        this.updateUserId = '';
        this.updateCompId = '';
    }
}

export default PublishNewsMaster;
