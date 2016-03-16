/// <reference path="models.js" />
/// <reference path="common-functions.js" />
var globalAppListMgr = window.globalAppListMgr || {};

globalAppListMgr = function () {

    getAll = function (cb) {

        $.ajax({
            url: '../_api/SP.WebProxy.invoke',
            type: 'POST',
            data: JSON.stringify({
                'requestInfo': {
                    '__metadata': { 'type': 'SP.WebRequestInfo' },
                    'Url': 'https://intropedustg.blob.core.windows.net/lti-app-catalog/lti-app-catalog.json',
                    'Method': 'GET',
                    'Headers': {
                        'results': [{
                            '__metadata': { 'type': 'SP.KeyValue' },
                            'Key': 'Accept',
                            'Value': 'application/json',
                            "ValueType": "Edm.String"
                        }]
                    }
                }
            }),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json;odata=verbose",
                'X-RequestDigest': $("#__REQUESTDIGEST").val()
            },
            success: function (data) {
                var appList = [];
                var response = JSON.parse(data.Body);
                if (response) {
                    for (var ctr = 0; ctr < response.length; ctr++) {
                        appList.push(
                           new LtiApplication(response[ctr].id,
                                              response[ctr].name,
                                              response[ctr].description,
                                              response[ctr].presentationTarget,
                                              "",
                                              "",
                                              response[ctr].launchUrl,
                                              response[ctr].logoUrl,
                                              response[ctr].resourceId,
                                              response[ctr].requiresKey == "0" ? false : true,
                                              response[ctr].ltiMessageType)
                        );
                    }
                }
                cb(appList, null);
            },
            error: function (event, error) {
                cb(null, error);
            }
        });
    }

    return {
        getAll: getAll
    };

};