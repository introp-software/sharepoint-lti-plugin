
var registerScripts = window.registerScripts || {};

registerScripts = function () {

    function appendScript(path) {
        var scriptElt = document.createElement('script');
        scriptElt.setAttribute('src', path);
        document.head.appendChild(scriptElt);
    }

    function registerServices() {
        var scripts = [
            '../Scripts/custom/new/services/common-functions.js',
            '../Scripts/custom/new/services/global-app-list-manager.js',
            '../Scripts/custom/new/services/master-app-list-manager.js',
            '../Scripts/custom/new/services/site-app-list-manager.js',
            '../Scripts/custom/new/services/site-list-mapping.js'
        ];
        for (var ctr = 0; ctr < scripts.length; ctr++) {
            appendScript(scripts[ctr]);
        }
    }

    var register = function (page) {
        registerServices();
        appendScript('../Scripts/custom/new/controllers/' + page + '-page-ctrl.js');
    }

    return {
        regiser: register
    };
};