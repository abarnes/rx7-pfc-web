<template>
    <div class="TimestampSelector" v-if="shouldRender">
        <h2 class="time">{{ time }}</h2>
        <p class="date">{{ date }}</p>
        <input class="TimestampSelector-range" type="range" v-bind:min="min" v-bind:max="max" v-bind:defaultValue="min" step="1" list="timestampTicks" @input="handleTimestampChange"/>
        <datalist id="timestampTicks">
            <!-- {[...Array(NUMBER_OF_MARKERS)].map((object, i) => <option key={i}>{ Math.round(this.min + (this.chunk * i)) }</option> )} -->
            <option>{{ max }}</option>
        </datalist>
    </div>
</template>


<script>
import { timestampToFormattedDate, timestampToFormattedTime, findClosestTimestampInArray } from '@/utils/TimestampUtils';
import { SELECT_TIMESTAMP } from '@/store/actions.js'

const NUMBER_OF_MARKERS = 10;

let handler;

export default {
    name: 'TimestampSelector',
    data () {
        return {
            date: "",
            time: "",
            min: 0,
            max: 100,
            chunk: 10
        }
    },
    computed: {
        currentTimestamp() {
            return this.$store.state.EngineData.currentTimestamp;
        },
        timestamps() {
            return this.$store.state.EngineData.timestamps;
        },
        shouldRender() {
            return this.$store.state.EngineData.timestamps.length > 0;
        }
    },
    watch: {
        currentTimestamp() {
            this.computeDate();
            this.computeTime();
        },
        timestamps() {
            this.computeMin();
            this.computeMax();
            this.computeChunk();
        }
    },
    methods: {
        handleTimestampChange(e) {
            handler = setTimeout(() => {
              const selectedTime = parseInt(e.target.value, 10);
              this.$store.commit(SELECT_TIMESTAMP, findClosestTimestampInArray(selectedTime, this.timestamps));
            }, 200);
        },

        computeDate() {
            this.date = timestampToFormattedDate(this.currentTimestamp);
        },

        computeTime() {
            this.time = timestampToFormattedTime(this.currentTimestamp);
        },

        computeMin() {
            this.min = this.timestamps.length ? parseInt(this.timestamps[0]) : 0;
        },

        computeMax() {
            this.max = this.timestamps.length ? parseInt(this.timestamps[this.timestamps.length - 1]) : 100;
        },

        computeChunk() {
            this.chunk = Math.round((this.max - this.min) / NUMBER_OF_MARKERS);
        }
    }
}
</script>


<style scoped lang="stylus">
.TimestampSelector
    width: 100%
    padding: 16px 3%
    box-sizing: border-box
    position: fixed
    z-index: 100
    bottom: 0
    background: rgba(215, 215, 215, 0.7)

.TimestampSelector-range
    background-color: #3f91e5
    width: 100%
    height:20px

.date
    float: right
    width: 50%
    text-align: right
    line-height: 2rem
    color: rgba(40, 40, 40, 0.7)

.time
    float:left
    width: 50%


    ::-moz-range-track, ::-ms-track 
        background-color: #3f91e5
        width: 100%
        height:20px

    ::-webkit-slider-thumb, ::-moz-range-thumb, ::-ms-thumb
        -webkit-appearance: none
        background-color: #666
        width: 10px
        height: 20px
</style>
