import {NewsStatusEnum, PublishNewsListVO} from '../models/NewsModel';
import {getZCCommonName, getZCIs} from '../../../core/filters/ZCUtilFilter';

class ListController {
    constructor($q, $filter, $scope, $window, $timeout, $modal, $state, $stateParams, $translatePartialLoader, $translate, uiGridConstants, ZCModalService, ZCCommDictResource, PublishNewsResource, languageId, securityUser, securityRole, newsListTitle) {
        'ngInject';
        this.$q = $q;
        this.$scope = $scope;
        this.$window = $window;
        this.$timeout = $timeout;
        this.$modal = $modal;
        this.$state = $state;
        this.$filter = $filter;

        this.languageId = languageId;
        this.languageIdLower = this.languageId.toLowerCase();
        $translatePartialLoader.addPart('publish/news');
        this.$translate = $translate;

        this.uiGridConstants = uiGridConstants;

        this.ZCModalService = ZCModalService;
        this.securityUser = securityUser;
        this.securityRole = securityRole;

        this.pageFlag = $stateParams.pageFlag;
        this.PublishNewsResource = PublishNewsResource;

        ZCCommDictResource.getCommDictByLanguageId('CommNewsType', languageId).then(function (data) {
            this.newsTypeList = data;
        }.bind(this));
        ZCCommDictResource.getCommDictByLanguageId('CommNewsStatus', languageId).then(function (data) {
            this.newsStatusList = data;
        }.bind(this));

        this.newsListTitle = newsListTitle;
        this.initNewsPage();

        this.$scope.newsShow = {
            'list': true,
            'add': false
        };

    }

