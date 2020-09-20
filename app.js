var firebaseConfig = {
    apiKey: "AIzaSyAXGkqUq-gJrWt4as1zyuRhbJPXTAmSxQ0",
    authDomain: "chatmax-ad7be.firebaseapp.com",
    databaseURL: "https://chatmax-ad7be.firebaseio.com",
    projectId: "chatmax-ad7be",
    storageBucket: "chatmax-ad7be.appspot.com",
    messagingSenderId: "953775198532",
    appId: "1:953775198532:web:24c45d1e6c90db4d800711",
    measurementId: "G-9V1FPJ3PWR"
};
firebase.initializeApp(firebaseConfig);





function login() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
            window.location.replace('chat.html')

        })

}
var name = prompt("Enter Your Name");
function sendMessage() {

    var message = document.getElementById('message').value;
    firebase.database().ref("message").push().set({
        "sender": name,
        "message": message
    })
    return false
}


firebase.database().ref("message").on("child_added", function (snapshot) {
    var html = "";

    html += "<li id='msg" + snapshot.key + "'>";
    html += " " + snapshot.val().message + " ";
    if (snapshot.val().sender == name) {
        html += "<button data-id='" + snapshot.key + "' onclick='deleteMessage(this);'>";
        html += "Delete";
        html += "</button>";
    }
    html += "</li>";
    document.getElementById("messages").innerHTML += html
});

function deleteMessage(self) {
    var messageId = self.getAttribute("data-id");

    firebase.database().ref("message").child(messageId).remove();
}
firebase.database().ref("message").on("child_removed", function (snapshot) {
    document.getElementById("msg" + snapshot.key).innerHTML = "This message has been removed";
});



function logout(){
firebase.auth().signOut().then(function() {
  // Sign-out successful.
  window.location.replace('index.html')

}).catch(function(error) {
  // An error happened.
});
}