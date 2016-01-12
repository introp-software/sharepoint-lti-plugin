<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.requestexecutor.js"></script>
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />

    <!-- Optional theme -->
    <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" />

    <!-- Latest compiled and minified JavaScript -->
    <script type="text/javascript"
        src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>

    <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="../Scripts/angular.js"></script>

    <script type="text/javascript" src="../Scripts/custom/services/models.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/common-functions.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/global-app-list-manager.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/site-app-list-manager.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/site-list-mapping.js"></script>

    <script type="text/javascript" src="../Scripts/custom/controllers/edit-site-list-page-ctrl.js"></script>

    <script type="text/javascript">
        $(function () {
            var helperFn = new commons();
            var SPAppWebUrl = helperFn.getAppWebUrl();
            var SPHostUrl = helperFn.getHostWebUrl();
            var defaultPageUrl = "../pages/default.aspx?SPAppWebUrl=" +
                                   encodeURIComponent(SPAppWebUrl) +
                                   "&SPHostUrl=" +
                                   encodeURIComponent(SPHostUrl);
            $("#lnkBack").attr("href", defaultPageUrl);
        });
    </script>

</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<%--<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Page Title
</asp:Content>--%>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <p id="message">
            <!-- The following content will be replaced with the user name when you run the app - see App.js -->
            initializing...Test changes
        </p>
    </div>
    <div ng-app="app">
        <div class="container" ng-controller="editSiteListCtrl">

            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">Application Details</h3>
                </div>
                <div class="panel-body">
                   <table class="table">
                       <tbody>
                           <tr>
                               <td>App Web</td>
                               <td>{{vm.appWebUrl}}</td>
                           </tr>
                           <tr>
                               <td>Host Web</td>
                               <td>{{vm.hostWebUrl}}</td>
                           </tr>
                       </tbody>
                   </table>
                </div>
            </div>


            <h1>Configure Application List</h1>
            <table id="tblSelectedApps" class="table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <th>App Name</th>
                        <th>App Description</th>
                        <th>Consumer Key</th>
                        <th>Consumer Secret</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-if="vm.loadingData == true">
                        <td colspan="3" style="text-align: center">Loading</td>
                    </tr>
                    <tr ng-if="vm.loadingData == false" ng-repeat="eachApp in vm.appList">
                        <td>
                            <i class="fa fa-key fa-2" 
                                style="color:darkgreen;cursor:pointer" 
                                ng-if="eachApp.requiresKey == true"
                                title="This tool requires consumer key and secret"></i>
                        </td>
                        <td>
                            <input type="checkbox" ng-model="eachApp.newChecked" />
                        </td>
                        <td>{{eachApp.name}}</td>
                        <td>{{eachApp.description}}</td>
                        <td>
                            <input type="text" ng-model="eachApp.consumerKey" />
                        </td>
                        <td>
                            <input type="text" ng-model="eachApp.consumerSecret" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <a class="btn btn-primary" id="lnkBack" style="text-decoration:none;color:#FFFFFF">Back To List</a>
                <button type="button" 
                    ng-click="fn.updateAppList()" 
                    class="btn btn-primary"
                    ng-disabled="vm.updatingList == true">
                    Update App List
                </button>
                <i class="fa fa-refresh fa-spin" ng-if="vm.updatingList == true"></i>
            </div>
        </div>
    </div>


</asp:Content>