    initNewsPage() {

        this.publishNewsListVO = new PublishNewsListVO();
        if (this.pageFlag === '1') {
            this.publishNewsListVO.authorName = this.securityUser.userName;
        }
        if (this.pageFlag === '2') {
            this.publishNewsListVO.status = NewsStatusEnum.SUBMITED;
        }

        this.publishNewsListVO.languageId = this.languageId;
        if (this.pageFlag === '1') {
            this.publishNewsListVO.userId = this.securityUser.userId;
        }

        this.columnDefs = [
            {
                name: 'updateDate',
                field: 'updateDate',
                cellFilter: 'date:"yyyy-MM-dd HH:mm"',
                displayName: this.newsListTitle.TXT_NEWS_LIST_DATE,
                width: 140,
                enableColumnResizing: false
            },
            {
                name: 'newsTitle',
                field: 'newsTitle',
                displayName: this.newsListTitle.TXT_NEWS_LIST_TITLE,
                width: '40%'
            },
            {
                name: 'newsTypeId',
                field: 'newsTypeId',
                displayName: this.newsListTitle.TXT_NEWS_LIST_TYPE,
                cellTemplate: '<div class="ui-grid-cell-contents">{{grid.appScope.getNewsTypeName(row.entity)}}</div>'
            },
            {
                name: 'authorName',
                field: 'authorName',
                displayName: this.newsListTitle.TXT_NEWS_LIST_AUTHOR
            },
            {
                name: 'homeHeaderFlag',
                field: 'homeHeaderFlag',
                displayName: this.newsListTitle.TXT_NEWS_LIST_SHOW_IN_HOME_HEADER,
                cellTemplate: '<div class="ui-grid-cell-contents text-center" > <span ng-class="grid.appScope.getNewsHeaderFlag(row.entity.homeHeaderFlag)"></span></div>'
            },
            {
                name: 'typeHeaderFlag',
                field: 'typeHeaderFlag',
                displayName: this.newsListTitle.TXT_NEWS_LIST_SHOW_IN_TYPE_HEADER,
                cellTemplate: '<div class="ui-grid-cell-contents text-center" ><span ng-class="grid.appScope.getNewsHeaderFlag(row.entity.typeHeaderFlag)"></span></div>'
            },
            {
                name: 'newsStatus',
                field: 'status',
                displayName: this.newsListTitle.TXT_NEWS_LIST_STATUS,
                width: 100,
                pinnedRight: true,
                cellTemplate: '<div class="ui-grid-cell-contents" >{{grid.appScope.getNewsStatusName(row.entity.status)}}</div>'
            },
            {
                name: 'process',
                field: '',
                displayName: this.newsListTitle.TXT_ZC_COMMON_PROCESS,
                width: 110,
                pinnedRight: true,
                cellTemplate: '<div class="ui-grid-cell-contents row" ng-if="grid.appScope.getPageInfo()">' +
                '<a class="col-md-2 fa fa-eye zc-view" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_VIEW\')}}" ng-click="grid.appScope.viewNews(row.entity)"></a>' +
                '<a ng-if="grid.appScope.getPageInfoForSubmit(row.entity)" class="col-md-2 fa fa-pencil-square-o zc-edit" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_EDIT\')}}" ng-click="grid.appScope.editNews(row.entity)"></a>' +
                '<span ng-if="!grid.appScope.getPageInfoForSubmit(row.entity)" class="col-md-2 fa fa-pencil-square-o zc-disabled" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_EDIT\')}}" ></span>' +
                '<a ng-if="grid.appScope.getPageInfoForSubmit(row.entity)" class="col-md-2 fa fa-mars-stroke-v zc-submit" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_SUBMIT\')}}" ng-click="grid.appScope.changeNewsStatus(row.entity, grid.appScope.getProcessStatus(\'SUBMITED\'), \'\')"></a>' +
                '<span ng-if="!grid.appScope.getPageInfoForSubmit(row.entity)" class="col-md-2 fa fa-mars-stroke-v zc-disabled" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_SUBMIT\')}}" ></span>' +
                '<a ng-if="grid.appScope.getPageInfoForSubmit(row.entity)" class="col-md-2 fa fa-trash zc-remove" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_REMOVE\')}}" ng-click="grid.appScope.deleteNews(row.entity)"></a>' +
                '<span ng-if="!grid.appScope.getPageInfoForSubmit(row.entity)" class="col-md-2 fa fa-trash zc-disabled" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_REMOVE\')}}" ></span>' +
                '</div>' +
                '<div class="ui-grid-cell-contents row" ng-if="!grid.appScope.getPageInfo()">' +
                '<a class="col-md-2 fa fa-eye zc-view" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_VIEW\')}}" ng-click="grid.appScope.viewNews(row.entity)"></a>' +
                '<a ng-if="grid.appScope.getPageInfoForCheck(row.entity)" class="col-md-2 fa fa-check zc-submit" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_PASS\')}}" ng-click="grid.appScope.changeNewsStatus(row.entity, grid.appScope.getProcessStatus(\'PASS\'), \'\')"></a>' +
                '<span ng-if="!grid.appScope.getPageInfoForCheck(row.entity)" class="col-md-2 fa fa-check zc-disabled" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_PASS\')}}" ></span>' +
                '<a ng-if="grid.appScope.getPageInfoForCheck(row.entity)" class="col-md-2 fa fa-times zc-remove" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_NOPASS\')}}" ng-click="grid.appScope.changeNewsStatusNoPass(row.entity)"></a>' +
                '<span ng-if="!grid.appScope.getPageInfoForCheck(row.entity)" class="col-md-2 fa fa-times zc-disabled" title="{{grid.appScope.getProcessTitle(\'TXT_NEWS_LIST_NOPASS\')}}" ></span>' +
                '</div>'
            }
        ];

        this.$scope.gridOptions = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            modifierKeysToMultiSelect: false,
            noUnselect: true,
            enableHorizontalScrollbar: this.uiGridConstants.scrollbars.WHEN_NEEDED,
            enableVerticalScrollbar: this.uiGridConstants.scrollbars.NEVER,
            totalItems: 0,
            useExternalPagination: true,
            headerRowHeight: 30,
            footerRowHeight: 55,
            rowHeight: 30,
            paginationPageSizes: [],
            paginationPageSize: 0,
            paginationCurrentPage: 1,
            columnDefs: this.columnDefs,
            onRegisterApi: function(gridApi){
                this.$scope.gridApi = gridApi;
                this.$scope.gridApi.pagination.on.paginationChanged( this.$scope, function( currentPage, pageSize){
                    this.publishNewsListVO.currentPage = currentPage;
                    this.publishNewsListVO.pageSize = pageSize;
                    this.getNewsPage();
                }.bind(this));
            }.bind(this)
        };

