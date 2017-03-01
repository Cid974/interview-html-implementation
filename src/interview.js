function loadJSON(callback) {

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', 'items.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function fillTable(building) {
  var trigger = document.getElementById('thumbnail_trigger');
  var image = document.getElementById('thumbnail');
  var name = document.getElementById('name');
  var address = document.getElementById('address');
  var floors = document.getElementById('floors');
  var rooms = document.getElementById('rooms');
  var established = document.getElementById('established');

  trigger.href = building.img;
  image.src = building.img;
  name.innerHTML = building.name;
  address.innerHTML = building.address1 + ' ' + building.address2 + ' ' +
                      building.address3;
  floors.innerHTML = building.floor;
  rooms.innerHTML = building.rooms;
  established.innerHTML = building.established;
}

function modal() {
  var modal = document.getElementById('modal_window');

  var image = document.getElementById('img_modal');
  var modalImg = document.getElementById('room_modal');

  image.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
  };

  var close = document.getElementsByClassName('close')[0];

  close.onclick = function() {
    modal.style.display = "none";
  };
}

function init() {
  loadJSON(function(response) {
    // Parse JSON string into object
    var json_data = JSON.parse(response);
    var building = json_data.datas.building;

    fillTable(building);
    modal();
  });
}

function initMap() {
  var building = {lat: 37.551522, lng: 126.956209};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: building
  });
  var marker = new google.maps.Marker({
    position: building,
    map: map
  });
}

window.onload = init();
