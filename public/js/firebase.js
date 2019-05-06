// Initialize Firebase
const config = {
    apiKey: "AIzaSyALhP1ft5xsDjZM_04iS4Ls68DclPrVWpE",
    authDomain: "fir-project-8d038.firebaseapp.com",
    databaseURL: "https://fir-project-8d038.firebaseio.com",
    projectId: "fir-project-8d038",
    storageBucket: "fir-project-8d038.appspot.com",
    messagingSenderId: "1012008653647",
    appId: "1:1012008653647:web:51e8d94bc7a7e727"
};
firebase.initializeApp(config);

const db = firebase.firestore();


const themeDay = () => {
    let date = document.getElementById("textDate")
    let text = document.getElementById("textValue")

    if (date.value !== "" && text.value !== "") {
        db.collection("Theme").add({
            date: date.value,
            text: text.value
        }).then((docRef) => {
            date.value = ""
            text.value = ""
            let successMsg = document.getElementById("successMsg")
            successMsg.classList.remove("hidden")
            setTimeout(() => {
                successMsg.classList.add("hidden")
            }, 2000);
            // console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            let dangerMsg = document.getElementById("dangerMsg")
            dangerMsg.classList.remove("hidden")
            setTimeout(() => {
                dangerMsg.classList.add("hidden")
            }, 2000);
            // console.error("Error adding document: ", error);
        });
    }
    else {
        let dangerMsg = document.getElementById("dangerMsg2")
        dangerMsg.classList.remove("hidden")
        setTimeout(() => {
            dangerMsg.classList.add("hidden")
        }, 2000);
    }
}



//=====================================================================================================================================================
//=====================================================================================================================================================

db.collection("users").get().then((querySnapshot) => {
    const usersEmail = [];
    querySnapshot.forEach((doc) => {
        // var storedDate = new Date(doc.data().lastactive.seconds);
        var nowDate = new Date();
        // var elapsedTime = (nowDate.getTime() - storedDate.getTime());

        // usersEmail.push(`<li>${doc.data().email} <small style="color:red;">Last active: ${new Date(elapsedTime).toDateString()}</small></li>`)
        usersEmail.push(`<li>${doc.data().email} <small style="color:red;">Last active: ${new Date(doc.data().lastactive.seconds * 1000 ).toLocaleDateString()}</small></li>`)
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

        var imagesRef = db.collection("Posts");
        var image_div = document.getElementById("image_div")

        imagesRef.where('timestamp', '>', start).where('timestamp', '<', end).get().then((querySnapshot) => {
            var image = []

            querySnapshot.forEach((images) => {
                image.push(`
                <div class="col-lg-3 col-md-4 col-xs-6 thumb">
                    <a href="${images.data().image_url}" class="fancybox" rel="ligthbox">
                        <img src="${images.data().image_url}" class="zoom img-fluid " alt="">
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

setTimeout(() => {
    var ranges = document.getElementsByClassName("ranges")
    var lis = ranges[0].getElementsByTagName('ul')[0].getElementsByTagName("li");

    lis[0].classList.add("hidden")
    lis[1].classList.add("hidden")
}, 1000);

//=====================================================================================================================================================
//=====================================================================================================================================================
