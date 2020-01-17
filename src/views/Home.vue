<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-date-picker
          v-model="datepicker"
          full-width
          locale="es"
          :min="min"
          :max="max"
          @change="getEuro(datepicker)"
        ></v-date-picker>
      </v-card>
      <v-card color="error" dark>
        <v-card-text class="display-1 text-center">{{value}}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "home",
  data() {
    return {
      min: "1999",
      max: new Date().toISOString().substr(0, 10),
      datepicker: new Date().toISOString().substr(0, 10),
      value: ""
    };
  },
  methods: {
    ...mapMutations(["showLoading", "hideLoading"]),

    async getEuro(date) {
      this.showLoading({ title: "Obtaining information" });

      const dateArray = date.split(["-"]);
      const dateFormat = `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;

      try {
        const datos = await axios.get(
          `https://mindicador.cl/api/euro/${dateFormat}`
        );
        if (datos.data.serie.length > 0) {
          this.value = datos.data.serie[0].valor;
        } else {
          this.value = "There is no value.";
        }
      } catch (err) {
        console.log(err);
      } finally {
        this.hideLoading();
      }
    }
  },
  created() {
    this.getEuro(this.datepicker);
  }
};
</script>
