<template>
  broadcast
  <div>
    {{ samples }}
    <button @click="add">Add</button>
  </div>
</template>

<script>
import firebase from "../firebase-lib";

const db = firebase.ref("/");

export default {
  name: "Broadcast",
  data() {
    return {
      samples: [],
      currentIndex: 0,
    };
  },
  methods: {
    add() {
      for (var i = 0; i < 100; i++) {
        db.child("samples").child(this.currentIndex).set(this.currentIndex);
        if (this.currentIndex >= 200) {
          db.child("samples")
            .child(this.currentIndex - 200)
            .remove();
        }
        this.currentIndex++;
      }
    },
    onChildAdded(items) {
      this.samples.push(items);
      if (this.samples.length > 2) {
        this.samples.shift();
      }
    },
  },
  mounted() {
    db.remove();
    db.child("samples").on("child_added", this.onChildAdded);
  },
};
</script>