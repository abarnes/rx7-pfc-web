<template>
  <div class="drivePage">
    <LiveDriveForm/>
    <DataView/>
  </div>
</template>

<script>
// @ is an alias to /src
import LiveDriveForm from '@/components/LiveDriveForm'
import DataView from '@/components/DataView.vue'
import { getDriveById } from '@/utils/DatabaseUtil'

export default {
  name: 'livePage',
  components: {
    DataView,
    LiveDriveForm
  },
  beforeMount () {
    this.test();
  },
  methods: {
    test: async () => {
      const result = await getDriveById("DQlPjA3MO0sgM5T7W6xG", true);
      console.log(result);
    }
  }
}
</script>
