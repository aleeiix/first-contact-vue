<template>
  <v-container>
    <v-row>
      <v-col cols="12">

        <v-card>
          <v-date-picker
                  v-model="datepicker"
                  full-width
                  locale="es"
                  :min="min"
                  :max="max"
          ></v-date-picker>
        </v-card>
        <v-card color="error" dark>
          <v-card-text class="display-1 text-center">650 - {{datepicker}}</v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      min: '1999',
      max: new Date().toISOString().substr(0, 10),
      datepicker: null
    }
  }
}
</script>
