<template>
    <div :class="{'flag-required': hasFieldError}">
        <v-text-field
            :value="value"
                @input="$emit('input', $event)"
                :rules="[ emailValidation ]"
                :label="labelValue"
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
export default class EmailTextField extends Vue {
    @Prop() value!: string;

    @Prop() hasFieldError!: boolean;

    @Prop() labelValue!: string;

    get emailValidation() {
        // eslint-disable-next-line
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(this.value) || 'Invalid e-mail.';
    }
}
</script>
