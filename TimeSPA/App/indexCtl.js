angular.module('timeApp')
.controller('indexCtl', ['$scope', 'breeze', '$q', '$http', 'adalAuthenticationService', function ($scope, breeze, $q, $http, adalService) { //  

    var vm = $scope;
    vm.current = {};

    //ADAL
    vm.login = function () {
        adalService.login();
    };
    vm.logout = function () {
        adalService.logOut();
    };

    //fetch data
    vm.getProject = function () {
        return breeze.EntityQuery.from('Project')
            //.expand('Timerow')
            .using(vm.manager)
            .execute(function (d) {
                //results
                vm.project = d.results;
            });
    };
    vm.getTimesheet = function () {
        var p1 = new breeze.Predicate('weekEnding', 'eq', moment(vm.current.week).format("YYYY-MM-DD"));
        var p2 = new breeze.Predicate('author', 'eq', vm.current.login);
        var qry = breeze.EntityQuery.from('Timesheet')
            .where(p1.and(p2))
            .expand('timerow')
            .using(vm.manager)
            .execute(function (d) {
                //results
                vm.timesheet = d.results[0];
            });
    };

    //save and refresh
    vm.saveIfChanges = function () {
        return $q(function (resolve, reject) {
            if (vm.manager._hasChanges) {
                vm.manager.saveChanges();
                toastr.success('Saved Changes');
                resolve();
            } else {
                resolve();
            }
        });
    };
    vm.refresh = function () {
        return vm.saveIfChanges()
            .then(vm.getProject)
            .then(vm.getTimesheet)
        .then(vm.getTimerow);
    };

    //delete row
    vm.delete = function (obj) {
        obj.entityAspect.setDeleted(); // mark for deletion
        vm.refresh();
    };

    //save timer
    vm.saveWorker = function () {
        if (vm.manager._hasChanges) {
            vm.refresh();
        }
    };
    window.setInterval(vm.saveWorker, 2000);

    //init
    vm.init = function () {
        //Breeze Caml and Manager
        breeze.NamingConvention.camelCase.setAsDefault();
        vm.manager = new breeze.EntityManager('https://localhost:44301/breeze/Time');
        vm.refresh();

        $http.get('https://localhost:44301/breeze/Time/Project').then(function (resp) {
            vm.project = resp.data;
        });

        //current user
        vm.current.login = 'user1';

        //next Friday
        if (!vm.current.week) {
            var nextFri = timesheet.getNextDayOfWeek(new Date(), 5);
            vm.current.week = moment(nextFri).format('L');
        }

        //toastr notify
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "200",
            "hideDuration": "300",
            "timeOut": "2000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };
    };
    vm.init();
}]);