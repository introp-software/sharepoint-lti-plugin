function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });

    return uuid;
}

function getTimestamp() {
    var now = new Date();
    return Math.round(now.getTime() / 1000);
}

function getUserRole() {
    var userRoles = sessionStorage.getItem("userRoles");
    if (userRoles != null) {
        return userRoles;
    }
    return "";
}


var toolInfodb = [];

function initToolInfoDb() {
    //Add Custom tool.
    var customTool = {};
    customTool.id = "custom";
    customTool.httpMethod = "POST";
    customTool.url = "https://provider.azurewebsites.net/Tool/32";
    customTool.consumerSecret = "f21feec63942409c";
    customTool.tokenSecret = "";
    customTool.parameters = {
        oauth_callback: "about:blank",
        oauth_nonce: "",
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: "",
        oauth_version: "1.0",
        launch_presentation_locale: "en-US",
        lti_message_type: "ContentItemSelectionRequest",
        lti_version: "LTI-1p0",
        oauth_consumer_key: "f0d85149986340f4",
        tool_consumer_info_product_family_code: "Consumer",
        tool_consumer_info_version: "1.4.0.0",
        context_id: "2",
        context_title: "Photography-Course",
        context_type: "CourseSection",
        lis_course_section_sourcedid: "2",
        tool_consumer_instance_guid: "http://localhost:54641/",
        tool_consumer_instance_name: "Consumer Sample",
        user_id: "4535564e-1148-4027-bbfe-5b94507926a6",
        roles: "",
        lis_person_name_given: "",
        launch_presentation_document_target: "iframe",
        accept_media_types: "application/vnd.ims.lti.v1.launch+json",
        accept_multiple: "true",
        accept_presentation_document_targets: "iframe",
        accept_unsigned: "false",
        content_item_return_url: "http://localhost:54641/ContentItemTool/PlaceContentItem",
        data: "{\"ContentItemToolId\":3,\"CourseId\":2}"
    };
    toolInfodb.push(customTool);

    //Add YouTube Tool.
    var youTubeTool = {};
    youTubeTool.id = "youtube";
    youTubeTool.httpMethod = "POST";
    youTubeTool.url = "https://www.edu-apps.org/lti_public_resources/?tool_id=youtube";
    youTubeTool.consumerSecret = "dummysecret";
    youTubeTool.tokenSecret = "";
    youTubeTool.parameters = {
        oauth_callback: "about:blank",
        oauth_nonce: "",
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: "",
        oauth_version: "1.0",
        launch_presentation_locale: "en-US",
        lti_message_type: "ContentItemSelectionRequest",
        lti_version: "LTI-1p0",
        oauth_consumer_key: "dummykey", 
        tool_consumer_info_product_family_code: "Consumer",
        tool_consumer_info_version: "1.4.0.0",
        context_id: "2",
        context_title: "Photography-Course",
        context_type: "CourseSection",
        lis_course_section_sourcedid: "2",
        tool_consumer_instance_guid: "http://localhost:54641/",
        tool_consumer_instance_name: "Consumer Sample",
        user_id: "4535564e-1148-4027-bbfe-5b94507926a6",
        roles: "",
        lis_person_name_given: "",
        launch_presentation_document_target: "iframe",
        accept_media_types: "application/vnd.ims.lti.v1.launch+json",
        accept_multiple: "true",
        accept_presentation_document_targets: "iframe",
        accept_unsigned: "false",
        content_item_return_url: "http://localhost:54641/ContentItemTool/PlaceContentItem",
        data: "{\"ContentItemToolId\":3,\"CourseId\":2}"
    };
    toolInfodb.push(youTubeTool);

    //Add Custom tool.
    var officeMix = {};
    officeMix.id = "officemix";
    officeMix.httpMethod = "POST";
    officeMix.url = "https://mix.office.com/lti/";
    officeMix.consumerSecret = "1t8egvm5ybw0w";
    officeMix.tokenSecret = "";
    officeMix.parameters = {
        oauth_callback: "about:blank",
        oauth_nonce: "",
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: "",
        oauth_version: "1.0",
        launch_presentation_locale: "en-US",
        lti_message_type: "basic-lti-launch-request",
        lti_version: "LTI-1p0",
        oauth_consumer_key: "1bykylgt1fib1",
        tool_consumer_info_product_family_code: "Consumer",
        tool_consumer_info_version: "1.4.0.0",
        context_id: "2",
        context_title: "Photography-Course",
        context_type: "CourseSection",
        lis_course_section_sourcedid: "2",
        tool_consumer_instance_guid: "http://localhost:54641/",
        resource_link_id: "test_assignment",
        tool_consumer_instance_name: "Consumer Sample",
        user_id: "4535564e-1148-4027-bbfe-5b94507926a6",
        roles: "",
        lis_person_name_given: "",
        launch_presentation_document_target: "iframe",
        accept_media_types: "application/vnd.ims.lti.v1.launch+json",
        accept_multiple: "true",
        accept_presentation_document_targets: "iframe",
        accept_unsigned: "false",
        content_item_return_url: "http://localhost:54641/ContentItemTool/PlaceContentItem",
        data: "{\"ContentItemToolId\":3,\"CourseId\":2}"
    };
    toolInfodb.push(officeMix);

    //Add Khan Academy
    var khanAcademy = {};
    khanAcademy.id = "khanacademy";
    khanAcademy.httpMethod = "POST";
    khanAcademy.url = "https://www.edu-apps.org/lti_public_resources/?tool_id=khan_academy";
    khanAcademy.consumerSecret = "1t8egvm5ybw0w";
    khanAcademy.tokenSecret = "";
    khanAcademy.parameters = {
        oauth_callback: "about:blank",
        oauth_nonce: "",
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: "",
        oauth_version: "1.0",
        launch_presentation_locale: "en-US",
        lti_message_type: "basic-lti-launch-request",
        lti_version: "LTI-1p0",
        oauth_consumer_key: "1bykylgt1fib1",
        tool_consumer_info_product_family_code: "Consumer",
        tool_consumer_info_version: "1.4.0.0",
        context_id: "2",
        context_title: "Photography-Course",
        context_type: "CourseSection",
        lis_course_section_sourcedid: "2",
        tool_consumer_instance_guid: "http://localhost:54641/",
        resource_link_id: "test_assignment",
        tool_consumer_instance_name: "Consumer Sample",
        user_id: "4535564e-1148-4027-bbfe-5b94507926a6",
        roles: "",
        lis_person_name_given: "",
        launch_presentation_document_target: "iframe",
        accept_media_types: "application/vnd.ims.lti.v1.launch+json",
        accept_multiple: "true",
        accept_presentation_document_targets: "iframe",
        accept_unsigned: "false",
        content_item_return_url: "http://localhost:54641/ContentItemTool/PlaceContentItem",
        data: "{\"ContentItemToolId\":3,\"CourseId\":2}"
    };
    toolInfodb.push(khanAcademy);

    //Chem vantage
    var chemVantage = {};
    chemVantage.id = "chemvantage";
    chemVantage.httpMethod = "POST";
    chemVantage.url = "https://www.chemvantage.org/lti/";
    chemVantage.consumerSecret = "8ad0eb5a7067e99bdd57ad4edee51874";
    chemVantage.tokenSecret = "";
    chemVantage.parameters = {
        oauth_callback: "about:blank",
        oauth_nonce: "",
        oauth_signature_method: "HMAC-SHA1",
        oauth_timestamp: "",
        oauth_version: "1.0",
        launch_presentation_locale: "en-US",
        lti_message_type: "basic-lti-launch-request",
        lti_version: "LTI-1p0",
        oauth_consumer_key: "ram-lti-app-trial",
        tool_consumer_info_product_family_code: "Consumer",
        tool_consumer_info_version: "1.4.0.0",
        context_id: "2",
        context_title: "Photography-Course",
        context_type: "CourseSection",
        lis_course_section_sourcedid: "2",
        tool_consumer_instance_guid: "http://localhost:54641/",
        resource_link_id: "test_assignment",
        tool_consumer_instance_name: "Consumer Sample",
        user_id: "4535564e-1148-4027-bbfe-5b94507926a6",
        roles: "",
        lis_person_name_given: "",
        resource_link_id: "429785226",
        launch_presentation_document_target: "iframe",
        accept_media_types: "application/vnd.ims.lti.v1.launch+json",
        accept_multiple: "true",
        accept_presentation_document_targets: "iframe",
        accept_unsigned: "false",
        content_item_return_url: "http://localhost:54641/ContentItemTool/PlaceContentItem",
        data: "{\"ContentItemToolId\":3,\"CourseId\":2}"
    };
    toolInfodb.push(chemVantage);

}

