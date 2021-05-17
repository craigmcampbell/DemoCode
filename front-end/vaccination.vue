<template>
    <v-card v-if="displayVaccination" class="mb-5">
        <v-card-title>{{ content.vaccinationInformation }}</v-card-title>
        <v-card-text>
            <v-row>
                <v-col class="label">
                    <div
                        :class="{'flag-required':
                        hasVaccination1Error,
                        'text-left': 'true'}">
                        {{ content.vaccine1Given }} <br/>
                        <v-radio-group
                            v-model="vaccination.vaccineRound1Received"
                            @change="vaccinationChanged()"
                            row>
                            <v-radio :label="content.yes" :value=true></v-radio>
                            <v-radio :label="content.no" :value=false></v-radio>
                        </v-radio-group>
                        <div v-show="hasVaccination1Error"
                            class="text-red mb-3">
                            {{ content.requiredText }}
                        </div>
                    </div>
                </v-col>
                <v-col class="label">
                    <div
                        :class="{'flag-required': hasVaccination1DateError,
                        'text-left': 'true'}">
                        {{ content.vaccine1Date }} <br/>
                        <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="vaccination.vaccineRound1ReceivedDate"
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="vaccination.vaccineRound1ReceivedDate"
                                @change="vaccinationChanged()"
                                no-title
                                @input="menu1 = false">
                            </v-date-picker>
                        </v-menu>
                        <div v-show="hasVaccination1DateError"
                            class="text-red mb-3">
                            {{ content.requiredText }}
                        </div>
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="label">
                    <div
                        :class="{'flag-required':
                        hasVaccination2Error,
                        'text-left': 'true'}">
                        {{ content.vaccine2Given }} <br/>
                        <v-radio-group
                            @change="vaccinationChanged()"
                            v-model="vaccination.vaccineRound2Received"
                            row>
                            <v-radio :label="content.yes" :value=true></v-radio>
                            <v-radio :label="content.no" :value=false></v-radio>
                        </v-radio-group>
                        <div v-show="hasVaccination2Error"
                            class="text-red mb-3">
                            {{ content.requiredText }}
                        </div>
                    </div>
                </v-col>
                <v-col class="label">
                    <div
                        :class="{'flag-required':
                        hasVaccination2DateError,
                        'text-left': 'true'}">
                        {{ content.vaccine2Date }} <br/>
                        <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="vaccination.vaccineRound2ReceivedDate"
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="vaccination.vaccineRound2ReceivedDate"
                                @change="vaccinationChanged()"
                                no-title
                                @input="menu1 = false">
                            </v-date-picker>
                        </v-menu>
                        <div v-show="hasVaccination2DateError"
                            class="text-red mb-3">
                            {{ content.requiredText }}
                        </div>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import Vaccination from '@/models/vaccination';

@Component
export default class Vaccinations extends Vue {
    @Prop() hasVaccination1Error!: boolean;

    @Prop() hasVaccination1DateError!: boolean;

    @Prop() hasVaccination2Error!: boolean;

    @Prop() hasVaccination2DateError!: boolean;

    @Prop({ default: false }) displayVaccination!: boolean;

    vaccination: Vaccination = new Vaccination();

    menu1: boolean = false;

    menu2: boolean = false;

    vaccinationChanged() {
        this.$emit('vaccinationChanged', this.vaccination);
    }

    get content() {
        return this.$store.state.content;
    }
}
</script>
