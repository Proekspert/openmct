/*global define*/

define(
    function () {
        "use strict";

        function CabinTelemetrySeries(data) {
            return {
                getPointCount: function () {
                    return data.length;
                },
                getDomainValue: function (index) {
                    return data[index].created;
                },
                getRangeValue: function (index) {
                    return (data[index] || {}).content.temperature;
                }
            };
        }

        return CabinTelemetrySeries;
    }
);