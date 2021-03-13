<template>
  broadcast
  {{ recorder === null }}
  <div>
    {{ samples }}
    <button @click="add">Add</button>
    <button @click="stopRecorder">StopRecording</button>
  </div>
</template>

<script>
import firebase from "../firebase-lib";

const db = firebase.ref("/");

export default {
  name: "Broadcast",
  data() {
    return {
      chunks: [],
      samples: [],
      currentIndex: 0,
      recorder: {
        instance: null,
      },
    };
  },
  created() {
    this.startRecorder();
  },
  methods: {
    add() {
      for (var i = 0; i < 100; i++) {
        this.addSample(this.currentIndex);
      }
    },
    addSample(sample) {
      db.child("samples").child(this.currentIndex).set(sample);
      if (this.currentIndex >= 200) {
        db.child("samples")
          .child(this.currentIndex - 200)
          .remove();
      }
      this.currentIndex++;
    },
    onChildAdded(items) {
      this.samples.push(items);
      if (this.samples.length > 2) {
        this.samples.shift();
      }
    },
    startRecorder() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log("getUserMedia supported.");
        navigator.mediaDevices
          .getUserMedia(
            // constraints - only audio needed for this app
            {
              audio: true,
            }
          )

          // Success callback
          .then(this.createRecorder)

          // Error callback
          .catch(function (err) {
            console.log("The following getUserMedia error occurred: " + err);
          });
      } else {
        console.log("getUserMedia not supported on your browser!");
      }
    },
    createRecorder(stream) {
      var recorder = new MediaRecorder(stream);

      recorder.start(2000);
      console.log(recorder.state);
      console.log("recorder started");
      recorder.ondataavailable = this.ondataavailable;
      recorder.onstop = this.onstop;

      this.recorder = recorder;
    },
    ondataavailable(e) {
      console.log(e.data);
      this.chunks.push(e.data);
    },
    onstop() {
      console.log("recorder stopped");
      const blob = new Blob(this.chunks, { type: "audio/webm; codecs=opus" });
      this.chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      console.log(audioURL);
    },
    stopRecorder() {
      this.recorder.stop();
    },
  },
  mounted() {
    db.remove();
    db.child("samples").on("child_added", this.onChildAdded);
  },
};
</script>