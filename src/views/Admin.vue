<template>
  <v-row justify="center">
    <v-col cols="6">
      <v-card class="text-center">
        <v-card-text>
          <v-avatar>
            <img :src="user.photo" />
          </v-avatar>
        </v-card-text>

        <v-card-text>
          <h3>{{user.name}}</h3>
        </v-card-text>

        <v-card-text>
          <input type="file" ref="buttonFile" class="d-none" @change="searchImage($event)" />

          <v-btn color="primary" @click="$refs.buttonFile.click()">Search Image</v-btn>
          <v-btn
            color="secundary"
            :disabled="!file"
            :loading="loading"
            @click="uploadImage()"
          >Upload Image</v-btn>
        </v-card-text>

        <v-card-text v-if="file">
          <h4>{{file.name}}</h4>
          <v-img v-if="urlImageTemp" :src="urlImageTemp"></v-img>
        </v-card-text>

        <v-card-text v-if="error">
          <h4>{{error}}</h4>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import { firebase, storage, firestore } from "@/config/firebase";
export default {
  name: "admin",
  data() {
    return {
      file: null,
      urlImageTemp: null,
      loading: false,
      error: null
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    searchImage(event) {
      const typeFile = event.target.files[0].type;

      if (typeFile === "image/jpeg" || typeFile === "image/png") {
        this.error = null;
        this.file = event.target.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(this.file);
        reader.onload = e => {
          this.urlImageTemp = e.target.result;
        };
      } else {
        this.error = "File not valid";
        this.file = null;
      }
    },
    async uploadImage() {
      this.loading = true;
      try {
        const refImage = storage
          .ref()
          .child(this.user.email)
          .child("image_profile");

        const res = await refImage.put(this.file);

        const urlDownload = await refImage.getDownloadURL();

        this.user.photo = urlDownload;

        await firestore
          .collection("users")
          .doc(this.user.uid)
          .update({ photo: this.user.photo });

        this.error = "File upload successfully";
        this.file = null;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
