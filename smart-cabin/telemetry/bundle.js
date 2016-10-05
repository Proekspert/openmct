define([
    'legacyRegistry',
    './src/CabinTelemetryServerAdapter',
    './src/CabinTelemetryDweetAdapter',
    './src/CabinTelemetryInitializer',
    './src/CabinTelemetryModelProvider'
], function (
    legacyRegistry,
    CabinTelemetryServerAdapter,
    CabinTelemetryDweetAdapter,
    CabinTelemetryInitializer,
    CabinTelemetryModelProvider
) {
    legacyRegistry.register("smart-cabin/telemetry", {
        "name": "Smart Cabin Telemetry Adapter",
        "extensions": {
            "types": [
                {
                    "name": "Smart Cabin",
                    "key": "smartcabin.cabin",
                    "glyph": "o"
                },
                {
                    "name": "Subsystem",
                    "key": "smartcabin.subsystem",
                    "glyph": "o",
                    "model": { "composition": [] }
                },
                {
                    "name": "Measurement",
                    "key": "smartcabin.measurement",
                    "glyph": "T",
                    "model": { "telemetry": {} },
                    "telemetry": {
                        "source": "smartcabin.source",
                        "domains": [
                            {
                                "name": "Time",
                                "key": "timestamp"
                            }
                        ]
                    }
                }
            ],
            "roots": [
                {
                    "id": "smartcabin",
                    "priority": "preferred",
                    "model": {
                        "type": "smartcabin.cabin",
                        "name": "Smart Cabin",
                        "composition": []
                    }
                }
            ],
            "services": [
                {
                    "key": "smartcabin.local-adapter",
                    "implementation": CabinTelemetryServerAdapter,
                    "depends": [ "$q", "CABIN_WS_URL" ]
                },
                {
                    "key": "smartcabin.dweet-adapter",
                    "implementation": CabinTelemetryDweetAdapter,
                    "depends": [ "$q", "THING_NAME" ]
                }
            ],
            "constants": [
                {
                    "key": "CABIN_WS_URL",
                    "priority": "fallback",
                    "value": "ws://localhost:8081"
                },
                {
                    "key": "THING_NAME",
                    "priority": "fallback",
                    "value": "CC3200-smart-cabin-demo"
                }
            ],
            "runs": [
                {
                    "implementation": CabinTelemetryInitializer,
                    "depends": [ "smartcabin.dweet-adapter", "objectService" ]
                }
            ],
            "components": [
                {
                    "provides": "modelService",
                    "type": "provider",
                    "implementation": CabinTelemetryModelProvider,
                    "depends": [ "smartcabin.dweet-adapter", "$q" ]
                },
                {
                    "provides": "telemetryService",
                    "type": "provider",
                    "implementation": "CabinTelemetryProvider.js",
                    "depends": [ "smartcabin.dweet-adapter", "$q" ]
                }
            ]
        }
    });
});
