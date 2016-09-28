define(function () {
    function EventsController($scope) {
        var showAll = true,
            showCompleted;

        // Persist changes made to a domain object's model
        function persist() {
            var persistence = 
                $scope.domainObject.getCapability('persistence');
            return persistence && persistence.persist();
        }

        // Change which tasks are visible
        $scope.setVisibility = function (all, completed) {
            showAll = all;
            showCompleted = completed;
        };

        // Toggle the completion state of a task
        $scope.toggleCompletion = function (taskIndex) {
            $scope.domainObject.useCapability('mutation', function (model) {
                var task = model.tasks[taskIndex];
                task.completed = !task.completed;
            });
            persist();
        };

        // Check whether a task should be visible
        $scope.showTask = function (task) {
            return showAll || (showCompleted === !!(task.completed));
        };
    }

    return EventsController;
});