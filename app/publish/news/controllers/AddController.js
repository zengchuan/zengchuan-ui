//import {NewsStatusEnum, PublishNewsVideo, PublishNewsDetailVO} from '../models/NewsModel';
import {NewsStatusEnum, PublishNewsDetailVO} from '../models/NewsModel';
import PublishNewsMaster from '../../entities/PublishNewsMaster';
import PublishNewsDetail from '../../entities/PublishNewsDetail';
import {zcTrim, ZCCheckModel} from '../../../core/services/ZCUtilService';
//import view from '../views/view.html!text';

/* global $:false */
class AddController {
    constructor($q, $scope, $window, $timeout, $modal, $state, $translatePartialLoader, $translate, languageId,  securityUser, securityRole, ZCHttpService, ZCLanguageService, ZCModalService, ZCModalProgressService, ZCCheckService, ZCFileService, PublishNewsResource, ZCCommDictResource, isAdd, newsId) {
        'ngInject';
        this.$q = $q;
        this.$scope = $scope;
        this.$window = $window;
        this.$timeout = $timeout;
        this.$modal = $modal;
        this.$state = $state;

        this.languageId = languageId;
        $translatePartialLoader.addPart('publish/news');
        this.$translate = $translate;

        this.ZCHttpService = ZCHttpService;
        this.ZCModalService = ZCModalService;
        this.ZCModalProgressService = ZCModalProgressService;
        this.ZCCheckService = ZCCheckService;
        this.ZCFileService = ZCFileService;
        this.PublishNewsResource = PublishNewsResource;
        this.securityUser = securityUser;
        this.securityRole = securityRole;
        ZCCommDictResource.getCommDictByLanguageId('CommNewsType', languageId).then(function (data) {
            this.newsTypeList = data;
        }.bind(this));
        ZCCommDictResource.getCommDictByLanguageId('CommNewsFormat', languageId).then(function (data) {
            this.newsFormatList = data;
        }.bind(this));

        this.publishNewsMasterBak = {};
        this.publishNewsMaster = new PublishNewsMaster();
        this.publishNewsDetailVOList = [];
        this.isAdd = isAdd;
        if(this.isAdd){
            this.initNewPage();
        } else {
            this.initEdit(newsId);
        }


        this.file = {
            'newsFile': {}
        };

        this.tinymceOptionsPublishNews = {
            //plugins: ['autoresize'],
            plugins: ['autoresize'],
            height: 40,
            autoresize_min_height: 40,// jshint ignore:line
            autoresize_bottom_margin: 0,// jshint ignore:line
            toolbar: 'undo redo | bold italic | link image',
            menubar: false,
            statusbar: false,
            force_br_newlines : true,// jshint ignore:line
            force_p_newlines : false,// jshint ignore:line
            forced_root_block : '', // jshint ignore:line
            language: ZCLanguageService.getLanguageForTinymce(this.languageId)

            //,setup : function(ed) {
            //    ed.on('keydown', function (e) {
            //        if (e.keyCode == 13)  {
            //            e.preventDefault();
            //            e.stopPropagation();
            //        }
            //    });
            //}
            //,file_browser_callback: function(field_name, url, type, win) {
            //    console.debug('file_browser_callback-----------------');
            //    console.debug(field_name);
            //    console.debug(url);
            //    modalOptions.bodyText = 'test';
            //    zcModal.showModal({}, modalOptions).then(function (result) {
            //        win.document.getElementById(field_name).value = 'http://i3.sinaimg.cn/photo/2015/0114/U11415P1505DT20150114160557.jpg';
            //    });
            //}
        };

    }

    initNewPage() {
        this.publishNewsMaster = new PublishNewsMaster();
        this.publishNewsMaster.authorName = this.securityUser.userName;
        this.publishNewsMaster.centerId = this.securityRole.centerId;
        this.publishNewsMaster.languageId = this.languageId;

        this.publishNewsDetailVOList.splice(0);
        this.publishNewsDetailVOList.push(this.getNewPublishNewsDetailVO());



    }

    getNewPublishNewsDetailVO() {
        let publishNewsDetailVO = new PublishNewsDetailVO();
        publishNewsDetailVO.contentFormatId = '1';
        return publishNewsDetailVO;
    }

