import { SELECT_TIMESTAMP, ADD_DATAPOINT, REPLACE_DATAPOINTS, CLEAR_DATA } from '@/store/actions'

const DATAPOINT = {
  // basic
  injectorDuty: 0,
  leadingIgnition: 0,
  trailingIgnition: 0,
  rpm: 0,
  speed: 0,
  boost: 0,
  knock: 0,
  waterTemp: 0,
  airTemp: 0,
  batteryVoltage: 0,

  // advanced
  intakePressure: 0,            // pressure at intake manifold
  mapSensorVoltage: 0,          // MAP sensor voltage
  tpsVoltage:0,                 // TPS sensor voltage 
  primaryInjectorPulse: 0,      // primary injector pulse width
  fuelCorrection: 0,            // fuel correction 
  leadingIgnition: 0,
  trailingIgnition: 0,
  fuelTemp: 0,
  mopPosition: 0,               // metering oil pump position
  boostTP: 0,                   // boost duty (tp)
  boostWG: 0,                   // boost duty (wastegate)
  intakeTemp: 0,
  iscvDuty: 0,                  // bypass air control valve (Idle speed control valve) duty
  o2Voltage: 0,
  secondaryInjectorPulse: 0,    // injector pulse width

  // sensors
  mapSensorVoltage: 0,
  tpsFullRangeVoltage: 0,
  tpsNarrowRangeVoltage: 0,
  mopPositionSensorVoltage: 0,
  waterTempSensorVoltage: 0,
  intakeAirTempSensorVoltage: 0,
  fuelTempSensorVoltage: 0,

  starterSwitch: false,
  airConditioningSwitch: false,
  powerSteeringPressureSwitch: false,
  neutralSwitch: false,
  clutchSwitch: false,
  stopSwitch: false,
  catalyzerThermoSensorSwitch: false,
  electricalLoadSwitch: false,
  exhaustTempWarningIndicator: false,
  fuelPumpOperation: false,
  fuelPumpControl: false,
  airPumpRelay: false,
  portAirControl: false,
  chargeControl: false,
  turboControl: false,
  pressureRegulatorControl: false
};

const state = {
  currentTimestamp: 0,
  currentData: Object.assign({}, DATAPOINT),
  data: [],
  timestamps: []
};

const mutations = {

  ADD_DATAPOINT (state, payload) {
    console.log("here", payload);
    if (payload && typeof payload === "object") {
      state.data.push(payload);
      state.timestamps.push(payload.timestamp);
      state.currentTimestamp = payload.timestamp;
      state.currentData = payload;
    }
  },

  REPLACE_DATA (state, payload) {
    if (payload && payload.length) {
      state.data = payload;
      let timestamps = [];
      for (let datapoint of payload) {
        timestamps.push(datapoint.timestamp);
      }
      state.timestamps = timestamps;
      state.currentTimestamp = payload[0].timestamp;
      state.currentData = payload[0];
    }

    /*
    for (let item in payload) {
      if (typeof state[item] !== "undefined") {
        state = payload[item];
      }
    }
    */
  },

  SELECT_TIMESTAMP (state, payload) {
    const index = state.timestamps.indexOf(payload);
    if (index >= 0) {
      state.currentTimestamp = payload;
      state.currentData = state.data[index];
    }
  },

  CLEAR_DATA (state) {
    state.currentTimestamp = 0;
    state.currentData = {};
    state.data = [];
    state.timestamps = [];
  }

}

const actions = {
  /*
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  }
  */
}

export default {
  state,
  mutations,
  actions
}
