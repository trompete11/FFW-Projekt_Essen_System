<template>
    <ul>
        <li v-for="(orderItem, index) in orderItems" :key="index">
            <span>{{ orderItem.count }}x {{ orderItem.item.name }}</span>
            <div v-if="orderItem.extras && orderItem.extras.length > 0">
                <span v-for="(extra, extraIndex) in orderItem.extras" :key="extraIndex">
                    <span v-if="extraIndex > 0"> + </span>{{ extra.name }}
                </span>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        orderItems: {
            type: Array,
            required: true
        }
    }
};
</script>