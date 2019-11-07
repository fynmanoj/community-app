(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewReportController: function (scope, routeParams, resourceFactory, location, $uibModal, route) {
            resourceFactory.reportsResource.getReportDetails({id: routeParams.id}, function (data) {
                scope.report = data;
                scope.noncoreReport = data.coreReport == true ? false : true;
            });
            scope.deletereport = function () {
                $uibModal.open({
                    templateUrl: 'deletenoncorereport.html',
                    controller: NoncoreReportDeleteCtrl
                });
            };
            var NoncoreReportDeleteCtrl = function ($scope, $uibModalInstance) {
                $scope.delete = function () {
                    resourceFactory.reportsResource.delete({id: routeParams.id}, {}, function (data) {
                        $uibModalInstance.close('delete');
                        location.path('/reports');
                    });
                };
                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            };
            scope.disableReport = function(){
                resourceFactory.reportsResource.update({id: routeParams.id, command:"disable"}, {}, function (data) {
                    route.reload();
                });
            }
            scope.enableReport = function(){
                resourceFactory.reportsResource.update({id: routeParams.id, command:"enable"},{}, function (data) {
                    route.reload();
                });
            }
        }
    });
    mifosX.ng.application.controller('ViewReportController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$uibModal', '$route', mifosX.controllers.ViewReportController]).run(function ($log) {
        $log.info("ViewReportController initialized");
    });
}(mifosX.controllers || {}));
