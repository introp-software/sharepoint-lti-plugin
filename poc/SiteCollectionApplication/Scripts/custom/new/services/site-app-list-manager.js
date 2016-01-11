/// <reference path="models.js" />
/// <reference path="common-functions.js" />
var siteAppListMgr = window.siteAppListMgr || {};

siteAppListMgr = function () {

    var listColumns = [
        "{ '__metadata': { 'type': 'SP.FieldText' }, 'FieldTypeKind': 2, 'Title': 'AppId', 'MaxLength': '50' }",
        "{ '__metadata': { 'type': 'SP.FieldText' }, 'FieldTypeKind': 2, 'Title': 'AppName', 'MaxLength': '250' }",
        "{ '__metadata': { 'type': 'SP.FieldText' }, 'FieldTypeKind': 3, 'Title': 'AppDescription', 'MaxLength': '255' }"
    ];

    var listItemType = "SP.Data.LTIApplicationListListItem";
    var helper = new commons();
    var appWebUrl = helper.getAppWebUrl();
    var listName = helper.getAppListName();

    function createList(siteUrl, listTitle, description, cb) {
        jQuery.ajax({
            url: appWebUrl + "/_api/SP.AppContextSite(@target)/web/lists?@target='" + siteUrl + "'",
            type: "POST",
            data: JSON.stringify({
                '__metadata': { 'type': 'SP.List' }, 'AllowContentTypes': true,
                'BaseTemplate': 100,
                'ContentTypesEnabled': true,
                'Description': description,
                'Title': listTitle
            }),
            headers: {
                "accept": "application/json;odata=verbose",
                "content-type": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data, textStatus, jqXHR) {
                //data.d.id -> contains guid for the list
                cb(data.d.Id, null);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                cb(null, errorThrown);
            }
        });
    }

    function addFieldToList(index, listId, siteUrl, cb) {
        $.ajax({
            url: appWebUrl +
                "/_api/SP.AppContextSite(@target)/web/lists(guid'"
                + listId + "')/fields?@target='" + siteUrl + "'",
            type: "POST",
            data: listColumns[index],
            headers: {
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "content-type": "application/json;odata=verbose",
                "accept": "application/json;odata=verbose",
            },
            success: function (data, textStatus, jqXHR) {
                if ((index + 1) < listColumns.length) {
                    addFieldToList(++index, listId, siteUrl, cb);
                }
                else {
                    cb(true, null);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                cb(false, errorThrown);
            }
        });
    }

    var removeApp = function (siteUrl, app, cb) {
        var appId = app.metadata.ID;
        var url = appWebUrl + "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('"
            + listName
            + "')/items(" + appId + ")"
            + "?@target='" + siteUrl + "'";

        $.ajax({
            url: url,
            type: "POST",
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-Http-Method": "DELETE",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "If-Match": app.metadata.__metadata.etag
            },
            success: function (data, textStatus, jqXHR) {
                cb(app, null);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                cb(app, jqXHR);
            }
        });
    }

    var addApp = function (siteUrl, app, cb) {

        var item = {
            "__metadata": { "type": listItemType },
            "AppName": app.name,
            "AppDescription": app.description,
            "AppId": app.id
        };

        var apiEndPoint = appWebUrl +
                "/_api/SP.AppContextSite(@target)/web/lists/getbytitle('" +
                listName + "')/items?@target='"
                + siteUrl + "'";

        $.ajax({
            url: apiEndPoint,
            type: "POST",
            contentType: "application/json;odata=verbose",
            data: JSON.stringify(item),
            headers: {
                "Accept": "application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            },
            success: function (data, textStatus, jqXHR) {
                app.setMetadata(data);
                cb(app, null);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                cb(app, jqXHR);
            }
        });
    }

    var create = function (siteUrl, cb) {
        var helper = new commons();
        var listTitle = helper.getAppListName();

        var newListMetadata = {
            title: listTitle,
            id: null
        };

        createList(siteUrl, listTitle, "List for Site - " + siteUrl, function (listId, err) {
            if (err) {
                cb(null, err);
                return;
            };
            newListMetadata.id = listId;
            addFieldToList(0, listId, siteUrl, function (data, err) {
                if (err) {
                    cb(null, err);
                } else {
                    cb(newListMetadata, null);
                }
            });
        });
    }

    var getItems = function (siteUrl, cb) {
        var listName = helper.getAppListName();
        var queryUrl = appWebUrl +
            "/_api/SP.AppContextSite(@target)/web/lists/GetByTitle('"
            + listName + "')/items?@target='"
            + siteUrl + "'";

        $.ajax({
            url: queryUrl,
            type: "GET",
            headers: {
                accept: "application/json; odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            },
            success: function (data, textStatus, jqXHR) {
                var apps = new Array();
                if (data.d.results != null && data.d.results.length != 0) {
                    var items = data.d.results;
                    for (var ctr = 0; ctr < items.length; ctr++) {
                        var app = new LtiApplication(
                            items[ctr].AppId,
                            items[ctr].AppName,
                            items[ctr].AppDescription);
                        app.setMetadata(items[ctr]);
                        apps.push(app);
                    }
                }
                cb(apps, null);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                cb(null, errorThrown);
            }
        });
    }

    return {
        create: create,
        getItems: getItems,
        addApp: addApp,
        removeApp: removeApp
    };

}