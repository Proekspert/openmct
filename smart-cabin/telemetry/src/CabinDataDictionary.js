/*global define*/

define(
    [],
    function () {
        return {
            "name": "CC3200 Launchpad",
            "identifier": "smartcabin",
            "instruments": [
                {
                    "name":"TMP006",
                    "identifier": "tmp006",
                    "measurements": [
                        {
                            "name": "Temperature",
                            "identifier": "temperature",
                            "units": "degrees",
                            "type": "float"
                        }
                    ]
                },
                {
                    "name":"Accelerometer",
                    "identifier":"accelerometer",
                    "measurements": [
                        {
                            "name": "Accelerometer (X)",
                            "identifier": "accelerometer.x",
                            "units": "",
                            "type": "int"
                        },
                        {
                            "name": "Accelerometer (Y)",
                            "identifier": "accelerometer.y",
                            "units": "",
                            "type": "int"
                        },
                        {
                            "name": "Accelerometer (Z)",
                            "identifier": "accelerometer.z",
                            "units": "",
                            "type": "int"
                        }
                    ]
                }
            ]
        };
    }
);
