/// <reference path="../../async.min.js" />
/// <reference path="site-app-list-manager.js" />
var userPermissionLoader = window.userPermission || {};

userPermissionLoader = function () {

    var helper = new commons();
    var appWebUrl = helper.getAppWebUrl();
    var appListMgr = new siteAppListMgr();
    var listName = helper.getAppListName();

    function hasManagePermission(siteUrl, user, cb) {

        async.waterfall([

            //Step 1 - Check if list exists.
            function (asyncCb) {
                appListMgr.exists(siteUrl, function (result, err) {
                    if (err) {
                        if (err.code != null && err.code == 404) {
                            var args = { exists: false };
                            asyncCb(null, args);
                            return;
                        }
                        asyncCb(err, null);
                        return;
                    }
                    var args = { exists: result };
                    asyncCb(null, args);
                });
            },

            //Step 2 - Create if not exists.
            function (args, asyncCb) {
                if (args.exists == true) {
                    asyncCb(null, args);
                    return;
                }
                appListMgr.create(siteUrl, function (result, err) {
                    if (err) {
                        asyncCb(err, null);
                        return;
                    }
                    asyncCb(null, args);
                });
            },

            //Step 3 - Check permission.
            function (args, asyncCb) {
                var apiUrl = appWebUrl +
                "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('" +
                listName +
                "')/effectiveBasePermissions?@target='" +
                siteUrl +
                "'";

                $.ajax({
                    url: apiUrl,
                    type: "GET",
                    headers: {
                        accept: "application/json; odata=verbose",
                        "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
                    },
                    success: function (data, textStatus, jqXHR) {
                        var permissions = new SP.BasePermissions();
                        permissions.fromJson(data.d.EffectiveBasePermissions);
                        var hasPermission = permissions.has(SP.PermissionKind.manageLists);

                        args.hasPermission = hasPermission;
                        asyncCb(null, args);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        asyncCb(errorThrown, null);
                    }
                });
            }

        ],

            //Final callback
        function (err, results) {
            //First param to cb is bool to indicate if user has permission or not.
            //Second param is err if any.
            if (err) {
                cb(false, false);
                return;
            }
            cb(results.hasPermission, false);
        });

    }

    return {
        hasManagePermission: hasManagePermission
    }

}