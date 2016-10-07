/*global define*/

define(
    [],
    function () {
        return {
            "name": "Smart Cabin CC3200 Launchpad",
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
                            "name": "X",
                            "identifier": "accelerometer.x",
                            "units": "",
                            "type": "int"
                        },
                        {
                            "name": "Y",
                            "identifier": "accelerometer.y",
                            "units": "",
                            "type": "int"
                        },
                        {
                            "name": "Z",
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
