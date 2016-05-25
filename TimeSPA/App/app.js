'use strict';
//namespace
window.timesheet = window.timesheet || {};

angular.module('timeApp', ['ngRoute', 'AdalAngular', 'breeze.angular'])
.config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', function ($routeProvider, $httpProvider, adalProvider) {

    $routeProvider.when("/time", {
        controller: 'timeCtl',
        templateUrl: "/View/time.html"
    }).when("/project", {
        controller: 'projectCtl',
        templateUrl: "/View/project.html"
    }).when("/report", {
        controller: 'reportCtl',
        templateUrl: "/View/report.html"
    }).otherwise({ redirectTo: "/time" });

    
    var endpoints = {
        // Map the location of a request to an API to a the identifier of the associated resource
        "https://localhost:44301/": "https://jeffmjonesgmail.onmicrosoft.com/TimeAPI",
    };

    
    adalProvider.init({
        instance: 'https://login.microsoftonline.com/',
        tenant: 'jeffmjonesgmail.onmicrosoft.com',
        clientId: '5cd4fc81-503c-4dec-bd43-a722bc765e97',
        extraQueryParameter: 'nux=1',
        endpoints: endpoints
        //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.  
        // Also, token acquisition for the To Go API will fail in IE when running on localhost, due to IE security restrictions.
    }, $httpProvider);
    

}]);


