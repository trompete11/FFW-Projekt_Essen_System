<template>
    <div class="order">
        <div class="checkbox">
            <input type="checkbox">
        </div>

        <div class="order-details">
            <span>ID</span><br />
            <span>Bestellung</span><br />
            <span>AA</span><br />
            <span>SS</span><br />
        </div>
        <div class="timer">
            <span>Timer</span>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.order {
    display: flex;
    border: 1px solid white;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
    /* add background color */
}

.checkbox {
    transform: scale(2.0);
    flex: 0 0 auto;
    margin-right: 20px;
    margin-left: 20px;
}

.order-details {
    border: 1px solid green;
    flex-grow: 1; /* use available space */
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    margin-left: 5px;
    font-size: 32px;
}

.timer {
    border: 1px solid white;
    text-align: right; 
    font-size: 48px;
    color: red;
}
</style>