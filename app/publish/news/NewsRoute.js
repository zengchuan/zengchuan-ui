'use strict';

import content from '../../security/main/views/content.html!text';
import add from './views/add.html!text';
import list from './views/list.html!text';
import modalCommon from '../../core/templates/views/zc-modal-common.html!text';
import view from './views/view.html!text';
import {NewsListTitle} from './models/NewsModel';

function NewsRoute($stateProvider) {
    'ngInject';
    var modal = null;
    return $stateProvider
        .state({
            name: 'main.center.news-add',
            url: '/news/add',
            views: {
                'publish-news-add': {
                    controller: 'ContentController',
                    template: content
                    //template: '../../security/main/views/content.html'
                }
            },
            deepStateRedirect: true,
            sticky: true
        })
        .state({
            name: 'main.center.news-add.index',
            url: '/index',
            controller: 'NewsAddController as newsAdd',
            template: add,
            resolve: {
                languageId: ['ZCLanguageService', ZCLanguageService => ZCLanguageService.get()],
                securityUser: ['ZCLoginService', ZCLoginService => ZCLoginService.getSecurityUser()],
                securityRole: ['ZCLoginService', ZCLoginService => ZCLoginService.getSecurityRole()],
                isAdd: function () {
                    return true;
                },
                newsId: function () {
                    return '';
                }
            }
        })
        .state({
            name: 'main.center.news-list',
            url: '/news/list/:pageFlag',
            views: {
                'publish-news-list': {
                    controller: 'ContentController',
                    template: content
                }
            },
            deepStateRedirect: true,
            sticky: true
        })
        .state({
            name: 'main.center.news-list.index',
            url: '/:pageFlag',
            controller: 'NewsListController as newsList',
            template: list,
            resolve: {
                languageId: ['ZCLanguageService', ZCLanguageService => ZCLanguageService.get()],
                securityUser: ['ZCLoginService', ZCLoginService => ZCLoginService.getSecurityUser()],
                securityRole: ['ZCLoginService', ZCLoginService => ZCLoginService.getSecurityRole()],
                newsListTitle: ['$translate', '$translatePartialLoader', '$q', '$rootScope', function($translate, $translatePartialLoader, $q, $rootScope){
                    var deferred = $q.defer();
                    $translatePartialLoader.deletePart('publish/news');
                    $translatePartialLoader.addPart('publish/news');
                    $rootScope.$on('$translateChangeSuccess', function() {
                        if($translatePartialLoader.isPartAvailable('publish/news')){
                            getNewsListTitle($q, $translate).then(function(data){
                                deferred.resolve(data);
                            });
                        }
                    });
                    return deferred.promise;
                }]
            }
        })
        .state({
            abstract: true,
            name: 'main.center.news-add.index.modal',
            parent: 'main.center.news-add.index',
            url: '',
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                modal = $modal.open({
                    template: modalCommon,
                    controller: 'ZCModalCommonController as zcmcn',
                    backdrop: 'static',
                    size: 'lg'
                });
                modal.result.finally(function() {
                    modal = null;
                    $state.go('main.center.news-add.index');
                });
            }],
            onExist: function(){
                if(modal){
                    modal = null;
                }
            }
        })
        .state({
            name: 'main.center.news-add.index.view',
            parent: 'main.center.news-add.index.modal',
            url: '/view',
            params: {publishNewsMaster: null, publishNewsDetailVOList: null},
            views: {
                'modal@': {
                    template: view,
                    controller: 'NewsViewController as newsView',
                    resolve: {
                        publishNewsMaster: ['$stateParams', $stateParams => $stateParams.publishNewsMaster],
                        publishNewsDetailVOList: ['$stateParams', $stateParams => $stateParams.publishNewsDetailVOList]
                    }
                }
            }
        })
        .state({
            name: 'main.center.news-list.index.edit',
            url: '/edit/:newsId',
            controller: 'NewsAddController as newsAdd',
            template: add,
            resolve: {
                languageId: ['ZCLanguageService', ZCLanguageService => ZCLanguageService.get()],
                securityUser: ['ZCLoginService', ZCLoginService => ZCLoginService.getSecurityUser()],
                securityRole: ['ZCLoginService', ZCLoginService => ZCLoginService.getSecurityRole()],
                isAdd: function () {
                    return false;
                },
                newsId: ['$stateParams', $stateParams => $stateParams.newsId]
            }
        })
        .state({
            name: 'main.center.news-list.index.edit.modal',
            url: '',
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                var modal = $modal.open({
                    template: modalCommon,
                    controller: 'ZCModalCommonController as zcmcn',
                    backdrop: 'static',
                    size: 'lg'
                });
                modal.result.finally(function() {
                    modal = null;
                    $state.go('main.center.news-list.index.edit');
                });
            }]
        })
        .state({
            name: 'main.center.news-list.index.edit.view',
            parent: 'main.center.news-list.index.edit.modal',
            url: '/view',
            params: {publishNewsMaster: null, publishNewsDetailVOList: null},
            views: {
                'modal@': {
                    template: view,
                    controller: 'NewsViewController as newsView',
                    resolve: {
                        publishNewsMaster: ['$stateParams', $stateParams => $stateParams.publishNewsMaster],
                        publishNewsDetailVOList: ['$stateParams', $stateParams => $stateParams.publishNewsDetailVOList]
                    }
                }
            }
        })
        .state({
            name: 'main.center.news-list.index.modal',
            url: '',
            onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                var modal = $modal.open({
                    template: modalCommon,
                    controller: 'ZCModalCommonController as zcmcn',
                    backdrop: 'static',
                    size: 'lg'
                });
                modal.result.finally(function() {
                    modal = null;
                    $state.go('main.center.news-list.index');
                });
            }]
        })
        .state({
            name: 'main.center.news-list.index.view',
            parent: 'main.center.news-list.index.modal',
            url: '/:newsId',
            views: {
                'modal@': {
                    template: view,
                    controller: 'NewsViewController as newsView',
                    resolve: {
                        publishNewsMaster: ['$stateParams', 'PublishNewsResource', function($stateParams, PublishNewsResource){
                            return PublishNewsResource.getNewsMaster($stateParams.newsId);
                        }],
                        publishNewsDetailVOList:  ['$stateParams', 'PublishNewsResource', function($stateParams, PublishNewsResource){
                            return PublishNewsResource.getNewsDetail($stateParams.newsId);
                        }]
                    }
                }
            }
        })
        ;


}

