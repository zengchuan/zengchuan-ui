import {PublishNewsVideo} from '../models/NewsModel';


class ViewController {
    constructor($sce, ZCHttpService, publishNewsMaster, publishNewsDetailVOList) {
        'ngInject';
        this.$sce = $sce;
        this.ZCHttpService = ZCHttpService;
        this.publishNewsMaster = publishNewsMaster;
        this.publishNewsDetailVOList = publishNewsDetailVOList;
        this.publishNewsVideoList = [];
        this.publishNewsVideoSelected = new PublishNewsVideo();
        this.getVideoData();
    }

    getImageData(index) {
        if(this.publishNewsDetailVOList[index].newsId !== ''){
            return this.ZCHttpService.getUrl('publish-news/news-detail-binary/' + this.publishNewsDetailVOList[index].id);
        } else {
            return this.publishNewsDetailVOList[index].contentBase64;
        }
    }

    getVideoData() {
        for(var index = 0; index < this.publishNewsDetailVOList.length; index++) {
            if (this.publishNewsDetailVOList[index].contentFormatId === '3') {
                let publishNewsVideo = new PublishNewsVideo();
                if(this.publishNewsDetailVOList[index].newsId !== ''){
                    publishNewsVideo.url = this.ZCHttpService.getUrl('publish-news/news-detail-binary/' + this.publishNewsDetailVOList[index].id);
                    if(this.publishNewsDetailVOList[index].contentPoster){
                        publishNewsVideo.poster = this.publishNewsDetailVOList[index].contentPoster;
                    } else {
                        publishNewsVideo.poster = this.ZCHttpService.getUrl('publish-news/news-detail-poster/' + this.publishNewsDetailVOList[index].id);
                    }
                } else {
                    publishNewsVideo.url = this.$sce.trustAsResourceUrl(this.publishNewsDetailVOList[index].contentUrl);
                    publishNewsVideo.poster = this.publishNewsDetailVOList[index].contentPoster;
                }
                publishNewsVideo.txt = this.publishNewsDetailVOList[index].contentTxt;
                this.publishNewsVideoList.push(publishNewsVideo);
            }
        }
        if(this.publishNewsVideoList.length > 0){
            this.publishNewsVideoSelected.clone(this.publishNewsVideoList[0]);
        }
    }

    isShowImageData(index) {
        if (this.publishNewsDetailVOList[index].contentFormatId === '2' ) {
            if(this.publishNewsDetailVOList[index].isNew){
                if(this.publishNewsDetailVOList[index].contentBase64.length > 0){
                    return true;
                }
            } else {
                return true;
            }
        }
        return false;
    }

    isShowVideoData() {
        if(this.publishNewsVideoList.length > 0){
            return true;
        }
        return false;
    }

    isShowVideoList() {
        if(this.publishNewsVideoList.length > 1){
            return true;
        }
        return false;
    }

    changeNewVideo(publishNewsVideo) {
        this.publishNewsVideoSelected.clone(publishNewsVideo);
    }

    getSelectedVideoStyle(publishNewsVideo) {
        if(angular.equals(publishNewsVideo, this.publishNewsVideoSelected)){
            return 'news-poster-selected';
        }
        return '';
    }

}

export default ViewController;
