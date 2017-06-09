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

var firebaseRef = firebase.database().ref().child("Scheda_intervento");

$("#lastDivBeforeFooter").click(function () {

    if (typeof (first_name) != "undefined" && first_name !== null) {
        first_name = $("#first_name").val();
    }
    if (typeof (last_name) != "undefined" && last_name !== null) {
        last_name = $("#last_name").val();
    }
    if (typeof (city) != "undefined" && city !== null) {
        city = $("#city").val();
    }
    if (typeof (house_number) != "undefined" && house_number !== null) {
        house_number = $("#house_number").val();
    }
    if (typeof (street) != "undefined" && street !== null) {
        street = $("#street").val();
    }
    if (typeof (postalCode) != "undefined" && postalCode !== null) {
        postalCode = $("#postal_code").val();
    }

    if (typeof (descrizioneEvento) != "undefined" && descrizioneEvento !== null) {
        descrizioneEvento = $("#descrizioneEvento").val();
    }

    if (typeof (tipoDiIntervento) != "undefined" && tipoDiIntervento !== null) {
        tipoDiIntervento = $("#myselect option:selected").text();
        console.log($("#myselect option:selected").text());
    }


    firebaseRef.push().set({
        last_name: last_name,
        first_name: first_name,
        city: city,
        house_number: house_number,
        street: street,
        //postalCode: postalCode,
        tipoDiIntervento: tipoDiIntervento,
        descrizioneEvento: descrizioneEvento,
        codice: codice,
        primo: true
    })

    var mezzo = "";
    if (typeof (mezzo) != "undefined" && mezzo !== null) {
        mezzo = $("#mezzoInv option:selected").text();
        console.log($("#mezzoInv option:selected").text());
    }

    secondRef = firebase.database().ref().child("Macchine");

    secondRef.child(mezzo).child("schede").push().set({


//        secondRef.child(mezzo).update({

            last_name: last_name,
            first_name: first_name,
            city: city,
            house_number: house_number,
            street: street,
            //postalCode: postalCode,
            tipoDiIntervento: tipoDiIntervento,
            descrizioneEvento: descrizioneEvento,
            codice: codice,
            primo: true
  //      })*/
    })

    if (codice == "Rosso") {
        audio.play();
    }


    Materialize.toast('Scheda inviata', 500)

});



var codice = "nd";
function codiceRosso() {
    codice = "Rosso";
    Materialize.toast("Codice" + codice, 1000);
    $("#selettoreEmergenza").prop('checked', true);

}

function codiceGiallo() {
    codice = "Giallo";
    Materialize.toast("Codice" + codice, 1000);
    $("#selettoreEmergenza").prop('checked', true);
}
function codiceVerde() {
    codice = "Verde";
    Materialize.toast("Codice" + codice, 1000);
    $("#selettoreEmergenza").prop('checked', false);
}
function codiceBianco() {
    codice = "Bianco";
    Materialize.toast("Codice" + codice, 1000);
    $("#selettoreEmergenza").prop('checked', false);
}



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
        console.log("POROCODDIO");
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
            location.replace("/viewStatus.html");
        } else {
            Materialize.toast('No user is signed in.', 500);
        }
    });
    document.getElementById('signOut').addEventListener('click', signOut, false);
}

$("#signOut").click(function () {
    Materialize.toast('LOGOOUT', 500);
    signOut();
    window.location.replace("/auth.html");
});

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

