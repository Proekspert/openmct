define([
    'legacyRegistry',
    './src/CabinTelemetryServerAdapter',
    './src/CabinTelemetryDweetAdapter',
    './src/CabinTelemetryAblyAdapter',
    './src/CabinTelemetryInitializer',
    './src/CabinTelemetryModelProvider'
], function (
    legacyRegistry,
    CabinTelemetryServerAdapter,
    CabinTelemetryDweetAdapter,
    CabinTelemetryAblyAdapter,
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
                    "name": "Instrument",
                    "key": "smartcabin.instrument",
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
                },
                {
                    "key": "smartcabin.ably-adapter",
                    "implementation": CabinTelemetryAblyAdapter,
                    "depends": [ "$q", "ABLY_API_KEY", "CHANNEL_NAME" ]
                }
            ],
            "constants": [
                {
                    "key": "CABIN_WS_URL",
                    "priority": "fallback",
                    "value": "ws://localhost:8081"
                },
                {
                    "key": "ABLY_API_KEY",
                    "priority": "fallback",
                    "value": "uOIC-g.X3FDfQ:7SMkzSxyYVydbqTq"
                },
                {
                    "key": "CHANNEL_NAME",
                    "priority": "fallback",
                    "value": "cabin"
                }
            ],
            "runs": [
                {
                    "implementation": CabinTelemetryInitializer,
                    "depends": [ "smartcabin.ably-adapter", "objectService" ]
                }
            ],
            "components": [
                {
                    "provides": "modelService",
                    "type": "provider",
                    "implementation": CabinTelemetryModelProvider,
                    "depends": [ "smartcabin.ably-adapter", "$q" ]
                },
                {
                    "provides": "telemetryService",
                    "type": "provider",
                    "implementation": "CabinTelemetryProvider.js",
                    "depends": [ "smartcabin.ably-adapter", "$q" ]
                }
            ]
        }
    });
});
