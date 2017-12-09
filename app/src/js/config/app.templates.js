angular.module('templates', []).run(['$templateCache', function($templateCache) {$templateCache.put('components/list-errors.html','<ul class="error-messages" ng-show="$ctrl.errors">\n  <div ng-repeat="(field, errors) in $ctrl.errors">\n    <li ng-repeat="error in errors">\n      {{field}} {{error}}\n    </li>\n  </div>\n</ul>\n');
$templateCache.put('home/home.html',' <div class="home-page">\n\n\n  <div class="container page">\n    <div class="row">\n\n\n      <!-- Main view - contains tabs & article list -->\n      <div class="col-md-12">\n<!--         \n        <input type="text" ng-model="$ctrl.slug">\n        <button ng-click="$ctrl.getResult()">Submit</button> -->\n\n        <label class="btn btn-primary">\n          <input type="file" id="importFile" on-file-change="$ctrl.fileChanged($event, files)" class="ng-hide">\n          <i class="mdi mdi-camera"></i> \n          <span>Tira fotinha</span>\t\t\t\t\t\t\t\t\t\t\n        </label>\t\t\t\t\t\t\t\t\t\n\n        <pre>\n          {{ $ctrl.result.data }} {{ $ctrl.pairing.name }}\n        </pre>\n\n      </div>\n\n      <!-- End the row & container divs -->\n    </div>\n  </div>\n\n</div>\n');
$templateCache.put('layout/app-view.html','<app-header></app-header>\n\n<div ui-view></div>\n\n<app-footer></app-footer>\n');
$templateCache.put('layout/footer.html','<footer>\n  <div class="container">\n    <a class="logo-font" ui-sref="app.home" ng-bind="::$ctrl.appName | lowercase"></a>\n    <span class="attribution">\n      &copy; {{::$ctrl.date | date:\'yyyy\'}}\n    </span>\n  </div>\n</footer>\n');
$templateCache.put('layout/header.html','<nav class="navbar navbar-light">\n  <div class="container">\n\n    <a class="navbar-brand"\n      ui-sref="app.home"\n      ng-bind="::$ctrl.appName | lowercase">\n    </a>\n\n    <!-- Show this for logged out users -->\n    <ul class="nav navbar-nav pull-xs-right">\n\n      <li class="nav-item">\n        <a class="nav-link"\n          ui-sref-active="active"\n          ui-sref="app.home">\n          Home\n        </a>\n      </li>\n\n    </ul>\n\n  </div>\n</nav>\n');
$templateCache.put('components/buttons/favorite-btn.html','<button class="btn btn-sm"\n  ng-class="{ \'disabled\' : $ctrl.isSubmitting,\n              \'btn-outline-primary\': !$ctrl.article.favorited,\n              \'btn-primary\': $ctrl.article.favorited }"\n  ng-click="$ctrl.submit()">\n  <i class="ion-heart"></i> <ng-transclude></ng-transclude>\n</button>\n');
$templateCache.put('components/buttons/follow-btn.html','<button\n  class="btn btn-sm action-btn"\n  ng-class="{ \'disabled\': $ctrl.isSubmitting,\n              \'btn-outline-secondary\': !$ctrl.user.following,\n              \'btn-secondary\': $ctrl.user.following }"\n  ng-click="$ctrl.submit()">\n  <i class="ion-plus-round"></i>\n  &nbsp;\n  {{ $ctrl.user.following ? \'Unfollow\' : \'Follow\' }} {{ $ctrl.user.username }}\n</button>\n');
$templateCache.put('components/article-helpers/article-list.html','<article-preview\n  article="article"\n  ng-repeat="article in $ctrl.list">\n</article-preview>\n\n<div class="article-preview"\n  ng-hide="!$ctrl.loading">\n  Loading articles...\n</div>\n\n<div class="article-preview"\n  ng-show="!$ctrl.loading && !$ctrl.list.length">\n  No articles are here... yet.\n</div>\n\n<list-pagination\n total-pages="$ctrl.listConfig.totalPages"\n current-page="$ctrl.listConfig.currentPage"\n ng-hide="$ctrl.listConfig.totalPages <= 1">\n</list-pagination>\n');
$templateCache.put('components/article-helpers/article-meta.html','<div class="article-meta">\n  <a ui-sref="app.profile.main({ username:$ctrl.article.author.username })">\n    <img ng-src="{{$ctrl.article.author.image}}" />\n  </a>\n\n  <div class="info">\n    <a class="author"\n      ui-sref="app.profile.main({ username:$ctrl.article.author.username })"\n      ng-bind="$ctrl.article.author.username">\n    </a>\n    <span class="date"\n      ng-bind="$ctrl.article.createdAt | date: \'longDate\' ">\n    </span>\n  </div>\n\n  <ng-transclude></ng-transclude>\n</div>\n');
$templateCache.put('components/article-helpers/article-preview.html','<div class="article-preview">\n  <article-meta article="$ctrl.article">\n    <favorite-btn\n      article="$ctrl.article"\n      class="pull-xs-right">\n      {{$ctrl.article.favoritesCount}}\n    </favorite-btn>\n  </article-meta>\n\n  <a ui-sref="app.article({ slug: $ctrl.article.slug })" class="preview-link">\n    <h1 ng-bind="$ctrl.article.title"></h1>\n    <p ng-bind="$ctrl.article.description"></p>\n    <span>Read more...</span>\n    <ul class="tag-list">\n      <li class="tag-default tag-pill tag-outline"\n        ng-repeat="tag in $ctrl.article.tagList">\n        {{tag}}\n      </li>\n    </ul>\n  </a>\n</div>\n');
$templateCache.put('components/article-helpers/list-pagination.html','<nav>\n  <ul class="pagination">\n\n    <li class="page-item"\n      ng-class="{active: pageNumber === $ctrl.currentPage }"\n      ng-repeat="pageNumber in $ctrl.pageRange($ctrl.totalPages)"\n      ng-click="$ctrl.changePage(pageNumber)">\n\n      <a class="page-link" href="">{{ pageNumber }}</a>\n\n    </li>\n\n  </ul>\n</nav>\n');}]);