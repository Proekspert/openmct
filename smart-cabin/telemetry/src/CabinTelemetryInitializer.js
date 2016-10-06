/*global define*/

define(
    function () {
        "use strict";

        var TAXONOMY_ID = "smartcabin",
            PREFIX = "cabin_tlm:";

        function CabinTelemetryInitializer(adapter, objectService) {
            function makeId(element) {
                return PREFIX + element.identifier;
            }

            // When the dictionary is available, add all subsystems
            // to the composition of My Spacecraft
            function initializeTaxonomy(dictionary) {
                // Get the top-level container for dictionary objects
                // from a group of domain objects.
                function getTaxonomyObject(domainObjects) {
                    return domainObjects[TAXONOMY_ID];
                }
                
                // Populate
                function populateModel(taxonomyObject) {
                    return taxonomyObject.useCapability(
                        "mutation",
                        function (model) {
                            model.name = dictionary.name;
                            model.composition = dictionary.instruments.map(makeId);
                        }
                    );
                }
                objectService.getObjects([TAXONOMY_ID])
                    .then(getTaxonomyObject)
                    .then(populateModel);
            }
            initializeTaxonomy(adapter.dictionary);
        }

        return CabinTelemetryInitializer;
    }
);