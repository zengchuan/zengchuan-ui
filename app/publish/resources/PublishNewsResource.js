class PublishNewsResource {

    constructor(ZCHttpService) {
        'ngInject';
        this.ZCHttpService = ZCHttpService;
    }

    insertNews(fd) {
        return this.ZCHttpService.post('publish-news/add', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });
    }

    getNewsMaster(id) {
        return this.ZCHttpService.get('publish-news/news-master/' + id);
    }

    getNewsDetail(id) {
        return this.ZCHttpService.get('publish-news/news-detail/' + id);
    }

    getNewsByPage(publishNewsListVO) {
        return this.ZCHttpService.post('publish-news/news-search', publishNewsListVO);
    }

}


export default PublishNewsResource;