import newsModule from './news/NewsModule';
import PublishNewsResource from './resources/PublishNewsResource';

export default angular.module('zc.publish', [
    newsModule.name
])
.service('PublishNewsResource', PublishNewsResource)
;