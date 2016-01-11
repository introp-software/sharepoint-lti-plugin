
var userInfoLoader = window.userInfoLoader || {};

userInfoLoader = function () {

    //Private members.
    var name = "";

    getById = function (id) {
        $.ajax({
            url: "../_api/web/currentuser",
            type: "GET",
            headers: {
                accept: "application/json;odata=verbose"
            },
            success: function (data, status, jqXhr) {
                $("#roleContainer").html("<b>Is Site Admin : </b>" + data.d.IsSiteAdmin);
            },
            error: function (jqXhr, status, message) {
                var k = 0;
            }
        });
    };

    return {
        getById: getById
    }
}


var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();



// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    getUserName();
});

// This function prepares, loads, and then executes a SharePoint query to get the current users information
function getUserName() {
    context.load(user);
    context.executeQueryAsync(onGetUserNameSuccess, onGetUserNameFail);
}

// This function is executed if the above call is successful
// It replaces the contents of the 'message' element with the user name
function onGetUserNameSuccess() {
    $('#message').text('Hello ' + user.get_title());
    var infoLoader = new userInfoLoader();
    infoLoader.getById(user.get_loginName());
}

// This function is executed if the above call fails
function onGetUserNameFail(sender, args) {
    alert('Failed to get user name. Error:' + args.get_message());
}






