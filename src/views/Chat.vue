<template>
  <v-row>
    <!--justify="center"-->
    <v-col>
      <!--cols="6"-->
      <v-card>
        <v-card-text>
          <h3>Welcome {{ user.name }}</h3>
        </v-card-text>

        <v-card-text class="messageContainer" v-chat-scroll>
          <div
            :class="item.userName === user.name ? 'text-right' : 'text-left'"
            v-for="(item, index) in messages"
            :key="index"
          >
            <v-chip>
              <v-avatar class="mr-2">
                <img :src="item.userImage" />
              </v-avatar>
              {{ item.message }}
            </v-chip>
            <p class="caption mr-1">{{ item.date }}</p>
          </div>
        </v-card-text>

        <v-card-text>
          <v-form @submit.prevent="sendMessage()" v-model="valid">
            <v-text-field
              v-model="message"
              label="Write your message"
              required
              :rules="rules"
            ></v-text-field>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
import { firestore } from "@/config/firebase";

export default {
  name: "chat",
  data() {
    return {
      messages: [],
      message: null,
      valid: false,
      rules: [v => !!v || "You have to write a message..."]
    };
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    sendMessage() {
      if (this.valid) {
        firestore
          .collection("chats")
          .add({
            message: this.message,
            userName: this.user.name,
            userImage: this.user.photo,
            date: Date.now()
          })
          .catch(err => console.log(err));
        this.message = null;
      }
    }
  },
  created() {
    moment.locale("es");

    const ref = firestore
      .collection("chats")
      .orderBy("date", "desc")
      .limit(10);

    ref.onSnapshot(querySnapshot => {
      this.messages = [];
      querySnapshot.forEach(doc => {
        this.messages.unshift({
          message: doc.data().message,
          userName: doc.data().userName,
          userImage: doc.data().userImage,
          date: moment(doc.data().date).format("lll")
        });
      });
    });
  }
};
</script>

<style>
.messageContainer {
  height: 60vh;
  overflow: auto;
}
</style>
