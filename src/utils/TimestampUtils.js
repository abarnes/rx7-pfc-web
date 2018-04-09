import moment from 'moment';

export const timestampToFormattedDate = (timestamp) => {
    if (!timestamp || typeof timestamp !== "number") {
        return "";
    }

    return moment(timestamp).format("M/D/Y");
};

export const timestampToFormattedTime = (timestamp) => {
    if (!timestamp || typeof timestamp !== "number") {
        return "";
    }

    return moment(timestamp).format("h:mma ss.SSS [seconds]");
};

export const findClosestTimestampInArray = (timestamp, timestampArray) => {
    if (!timestampArray || !timestamp || !timestampArray.length) {
        return 0;
    }

    if (typeof timestampArray[timestamp] !== "undefined") {
        return timestamp;
    } else {
        // return timestampArray.reduce((prev, curr) => curr - timestamp < prev - timestamp ? curr : prev);
        for (let i = 0; i < timestampArray.length; i++) {
            if (timestampArray[i] > timestamp) {
                return (i === 0) ? timestampArray[0] : timestampArray[i - 1];
            }
        }
    }
}