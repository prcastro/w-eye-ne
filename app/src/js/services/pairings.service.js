export default class Pairings {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
  
  
    }

    get(slug=" ") {
        let deferred = this._$q.defer();
        
        if (!slug.replace(" ", "")) {
            deferred.reject("Article slug is empty");
            return deferred.promise;
        }
    
        this._$http({
            url: this._AppConstants.api + '/wine/' + slug,
            method: 'GET'
        }).then(
            (res) => deferred.resolve(res.data),
            (err) => deferred.reject(err)
        );
    
        return deferred.promise;
    }
}