function loadTool(toolId, username) {

    //Generate timestamp.
    var utc_timestamp = getTimestamp();

    //Generate UUID.
    var nonce = generateUUID();

    var toolInfo = null;
    for (var i = 0; i < toolInfodb.length; i++) {
        if (toolInfodb[i].id == toolId) {
            toolInfo = toolInfodb[i];
            break;
        }
    }
    if (toolInfo == null) {
        alert("Did not find tool with id - " + toolId);
        return;
    }

    toolInfo.parameters.oauth_nonce = nonce;
    toolInfo.parameters.oauth_timestamp = utc_timestamp;
    toolInfo.parameters.lis_person_name_given = username;
    toolInfo.parameters.roles = "Instructor";

    var httpMethod = toolInfo.httpMethod;
    var url = toolInfo.url;
    var consumerSecret = toolInfo.consumerSecret;
    var tokenSecret = "";

    var signature = oauthSignature.generate(httpMethod,
        url,
        toolInfo.parameters,
        consumerSecret,
        tokenSecret,
        { encodeSignature: false });
    console.log("Signature -" + signature);
    $("#frmPlaceholder").append('<form id="ltiForm1" action="' + toolInfo.url + '" method="post" target="ifrm_tool1"></form>');

    for (eachParam in toolInfo.parameters) {
        $("#ltiForm1").append("<input type='hidden' name='" + eachParam + "' value='" + toolInfo.parameters[eachParam] + "' />");
    }
    $("#ltiForm1").append("<input type='hidden' name='oauth_signature' value='" + signature + "' />");
    $("#ltiForm1").submit();
}

$(function () {
    initToolInfoDb();
    //Listen to userinfo loaded event.
    $(document).on("userInfoLoaded", function (eventData) {
        var username = user.get_email();
        loadTool('chemvantage', username);
    });
});