    readNewsFile(index) {
        let modalOptions = this.ZCModalService.getModalOption('WARN');
        let rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
        if (!rFilter.test(this.file.newsFile.type)) {
            this.$translate('TXT_NEWS_WARN_IMAGE').then(function (translation) {
                modalOptions.bodyText = translation;
                this.ZCModalService.showModal({}, modalOptions).then(function () {
                    return;
                });
            }.bind(this));
        } else {
            this.ZCFileService.readAsDataURL(this.file.newsFile)
                .then(function (result) {
                    this.publishNewsDetailVOList[index].contentBase64 = result;
                    this.publishNewsDetailVOList[index].contentFile = this.file.newsFile;
                    if(this.publishNewsDetailVOList[index].contentTxt === ''){
                        this.publishNewsDetailVOList[index].contentTxt = this.publishNewsMaster.newsTitle.trim().length > 0 ? this.publishNewsMaster.newsTitle : this.file.newsFile.name ;
                    }
                }.bind(this));
        }
    }

    captureVideo(index) {
        let videoNode = {} ;
        if(this.publishNewsDetailVOList[index].isNew){
            videoNode = $('#newsVideo' + index)[0];
        } else {
            videoNode = $('#newsVideoOld' + index)[0];
        }
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let imgScale = 3;
        let cw = videoNode.clientWidth * imgScale;
        let ch = videoNode.clientHeight * imgScale;
        canvas.width = cw;
        canvas.height = ch;
        context.drawImage(videoNode,0,0,cw,ch);
        this.publishNewsDetailVOList[index].contentPoster = canvas.toDataURL('image/png');
        console.debug('contentPoster-------------');
        console.debug(this.publishNewsDetailVOList[index].contentPoster);
    }

    readNewsFileVideo(index) {
        let modalOptions = this.ZCModalService.getModalOption('WARN');
        let type = this.file.newsFile.type;
        let videoNode = $('#newsVideo' + index)[0];
        let canPlay = videoNode.canPlayType(type);
        canPlay = (canPlay === '' ? 'no' : canPlay);
        let isError = canPlay === 'no';
        if (isError) {
            this.$translate('TXT_NEWS_WARN_VIDEO').then(function (translation) {
                modalOptions.bodyText = translation;
                this.ZCModalService.showModal({}, modalOptions).then(function () {
                    this.file.newsFile = {};
                    return;
                });
            }.bind(this));
        }
        let fileURL = URL.createObjectURL(this.file.newsFile);
        videoNode.src = fileURL;
        this.publishNewsDetailVOList[index].contentFile = this.file.newsFile;
        this.publishNewsDetailVOList[index].contentUrl = fileURL;
        if(this.publishNewsDetailVOList[index].contentTxt === ''){
            this.publishNewsDetailVOList[index].contentTxt = this.publishNewsMaster.newsTitle.trim().length > 0 ? this.publishNewsMaster.newsTitle : this.file.newsFile.name ;
        }
        this.$timeout(function () {
            this.captureVideo(index);
        }.bind(this), 1000);

    }

    getImageData(index) {
        if (this.publishNewsDetailVOList[index].contentBase64.length > 0) {
            return this.publishNewsDetailVOList[index].contentBase64;
        }
    }

    isShowImageData(index) {
        if (this.publishNewsDetailVOList[index].contentFormatId === '2' &&
            this.publishNewsDetailVOList[index].isNew) {
            return true;
        }
        return false;
    }

    isShowVideoData(index) {
        if (this.publishNewsDetailVOList[index].contentFormatId === '3' &&
            this.publishNewsDetailVOList[index].isNew) {
            return true;
        }
        return false;
    }

    isShowImageDataFromServer(index) {
        if (!this.isAdd && this.publishNewsDetailVOList[index].contentFormatId === '2' &&
            !this.publishNewsDetailVOList[index].isNew) {
            return true;
        }
        return false;
    }

    getImageDataFromServer(index) {
        return this.ZCHttpService.getUrl('publish-news/news-detail-binary/' + this.publishNewsDetailVOList[index].id);
    }

    isShowVideoDataFromServer(index) {
        if (!this.isAdd && this.publishNewsDetailVOList[index].contentFormatId === '3' &&
            !this.publishNewsDetailVOList[index].isNew) {
            return true;
        }
        return false;
    }

    getVideoPosterFromServer(index) {
        return this.ZCHttpService.getUrl('publish-news/news-detail-poster/' + this.publishNewsDetailVOList[index].id);
    }

    changeNewsFormat(index) {
        this.publishNewsDetailVOList[index].contentTxt = '';
        this.publishNewsDetailVOList[index].contentFile = {};
        this.publishNewsDetailVOList[index].contentBase64 = '';
    }

