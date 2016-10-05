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
                    "key": "sc.events-panel",
                    "name": "Smart Cabin Events Panel",
                    "glyph": "2",
                    "description": "",
                    "features": ["creation"],
                    "model": {
                        "tasks": [
                            { "description": "Add a type", "completed": true },
                            { "description": "Add a view" }
                        ]
                    }
                }
          ],
           "views": [
                {
                    "key": "sc.events-panel",
                    "type": "sc.events-panel",
                    "glyph": "2",
                    "name": "List",
                    "templateUrl": "templates/view.html",
                    "editable": true,
                    "toolbar": {
                        "sections": [
                            {
                                "items": [
                                    {
                                        "text": "Add Task",
                                        "glyph": "+",
                                        "method": "addTask",
                                        "control": "button"
                                    }
                                ]
                            },
                            {
                                "items": [
                                    {
                                        "glyph": "Z",
                                        "method": "removeTask",
                                        "control": "button"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ],
            "controllers": [
                {
                    "key": "EventsController",
                    "implementation": EventsController,
                    "depends": [ "$scope" ]
                }
            ]
        }
    });
});