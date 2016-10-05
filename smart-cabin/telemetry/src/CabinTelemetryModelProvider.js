/*global define*/

define(
    function () {
        "use strict";

        var PREFIX = "cabin_tlm:";

        function CabinTelemetryModelProvider(adapter, $q) {
            var modelPromise, empty = $q.when({});

            // Check if this model is in our dictionary (by prefix)
            function isRelevant(id) {
                return id.indexOf(PREFIX) === 0;
            }

            // Build a domain object identifier by adding a prefix
            function makeId(key) {
                return PREFIX + key;
            }

            // Create domain object models from this dictionary
            function buildTaxonomy(dictionary) {
                var models = {};

                models[makeId("sensors")] = {
                    type: "smartcabin.subsystem",
                    name: "Sensors",
                    composition: []
                };

                // Create & store a domain object model for a subsystem
                function addMeasurement(prop, value) {
                    models[makeId(prop)] = {
                        type: "smartcabin.measurement",
                        name: prop.toUpperCase(),
                        telemetry: {
                            key: prop,
                            ranges: [{
                                key: "value",
                                name: "Value",
                                units: "degrees",
                                format: "number"
                            }]
                        }
                    };
                }

                for(var prop in dictionary.content) {
                    models[makeId("sensors")].composition.push(makeId(prop));
                    addMeasurement(prop, dictionary.content[prop]);
                }

                return models;
            }

            // Begin generating models once the dictionary is available
            modelPromise = adapter.dictionary().then(buildTaxonomy);

            return {
                getModels: function (ids) {
                    // Return models for the dictionary only when they
                    // are relevant to the request.
                    return ids.some(isRelevant) ? modelPromise : empty;
                }
            };
        }

        return CabinTelemetryModelProvider;
    }
);