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
                    //var date = new Date((data[index] || {}).timestamp);
                    //console.log(date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds());
                    return (data[index] || {}).timestamp;
                },
                getRangeValue: function (index) {
                    return (data[index] || {}).data[prop];
                }
            };
        }

        return CabinTelemetrySeries;
    }
);