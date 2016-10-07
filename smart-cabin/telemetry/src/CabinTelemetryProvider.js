/*global define*/

define(
    ['./CabinTelemetrySeries'],
    function (CabinTelemetrySeries) {
        "use strict";

        var SOURCE = "smartcabin.source";

        function CabinTelemetryProvider(adapter, $q) {
            var subscribers = {};

            // Used to filter out requests for telemetry
            // from some other source
            function matchesSource(request) {
                return (request.source === SOURCE);
            }

            // Listen for data, notify subscribers
            adapter.listen(function (message) {
                console.log(message)
                var packaged = {};
                packaged[SOURCE] = {};

                for(var prop in message.data) {
                    packaged[SOURCE][prop] = new CabinTelemetrySeries([message], prop);
                    (subscribers[prop] || []).forEach(function (cb) {
                        cb(packaged);
                    });
                }
            });

            return {
                requestTelemetry: function (requests) {
                    var packaged = {},
                        relevantReqs = requests.filter(matchesSource);

                    // Package historical telemetry that has been received
                    function addToPackage(payload) {
                        console.log('from history', payload)
                        packaged[SOURCE][payload.key] =
                            new CabinTelemetrySeries(payload.data.items, payload.key);
                    }

                    // Retrieve telemetry for a specific measurement
                    function handleRequest(request) {
                        var key = request.key;
                        return adapter.history(key).then(addToPackage);
                    }

                    packaged[SOURCE] = {};
                    return $q.all(relevantReqs.map(handleRequest))
                        .then(function () { return packaged; });
                },
                subscribe: function (callback, requests) {
                    var keys = requests.filter(matchesSource)
                       .map(function (req) { return req.key; });

                   function notCallback(cb) {
                       return cb !== callback;
                   }

                   function unsubscribe(key) {
                       subscribers[key] =
                           (subscribers[key] || []).filter(notCallback);
                   }

                   keys.forEach(function (key) {
                       subscribers[key] = subscribers[key] || [];
                       subscribers[key].push(callback);
                   });

                   return function () {
                       keys.forEach(unsubscribe);
                   };
                }
            };
        }

        return CabinTelemetryProvider;
    }
);