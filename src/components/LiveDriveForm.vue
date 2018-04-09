<template>
    <div class="container" v-if="shouldRender">
        <div id="drop-area" ref="drop-area">
            <form class="csv-upload-form">
                <p>Enter Live Drive ID</p>
                <input type="text">
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>    
</template>


<script>
export default {
    name: 'LiveDriveForm',
    computed: {
        shouldRender() {
            return this.$store.state.EngineData.timestamps.length === 0;
        }
    },
    mounted() {
        
    },
    methods: {
        
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
