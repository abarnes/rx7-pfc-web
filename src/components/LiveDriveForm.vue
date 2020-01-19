<template>
    <div class="container" v-if="shouldRender">
        <div id="drop-area" ref="drop-area">
            <form class="csv-upload-form" @submit.prevent="fetchDrive">
                <p>Enter Live Drive ID</p>
                <input type="text" v-model="driveId">
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>    
</template>


<script>
import { subscribeToDriveByCode } from '@/utils/DatabaseUtil'
import { ADD_DATAPOINT, CLEAR_DATA } from '@/store/actions.js'


export default {
    name: 'LiveDriveForm',
    data() {
        return {
            driveId: "",
            hasInitialized: false
        }
    },
    computed: {
        shouldRender() {
            return this.$store.state.EngineData.timestamps.length === 0;
        }
    },
    methods: {
        fetchDrive: async function fetchDrive() {
            const result = await subscribeToDriveByCode(this.driveId, this.newDataReceived);
        },

        newDataReceived: function newDataReceived(newData) {
            console.log(newData);

            if (!this.hasInitialized) {
                this.$store.commit(CLEAR_DATA);
                this.hasInitialized = true;
            }

            this.$store.commit(ADD_DATAPOINT, newData);
        }
    }
}
</script>


<style scoped lang="stylus">
.container
    padding: 16px
    box-sizing: border-box
    width: 100%
    text-align: center
</style>
