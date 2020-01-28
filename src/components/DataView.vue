<template>
  <div>
      <div class="gauges" v-if="shouldRenderGauges">
        <gauge v-for="(config, key) in gaugesToDisplay" :key="key" :config="config"></gauge>
      </div>
      <timestamp-selector/>
  </div>
</template>


<script>
import Gauge from '@/components/Gauge'
import TimestampSelector from '@/components/TimestampSelector'
import { gauges } from '@/config/GaugeConfig'

export default {
  name: 'DataView',
  components: { Gauge, TimestampSelector },
  data () {
    return {
        gauges: gauges
    }
  },
  computed: {
    shouldRenderGauges() {
      return this.$store.state.EngineData.timestamps.length !== 0;
    },
    gaugesToDisplay() {
      if (this.$store.state.EngineData.timestamps.length === 0) {
        return [];
      }
      
      const dataAvailable = Object.getOwnPropertyNames(this.$store.state.EngineData.data[0]);
      let resultingGraphs = [];
      for (let item of dataAvailable) {
        if (typeof gauges[item] !== 'undefined') {
          resultingGraphs.push(gauges[item]);
        }
      }
      return resultingGraphs;
    }
  },
}
</script>


<style scoped lang="stylus">
.gauges
    display: flex
    justify-content: space-between
    flex-wrap: wrap
    padding: 30px 50px
    align-items: baseline
    justify-content: space-between
</style>
