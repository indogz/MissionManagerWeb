var previous = null;
var current = null;

$.ajaxSetup({ cache: false });
$.ajaxSetup({ async: false });

$(document).ready(function () {
    $('.slider').slider();
    $('.materialboxed').materialbox();
    $('.collapsible').collapsible();
    Materialize.toast('Collapsable menu ready', 4000);


    //location.reload();

    getTemparia();
    getVento();

    setInterval(function () {
        console.log("Aggionrato");
        getVento();
        getTemparia();
        location.reload();
    },
        300000);


    var i = 7;
    setInterval(function () {
        $.ajaxSetup({ cache: false });
        i--;
        if (i < 1) {
            i = 6;
        }
        refreshRadar(i);
    },
        250);


    getBolletini();
});


function refreshRadar(i) {
    var content = '';
    var mGranteContent='';
    content += '<img class="materialboxed" id="radarArpav" src="http://www.arpa.veneto.it/previsioni/radar_concordia/' + i + '_BASE">';
    mGranteContent += '<img class="materialboxed" id="radarArpavMGrande" src="http://www.arpa.veneto.it/previsioni/radar_teolo/' + i + '_BASE">';

    $('#radarArpav').replaceWith(content);
    console.log("a");
    $('#radarArpavMGrande').replaceWith(mGranteContent);
    console.log("b");

}

function getBolletini() {
    //sample site that returns xml
    site = 'http://www.arpa.veneto.it/previsioni/it/xml/bollettino_utenti.xml';


    var yql = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from xml where url="' + site + '"') + '&format=xml&callback=?';

    // Request that YSQL string, and run a callback function.
    // Pass a defined function to prevent cache-busting.
    $.getJSON(yql, function (data) {
        //console.log(data.query);
        console.log(data.results[0]);
        var xmlDoc = xml.responseXML;
        console.log(xmlDoc.getElementsByTagName("meteogrammi")[0].childNodes[0].nodeValue);
        /*   $(xml).find('meteogramma').each(function(){
               var id=$(this).attr('name');
   
               console.log(id);
   
           });*/
    });
}




function getVento() {
    $.getJSON('http://anyorigin.com/go?url=dati.venezia.it/sites/default/files/dataset/opendata/vento.json&callback=?',
        function (data) {
            $.ajaxSetup({ cache: false });

            current = JSON.stringify(data);

            if (previous && current && previous !== current) {
                Materialize.toast('Updating data...', 500);

            }
            previous = current;

            var content = '';
            content += '<tbody id="putDataHere">';
            data.contents.forEach((element) => {
                /* $("#putDataHere").append("<tr>");
                 $("#putDataHere").append("<td>" + element.stazione + "</td");
                 $("#putDataHere").append("<td>" + element.data + "</td");
                 $("#putDataHere").append("<td>" + element.valore + "</td");
                 $("#putDataHere").append("</tr>");*/
                content += '<td>' + element.stazione + '</td>';
                content += '<td>' + element.data + '</td>';
                content += '<td>' + element.valore + '</td>';
                content += '</tr>';

            });
            Materialize.toast('Searching for update', 500);
            console.log("Aggiornamento...");
            content += '</tbody>';
            $('#putDataHere').replaceWith(content);


        });

}


function getTemparia() {
    $.getJSON('http://anyorigin.com/go?url=dati.venezia.it/sites/default/files/dataset/opendata/temparia.json&callback=?',
        function (data) {
            $.ajaxSetup({ cache: false });
            jQuery.ajaxSetup({ async: false });

            current = JSON.stringify(data);

            if (previous && current && previous !== current) {
                Materialize.toast('Updating data...', 500);

            }
            previous = current;

            var content = '';
            content += '<tbody id="putAriaHere">';
            data.contents.forEach((element) => {
                /* $("#putDataHere").append("<tr>");
                 $("#putDataHere").append("<td>" + element.stazione + "</td");
                 $("#putDataHere").append("<td>" + element.data + "</td");
                 $("#putDataHere").append("<td>" + element.valore + "</td");
                 $("#putDataHere").append("</tr>");*/
                content += '<td>' + element.stazione + '</td>';
                content += '<td>' + element.data + '</td>';
                content += '<td>' + element.valore + '</td>';
                content += '</tr>';

            });
            Materialize.toast('Searching for temparia update', 500);
            console.log("Aggiornamento...");
            content += '</tbody>';
            $('#putAriaHere').replaceWith(content);
        });

}



   // var fbURL = "http://dati.venezia.it/sites/default/files/dataset/opendata/livello.json";
//http://anyorigin.com/go?url=dati.venezia.it/sites/default/files/dataset/opendata/livello.json&callback=?

//http://anyorigin.com/go?url=dati.venezia.it/sites/default/files/dataset/opendata/livello.json&callback=?


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

