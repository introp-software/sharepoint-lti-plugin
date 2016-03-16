<%@ Page Language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <title></title>

    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="/_layouts/15/SP.RequestExecutor.js"></script>

    <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
    <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" />
    <link rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />

    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript"
        src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript" src="../Scripts/async.min.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/models.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/common-functions.js"></script>
    <script type="text/javascript" src="../Scripts/angular.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/oauth-signature.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/lti-app-launcher.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/user-permission.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/global-app-list-manager.js"></script>
    <script type="text/javascript" src="../Scripts/custom/services/site-app-list-manager.js"></script>
    <script type="text/javascript" src="../Scripts/custom/controllers/lti-app-web-part-ctrl.js"></script>
    
    <script type="text/javascript">
        // Set the style of the client web part page to be consistent with the host web.
        (function () {
            'use strict';

            var hostUrl = '';
            if (document.URL.indexOf('?') != -1) {
                var params = document.URL.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = decodeURIComponent(params[i]);
                    if (/^SPHostUrl=/i.test(p)) {
                        hostUrl = p.split('=')[1];
                        document.write('<link rel="stylesheet" href="' + hostUrl + '/_layouts/15/defaultcss.ashx" />');
                        break;
                    }
                }
            }
            if (hostUrl == '') {
                document.write('<link rel="stylesheet" href="/_layouts/15/1033/styles/themable/corev15.css" />');
            }
        })();
    </script>
</head>
<body>
    <div ng-app="app">
        <div ng-controller="ltiAppWebPartCtrl">
            <div class="alert alert-dismissible alert-danger" ng-if="vm.errMsg != null">
                <button type="button" class="close" data-dismiss="alert" ng-click="vm.errMsg = null">&close;</button>
                {{vm.errMsg}}
            </div>
            <div class="container">
                <div ng-if="vm.isToolConfigured == false">
                    <h2>No LTI™ app configured</h2>
                    <br />
                    <h3>Please use one of the following values for tool name and enter your key and secert
                        in the settings panel to configure LTI™ app for this app part.
                    </h3>
                    <br />
                    <ul>
                        <li>YouTube</li>
                        <li>Trello</li>
                        <li>OfficeMix</li>
                        <li>ChemVantage</li>
                    </ul>
                </div>
                <div id="fmrPlaceholder"></div>
                <iframe name="ifrm_tool1" style="width: 100%; height: 600px;"></iframe>
            </div>
            <input type="hidden" id="__REQUESTDIGEST"/>
        </div>
    </div>
</body>
</html>
