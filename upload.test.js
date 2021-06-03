const firebase = require("@firebase/rules-unit-testing");

const initializeApp = (user) => {
  const app = firebase.initializeTestApp({
    storageBucket: "default-bucket",
    projectId: "fake-id",
    auth: user,
  });

  const storage = app.storage();

  return storage;
};

it("Authenticated user should be able to upload a resource", (done) => {
  const user = {
    uid: "alice",
    email: "alice@example.com",
    user_id: "alice",
  };
  const storage = initializeApp(user);

  const uploadTask = storage.ref().child("test.txt").putString("some content");
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot.state);
    },
    (error) => {
      console.log(error);
      done("Upload failed");
    },
    () => {
      done();
    }
  );
});
