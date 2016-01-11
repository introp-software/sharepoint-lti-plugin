
function LtiApplication(id,
    name,
    description,
    launchPresentationDocumentTarget,
    consumerKey,
    consumerSecret,
    url,
    logoUrl,
    resourceId,
    requiresKey,
    ltiMessageType) {

    this.id = id;
    this.name = name;
    this.description = description;
    this.metadata = null;
    this.launchPresentationDocumentTarget = launchPresentationDocumentTarget;
    this.consumerKey = consumerKey;
    this.consumerSecret = consumerSecret;
    this.url = url;
    this.logoUrl = logoUrl;
    this.resourceId = resourceId;
    this.requiresKey = requiresKey;
    this.ltiMessageType = ltiMessageType;
}

LtiApplication.prototype.setMetadata = function (metadata) {
    this.metadata = metadata;
}

function UserInfo(firstName, lastName, email, role) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
}