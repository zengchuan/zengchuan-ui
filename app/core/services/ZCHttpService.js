import {ZC_CONST} from '../consts/ZCConst';

class ZCHttpService {
    constructor($q, $http) {
        'ngInject';
        this.$q = $q;
        this.$http = $http;
    }

    getUrl(url){
        if(url.substr(0, 1) === '/'){
            return ZC_CONST.BASE_API_URL + url;
        }
        return ZC_CONST.BASE_API_URL + '/' + url;
    }

    get(url) {
        url = this.getUrl(url);
        var deferred = this.$q.defer();
        this.$http.get(url).success(function(data) {
            deferred.resolve(data);
        }).error(function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    post(url, data, config){
        url = this.getUrl(url);
        var deferred = this.$q.defer();
        this.$http.post(url, data, config).success(function(data) {
            deferred.resolve(data);
        }).error(function(err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

}

export default ZCHttpService;