    plusOneNews(index) {
        this.publishNewsDetailVOList.splice(index + 1, 0, this.getNewPublishNewsDetailVO());
    }

    minusOneNews(index) {
        this.publishNewsDetailVOList.splice(index, 1);
        if (this.publishNewsDetailVOList.length === 0) {
            this.publishNewsDetailVOList.push(this.getNewPublishNewsDetailVO());
        }
    }

    upOneNews(index) {
        if(index === 0) {
            return;
        }
        let upOne = angular.copy(this.publishNewsDetailVOList[index - 1]);
        let thisOne = angular.copy(this.publishNewsDetailVOList[index]);

        this.publishNewsDetailVOList[index - 1] = thisOne;
        this.publishNewsDetailVOList[index] = upOne;
    }

    downOneNews(index) {
        if(index === this.publishNewsDetailVOList.length - 1) {
            return;
        }
        let downOne = angular.copy(this.publishNewsDetailVOList[index + 1]);
        let thisOne = angular.copy(this.publishNewsDetailVOList[index]);

        this.publishNewsDetailVOList[index + 1] = thisOne;
        this.publishNewsDetailVOList[index] = downOne;
    }

    resetPage() {
        if(this.isAdd){
            this.initNewPage();
        } else {
            this.initNewPage();
            this.isAdd = false;
            this.initEdit(this.publishNewsMasterBak);
        }
    }

    commitNews() {
        this.saveOrCommitNews(true);
    }

    saveNews() {
        this.saveOrCommitNews(false);
    }

    saveOrCommitNews(isCommit) {
        this.securityUser = zcTrim(this.securityUser);
        this.publishNewsMaster = zcTrim(this.publishNewsMaster);
        if(isCommit){
            this.publishNewsMaster.status = NewsStatusEnum.SUBMITED;
        } else {
            this.publishNewsMaster.status = NewsStatusEnum.SAVED;
        }
        this.publishNewsDetailVOList = zcTrim(this.publishNewsDetailVOList);

        this.filterPublishNewsDetailVOList();
        this.checkFormPublishNews().then(function (result) {
            if (result.isRight) {
                let fd = new FormData();
                let publishNewsDetailList = [];
                for (var i = 0; i < this.publishNewsDetailVOList.length; i++) {
                    let publishNewsDetailVO = this.publishNewsDetailVOList[i];
                    let publishNewsDetail = new PublishNewsDetail();
                    publishNewsDetail.id = publishNewsDetailVO.id;
                    publishNewsDetail.newsId = publishNewsDetailVO.newsId;
                    publishNewsDetail.sortNo = publishNewsDetailVO.sortNo;
                    publishNewsDetail.contentFormatId = publishNewsDetailVO.contentFormatId;
                    publishNewsDetail.contentTxt = publishNewsDetailVO.contentTxt;

                    publishNewsDetailList.push(publishNewsDetail);
                    if (publishNewsDetail.contentFormatId === '2' && publishNewsDetailVO.isNew) {
                        fd.append('newsImage' + i, publishNewsDetailVO.contentFile);
                    }
                    if (publishNewsDetail.contentFormatId === '3' ) {
                        fd.append('newsVideo' + i, publishNewsDetailVO.contentFile);
                        fd.append('newsVideoPoster' + i, publishNewsDetailVO.contentPoster);
                    }
                }
                fd.append('languageId', this.languageId);
                fd.append('securityUser', angular.toJson(this.securityUser));
                fd.append('publishNewsMaster', angular.toJson(this.publishNewsMaster));
                fd.append('publishNewsDetailList', angular.toJson(publishNewsDetailList));
                if(isCommit){
                    fd.append('isCommit', '1');
                } else {
                    fd.append('isCommit', '0');
                }

                this.ZCModalProgressService.go();

                this.PublishNewsResource.insertNews(fd).then(function (response) {
                        this.ZCModalProgressService.close();
                        this.ZCModalService.showSuccess().then(function () {
                            if(this.isAdd){
                                this.initNewPage();
                            } else {
                                this.editNewsAfter(response);
                            }
                        }.bind(this));
                    }.bind(this), function errorCallback(response) {
                        this.ZCModalService.showError(response.data);
                    }.bind(this)
                );

            } else {
                if (result.data === 'NEWS_SEGMENT') {
                    this.publishNewsDetailVOList.push(this.getNewPublishNewsDetailVO());
                    this.$timeout(function () {
                        $('#contentFormatId0').focus();
                    }, 100);
                }
            }
        }.bind(this));
    }

