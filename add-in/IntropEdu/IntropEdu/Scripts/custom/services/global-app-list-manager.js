/// <reference path="models.js" />

var globalAppListMgr = window.globalAppListMgr || {};

globalAppListMgr = function () {

    getAll = function (cb) {
        var appList = [
             new LtiApplication('1',
                                'YouTube',
                                '',
                                'iFrame',
                                '',
                                '',
                                'https://www.edu-apps.org/lti_public_resources/?tool_id=youtube',
                                'https://edu-app-center.s3.amazonaws.com/uploads/production/lti_app/banner_image/pr_youtube.png',
                                '57092',
                                false,
                                'ContentItemSelectionRequest'),

             new LtiApplication('2',
                                'Trello',
                                '',
                                'iFrame',
                                '',
                                '',
                                'https://www.edu-apps.org/tool_redirect?id=trello',
                                'https://edu-app-center.s3.amazonaws.com/uploads/production/lti_app/banner_image/trello.png',
                                '07282',
                                false,
                                'ContentItemSelectionRequest'),

             new LtiApplication('3',
                                'OfficeMix',
                                '',
                                'iFrame',
                                '',
                                '',
                                'https://mix.office.com/lti/',
                                'https://edu-app-center.s3.amazonaws.com/uploads/production/lti_app/banner_image/microsoft_office_mix.png',
                                '62424',
                                 true,
                                 'basic-lti-launch-request'),

            new LtiApplication('4',
                               'CustomApp',
                               '',
                               'iFrame',
                               '',
                               '',
                               'https://provider.azurewebsites.net/Tool/32',
                               'https://edu-app-center.s3.amazonaws.com/uploads/production/lti_app/banner_image/public_resources.png',
                               '63276',
                                true,
                                'ContentItemSelectionRequest'),

            new LtiApplication('5',
                               'ChemVantage',
                               '',
                               'iFrame',
                               '',
                               '',
                               'https://www.chemvantage.org/lti/',
                               'https://edu-app-center.s3.amazonaws.com/uploads/production/lti_app/banner_image/chem_vantage.png',
                               '89056',
                                true,
                                'basic-lti-launch-request'),

          new LtiApplication('6',
                             'KhanAcademy',
                             '',
                             'iFrame',
                             '',
                             '',
                             'https://www.edu-apps.org/lti_public_resources/?tool_id=khan_academy',
                             'https://edu-app-center.s3.amazonaws.com/uploads/production/lti_app/banner_image/pr_khan_academy.png',
                             '90168',
                              false,
                              'basic-lti-launch-request'),
             
        ];
        cb(appList, null);
    }

    return {
        getAll: getAll
    };

};