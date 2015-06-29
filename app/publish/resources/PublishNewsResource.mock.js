'use strict';


function PublishNewsResourceMock($httpBackend) {
    'ngInject';

    $httpBackend.whenPOST(/\/publish-news\/add/)
        .respond( () => {
            return [200, {}];
        });

    $httpBackend.whenGET(/\/publish-news\/news-detail/)
        .respond( () => {
            return [200, {}];
        });

}

export default PublishNewsResourceMock;