    filterPublishNewsDetailVOList() {
        let publishNewsDetailVOList = [];
        for (var i = 0; i < this.publishNewsDetailVOList.length; i++) {
            var publishNewsDetailVO = this.publishNewsDetailVOList[i];
            if (publishNewsDetailVO.contentFormatId === '1') {
                if (publishNewsDetailVO.contentTxt.length > 0) {
                    publishNewsDetailVOList.push(publishNewsDetailVO);
                }
            } else if (publishNewsDetailVO.contentFormatId === '2') {
                if (publishNewsDetailVO.contentBase64.length > 0 || !publishNewsDetailVO.isNews) {
                    publishNewsDetailVOList.push(publishNewsDetailVO);
                }
            } else if (publishNewsDetailVO.contentFormatId === '3') {
                if (!angular.equals(publishNewsDetailVO.contentFile, {}) || !publishNewsDetailVO.isNews) {
                    publishNewsDetailVOList.push(publishNewsDetailVO);
                }
            }
        }
        this.publishNewsDetailVOList.splice(0);
        this.publishNewsDetailVOList = publishNewsDetailVOList;
    }

    checkFormPublishNews() {
        let deferred = this.$q.defer();
        let zcCheckModel = new ZCCheckModel();
        this.$translate('TXT_NEWS_TITLE').then(function (translation) {
            if (this.ZCCheckService.isNotNull(this.publishNewsMaster.newsTitle, translation, 'newsTitle')) {
                zcCheckModel.data = 'NEWS_TITLE';
                deferred.resolve(zcCheckModel);
            } else {
                this.$translate('TXT_NEWS_TYPE').then(function (translation) {
                    if (this.ZCCheckService.isNotNull(this.publishNewsMaster.newsTypeId, translation, 'newsTypeId')) {
                        zcCheckModel.data = 'NEWS_TYPE';
                        deferred.resolve(zcCheckModel);
                    } else {
                        this.$translate('TXT_NEWS_SEGMENT').then(function (translation) {
                            this.ZCCheckService.isNotArrayNull(this.publishNewsDetailVOList, translation, undefined).then(function (result) {
                                if (result) {
                                    zcCheckModel.data = 'NEWS_SEGMENT';
                                    deferred.resolve(zcCheckModel);
                                } else {
                                    zcCheckModel.isRight = true;
                                    deferred.resolve(zcCheckModel);
                                }
                            }.bind(this));
                        }.bind(this));
                    }
                }.bind(this));
            }
        }.bind(this));
        return deferred.promise;
    }


    initEdit(newsId) {
        this.PublishNewsResource.getNewsMaster(newsId).then(function (data) {
                if (data) {
                    angular.extend(this.publishNewsMaster, data);
                } else {
                    this.publishNewsMaster = new PublishNewsMaster();
                }
            }.bind(this), function errorCallback() {
                this.publishNewsMaster = new PublishNewsMaster();
            }.bind(this)
        );

        this.publishNewsDetailVOList.splice(0);

        this.PublishNewsResource.getNewsDetail(newsId).then(function (data) {
                if (data && data.length > 0) {
                    angular.forEach(data, function (item) {
                        let publishNewsDetailVO = new PublishNewsDetailVO();
                        angular.extend(publishNewsDetailVO, item);
                        publishNewsDetailVO.isNew = false;
                        this.publishNewsDetailVOList.push(publishNewsDetailVO);
                    }.bind(this));
                } else {
                    this.publishNewsDetailVOList.push(this.getNewPublishNewsDetailVO());
                }
                console.debug(this.publishNewsDetailVOList);
            }.bind(this), function errorCallback() {
                this.publishNewsDetailVOList.push(this.getNewPublishNewsDetailVO());
            }.bind(this)
        );

    }

    viewNews(){
        if(this.isAdd){
            this.$state.go('main.center.news-add.index.view', {'publishNewsMaster': this.publishNewsMaster, 'publishNewsDetailVOList': this.publishNewsDetailVOList});
        } else {
            this.$state.go('main.center.news-list.index.edit.view', {'publishNewsMaster': this.publishNewsMaster, 'publishNewsDetailVOList': this.publishNewsDetailVOList});
        }
    }

    backPage(){
        this.$scope.newsShow.list = true;
        this.$scope.newsShow.add = false;
        angular.forEach(this.$scope.gridOptions.data, function (value) {
            if(value.newsTitle === '2'){
                value.newsTitle = '2222' ;
            }
        });

    }
}

export default AddController;
