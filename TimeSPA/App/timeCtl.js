angular.module('timeApp')
.controller('timeCtl', ['$scope', 'breeze', '$q', function ($scope,  breeze, $q) {
    var vm = $scope;

    //approval mode
    //REM vm.approve = $location.search()['approve'];
    vm.timeCodes = [{ name: 'Regular' }, { name: 'Vacation' }, { name: 'Sick' }];
    //REM vm.rows = [{ 'sat': 0, 'sun': 0, 'mon': 0, 'tue': 0, 'wed': 0, 'thr': 0, 'fri': 0 }];

    //create
    vm.newTimesheet = function () {
        var values = { 'author': vm.current.login, 'weekEnding': vm.current.week };
        vm.manager.createEntity('Timesheet', values);
    };
    vm.addRow = function () {
        var values = { timesheetID: vm.timesheet.iD, 'sat': 0, 'sun': 0, 'mon': 0, 'tue': 0, 'wed': 0, 'thu': 0, 'fri': 0 };
        var obj = vm.manager.createEntity('Timerow', values);
        manager.saveChanges();
    };

    //total hours
    vm.totalRow = function (row) {
        return row.sat + row.sun + row.mon + row.tue + row.wed + row.thu + row.fri;
    };
    vm.totalCol = function (dayOfWeek) {
        var c = 0;
        angular.forEach(vm.rows, function (row) {
            switch (dayOfWeek) {
                case 'sat': c += row.sat; break;
                case 'sun': c += row.sun; break;
                case 'mon': c += row.mon; break;
                case 'tue': c += row.tue; break;
                case 'wed': c += row.wed; break;
                case 'thu': c += row.thu; break;
                case 'fri': c += row.fri; break;
                case 'all': c += row.sat + row.sun + row.mon + row.tue + row.wed + row.thu + row.fri; break;
            }
        });
        return c;
    };

    //navigate week
    vm.prevWeek = function () {
        vm.current.week = moment(vm.current.week).add(-7, 'days').format('L');
        vm.refresh();
    };

    vm.nextWeek = function () {
        vm.current.week = moment(vm.current.week).add(7, 'days').format('L');
        vm.refresh();
    };

    //init
    vm.init = function () {

    };
    vm.init();
}]);