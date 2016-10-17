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
            this.cache = undefined;
            this.$q = $q;
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
            return this.cache
                ? this.$q.when({ key: id, data: this.cache })
                : this.$q(function(resolve, reject){    
                    self.channel.history({ direction: "forwards" }, function(err, resultPage) {
                        if (err) {
                            reject(err);
                        } else {
                            var result = { key: id, data: resultPage }; 
                            self.cache = resultPage;
                            resolve(result);
                        }
                    });
            }); 
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
