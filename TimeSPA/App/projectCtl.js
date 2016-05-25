angular.module('timeApp')
.controller('projectCtl', ['$scope', 'breeze', '$q', function ($scope, breeze, $q) {
    var vm = $scope;

    vm.add = function () {
        //default values
        var values = { name: 'new project', approver: 'me' }
        vm.manager.createEntity('Project', values);
        vm.refresh();
    }
}]);