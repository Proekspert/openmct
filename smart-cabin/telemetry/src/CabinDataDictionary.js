/*global define*/

define(
    [],
    function () {
        return {
            "name": "Smart Cabin Prototype",
            "identifier": "smartcabin",
            "instruments": [
                {
                    "name":"CC3200 Launchpad",
                    "identifier": "launchpad",
                    "measurements": [
                        {
                            "name": "Temperature",
                            "identifier": "temperature",
                            "units": "degrees",
                            "type": "float"
                        }
                    ]
                }
            ]
        };
    }
);
