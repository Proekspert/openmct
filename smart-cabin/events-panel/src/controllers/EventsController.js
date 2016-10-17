define(
    ['moment'],
    function (moment) {

        var PREFIX = "cabin_tlm:";

        function EventsController($scope, objectService, telemetryHandler) {
            var self = this,
                handles = [];
            
            function releaseSubscription(id) {
                if (handles[id]) {
                    handles[id].unsubscribe();
                    handles[id] = undefined;
                }
            }

            function telemetryCallback(val) {
                console.log(val)
                for (key in handles) {
                    var handle = handles[key];
                    handle.getTelemetryObjects().forEach(function(obj) {
                        $scope.domainObject.useCapability('mutation', function (model) {
                            var timestamp = handle.getDomainValue(obj);
                            var value = handle.getRangeValue(obj);
                            if (value) {
                                model.events.push({
                                    time: moment(timestamp).format('hh:mm:ss'),
                                    description: obj.model.name + ': ' + value
                                });
                            }
                        });
                    });
                };
            }

            // Create a new subscription; telemetrySubscriber gets
            // to do the meaningful work here.
            function subscribe(id, domainObject) {
                releaseSubscription(id);
                self.domainObject = domainObject;
                handles[id] = domainObject && telemetryHandler.handle(
                    domainObject,
                    telemetryCallback,
                    true // Lossless
                );
            }
 
            objectService.getObjects([
                PREFIX + 'temperature',
                PREFIX + 'accelerometer.x',
                PREFIX + 'accelerometer.y',
                PREFIX + 'accelerometer.z', 
            ]).then(function(objectSet) { 
                for(var key in objectSet) {
                    subscribe(key, objectSet[key]); 
                }
            });

            // Unsubscribe when the plot is destroyed
            $scope.$on("$destroy", releaseSubscription);

            // Persist changes made to a domain object's model
            function persist() {
                var persistence = 
                    $scope.domainObject.getCapability('persistence');
                return persistence && persistence.persist();
            }
        }

        return EventsController;
    }
);