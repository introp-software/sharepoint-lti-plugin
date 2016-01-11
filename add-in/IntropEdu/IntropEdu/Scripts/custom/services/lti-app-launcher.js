/// <reference path="models.js" />
/// <reference path="oauth-signature.js" />

var ltiAppLauncher = window.ltiAppLauncher || {};

ltiAppLauncher = function () {

    var generateUUID = function () {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });

        return uuid;
    }

    var getTimestamp = function () {
        var now = new Date();
        return Math.round(now.getTime() / 1000);
    }

    var launch = function (appInfo, frmPlaceHolderId, iFrameId, user) {

        //Generate timestamp.
        var utc_timestamp = getTimestamp();

        //Generate UUID.
        var nonce = generateUUID();

        var toolLaunchParams = {};
        toolLaunchParams.oauth_nonce = nonce;
        toolLaunchParams.oauth_timestamp = utc_timestamp;
        toolLaunchParams.launch_presentation_document_target = appInfo.launchPresentationDocumentTarget;
        toolLaunchParams.lti_message_type = appInfo.ltiMessageType;
        toolLaunchParams.lti_version = "LTI-1p0";
        toolLaunchParams.oauth_callback = "about:blank";
        toolLaunchParams.oauth_consumer_key = appInfo.consumerKey;
        toolLaunchParams.oauth_signature_method = "HMAC-SHA1";
        toolLaunchParams.oauth_version = "1.0";
        toolLaunchParams.resource_link_id = appInfo.resourceId;
        toolLaunchParams.roles = user.role;

        var signature = oauthSignature.generate("POST",
                                                appInfo.url,
                                                toolLaunchParams,
                                                appInfo.consumerSecret,
                                                "",
                                                { encodeSignature: false });

        $("#" + frmPlaceHolderId)
            .append('<form id="ltiForm1" action="' + appInfo.url + '" method="post" target="ifrm_tool1"></form>');

        for (eachParam in toolLaunchParams) {
            $("#ltiForm1").append("<input type='hidden' name='" + eachParam + "' value='" + toolLaunchParams[eachParam] + "' />");
        }
        $("#ltiForm1").append("<input type='hidden' name='oauth_signature' value='" + signature + "' />");
        $("#ltiForm1").submit();
    }

    return {
        launch: launch
    };

}