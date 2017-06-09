
var estensione = "mp3";
var path = "media/audio." + estensione;
var audio = new Audio(path);

$(document).ready(function () {
    Materialize.toast('Page loaded correctly', 500);
    initApp();

    var rootRef = firebase.database().ref().child("Users");
    rootRef.on("child_added", snap => {
        var name = snap.child("Name").val();
        var email = snap.child("Email").val();
        var cognome = snap.child("Cognome").val();
        console.log(name + cognome + email);
        $("#putDataHere").append("<tr>");
        $("#putDataHere").append("<td>" + cognome + "</td");
        $("#putDataHere").append("<td>" + name + "</td");
        $("#putDataHere").append("<td>" + email + "</td");
        $("#putDataHere").append("</tr>");
    });

    var firebaseRef = firebase.database().ref().child("Scheda_intervento");

    firebaseRef.on("child_added", snap => {
        var tipoDiIntervento = snap.child("tipoDiIntervento").val();
        var first_name = snap.child("first_name").val();
        var last_name = snap.child("last_name").val();
        var codice = snap.child("codice").val();
        var descr = snap.child("descrizioneEvento").val();
        var chiave = (snap.key);

        var cipollotto = snap.child("primo").val();

        if ((codice == "Rosso" || codice == "Giallo") && cipollotto == true) {
            audio.play();
            firebase.database().ref('/Scheda_intervento/' + chiave + '/primo').update({ primo: "false" });
        }

        console.log(cipollotto);

        $("#putSchedaHere").append("<tr>");
        $("#putSchedaHere").append("<td id=" + chiave + ">" + codice + "</td");
        $("#putSchedaHere").append("<td>" + first_name + "</td");
        $("#putSchedaHere").append("<td>" + last_name + "</td");
        $("#putSchedaHere").append("<td>" + tipoDiIntervento + "</td");
        $("#putSchedaHere").append("<td>" + descr + "</td");
        $("#putSchedaHere").append("</tr>");

        blink("#chiave");

    });
    blink();
});

var arrayJson;

var stopBlinking = false;
setTimeout(function () {
    stopBlinking = true;
}, 2000);

function blink(selector) {
    $(selector).fadeOut('slow', function () {
        $(this).fadeIn('slow', function () {
            if (!stopBlinking) {
                blink(this);
            }
            else {

            }
        });
    });
}

//Listener del bottone 1
$("#lastDivBeforeFooter").click(function () {
    Materialize.toast('Refreshing', 500);
    signOut();
});

$("#signOut").click(function () {
    Materialize.toast('LOGOOUT', 500);
    signOut();
    window.location.replace("/auth.html");
});

$(".button-collapse").sideNav();


function initApp() {
    console.log("Dentro x2");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            showData(user);

        } else {
            Materialize.toast('No user is signed in.', 500);
        }
    });
    //  document.getElementById('signOut').addEventListener('click', signOut, false);
}

function showData(user) {
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;


    console.log(email);
    console.log(emailVerified);
    console.log(photoURL);
    console.log(uid);

    $(".data").append(displayName)
        .append("<br/>" + email)
        .append("<br/>" + emailVerified)
        .append("<br/>" + photoURL)
        .append("<br/>" + isAnonymous)
        .append("<br/>" + uid)
}


function signOut() {
    console.log("SignOUT");
    firebase.auth().signOut().then(function () {
        location.replace("/auth.html");
        alert("signout");
        location.replace("/auth.html");
    }, function (error) {
        alert("Error: " + error);
    });
}



