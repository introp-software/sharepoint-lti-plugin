/// <reference path="../services/site-app-list-manager.js" />
/// <reference path="../../../angular.js" />
/// <reference path="../services/site-list-mapping.js" />
var app = angular.module("app", []);
app.controller('defaultPageCtrl', ['$scope', function ($scope) {
    
    var appListMgr = new siteAppListMgr();
    var helpers = new commons();

    var listId = "";

    $scope.vm = {};
    $scope.vm.appList = [];
    $scope.vm.loadingData = true;
    $scope.vm.err = "";

    $scope.fn = {};

    var vm = $scope.vm;
    var fn = $scope.fn;

    vm.appWebUrl = helpers.getAppWebUrl();
    vm.hostWebUrl = helpers.getHostWebUrl();

    var hostWebUrl = helpers.getHostWebUrl();
    appListMgr.getItems(hostWebUrl, function (data, err) {
        if (err) {
            vm.err = err;
        }
        else if (data) {
            vm.appList = data;
        }
        vm.loadingData = false;
        $scope.$apply();
    });

}]);


