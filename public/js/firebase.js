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

//=====================================================================================================================================================
//=====================================================================================================================================================

db.collection("users").get().then((querySnapshot) => {
    const usersEmail = [];
    querySnapshot.forEach((doc) => {
        // var storedDate = new Date(doc.data().lastactive.seconds);
        var nowDate = new Date();
        // var elapsedTime = (nowDate.getTime() - storedDate.getTime());

        // usersEmail.push(`<li>${doc.data().email} <small style="color:red;">Last active: ${new Date(elapsedTime).toDateString()}</small></li>`)
        usersEmail.push(`<li>${doc.data().email} <small style="color:red;">Last active: </small></li>`)
        // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
    document.getElementById("demo1").innerHTML = usersEmail.join(" ")
});

//=====================================================================================================================================================
//=====================================================================================================================================================

$(function () {

    var start = moment().subtract(29, 'days');
    var end = moment();

    function cb(st, en) {
        $('#reportrange span').html(st.format('MMMM D, YYYY') + ' - ' + en.format('MMMM D, YYYY'));

        let start = new Date(st.format('MMMM D, YYYY'));
        let end = new Date(en.format('MMMM D, YYYY'));

        var imagesRef = db.collection("images");
        var image_div = document.getElementById("image_div")

        imagesRef.where('addDate', '>', start).where('addDate', '<', end).get().then((querySnapshot) => {
            var image = []

            querySnapshot.forEach((images) => {
                image.push(`
                <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                    <a href="${images.data().imageUrl}" class="fancybox" rel="ligthbox">
                        <img src="${images.data().imageUrl}" class="zoom img-fluid " alt="">
                    </a>
                </div>`)
            });

            return image
        }).then(result => {
            image_div.innerHTML = result.join(" ")

            $(".fancybox").fancybox({
                openEffect: "none",
                closeEffect: "none"
            });

            $(".zoom").hover(function () {

                $(this).addClass('transition');
            }, function () {

                $(this).removeClass('transition');
            });

        }).catch((err) => {
            console.log(err);
        });
    }

    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    }, cb);

    cb(start, end);

});

//=====================================================================================================================================================
//=====================================================================================================================================================


//=====================================================================================================================================================
//=====================================================================================================================================================
