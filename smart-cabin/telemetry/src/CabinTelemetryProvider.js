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
                var packaged = {};
                packaged[SOURCE] = {};
                packaged[SOURCE]["temperature"] =
                    new CabinTelemetrySeries([message]);
                (subscribers["temperature"] || []).forEach(function (cb) {
                    console.log(packaged)
                    cb(packaged);
                });
            });

            return {
                requestTelemetry: function (requests) {
                    var packaged = {},
                        relevantReqs = requests.filter(matchesSource);

                    // Package historical telemetry that has been received
                    function addToPackage(measurement) {
                        packaged[SOURCE]["temperature"] =
                            new CabinTelemetrySeries(measurement);
                    }

                    // Retrieve telemetry for a specific measurement
                    function handleRequest(request) {
                        console.log("Retrieve telemetry for a specific measurement", request.key);
                        var key = request.key;
                        return adapter.dictionary().then(addToPackage);
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