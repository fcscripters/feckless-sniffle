var username = prompt('What is your username?');

  while(username === ""){
    username = prompt('Please enter a username.');
    console.log(username);
  }

if (localStorage.length === 0) {
  localStorage.setItem("storeNo", Date.now());
}
var storeNo = localStorage.storeNo;
var req2 = new XMLHttpRequest();
req2.onreadystatechange = function() {
  if (req2.readyState === 4) {
    array = JSON.parse(req2.responseText);
    var sniffles = document.getElementById('allSniffles')
    for (var i = 0; i < array.length; i++) {
      var allSniffles = document.getElementById('allSniffles');
      var newDate = parseInt(array[i].date);
      var dateHuman = new Date(newDate).toString().slice(0,25);
      allSniffles.innerHTML += "<div class='sniffles'> <p class ='username'>" + array[i].username+"</p><p class = 'sniffle'>" + array[i].post + "</p><p class ='date'>"+dateHuman+"</p><button class='del' id ="+array[i].date+" onclick = 'removeRedis(this.id)'>Delete</button></div>"
    }
  }
};
req2.open('GET', "/topten", true);
req2.send();

document.getElementById('submitPost').addEventListener('click', function(event) {
  event.preventDefault();
  var post = document.getElementById('newPost').value;
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      array = JSON.parse(request.responseText);
      console.log(array);
      var sniffles = document.getElementById('allSniffles')
      sniffles.innerHTML = "";
      for (var i = 0; i < array.length; i++) {
        var allSniffles = document.getElementById('allSniffles');
        var newDate = parseInt(array[i].date);
        var dateHuman = new Date(newDate).toString().slice(0,25);
        allSniffles.innerHTML += "<div class='sniffles'> <p class ='username'>" + array[i].username+"</p><p class = 'sniffle'>" + array[i].post + "</p><p class ='date'>"+dateHuman+"</p><button class='del' id ="+array[i].date+" onclick = 'removeRedis(this.id)'>Delete</button></div>"
      }

    }
  };
  request.open('POST', "/post/" + username + '/' + post + '/' + Date.now() + '/' + storeNo, true);
  request.send();
});


function removeRedis(id){

  console.log(id);
  var item = document.getElementById(id).parentNode
  item.parentNode.removeChild(item)

  var req3 = new XMLHttpRequest();
  req3.onreadystatechange = function() {
    if (req2.readyState === 4) {
      array = JSON.parse(req2.responseText);
     }
  };

  req3.open('DELETE', "/delete" +'/'+id , true);
  req3.send();