/// <reference path="../services/common-functions.js" />
/// <reference path="../services/global-app-list-manager.js" />
/// <reference path="../services/models.js" />
/// <reference path="../services/oauth-signature.js" />
/// <reference path="../services/lti-app-launcher.js" />
/// <reference path="../services/user-permission.js" />

var app = angular.module('app', []);
app.controller('ltiAppWebPartCtrl', ['$scope', function ($scope) {

    $scope.vm = {};
    $scope.vm.hasEditPermission = false;
    $scope.vm.errMsg = null;
    $scope.vm.userInfo = null;
    $scope.vm.isToolConfigured = true;

    $scope.fn = {};

    var helpers = new commons();
    var toolName = helpers.getQueryStringParameter("toolName");
    var key = helpers.getQueryStringParameter("consumerKey");
    var secret = helpers.getQueryStringParameter("secret");

    var hostWebUrl = helpers.getHostWebUrl();
    var appWebUrl = helpers.getAppWebUrl();

    //Get  Form Digest Value
    function getFormDigest(cb) {
        var appweburl = decodeURIComponent(appWebUrl);
        $.ajax({
            url: appweburl + "/_api/contextinfo",
            type: "POST",
            headers: {
                "accept": "application/json;odata=verbose",
                "contentType": "text/xml"
            },
            success: function (data) {
                requestdigest = data;
                var formDigest = data.d.GetContextWebInformation.FormDigestValue;
                $("#__REQUESTDIGEST").val(formDigest);
                cb();
            },
            error: function (err) {
                alert(JSON.stringify(err));
            }
        });
    }

    $(document).on("userInfoLoaded", function (event, data) {
        $scope.fn.determineUserPermission(data.userInfo);
    });

    $scope.fn.determineUserPermission = function (userInfo) {
        $scope.vm.userInfo = userInfo;
        var permLoader = new userPermissionLoader();
        permLoader.hasManagePermission(hostWebUrl, userInfo, function (hasPerm, err) {
            if (err) {
                $scope.vm.hasEditPermission = false;
            }
            else {
                $scope.vm.hasEditPermission = hasPerm;
            }

            if (toolName == null || toolName == "" || toolName == "-") {
                $scope.vm.isToolConfigured = false;
            }
            else {
                getFormDigest(function () {
                    loadTool();
                });
            }
            $scope.$apply();
        });
    }

    function loadTool() {
        getToolByName(toolName, function (toolInfo, err) {
            if (err) {
                $scope.vm.errMsg = err;
                $scope.$apply();
            }
            else {
                launchTool(toolInfo);
            }
        });
    }

    function launchTool(toolInfo) {
        var launcher = new ltiAppLauncher();
        toolInfo.consumerKey = key;
        toolInfo.consumerSecret = secret;
        var role = $scope.vm.hasEditPermission == true ? "instructor" : "learner";
        var user = new UserInfo($scope.vm.userInfo.get_title(), "", $scope.vm.userInfo.get_email(), role);
        launcher.launch(toolInfo, "fmrPlaceholder", "ifrm_tool1", user);
    }

    function getToolByName(toolName, cb) {
        var globalListMgr = new globalAppListMgr();
        globalListMgr.getAll(function (data, err) {
            if (err) {
                cb(null, err);
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    var toolAtIndex = data[i];
                    if (toolAtIndex.name == toolName) {
                        cb(toolAtIndex, null);
                        return;
                    }
                }
            }
            cb(null, "Tool with " + toolName + " not found.");
        });
    }

}]);