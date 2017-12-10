class HomeCtrl {
  constructor( AppConstants, $scope, Pairings, $state, Eye) {
    'ngInject';

    this.appName = AppConstants.appName;
    this.Pairings = Pairings;
    this._$scope = $scope;
    this.result= "Vinho loco"
    this._$state = $state;
    this.Eye = Eye;
    this.currentFile = "";

  }

  getResult() {
    console.log("GETRESULT")
    this.Pairings.get(this.slug).then(
      (pairing) => this.result = pairing,
      (err) => this._$state.go('app.home')
    )
  }

  fileChanged(event,files) {
    
    let file = files[0];

    console.log(file);

    this.currentFile = file;
    
		this.Eye.submit(file).then(
      (result) => {
        this.result = result;
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
