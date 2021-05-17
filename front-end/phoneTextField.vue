<template>
    <div :class="{'flag-required': hasFieldError}">
        <v-text-field
            :value="value"
            @input="$emit('input', $event)"
            :label="labelValue"
            v-mask="'###-###-####'"
            hint="505-555-5555"
            outlined>
        </v-text-field>
        <div v-show="hasFieldError" class="text-red mb-3">
            {{ this.$store.state.content.requiredText }}
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PhoneTextField extends Vue {
    @Prop() value!: string;

    @Prop() hasFieldError!: boolean;

    @Prop() labelValue!: string;
}
</script>
