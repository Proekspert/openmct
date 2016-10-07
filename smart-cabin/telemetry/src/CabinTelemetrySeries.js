/*global define*/

define(
    function () {
        "use strict";

        function CabinTelemetrySeries(data, prop) {
            return {
                getPointCount: function () {
                    return data.length;
                },
                getDomainValue: function (index) {
                    return (data[index] || {}).timestamp;
                },
                getRangeValue: function (index) {
                    var result = (data[index] || {}).data;
                    return result[prop];
                }
            };
        }

        return CabinTelemetrySeries;
    }
);