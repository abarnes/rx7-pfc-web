import { csvColumns } from '../config/CsvColumns';

export const convertCsvRowsToObject = (rows) => {
    let results = [];
    for (let row of rows) {
        if (row && typeof row === "string") {
            const items = row.split(",");
            let resultingObject = {};
            for (var i = 0; i < csvColumns.length; i++) {
                const parsedValue = (items[i].indexOf(".") >= 0) ? parseFloat(items[i]) : parseInt(items[i], 10);
                resultingObject[csvColumns[i]] = parsedValue; 
            }

            results.push(resultingObject);
        }
    }

    return results;
};