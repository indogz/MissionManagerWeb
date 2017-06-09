$('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
});

$(document).ready(function () {
    $('.tooltipped').tooltip({ delay: 50 });
    Materialize.toast('Mobile menu ready', 4000);
    $('.collapsible').collapsible();
    Materialize.toast('Collapsable menu ready', 4000);
    $('select').material_select();
    Materialize.toast('Multi-select emergenza ready', 4000);
    initApp();
    
});

var postalCode = 0;
var city = "nd";
var house_number = 0;
var street = "nd";
var first_name = "nd";
var last_name = "nd";
var descrizioneEvento = "nd";
var tipoDiIntervento = "nd";

var estensione = "mp3";
var path = "media/audio." + estensione;
var audio = new Audio(path);

var provider = new firebase.auth.GoogleAuthProvider();

var firebaseRef = firebase.database().ref().child("Scheda_intervento");


$("#lastDivBeforeFooter").click(function () {
    if (typeof (first_name) != "undefined" && first_name !== null) {
        first_name = $("#username").val();
    }
    if (typeof (last_name) != "undefined" && last_name !== null) {
        last_name = $("#password").val();
    }
    console.log("Dentro");
    signInGoogle();
    // firebase.auth().signInWithRedirect(provider);
});


function signInGoogle() {
    console.log("Signin in with google");
    if (!firebase.auth().currentUser) {
        
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    }
}


function initApp() {
    console.log("Dentro x2");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            showData(user);
            location.replace("/home.html");
        } else {
            Materialize.toast('No user is signed in.', 500);
        }
    });
    document.getElementById('signOut').addEventListener('click', signOut, false);
}



function signOut() {
    firebase.auth().signOut().then(function () {
        alert("signout");
        // window.location.replace("/index.html");
    }, function (error) {
        alert("Error: " + error);
    });
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











