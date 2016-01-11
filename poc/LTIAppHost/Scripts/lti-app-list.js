//Code to invoke share point api to fetch user profile properties.
var theData = {
    "propertiesForUser": {
        "__metadata": { "type": "SP.UserProfiles.UserProfilePropertiesForUser" },
        "accountName": "i:0#.f|membership|o365admin@introptest.onmicrosoft.com",
        "propertyNames": ["PreferredName", "Department"]
    }
};

var requestHeaders = {
    "Accept": "application/json;odata=verbose",
    "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
};

$(function () {
    jQuery.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/sp.userprofiles.profileloader.getprofileloader/getuserprofile",
        type: "POST",
        contentType: "application/json;odata=verbose",
        headers: requestHeaders,
        success: function (data) {
            console.log(data);
        },
        error: function (jqxr, errorCode, errorThrown) {
            console.log(jqxr.responseText);
        }
    });
});
