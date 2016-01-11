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
    <meta name="WebPartPageExpansion" content="full" />

    <!-- Add your CSS styles to the following file -->
    <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" />
    <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript"
        src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>

    <script type="text/javascript" src="../Scripts/custom/services/models.js"></script>
    <script type="text/javascript" src="../Scripts/angular.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/common-functions.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/global-app-list-manager.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/site-app-list-manager.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/user-permission.js"></script>
    <script type="text/javascript" src="../Scripts/custom/controllers/default-page-ctrl.js"></script>
</asp:Content>

<%-- The markup in the following Content element will be placed in the TitleArea of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Introp Edu
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div>
        <p id="message">
            <!-- The following content will be replaced with the user name when you run the app - see App.js -->
            initializing...
        </p>
    </div>

    <div class="container">
        <div ng-app="app">
            <div ng-controller="defaultPageCtrl">

                <%--<div class="panel panel-primary">
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
                </div>--%>

                <a id="lnkEditAppList"
                    href="{{vm.editPageUrl}}"
                    class="btn btn-warning pull-right"
                    ng-show="vm.hasEditPermission"
                    style="text-shadow: none;">Edit App List &nbsp; <i class="fa fa-cog"></i>
                </a>

                <h5>Showing {{vm.appList.length}} Apps</h5>
                <%--  <table id="tblSelectedApps" class="table">
                    <thead>
                        <tr>
                            <th>App Name</th>
                            <th>App Description</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-if="vm.loadingData == true">
                            <td colspan="2" style="text-align: center">Loading</td>
                        </tr>
                        <tr ng-if="vm.loadingData == false" ng-repeat="eachApp in vm.appList">
                            <td>{{eachApp.name}}</td>
                            <td>{{eachApp.description}}</td>
                            <td>
                                <a href="{{vm.hostLtiPageUrl}}&appId={{eachApp.id}}">Launch</a>
                            </td>
                        </tr>
                    </tbody>
                </table>--%>
                <div style="height: 15px;"></div>
                <div class="row">
                    <div class="col-md-3" ng-if="vm.loadingData == false" ng-repeat="eachApp in vm.appList">
                        <div class="dvHeight">
                            <a href="{{vm.hostLtiPageUrl}}&appId={{eachApp.id}}" class="tileLink">
                                <div class="text-center">
                                    <img src="{{eachApp.logoUrl}}" />
                                </div>
                                <p class="text-center">{{eachApp.name}}</p>
                                <p>{{eachApp.description}}</p>
                                <div style="height: 15px;"></div>
                            </a>
                        </div>                        
                    </div>
                </div>


            </div>
        </div>
    </div>

</asp:Content>
