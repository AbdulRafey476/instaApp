// Initialize Firebase
const config = {
    apiKey: "AIzaSyBJxc8f86A-FR8Cqxskh9ukhkS0ZQ5KdME",
    authDomain: "instaapp-3bf08.firebaseapp.com",
    databaseURL: "https://instaapp-3bf08.firebaseio.com",
    projectId: "instaapp-3bf08",
    storageBucket: "instaapp-3bf08.appspot.com",
    messagingSenderId: "404926943114"
};
firebase.initializeApp(config);

const db = firebase.firestore();

// db.collection("users").add({
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
// })
// .then(function(docRef) {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//     console.error("Error adding document: ", error);
// });

db.collection("users").get().then((querySnapshot) => {
    const usersEmail = [];
    querySnapshot.forEach((doc) => {
        var storedDate = new Date(doc.data().lastactive.seconds);
        var nowDate = new Date();
        var elapsedTime = (nowDate.getTime() - storedDate.getTime());

        usersEmail.push(`<li>${doc.data().email} <small style="color:red;">Last active: ${new Date(elapsedTime).toDateString()}</small></li>`)
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
    document.getElementById("demo1").innerHTML = usersEmail.join(" ")
});
