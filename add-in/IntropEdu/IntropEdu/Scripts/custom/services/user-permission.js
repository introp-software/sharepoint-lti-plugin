
var userPermissionLoader = window.userPermission || {};

userPermissionLoader = function () {

    var helper = new commons();
    var appWebUrl = helper.getAppWebUrl();

    var hasManagePermission = function (siteUrl, user, cb) {

        var apiUrl = appWebUrl +
            "/_api/SP.AppContextSite(@target)/web/getUserEffectivePermissions(@username)?@target='" +
            siteUrl +
            "'&@username='" +
             encodeURIComponent(user.get_loginName()) + "'";

        $.ajax({
            url: apiUrl,
            type: "GET",
            headers: {
                accept: "application/json; odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            },
            success: function (data, textStatus, jqXHR) {
                var permissions = new SP.BasePermissions();
                permissions.fromJson(data.d.GetUserEffectivePermissions);
                var hasPermission = permissions.has(SP.PermissionKind.manageWeb);
                cb(hasPermission, false);
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                cb(null, jqXHR);
            }
        });

    }

    return {
        hasManagePermission: hasManagePermission
    }

}