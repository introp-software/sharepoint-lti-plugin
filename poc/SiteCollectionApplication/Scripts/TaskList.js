function getQueryStringParameter(key, urlToParse) {
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
}

function getAllList() {

    var context = SP.ClientContext.get_current();
    var web = context.get_web();
    var lists = web.get_lists();
    context.load(lists);

    context.executeQueryAsync(
        Function.createDelegate(this, successHandler),
        Function.createDelegate(this, errorHandler)
    );

    function successHandler() {
        var listInfo = '';
        var listEnumerator = lists.getEnumerator();

        while (listEnumerator.moveNext()) {
            var oList = listEnumerator.get_current();
            listInfo += '<li>' + oList.get_title() + '</li>';
        }

        document.getElementById("message").innerHTML = 'Lists found:<ul>' + listInfo + '</ul>';
    }

    function errorHandler(sender, args) {
        document.getElementById("message").innerText =
            "Could not complete cross-domain call: " + args.get_message();
    }

    //var context;
    //var factory;
    //var appContextSite;
    //var collList;

    //var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    //var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));

    //context = new SP.ClientContext(appweburl);
    //factory = new SP.ProxyWebRequestExecutorFactory(appweburl);
    //context.set_webRequestExecutorFactory(factory);
    //appContextSite = new SP.AppContextSite(context, hostweburl);

    //this.web = appContextSite.get_web();
    //collList = this.web.get_lists();
    //context.load(collList);
}

function getToolIdFromList(getToolIdCallback) {
    var context;
    var factory;
    var appContextSite;
    var collList;

    var appweburl = decodeURIComponent(getQueryStringParameter("SPAppWebUrl"));
    var hostweburl = decodeURIComponent(getQueryStringParameter("SPHostUrl"));

    context = new SP.ClientContext(appweburl);
    factory = new SP.ProxyWebRequestExecutorFactory(appweburl);
    context.set_webRequestExecutorFactory(factory);
    appContextSite = new SP.AppContextSite(context, hostweburl);

    this.web = appContextSite.get_web();
    var list = this.web.get_lists().getByTitle("ApplicationList");

    var camlQuery = new SP.CamlQuery();
    camlQuery.set_viewXml('<View><RowLimit>10</RowLimit></View>');
    this.collListItem = list.getItems(camlQuery);
    context.load(collListItem, 'Include(Task Name)');


    context.executeQueryAsync(
        Function.createDelegate(this, successHandler),
        Function.createDelegate(this, errorHandler)
        );

    function successHandler() {
        var taskName = '';
        var listItemEnumerator = collListItem.getEnumerator();
        while (listItemEnumerator.moveNext()) {
            var oListItem = listItemEnumerator.get_current();
            taskName = oListItem.get_item('Task Name');
            $("#lstTask").append("<li>" + taskName + "</li>");
        }
        getToolIdCallback(toolId);
    }

    function errorHandler(sender, args) {
        document.getElementById("message").innerText =
            "Could not complete cross-domain call: " + args.get_message();
    }
}

$(function () {
    getAllList(function () {
            
    });
});