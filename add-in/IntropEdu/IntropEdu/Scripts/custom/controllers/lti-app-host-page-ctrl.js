/// <reference path="../services/site-app-list-manager.js" />
/// <reference path="../services/site-list-mapping.js" />
/// <reference path="../services/common-functions.js" />
/// <reference path="../services/global-app-list-manager.js" />
/// <reference path="../services/master-app-list-manager.js" />
/// <reference path="../services/lti-app-launcher.js" />
var app = angular.module('app', []);
app.controller('ltiAppHostPageCtrl', ['$scope', function ($scope) {
    
    var siteListMgr = new siteAppListMgr();
    var helper = new commons();

    $scope.vm = {};
    $scope.fn = {};
    $scope.vm.hostWebUrl = helper.getHostWebUrl();


    var appId = helper.getQueryStringParameter("appId");

    if (appId) {
        siteListMgr.getItemById(appId, $scope.vm.hostWebUrl, function (item, err) {
            if (item) {
                var user = new UserInfo("Ram", "Anam", "ramanamgeo@gmail.com","Instructor");
                var appLauncher = new ltiAppLauncher();
                appLauncher.launch(item, "fmrPlaceholder", "iFrmApp", user);
            }
            else {
                alert("Item not found");
            }
        });
    }


}]);