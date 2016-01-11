
function LtiApplication(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.metadata = null;
}

LtiApplication.prototype.setMetadata = function (metadata) {
    this.metadata = metadata;
}