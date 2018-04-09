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

export default {
  name: 'livePage',
  components: {
    DataView,
    LiveDriveForm
  }
}
</script>
