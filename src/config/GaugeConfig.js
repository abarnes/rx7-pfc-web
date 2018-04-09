export const gauges = {
    rpm: {
        name: "RPM",
        stateKey: "rpm",
        transform: (value) => {
            return Math.round(value);
        },
        displaySuffix: null
    },
    boost: {
        name: "Boost",
        stateKey: "boost",
        transform: (value) => {
            return Math.round(mmHGToPsi(value));
        },
        displaySuffix: (value) => {
            return value > 0 ? (value + "PSI") : (value + "inHG");
        }
    },
    waterTemp: {
        name: "Water Temp",
        stateKey: "waterTemp",
        transform: (value) => {
            return Math.round(celciusToFahrenheit(value));
        },
        displaySuffix: (value) => {
            return value + "\u00B0"
        }
    },
    knock: {
        name: "Knock",
        stateKey: "knock",
        transform: (value) => {
            return Math.round(value);
        },
        displaySuffix: null
    },
    injectorDuty: {
        name: "Injector Duty",
        stateKey: "injectorDuty",
        transform: (value) => {
            return Math.round(value, 1);
        },
        displaySuffix: (value) => {
            return value + "%"
        }
    },
    speed: {
        name: "Speed",
        stateKey: "speed",
        transform: (value) => {
            return Math.round(kphToMph(value));
        },
        displaySuffix: (value) => {
            return value + " MPH"
        }
    },
    leadingIgnition: {
        name: "Leading Ignition",
        stateKey: "leadingIgnition",
        transform: (value) => {
            return Math.round(value, 1);
        },
        displaySuffix: (value) => {
            return value + "\u00B0"
        }
    },
    trailingIgnition: {
        name: "Trailing Ignition",
        stateKey: "trailingIgnition",
        transform: (value) => {
            return Math.round(value, 1);
        },
        displaySuffix: (value) => {
            return value + "\u00B0"
        }
    },
    airTemp: {
        name: "Air Temp",
        stateKey: "airTemp",
        transform: (value) => {
            return Math.round(celciusToFahrenheit(value));
        },
        displaySuffix: (value) => {
            return value + "\u00B0"
        }
    },
    batteryVoltage: {
        name: "Battery Voltage",
        stateKey: "batteryVoltage",
        transform: (value) => {
            return Math.round(value, 1);
        },
        displaySuffix: (value) => {
            return value + "V"
        }
    }
};

const celciusToFahrenheit = (value) => {
    return ((value * (9/5)) + 32);
}

const mmHGToPsi = (value) => {
    return (value === 0) ? 0 : (value / 51.715);
}

const kphToMph = (value) => {
    return (value * 1.6093);
}