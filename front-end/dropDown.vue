<template>
    <div :class="{'flag-required': hasFieldError, 'text-left': 'true'}">
        <label class="label" :for="labelId">
            {{ labelToDisplay }}
        </label>

        <select
            style="width: 100%; border: 1px solid gray;"
            class="rounded mb-5 pa-4"
            :id="labelId"
            :name="labelId"
            :value="value"
            @input="$emit('input', $event.target.value)"
        >
            <option value="-1" disabled></option>
            <option
                v-for="(item, index) in items"
                    :key="index"
                    :value="item.value"
            >
                    {{ item.text }}
            </option>
        </select>
        
        <div v-show="hasFieldError" class="text-red mb-3">
            {{ this.$store.state.content.requiredText }}
        </div>

        <!-- <v-select
            :value="value"
            @input="$emit('input', $event)"
            :items="items"
            item-text="text"
            item-value="value"
            :label="labelValue"
            outlined>
        </v-select>
        <div v-show="hasFieldError" class="text-red mb-3">
            {{ this.$store.state.content.requiredText }}
        </div> -->
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Lookup from '@/models/lookup';

@Component
export default class DropDown extends Vue {
    @Prop() value!: string;

    @Prop() hasFieldError!: boolean;

    @Prop() labelValue!: string;

    @Prop() items!: Array<Lookup>;

    @Prop() fieldLabel!: string;

    labelToDisplay: string = '';
    labelId: string = '';

    mounted() {
        this.labelToDisplay = this.fieldLabel;
        this.labelId = this.fieldLabel.replace(/\W/g,'_');
    }
}
</script>

<style scoped>
select {
    background-image: url('../../assets/chevron-down-solid.svg');
    background-repeat: no-repeat;
    background-position: right;
    background-position-x: 98%;
    background-size: 16px;
}

@media only screen and (max-width: 600px) {
    select {
        background-position-x: 95%;
    }   
} 
</style>
