/// <reference path="../services/site-app-list-manager.js" />
/// <reference path="../services/site-list-mapping.js" />
/// <reference path="../services/common-functions.js" />
/// <reference path="../services/global-app-list-manager.js" />
/// <reference path="../services/master-app-list-manager.js" />

var app = angular.module('app', []);
app.controller('ltiAppHostPageCtrl', ['$scope', function ($scope) {
    
    var siteListMgr = new siteAppListMgr();
    var helper = new commons();

    $scope.vm = {};
    $scope.fn = {};
    $scope.vm.appWebUrl = helper.getAppWebUrl();


    var appId = helper.getQueryStringParameter("appId");

    if (appId) {

        siteListMgr.getItems($scope.vm.appWebUrl, function(iten))


    }


}]);