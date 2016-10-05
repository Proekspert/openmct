/*global define*/

define(
    function () {
        "use strict";

        var TAXONOMY_ID = "smartcabin",
            PREFIX = "cabin_tlm:";

        function CabinTelemetryInitializer(adapter, objectService) {
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
                            model.name = dictionary.thing;
                            model.composition = [PREFIX + "sensors"];
                        }
                    );
                }

                // Look up My Cabin, and populate it accordingly.
                objectService.getObjects([TAXONOMY_ID])
                    .then(getTaxonomyObject)
                    .then(populateModel);
            }

            adapter.dictionary().then(initializeTaxonomy);
        }

        return CabinTelemetryInitializer;
    }
);