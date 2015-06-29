import PublishModule from './PublishModule';
import PublishNewsResourceMock from './resources/PublishNewsResource.mock';

export default angular.module('zc.publish.mock', [PublishModule.name])
    .run(PublishNewsResourceMock)
    ;