<template>
    <svg aria-hidden="true" v-bind="$attrs">
        <use :xlink:href="symbolId" />
    </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'SvgIcon',
    props: {
        prefix: {
            type: String,
            default: 'icon',
        },
        name: {
            type: String,
        },
    },
    setup(props) {
        const symbolId = `#${props.prefix}-${props.name}`
        return {
            symbolId
        }

    },
});
</script>
