define([
    'legacyRegistry',
    './src/CabinTelemetryServerAdapter',
    './src/CabinTelemetryInitializer',
    './src/CabinTelemetryModelProvider'
], function (
    legacyRegistry,
    CabinTelemetryServerAdapter,
    CabinTelemetryInitializer,
    CabinTelemetryModelProvider
) {
    legacyRegistry.register("smart-cabin/telemetry", {
        "name": "Smart Cabin Telemetry Adapter",
        "extensions": {
            "types": [
                {
                    "name": "Smart Cabin",
                    "key": "example.cabin",
                    "glyph": "o"
                },
                {
                    "name": "Subsystem",
                    "key": "example.subsystem",
                    "glyph": "o",
                    "model": { "composition": [] }
                },
                {
                    "name": "Measurement",
                    "key": "example.measurement",
                    "glyph": "T",
                    "model": { "telemetry": {} },
                    "telemetry": {
                        "source": "example.source",
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
                    "id": "example:sc",
                    "priority": "preferred",
                    "model": {
                        "type": "example.cabin",
                        "name": "Smart Cabin",
                        "composition": []
                    }
                }
            ],
            "services": [
                {
                    "key": "example.adapter",
                    "implementation": CabinTelemetryServerAdapter,
                    "depends": [ "$q", "CABIN_WS_URL" ]
                }
            ],
            "constants": [
                {
                    "key": "CABIN_WS_URL",
                    "priority": "fallback",
                    "value": "ws://localhost:8081"
                }
            ],
            "runs": [
                {
                    "implementation": CabinTelemetryInitializer,
                    "depends": [ "example.adapter", "objectService" ]
                }
            ],
            "components": [
                {
                    "provides": "modelService",
                    "type": "provider",
                    "implementation": CabinTelemetryModelProvider,
                    "depends": [ "example.adapter", "$q" ]
                },
                {
                    "provides": "telemetryService",
                    "type": "provider",
                    "implementation": "CabinTelemetryProvider.js",
                    "depends": [ "example.adapter", "$q" ]
                }
            ]
        }
    });
});
