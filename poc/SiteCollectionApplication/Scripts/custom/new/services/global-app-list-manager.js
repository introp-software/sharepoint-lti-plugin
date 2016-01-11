/// <reference path="LtiApplication.js" />

var globalAppListMgr = window.globalAppListMgr || {};

globalAppListMgr = function () {

    getAll = function (cb) {
        var appList = [
             new LtiApplication("1", "Office Mix", "description for office mix"),
             new LtiApplication("2", "Trello", "description for trello"),
             new LtiApplication("3", "You Tube", "description for you tube"),
             new LtiApplication("4", "Laws of Motion", "description for laws of motion"),
             new LtiApplication("5", "Projectile Motion", "description for projectile motion"),
             new LtiApplication("6", "Periodic Table", "description for periodic tables"),
             new LtiApplication("7", "Organic Chemistry", "description for organic chemistry"),
             new LtiApplication("8", "In-Organic Chemistry", "description for in-organic chemistry")
        ];
        cb(appList, null);
    }

    return {
        getAll: getAll
    };

};