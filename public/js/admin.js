
var estensione = "mp3";
var path = "media/audio." + estensione;
var audio = new Audio(path);



function click() {
    location.reload();
}

$("#signOut").click(function () {
    Materialize.toast('LOGOOUT', 500);
    signOut();
    window.location.replace("/auth.html");
});

$(document).ready(function () {
    Materialize.toast('Page loaded correctly', 500);
    var jsonArray;

    window.click = function () {
        location.reload();

    }

    $.ajax({
        url: "https://www.ripasso.altervista.org/getScheda.php/",
        cache: false,
        success: function (html) {
            jsonArray = html;
            console.log(jsonArray);
            $.each(jsonArray, function (index, jsonObject) {
                console.log("****************");
                $("#putDataHere").append("<tr>");
                $.each(jsonObject, function (key, val) {
                    console.log("key : " + key + " ; value : " + val);
                    if (key == "id_scheda") {
                        $("#putDataHere").append("<td><a  href=http://www.ripasso.altervista.org/deleteScheda.php?id=" + val + "  target=\"_self\">" + val + "</a></td>");
                        
                    } else {
                        $("#putDataHere").append("<td>" + val + "</td>");
                    }
                }); $("#putDataHere").append("</tr>");
            });
        }
    });



    $("#putDataHere").append("<tr> <td><a  href='http://www.ripasso.altervista.org/deleteScheda.php?id=0' onClick=\"click();\"'> prova </a></td> </tr>");


    console.log("Fuori");

});

var arrayJson;

//Listener del bottone 1
$("#lastDivBeforeFooter").click(function () {
    Materialize.toast('Refreshing', 500);
    location.reload();
});

$(".button-collapse").sideNav();



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












