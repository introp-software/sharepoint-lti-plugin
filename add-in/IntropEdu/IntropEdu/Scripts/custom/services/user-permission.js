
var userPermissionLoader = window.userPermission || {};

userPermissionLoader = function () {

    var helper = new commons();
    var appWebUrl = helper.getAppWebUrl();

    var get = function (siteUrl, user) {

        var apiUrl = appWebUrl +
            "/_api/SP.AppContextSite(@target)/web/getUserEffectivePermissions(@username)?@target='" +
            siteUrl +
            "'&@username='" +
             encodeURIComponent(user.get_loginName()) + "'";

        $.ajax({
            url: apiUrl,
            type: "GET",
            headers: {
                accept: "application/json",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            },
            success: function (data, textStatus, jqXHR) {
                var permissions = new SP.BasePermissions();
                permissions.initPropertiesFromJson(JSON.stringify(data));
                var permLevels = [];
                for (var permLevelName in SP.PermissionKind.prototype) {
                    if (SP.PermissionKind.hasOwnProperty(permLevelName)) {
                        var permLevel = SP.PermissionKind.parse(permLevelName);
                        if (permissions.has(permLevel)) {
                            permLevels.push(permLevelName);
                        }
                    }
                }
                var k = 0;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var j = 0;
            }
        });

    }

    return {
        getPermissions: get
    }

}