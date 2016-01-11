/// <reference path="helper-functions.js" />

var appListManager = window.appListManager || {};

appListManager = function () {

    getSelectedApps = function () {
        var helper = new helperFunctions();
        var hostWebUrl = helper.getHostWebUrl();
        var queryUrl = "../_api/web/lists/GetByTitle('AppSettings')/GetItems(query=@v1)?";
        queryUrl += "@v1={'ViewXml':'<View>" +
                    "<Query><Where><Contains><FieldRef name='HostWebId'/><Value Type='text'>" +
                    hostWebUrl +
        "</Value></Contains></Where></Query></View>'}";

        $.ajax({
            url: queryUrl,
            type: "POST",
            headers: {
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            },
            success: function (data, status, jqXhr) {
                var lists = data;
            },
            error: function (jqXhr, status, message) {
                var k = 0;
            }
        });
    };

    return {
        getSelectedApps: getSelectedApps
    };
};