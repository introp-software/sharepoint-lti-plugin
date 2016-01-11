/// <reference path="../services/site-app-list-manager.js" />
/// <reference path="../services/site-list-mapping.js" />
/// <reference path="../services/common-functions.js" />
/// <reference path="../services/global-app-list-manager.js" />
/// <reference path="../services/master-app-list-manager.js" />

var app = angular.module('app', []);
app.controller('editSiteListCtrl', ['$scope', function ($scope) {

    $scope.vm = {};
    $scope.fn = {};

    var vm = $scope.vm;
    var fn = $scope.fn;
    var helper = new commons();

    var hostWebUrl = helper.getHostWebUrl();
    var siteListMgr = new siteAppListMgr();
    var globalListMgr = new globalAppListMgr

    vm.err = "";
    vm.loadingData = false;
    vm.listInfo = null;
    vm.appList = [];

    vm.updatingList = false;
    vm.addAppInProgress = false;
    vm.removeAppInProgress = false;
    vm.appWebUrl = helper.getAppWebUrl();
    vm.hostWebUrl = helper.getHostWebUrl();

    var siteAppList = [];
    var masterAppList = [];

    //Create list for this site.
    function createList(siteUrl) {
        siteListMgr.create(siteUrl, function (data, err) {
            if (err) {
                vm.err = err;
                $scope.$apply();
                return;
            }
            getMasterListItems();
        });
    }

    function getMasterListItems() {
        //If the host web is site collection then Master list = Global list
        //If the host web is site then Master list = list @ site collection 
        //If list @site collection does not exist then Master list = Global list.
        var isSiteColl = helper.isHostASiteCollection();
        if (isSiteColl) {
            getGlobalListItems();
        } else {
            getSiteCollListItems();
        }
    }

    function getGlobalListItems() {
        globalListMgr.getAll(function (data, err) {
            if (err) {
                vm.loadingData = false;
                vm.err = err;
            }
            else if (data) {
                masterAppList = data;
                prepareBindableList();
            }
            $scope.$apply();
        });
    }

    function getSiteCollListItems() {
        var siteCollUrl = helper.getSiteCollectionUrl();
        siteListMgr.getItems(siteCollUrl, function (data, err) {
            if (err) {
                getGlobalListItems();
            }
            else if (data) {
                masterAppList = data;
                prepareBindableList();
            }
            $scope.$apply();
        });
    }

    function prepareBindableList() {
        var seenAppId = [];
        var bindableAppList = [];

        if (siteAppList) {
            for (var i = 0; i < siteAppList.length; i++) {
                siteAppList[i].oldChecked = true;
                siteAppList[i].newChecked = true;
                bindableAppList.push(siteAppList[i]);
                seenAppId.push(siteAppList[i].id);
            }
        }
        if (masterAppList) {
            for (var i = 0; i < masterAppList.length; i++) {
                if (seenAppId.indexOf(masterAppList[i].id) != -1) {
                    continue;
                }
                masterAppList[i].oldChecked = false;
                masterAppList[i].newChecked = false;
                bindableAppList.push(masterAppList[i]);
            }
        }
        vm.appList = bindableAppList;
    }

    function addApp(index, appsToAdd, cb) {
        siteListMgr.addApp(hostWebUrl, appsToAdd[index], function (app, err) {
            if (err) {
                cb(null, err);
                return;
            }
            if (++index < appsToAdd.length) {
                addApp(index, appsToAdd, cb);
            } else {
                cb(true, null);
            };
        });
    }

    function removeApp(index, appsToRemove, cb) {
        siteListMgr.removeApp(hostWebUrl, appsToRemove[index], function (app, err) {
            if (err) {
                cb(null, err);
                return;
            }
            if (++index < appsToRemove.length) {
                removeApp(index, appsToRemove, cb);
            } else {
                cb(true, null);
            }
        });
    }

    function changeAppListUpdateState(addAppInProgress, removeAppInProgress) {
        if (addAppInProgress == false && removeAppInProgress == false) {
            vm.updatingList = false;
        }
    }

    $scope.$watch('vm.addAppInProgress', function (newVal, oldVal) {
        if (newVal == false) {
            changeAppListUpdateState(newVal, vm.removeAppInProgress)
        }
    });

    $scope.$watch('vm.removeAppInProgress', function (newVal, oldVal) {
        if (newVal == false) {
            changeAppListUpdateState(vm.addAppInProgress, newVal);
        }
    });

    fn.updateAppList = function () {
        vm.addAppInProgress = true;
        vm.removeAppInProgress = true;
        vm.updatingList = true;

        var appsToRemove = [];
        var appsToAdd = [];

        for (var ctr = 0; ctr < vm.appList.length; ctr++) {
            var currentApp = vm.appList[ctr];
            if (currentApp.oldChecked == true && currentApp.newChecked == false) {
                appsToRemove.push(currentApp);
            }
            else if (currentApp.oldChecked == false && currentApp.newChecked == true) {
                appsToAdd.push(currentApp);
            }
        }


        if (appsToAdd.length > 0) {
            addApp(0, appsToAdd, function (data, err) {
                if (err) {
                    vm.err = err;
                }
                else {
                    for (var i = 0; i < appsToAdd.length; i++) {
                        appsToAdd[i].oldChecked = true;
                    }
                }
                vm.addAppInProgress = false;
                $scope.$apply();
            });
        }
        else {
            vm.addAppInProgress = false;
        }

        if (appsToRemove.length > 0) {
            removeApp(0, appsToRemove, function (data, err) {
                if (err) {
                    vm.err = err;
                }
                else {
                    for (var i = 0; i < appsToRemove.length; i++) {
                        appsToRemove[i].oldChecked = false;
                    }
                }
                vm.removeAppInProgress = false;
                $scope.$apply();
            });
        }
        else {
            vm.removeAppInProgress = false;
        }
    }

    //Get the list of apps for this site.
    siteListMgr.getItems(hostWebUrl, function (data, err) {
        if (err) {
            createList(hostWebUrl);
        }
        else if (data) {
            siteAppList = data;
            getMasterListItems();
        }
        $scope.$apply();
    });

}]);