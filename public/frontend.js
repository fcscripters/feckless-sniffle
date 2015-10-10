var username = prompt('What is your username?');
if (localStorage.length === 0) {
  localStorage.setItem("storeNo", Date.now());
}
var storeNo = localStorage.storeNo;



function simpleHttpRequest(method, url, success, failure) {
  var request = makeHttpObject();
  request.open(method,url, true);
  request.send(null);
  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      if (request.status == 200)
        success(request.responseText);
      else if (failure)
        failure(request.status, request.statusText);
    }
  };
}


simpleHttpRequest('GET','/topten')

function appendToListElement(element, list){
   for (var i = 0; i < list.length; i++) {
      var newDate = parseInt(list[i].date);
      var dateHuman = new Date(newDate).toString().slice(0,25);
      element.innerHTML = "";
      element.innerHTML += "<div class='sniffles'> <p class ='username'>" + list[i].username+"</p><p class = 'sniffle'>" + list[i].post + "</p><p class ='date'>"+dateHuman+"</p><button class='del' id ="+list[i].date+" onclick = 'removeRedis(this.id)'>Delete</button></div>"
    }
}


document.getElementById('submitPost').addEventListener('click', function(event) {
  event.preventDefault();
