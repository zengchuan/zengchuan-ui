class ZCFileService {
    constructor($q) {
        'ngInject';
        this.$q = $q;
    }

    onLoad(reader, deferred) {
        return function () {
            deferred.resolve(reader.result);
        };
    }

    onError(reader, deferred) {
        return function () {
            deferred.reject(reader.result);
        };
    }

    onProgress() {
        return function () {

        };
    }

    getReader(deferred) {
        let reader = new FileReader();
        reader.onload = this.onLoad(reader, deferred);
        reader.onerror = this.onError(reader, deferred);
        reader.onprogress = this.onProgress();
        return reader;
    }

    readAsDataURL(file) {
        let deferred = this.$q.defer();

        let reader = this.getReader(deferred);
        reader.readAsDataURL(file);

        return deferred.promise;
    }

}

export default ZCFileService;
