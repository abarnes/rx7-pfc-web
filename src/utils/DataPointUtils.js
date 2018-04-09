import moment from 'moment';

export const getTimestampedDataForItem = (item, parentDataArray) => {
    let response = {};

    if (!item  || !parentDataArray || !parentDataArray || !parentDataArray.length || typeof parentDataArray[0][item] === "undefined") {
        return response;
    }

    for (const datapoint of parentDataArray) {
        response[datapoint.timestamp] = datapoint[item];
    }

    return response;
}

export const dataPointsForItemToGraphable = (datapoints) => {
    if (!datapoints) {
        return [];
    }

    return Object.keys(datapoints).map(e => ({ x: moment(parseInt(e, 10)), y: datapoints[e]}));
}