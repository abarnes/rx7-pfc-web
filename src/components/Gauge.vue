<template>
    <div class="gauge" v-bind:class="{ warning: shouldDisplayWarning, critical: shouldDisplayCritical }">
        <line-chart :chart-data="chartData" :options="chartOptions" class="chart"></line-chart>
        <h3>{{ config.name }}</h3>
        <h1 v-html="displayValue"></h1>
    </div>
</template>

<script>
    import LineChart from '@/components/Gauge/LineChart.js'
    import { chartOptions } from '@/config/ChartOptionConfig'
    const moment = require('moment');

    const GRAPH_TIME_SECONDS = 30;

    export default {
        name: "Gauge",
        components: {
            LineChart
        },
        props: [
            "config"
        ],
        data () {
            return {
                chartData: [],
                chartOptions: chartOptions,
                shouldDisplayWarning: false,
                shouldDisplayCritical: false
            }
        },
        computed: {
            rawValue () {
                return this.$store.state.EngineData.currentData[this.config.stateKey];
            },
            displayValue () {
                return this.config.displaySuffix ? this.config.displaySuffix(this.transformValue(this.rawValue)) : this.transformValue(this.rawValue);
            },
            currentTimestamp () {
                return this.$store.state.EngineData.currentTimestamp;
            }
        },
        watch: {
            rawValue: function() {
                if (this.config.thresholds) {
                    this.handleThresholds();
                }
            },
            currentTimestamp () {
                if (this.config.showGraph !== false) {
                    this.chartData = this.updateChart();
                }
            }
        },
        mounted() {
            if (this.config.showGraph !== false) {
                this.chartData = this.setupGraphData(this.createInitialData());
            }
        },
        methods: {
            handleThresholds() {
                if (this.config.thresholds.critical && (this.config.thresholds.critical <= this.rawValue) && !this.shouldDisplayCritical) {
                    this.shouldDisplayCritical = true;
                    this.shouldDisplayWarning = false;
                } else if (this.config.thresholds.warning && (this.config.thresholds.warning <= this.rawValue) && !this.shouldDisplayWarning && !this.shouldDisplayCritical) {
                    this.shouldDisplayWarning = true;
                    this.shouldDisplayCritical = false;
                } else if (this.shouldDisplayWarning && (this.config.thresholds.warning > this.rawValue)) {
                    this.shouldDisplayWarning = false;
                } else if (this.shouldDisplayCritical && (this.config.thresholds.critical > this.rawValue)) {
                    this.shouldDisplayCritical = false;
                }
            },

            updateChart() {
                const currentTime = this.$store.state.EngineData.currentTimestamp;
                const minTime = currentTime - (GRAPH_TIME_SECONDS * 1000);
                let graphableDataPoints = [];
                const index = this.$store.state.EngineData.timestamps.indexOf(currentTime);
                for (let i = index; (i > (index - 30) || i === 0); i--) { // this doesn't work without timestamps
                    const datapoint = this.$store.state.EngineData.data[i];
                    if (datapoint && datapoint.timestamp >= minTime) {
                        // console.log(datapoint[this.config.stateKey], this.config.stateKey);
                        const graphPoint = {
                            x: (datapoint.timestamp > 1000000 ? moment(datapoint.timestamp) : moment(datapoint.timestamp, "X")),
                            y: this.transformValue(datapoint[this.config.stateKey])
                        };
                        graphableDataPoints.unshift(graphPoint);
                    } else {
                        break;
                    }
                }

                return this.setupGraphData(graphableDataPoints);
            },

            setupGraphData(data) {
                return {
                    datasets: [
                        {
                            label: '',
                            backgroundColor: '#022349',
                            fill: "bottom",
                            data: data,
                            spanGaps: true/*,
                            cubicInterpolationMode: "monotone"*/
                        }
                    ]
                }
            },

            transformValue(value) {
                return this.config.transform ? this.config.transform(value) : this.value;
            },

            createInitialData() {
                if (!GRAPH_TIME_SECONDS) {
                    return [];
                }

                let array = [];
                const now = Date.now();
                const transformedValue = this.transformValue(this.rawValue);

                for (var i = GRAPH_TIME_SECONDS; i > 0; i--) {
                    array.push({
                        x: moment(now - (i * 1000)),
                        y: transformedValue
                    });
                }

                return array;
            }
        }
    }
</script>

<style scoped>
    .gauge {
        padding: 10px;
        text-align: center;
        width: 33%;
        box-sizing: border-box;
        min-width: 100px;
        position: relative;
    }

    .warning {
        background-color: yellow;
    }

    .critical {
        background-color: #F92726;
    }

    h1 {
        position: relative;
        z-index: 5;
        line-height: 2.9em;
        font-size: 3em;
    }

    h3 {
        position: relative;
        z-index: 5;
        /*color: #888;*/
        font-size: 18px;
        font-weight: initial;
        letter-spacing: .25px;
        margin-top: 10px;
    }

    .chart {
        position: absolute;
        opacity: 0.5;
        z-index: 0;
        left: -5%;
        width:100%; 
        max-height:100%;
        padding:5px;
        box-sizing: border-box;
    }
</style>
