class HomeCtrl {
  constructor( AppConstants, $scope, Pairings, $state, Eye) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.Pairings = Pairings;
    this._$scope = $scope;
    this._$state = $state;
    this.Eye = Eye;
    this.currentFile = "";
  }

  _prettyName(name) {
    let s = name.replace(/_/g, " ")
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  fileChanged(event,files) {
    
    let file = files[0]

    this.currentFile = file;
    
		this.Eye.submit(file).then(
      (result) => {
        swal(
          'Prontinho!',
          'Análise concluída!',
          'success'
        )
        this.result = result;
        this.resultName = this._prettyName(result.data[0][1]);
        this.Pairings.get(result.data[0][1]).then(
          (pairing) => this.pairing = pairing,
          (err) => this._$state.go('app.home')
        )
      },
      (err) => this._$state.go('app.home')
    );
	}
}

export default HomeCtrl;
