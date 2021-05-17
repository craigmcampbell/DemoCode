<template>
    <v-card v-if="displayTemperature" class="mb-5">
        <v-card-title>{{ content.temperature }}</v-card-title>
        <v-card-text class="ma-5">
            <div :class="{'flag-required': hasFieldError,
                'text-left': 'true'}">

                <v-row>
                    <v-col>
                        <v-radio-group
                            v-model="temperature.temperatureType"
                            row
                        >
                            <template v-slot:label>
                                <div class="d-sr-only" v-html="content.temperature"></div>
                            </template>
                            <v-radio
                                :label="content.temperatureFahrenheit"
                                :value=1
                                @change="temperatureTypeChanged()">
                            </v-radio>
                            <v-radio
                                :label="content.temperatureCelsius"
                                :value=2
                                @change="temperatureTypeChanged()">
                            </v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col class="col-md-4">
                        <dropDown
                            v-model.number="temperature.temperatureNumber"
                            :items="temperatureNumber"
                            :fieldLabel="content.temperatureNumber"
                            @input="temperatureChanged()">
                        </dropDown>
                    </v-col>
                    <v-col class="col-md-4">
                        <dropDown
                            v-model.number="temperature.temperatureDecimal"
                            :items="temperatureDecimal"
                            :fieldLabel="content.temperatureDecimal"
                            @input="temperatureChanged()">
                        </dropDown>
                    </v-col>
                </v-row>
                <!-- <v-row>
                    <v-col>
                        <v-select
                            v-model="temperature.temperatureNumber"
                            @change="temperatureChanged()"
                            :items="oldTemperatureNumber"
                            :label="content.temperatureNumber"
                            outlined>
                        </v-select>
                    </v-col>
                    <v-col>
                        <v-select
                            v-model="temperature.temperatureDecimal"
                            @change="temperatureChanged()"
                            :items="oldTempDecimalValues"
                            :label="content.temperatureDecimal"
                            outlined>
                        </v-select>
                    </v-col>
                    <v-col></v-col>
                </v-row> -->

                <div v-show="hasFieldError"
                    class="text-red mb-3">
                    {{ content.requiredText }}
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Temperature from '@/models/temperature';
import Lookup from '@/models/lookup';

import dropDown from '@/components/common/dropDown.vue';

@Component({
    components: { dropDown }
})
export default class CurrentTemperature extends Vue {
    @Prop() hasFieldError!: boolean;

    @Prop({ default: false }) displayTemperature!: boolean;

    temperature: Temperature = new Temperature();

    tempFValues = [94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106];
    tempCValues = [34, 35, 36, 37, 38, 39, 40, 41];
    tempDecimalValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    temperatureNumberF: Lookup[] = [];
    temperatureNumberC: Lookup[] = [];
    temperatureDecimal: Lookup[] = [];

    mounted () {
        this.populateTempValues();
    }

    temperatureTypeChanged() {
        this.temperature.temperatureNumber = -1;
        this.temperature.temperatureDecimal = -1;
        this.temperatureChanged();
    }

    temperatureChanged() {
        this.$emit('temperatureChanged', this.temperature);
    }

    get content() {
        return this.$store.state.content;
    }

    get temperatureNumber() {
        return this.temperature.temperatureType === 1
            ? this.temperatureNumberF
            : this.temperatureNumberC;
    }

    populateTempValues() {
        for (let i = 0; i < this.tempFValues.length; i++) {
            const value = this.tempFValues[i];
            
            const lookupItem: Lookup = {
                _id: (i + 1).toString(),
                text: value.toString(),
                value: value.toString()
            };

            this.temperatureNumberF.push(lookupItem);
        }

        for (let i = 0; i < this.tempCValues.length; i++) {
            const value = this.tempCValues[i];
            
            const lookupItem: Lookup = {
                _id: (i + 1).toString(),
                text: value.toString(),
                value: value.toString()
            };

            this.temperatureNumberC.push(lookupItem);
        }

        for (let i = 0; i < this.tempDecimalValues.length; i++) {
            const value = this.tempDecimalValues[i];
            
            const lookupItem: Lookup = {
                _id: (i + 1).toString(),
                text: value.toString(),
                value: value.toString()
            };

            this.temperatureDecimal.push(lookupItem);
        }
    }
}
</script>
