export default class Eye {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
    }

    submit(file) {
        swal(
            'Arquivo enviado!',
            'Analisando!',
            'warning'
          )
        let deferred = this._$q.defer();
        
        if (!file) {
            deferred.reject("File is empty");
            return deferred.promise;
        }

        let fd = new FormData();
        fd.append('file', file);

        this._$http({
			url: this._AppConstants.api + '/food',
            method: 'POST',
            headers: {
                'enctype': 'multipart/form-data',
                'Content-Type': undefined
            },
			data: fd
		}).then(
            (res) => deferred.resolve(res),
            (err) => deferred.reject(err)
        );

        return deferred.promise;
    }
}