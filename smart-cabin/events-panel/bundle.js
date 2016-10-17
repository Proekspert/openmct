define([
    'legacyRegistry',
    './src/controllers/EventsController'
], function (
    legacyRegistry,
    EventsController
) {
    legacyRegistry.register("smart-cabin/events-panel", {
        "name": "Events Panel",
        "description": "Allows to view events of a Smart Cabin.",
        "extensions":
        {
          "types": [
                {
                    "key": "smartcabin.events-panel",
                    "name": "Smart Cabin Events Panel",
                    "glyph": "2",
                    "description": "",
                    "features": ["creation"],
                    "model": {
                        "events": []
                    }
                }
          ],
           "views": [
                {
                    "key": "smartcabin.events-panel",
                    "type": "smartcabin.events-panel",
                    "glyph": "2",
                    "name": "List",
                    "templateUrl": "templates/view.html",
                }
            ],
            "controllers": [
                {
                    "key": "EventsController",
                    "implementation": EventsController,
                    "depends": [ "$scope", "objectService", "telemetryHandler" ]
                }
            ],
            "stylesheets": [
                {
                    "stylesheetUrl": "css/events-panel.css"
                }
            ]
        }
    });
});