        this.initGridRows();
        this.initGridInfoAfter();
        this.getNewsPage();


        this.$scope.getNewsTypeName = function(news){
            return getZCCommonName(news.newsTypeId, this.newsTypeList);
        }.bind(this);

        this.$scope.getNewsHeaderFlag = function(headerFlag){
            let is = getZCIs(headerFlag);
            if (is) {
                return 'fa fa-star';
            }
            return '';
        };

        this.$scope.getNewsStatusName = function (status) {
            for(var i = 0; i < this.newsStatusList.length; i++) {
                var item = this.newsStatusList[i];
                if(item.id.code === status){
                    return item.name;
                }
            }
            return '';
        }.bind(this);

        this.$scope.getPageInfo = function () {
            if(this.pageFlag === '1'){
                return true;
            }
            return false;
        }.bind(this);

        this.$scope.getPageInfoForCheck = function (news) {
            if(this.pageFlag === '2' && news.status === NewsStatusEnum.SUBMITED ){
                return true;
            }
            return false;
        }.bind(this);

        this.$scope.getPageInfoForSubmit = function (news) {
            if(this.pageFlag === '1' && (news.status === NewsStatusEnum.SAVED || news.status === NewsStatusEnum.NO_PASS)){
                return true;
            }
            return false;
        }.bind(this);

        this.$scope.getProcessTitle = function (flag) {
            return this.newsListTitle[flag];
        }.bind(this);

        this.$scope.editNews = function (news) {
            this.$scope.newsShow.list = false;
            this.$scope.newsShow.add = true;
            this.$state.go('main.center.news-list.index.edit', {'newsId': news.newsId});
        }.bind(this);

        this.$scope.viewNews = function (news) {
            this.$state.go('main.center.news-list.index.view', {'newsId': news.newsId});
        }.bind(this);


        this.$scope.initGridHeight = function () {
            return this.initGridRows();
        }.bind(this);

    }



    initGridRows() {
        let height = this.$window.innerHeight - 170;
        var rowNum = Math.ceil((height - this.$scope.gridOptions.headerRowHeight - this.$scope.gridOptions.footerRowHeight - this.$scope.gridOptions.rowHeight) / this.$scope.gridOptions.rowHeight);
        this.$scope.gridOptions.paginationPageSize = rowNum;
        this.$scope.gridOptions.paginationPageSizes.splice(0);
        this.$scope.gridOptions.paginationPageSizes.push(rowNum);
        this.$scope.gridOptions.paginationPageSizes.push(rowNum * 2);
        this.$scope.gridOptions.paginationPageSizes.push(rowNum * 4);
        return height;
    }


    initGridInfoAfter() {
        this.publishNewsListVO.currentPage = this.$scope.gridOptions.paginationCurrentPage;
        this.publishNewsListVO.pageSize = this.$scope.gridOptions.paginationPageSize;
        this.publishNewsListVO.sortColumnName = 'updateDate';
        this.publishNewsListVO.sortDirection = 'desc';
    }

    searchNews() {
        this.$scope.gridOptions.pagingCurrentPage = 1;
        this.publishNewsListVO.currentPage = this.$scope.gridOptions.pagingCurrentPage;
        this.publishNewsListVO.pageSize = this.$scope.gridOptions.pagingPageSize;
        this.getNewsPage();
    }

    getNewsPage() {
        this.PublishNewsResource.getNewsByPage(this.publishNewsListVO).then(function (data) {
                this.$scope.gridOptions.data = data.data;
                this.$scope.gridOptions.totalItems = data.totalItems;

            }.bind(this), function errorCallback(response) {
                this.ZCModalService.showError(response.data);
            }.bind(this)
        );
    }




}

export default ListController;
