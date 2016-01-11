
var commons = window.commons || {};

commons = function () {

    var getQueryStringParameter = function (key, urlToParse) {
        if (!urlToParse || urlToParse.length === 0) {
            urlToParse = document.URL;
        }
        if (urlToParse.indexOf("?") === -1) {
            return "";
        }
        var params = urlToParse.split('?')[1].split('&');
        for (var i = 0; i < params.length; i = i + 1) {
            var singleParam = params[i].split('=');
            if (singleParam[0] === key) {
                return decodeURIComponent(singleParam[1]);
            }
        }
        return "";
    };

    var getHostWebUrl = function () {
        return decodeURIComponent(getQueryStringParameter("SPHostUrl"));
    };

    var getAppWebUrl = function () {
        return decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    };

    var isHostASiteCollection = function () {
        var hostUrl = getHostWebUrl();
        var anchor = document.createElement("a");
        anchor.href = hostUrl;

        var path = anchor.pathname;
        var pathParts = path.split("/");

        //A site collection is @ the top level after /sites/ path
        //Example - http://[domain]/sites/[collection] = Site collection
        //Example - http://[domain]/sites/[collection]/[site] = Site
        var validPathPartCount = 0;
        for (var ctr = 0; ctr < pathParts.length; ctr++) {
            if (pathParts[ctr]) {
                validPathPartCount++;
            }
        }
        return validPathPartCount == 2;
    }

    var getSiteCollectionUrl = function () {
        var hostUrl = getHostWebUrl();
        var anchor = document.createElement("a");
        anchor.href = hostUrl;

        var path = anchor.protocol + "//";
        path += anchor.host;

        var pathParts = anchor.pathname.split("/");
        for (var ctr = 0; ctr < 2; ctr++) {
            path += "/" + pathParts[ctr];
        }
        return path;
    }

    var generateUUID = function () {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now();; //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    var getAppListName = function () {
        return "LTIApplicationList";
    };

    return {
        getHostWebUrl: getHostWebUrl,
        getAppWebUrl: getAppWebUrl,
        getQueryStringParameter: getQueryStringParameter,
        getSiteCollectionUrl: getSiteCollectionUrl,
        isHostASiteCollection: isHostASiteCollection,
        generateUUID: generateUUID,
        getAppListName: getAppListName
    };
}