function getNewsListTitle($q, $translate){
    var deferred = $q.defer();
    let newsListTitle = new NewsListTitle();

    $translate('TXT_NEWS_LIST_TITLE').then(function (translation) {
        newsListTitle.TXT_NEWS_LIST_TITLE = translation;
        $translate('TXT_NEWS_LIST_DATE').then(function (translation) {
            newsListTitle.TXT_NEWS_LIST_DATE = translation;
            $translate('TXT_NEWS_LIST_TYPE').then(function (translation) {
                newsListTitle.TXT_NEWS_LIST_TYPE = translation;
                $translate('TXT_NEWS_LIST_AUTHOR').then(function (translation) {
                    newsListTitle.TXT_NEWS_LIST_AUTHOR = translation;
                    $translate('TXT_NEWS_LIST_SHOW_IN_HOME_HEADER').then(function (translation) {
                        newsListTitle.TXT_NEWS_LIST_SHOW_IN_HOME_HEADER = translation;
                        $translate('TXT_NEWS_LIST_SHOW_IN_TYPE_HEADER').then(function (translation) {
                            newsListTitle.TXT_NEWS_LIST_SHOW_IN_TYPE_HEADER = translation;
                            $translate('TXT_NEWS_LIST_STATUS').then(function (translation) {
                                newsListTitle.TXT_NEWS_LIST_STATUS = translation;
                                $translate('TXT_NEWS_LIST_PROCESS').then(function (translation) {
                                    newsListTitle.TXT_NEWS_LIST_PROCESS = translation;
                                    $translate('TXT_NEWS_LIST_VIEW').then(function (translation) {
                                        newsListTitle.TXT_NEWS_LIST_VIEW = translation;
                                        $translate('TXT_NEWS_LIST_EDIT').then(function (translation) {
                                            newsListTitle.TXT_NEWS_LIST_EDIT = translation;
                                            $translate('TXT_NEWS_LIST_REMOVE').then(function (translation) {
                                                newsListTitle.TXT_NEWS_LIST_REMOVE = translation;
                                                $translate('TXT_NEWS_LIST_SUBMIT').then(function (translation) {
                                                    newsListTitle.TXT_NEWS_LIST_SUBMIT = translation;
                                                    $translate('TXT_NEWS_LIST_PASS').then(function (translation) {
                                                        newsListTitle.TXT_NEWS_LIST_PASS = translation;
                                                        $translate('TXT_NEWS_LIST_NOPASS').then(function (translation) {
                                                            newsListTitle.TXT_NEWS_LIST_NOPASS = translation;
                                                            $translate('TXT_NEWS_LIST_NOPASS_REASON').then(function (translation) {
                                                                newsListTitle.TXT_NEWS_LIST_NOPASS_REASON = translation;
                                                                deferred.resolve(newsListTitle);
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
    return deferred.promise;
}

export default NewsRoute;
