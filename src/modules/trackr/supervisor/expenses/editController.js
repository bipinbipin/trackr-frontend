define([], function() {
    'use strict';
    return ['$scope', 'report', 'expenses', 'trackr.services.travelExpenseReport', '$state',
        function($scope, report, expenses, TravelExpenseReportService, $state) {
            /**
             * Recalculate the sum of the cost of the expenses
             * @param  expenses An array of expenses, each must have the property "cost".
             * @return The sum of all costs.
             */
            function recalculateTotal(expenses) {
                return expenses.reduce(function(prev, expense) {
                    return prev + parseFloat(expense.cost);
                }, 0);
            }

            $scope.report = report;
            $scope.totalCost = recalculateTotal(expenses);

            $scope.accept = function(report) {
                TravelExpenseReportService.approve(report).then(function() {
                    $state.go('trackr.supervisor.expenses', null, { reload: true });
                });
            };

            $scope.reject = function(report) {
                TravelExpenseReportService.reject(report).then(function() {
                    $state.go('trackr.supervisor.expenses', null, { reload: true });
                });
            };
        }];
});