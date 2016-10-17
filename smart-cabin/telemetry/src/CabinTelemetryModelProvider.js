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
            function makeId(element) {
                return PREFIX + element.identifier;
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
                function addMeasurement(measurement) {
                    models[makeId(measurement)] = {
                        type: "smartcabin.measurement",
                        name: measurement.name,
                        telemetry: {
                            key: measurement.identifier,
                            ranges: [{
                                key: "value",
                                name: measurement.units,
                                units: measurement.units,
                                format: "number"
                            }]
                        }
                    };
                }

                function addInstrument(subsystem) {
                    var measurements = (subsystem.measurements || []),
                        instrumentId = makeId(subsystem);

                    models[instrumentId] = {
                        type: "smartcabin.instrument",
                        name: subsystem.name,
                        composition: measurements.map(makeId)
                    };
                    measurements.forEach(function(measurement) {
                        addMeasurement(measurement, instrumentId);
                    });
                }

                (dictionary.instruments || []).forEach(function(instrument) {
                    addInstrument(instrument);
                });
                return models;
            }

            return {
                getModels: function (ids) {
                    return ids.some(isRelevant) ? buildTaxonomy(adapter.dictionary) : {};
                }
            };
        }

        return CabinTelemetryModelProvider;
    }
);