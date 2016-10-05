/*global define,WebSocket*/

define(
    ['dweetio'],
    function () {
        "use strict";

        function CabinTelemetryDweetAdapter($q, thingName) {
            var listeners = [],
                dictionary = $q.defer();

            // Handle an incoming message from the server
            dweetio.listen_for(thingName, function(dweet) {
                dictionary.resolve(dweet);
                listeners.forEach(function (listener) {
                    listener(dweet);
                });
            });

            return {
                dictionary: function () {
                    return dictionary.promise;
                },
                listen: function (callback) {
                    listeners.push(callback);
                }
            };
        }

        return CabinTelemetryDweetAdapter;
    }
);
