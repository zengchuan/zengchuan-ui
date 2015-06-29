export const NewsStatusEnum = {
    'SAVED': '1',
    'SUBMITED': '2',
    'PASS': '3',
    'NO_PASS': '4'
};


export class PublishNewsVideo {
    constructor() {
        this.url = '';
        this.poster = '';
        this.txt = '';
    }

    init() {
        this.url = '';
        this.poster = '';
        this.txt = '';
    }

    clone(publishNewsVideo) {
        angular.extend(this, publishNewsVideo);
    }
}

export class PublishNewsDetailVO {
    constructor() {
        this.id = '';
        this.newsId = '';
        this.sortNo = 0;
        this.contentFormatId = '';
        this.contentTxt = '';
        this.contentFile = {};
        this.contentBase64 = '';
        this.contentUrl = '';
        this.contentPoster = '';
        this.isNew = true;
    }

}

export class PublishNewsListVO {
    constructor() {
        this.newsTitle = '';
        this.newsTypeId = '';
        this.authorName = '';
        this.homeHeaderFlag = 0;
        this.typeHeaderFlag = 0;
        this.startDate = null;
        this.endDate = null;
        this.userId = '';
        this.status = '';
        this.currentPage = 1;
        this.pageSize = 10;
        this.totalItems = 0;
        this.sortColumnName = '';
        this.sortDirection = '';
        this.languageId = '';
        this.data = {};
    }

}

export class NewsListTitle {
    constructor() {
        this.TXT_NEWS_LIST_TITLE = '';
        this.TXT_NEWS_LIST_TYPE = '';
        this.TXT_NEWS_LIST_AUTHOR = '';
        this.TXT_NEWS_LIST_DATE = '';
        this.TXT_NEWS_LIST_SHOW_IN_HOME_HEADER = '';
        this.TXT_NEWS_LIST_SHOW_IN_TYPE_HEADER = '';
        this.TXT_NEWS_LIST_STATUS = '';
        this.TXT_NEWS_LIST_PROCESS = '';
        this.TXT_NEWS_LIST_VIEW = '';
        this.TXT_NEWS_LIST_EDIT = '';
        this.TXT_NEWS_LIST_REMOVE = '';
        this.TXT_NEWS_LIST_SUBMIT = '';
        this.TXT_NEWS_LIST_PASS = '';
        this.TXT_NEWS_LIST_NOPASS = '';
        this.TXT_NEWS_LIST_NOPASS_REASON = '';
    }
}





