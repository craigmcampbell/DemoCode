<template>
  <div>
    <v-card>
      <v-card-text class="logoBackground">
        <img
          src="../../../assets/Attestation_AMC_Logo.png"
          style="max-height:100%;max-width:100%"
          alt="University of Colorado Anschutz Medical Campus Logo"
        />
      </v-card-text>
    </v-card>

    <div v-show="selectedForm === 0 && !hideContent" id="formOptions" class="mt-5">
      <h1 style="text-align: center;">Attestation Check-In</h1>

      <v-alert
        v-show="notificationText"
        color="#A20000"
        dark
        style="text-align: center; font-weight: bold;"
      >
        {{ notificationText }}
      </v-alert>

      <div class="row">
        <div class="col-md-6 offset-md-3" style="text-align: center;">
          <div @click="ssoClicked()" class="ssoOption" tabindex="0" role="button" @keypress.space="ssoClicked()" @keypress.enter="ssoClicked()">
            <span class="buttonTextLevel1">
              Check-In for CU Anschutz Medical Campus
            </span>
            <br />

            <span class="buttonTextLevel2">
              Faculty, Staff, &amp; Students
            </span>
            <br />

            <span>
              University login credentials required
            </span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 offset-md-3" style="text-align: center;">
          <div @click="selectedForm = 2" class="badgeOption" tabindex="0" role="button" @keypress.space="selectedForm = 2" @keypress.enter="selectedForm = 2">
            <span class="buttonTextLevel1">
              Non-Employee and Vendor Check-In
            </span>
            <br />

            <span>
              Badge ID required
            </span>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 offset-md-3" style="text-align: center;">
          <span @click="selectedForm = 3" class="buttonLink" tabindex="0" role="button"  @keypress.space="selectedForm = 3" @keypress.enter="selectedForm = 3">
            Check-In as Visitor
          </span>
        </div>
      </div>
    </div>

    <SsoForm
      v-if="selectedForm === 1"
      :userData="userData"
      :temperatureIsActive="displayTemperature"
      :vaccinationIsActive="displayVaccination"
      :checkInLocationIsActive="false"
      class="mt-5"
    >
    </SsoForm>

    <BadgeForm
      v-if="selectedForm === 2"
      :temperatureIsActive="displayTemperature"
      :vaccinationIsActive="displayVaccination"
      :checkInLocationIsActive="false"
      class="mt-5"
    >
    </BadgeForm>

    <VisitorForm
      v-if="selectedForm === 3"
      :temperatureIsActive="displayTemperature"
      :vaccinationIsActive="displayVaccination"
      :checkInLocationIsActive="true"
      class="mt-5"
    >
    </VisitorForm>

    <!-- <v-footer height="auto" fixed>
            <span class="footer">
                &copy;2021 - University of Colorado Denver | Anschutz Medical Campus
            </span>
        </v-footer> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import { generateEncryptedSsoLoginUrl } from '@/services/ssoLoginService';
import { isFeatureEnabled } from '@/helpers/featureHelper';

import UserData from '@/models/userData';

import SsoForm from './SsoForm.vue';
import BadgeForm from './BadgeForm.vue';
import VisitorForm from './VisitorForm.vue';

@Component({
  components: {
    SsoForm,
    BadgeForm,
    VisitorForm,
  },
})
export default class AmcCampus extends Vue {
  @Prop() ssoValidated: boolean = false;

  hideContent: boolean = false;

  userData: UserData = new UserData();

  selectedForm: number = 0;

  async ssoClicked() {
    this.hideContent = true;
    const url = await generateEncryptedSsoLoginUrl(
      window.location.origin,
      this.$store.state.campus.osirisApplicationId
    );
    window.location.href = url;
  }

  get notificationText() {
    return this.$store.state.campus.notification;
  }

  get displayTemperature() {
    return isFeatureEnabled('Form_ShowTemperature');
  }

  get displayVaccination() {
    return isFeatureEnabled('Form_ShowVaccination');
  }

  @Watch('ssoValidated')
  onValidationChange(value: boolean) {
    if (value === true) {
      this.selectedForm = 1;
      this.userData = this.$store.state.login as UserData;
    }
  }
}
</script>
<style scoped>
.logoBackground {
  background-color: #fff;
  text-align: center;
}
</style>
