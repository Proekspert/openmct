/*global define,WebSocket*/

define(
    [
         "./CabinDataDictionary",
        'ably'
    ],
    function (CabinDataDictionary) {
        "use strict";

        function CabinTelemetryAblyAdapter($q, apiKey, channelName) {
            this.listeners = [];
            this.deferred = $q.defer();
            var self = this;

            var realtime = new Ably.Realtime(apiKey);
            this.channel = realtime.channels.get(channelName);

            this.channel.subscribe(function(message) {
                self.listeners.forEach(function (listener) {
                    listener(message);
                });
            });
        }

        CabinTelemetryAblyAdapter.prototype.requestHistory = function(id) {
            var self = this;
            this.channel.history({ direction: "forwards" }, function(err, resultPage) {
                self.deferred.resolve({ key: id, data: resultPage });
            });
            return this.deferred.promise;
        }

        CabinTelemetryAblyAdapter.prototype.listen = function(callback) {
            this.listeners.push(callback);
        }

        CabinTelemetryAblyAdapter.prototype.history = function(id) {
            return this.requestHistory(id);    
        }

        CabinTelemetryAblyAdapter.prototype.dictionary = CabinDataDictionary;

        return CabinTelemetryAblyAdapter;
    }
);
