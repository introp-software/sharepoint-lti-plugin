
function LtiApplication(id,
    name,
    description,
    launchPresentationDocumentTarget,
    consumerKey,
    consumerSecret,
    url,
    logoUrl,
    resourceId,
    requiresKey) {

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

}

LtiApplication.prototype.setMetadata = function (metadata) {
    this.metadata = metadata;
}