<template>
    <div class="container" v-if="shouldRender">
        <div id="drop-area" ref="drop-area">
            <form class="csv-upload-form">
                <p>Upload your log file by dragging and dropping here</p>
                <input type="file" id="fileElem" multiple accept="text/csv" onchange="handleFiles(this.files)">
                <label class="button" for="fileElem">Select Log File</label>
            </form>
        </div>
    </div>    
</template>


<script>
import { convertCsvRowsToObject } from '@/utils/CsvUtils'
import { REPLACE_DATA } from '@/store/actions.js'

export default {
    name: 'CsvUploadForm',
    computed: {
        shouldRender() {
            return this.$store.state.EngineData.timestamps.length === 0;
        }
    },
    mounted() {
        this.setupDropzone();
    },
    methods: {
        setupDropzone() {
            const dropArea = this.$refs["drop-area"];
            const preventDefaults = (e) => {
                e.preventDefault();
                e.stopPropagation();
            }
            const highlight = (e) => {
                dropArea.classList.add('highlight');
            }
            const unhighlight = (e) => {
                dropArea.classList.remove('active');
            }

            ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false)   
                document.body.addEventListener(eventName, preventDefaults, false);
            });

            ;['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, highlight, false);
            });

            ;['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, unhighlight, false);
            });

            dropArea.addEventListener('drop', this.handleFile, false);
        },

        handleFile(e) {
            if (typeof e.dataTransfer.files === "undefined" || !e.dataTransfer.files.length) {
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                const datapoints = convertCsvRowsToObject(reader.result.split("\n"));
                if (datapoints.length) {
                    this.$store.commit(REPLACE_DATA, datapoints);
                } else {
                    // TODO handle this better
                    alert("Invalid CSV file uploaded");
                }
            }
            reader.readAsBinaryString(e.dataTransfer.files[0]);
        }
    }
}
</script>


<style scoped lang="stylus">
.container {
    padding: 16px;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
}

#drop-area
    border: 2px dashed #ccc
    border-radius: 20px
    width: 90%
    margin: 5% auto
    padding: 20px

    &.highlight
        border-color: purple

p
    margin-top: 0

.button
    display: inline-block
    padding: 10px
    background: #ccc
    cursor: pointer
    border-radius: 5px
    border: 1px solid #ccc

    &:hover
        background: #ddd

#fileElem
  display: none
</style>
