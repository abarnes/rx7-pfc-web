import { csvColumns } from '../config/CsvColumns';
import datalogitColumns from '../config/DatalogitTxtColumns';

export const convertCsvRowsToObject = (rows) => {
    let results = [];

    // Datalogit Format (first line is [13B-REW v5.08])
    const firstRow = rows[0].trim();
    if (rows.length > 1 && firstRow.charAt(0) === "[" && firstRow.charAt(firstRow.length - 1) === "]") {
        // second line defines which variables are logged
        let parsedColumns = [];
        const columns = rows[1].split("\t");
        for (let column of columns) {
            if (typeof datalogitColumns[column] !== "undefined") {
                parsedColumns.push(datalogitColumns[column]);
            } else if (column.length) {
                parsedColumns.push({
                    transform: null,
                    label: column.replace("\"", "").trim()
                });
            }
        }

        for (let i = 2; i < rows.length; i++) {
            const rowValues = rows[i].split("\t");
            let resultingObject = {};
            for (let [index, column] of parsedColumns.entries()) {
                resultingObject[column.label] = rowValues[index];
            }
            results.push(resultingObject)
        }

    } else {
        
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
    }

    return results;
};