<%@ Page Language="C#" MasterPageFile="~masterurl/default.master" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <SharePoint:ScriptLink Name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
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

    <!-- Add your CSS styles to the following file -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="../Scripts/custom/helper-functions.js"></script>
    <script type="text/javascript" src="../Scripts/custom/app-list-manager.js"></script>
    <script type="text/javascript" src="../Scripts/custom/global-list-manager.js"></script>
    <script type="text/javascript">
        $(function () {
            var globalLstMgr = new globalListManager();
            globalLstMgr.showGlobalAppList();

            var helperFn = new helperFunctions();
            var SPAppWebUrl = helperFn.getAppWebUrl();
            var SPHostUrl = helperFn.getHostWebUrl();
            var settingPageUrl = "../pages/AppSettings.aspx?SPAppWebUrl=" +
                                   encodeURIComponent(SPAppWebUrl) +
                                   "&SPHostUrl=" +
                                   encodeURIComponent(SPHostUrl);
            $("#lnkBackToSettings").attr("href", settingPageUrl);
        });
    </script>
</asp:Content>

<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <WebPartPages:WebPartZone runat="server" FrameType="TitleBarOnly" ID="full" Title="loc:full" />

    <div class="container">
        
        <a id="lnkBackToSettings" href="" class="btn btn-default">Back To Settings</a>

        <table id="tblApps" class="table">
            <thead>
                <tr>
                    <th></th>
                    <th>App Name</th>
                    <th>App Description</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>

        <button id="btnAddApp" type="button">Add Application</button>
        <i id="icOpInProgress" class="fa fa-refresh fa-spin"></i>
    </div>


</asp:Content>
