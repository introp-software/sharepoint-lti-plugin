/// <reference path="../services/site-app-list-manager.js" />
/// <reference path="../services/site-list-mapping.js" />
/// <reference path="../services/common-functions.js" />
/// <reference path="../services/global-app-list-manager.js" />
/// <reference path="../services/master-app-list-manager.js" />
/// <reference path="../services/user-permission.js" />
/// <reference path="../services/lti-app-launcher.js" />
var app = angular.module('app', []);
app.controller('ltiAppHostPageCtrl', ['$scope', function ($scope) {
    
    var siteListMgr = new siteAppListMgr();
    var helper = new commons();

    $scope.vm = {};
    $scope.fn = {};

    $scope.vm.hasEditPermission = false;
    $scope.vm.userInfo = null;

    $scope.vm.hostWebUrl = helper.getHostWebUrl();
    $scope.vm.appWebUrl = helper.getAppWebUrl();

    $scope.vm.homePageUrl = "../pages/Default.aspx?SPAppWebUrl=" +
                            encodeURIComponent($scope.vm.appWebUrl) +
                            "&SPHostUrl=" +
                            encodeURIComponent($scope.vm.hostWebUrl);

    var appId = helper.getQueryStringParameter("appId");

    if (appId) {
        $(document).on("userInfoLoaded", function (event, data) {
            $scope.vm.userInfo = data.userInfo;
            $scope.fn.determineUserPermission(data.userInfo);
        });
    }

    $scope.fn.determineUserPermission = function (userInfo) {
        var permLoader = new userPermissionLoader();
        permLoader.hasManagePermission($scope.vm.hostWebUrl, user, function (hasPerm, err) {
            if (err) {
                $scope.vm.hasEditPermission = false;
            }
            else {
                $scope.vm.hasEditPermission = hasPerm;
            }
            $scope.fn.launchApp();
            $scope.$apply();
        });
    }

    $scope.fn.launchApp = function () {
        var role = $scope.vm.hasEditPermission == true ? "Instructor" : "Student";
        var user = new UserInfo($scope.vm.userInfo.get_title(), "", $scope.vm.userInfo.get_email(), role);
        siteListMgr.getItemById(appId, $scope.vm.hostWebUrl, function (item, err) {
            if (item) {
                var appLauncher = new ltiAppLauncher();
                appLauncher.launch(item, "fmrPlaceholder", "iFrmApp", user);
            }
            else {
                alert("Item not found");
            }
        });
    }

}]);