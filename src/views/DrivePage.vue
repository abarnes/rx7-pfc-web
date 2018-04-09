<template>
  <div class="drivePage">
    <csv-upload-form/>
    <DataView/>
  </div>
</template>

<script>
// @ is an alias to /src
import CsvUploadForm from '@/components/CsvUploadForm'
import DataView from '@/components/DataView.vue'

export default {
  name: 'drivePage',
  components: {
    DataView,
    CsvUploadForm
  }
}
</script>
