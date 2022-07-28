ymaps.ready(['AnimatedLine']).then(init);

function init () {
    myMap = new ymaps.Map('map', {
        center: [54.094333, 28.306624],
        zoom: 14,
        controls: ['zoomControl', 'typeSelector']
    });
}

let coords = [];

function test(){
    coords = [
        [54.096919, 28.291198],
        [54.096607, 28.291402],
        [54.096352, 28.290485],
        [54.096137, 28.290147],
        [54.095827, 28.288673],
        [54.094928, 28.289349],
        [54.099266, 28.307176],
        [54.098837, 28.307476],
        [54.097444, 28.316703] 
    ];
    let ul = document.getElementById("coordList");
    coords.map((el, index) => {
        addToList(el[0], el[1], index);
    });
}

function addCoords(){
    const coordinatesInput = document.getElementById("coordinates");
    point = coordinatesInput.value;
    point = point.split(', ');
    const lat = parseFloat(point[0]);
    const long = parseFloat(point[1]);
    coordinatesInput.value = '';

    if (lat && long){
        coords.push([lat, long]);
        addToList(lat, long, coords.length-1);
    }
    console.log(coords);
}

let animatedLine = {};

function drawRoute(){
    if (coords.length > 1){
        animatedLine = new ymaps.AnimatedLine(coords, {}, {
            strokeColor: "#ED4543",
            strokeWidth: 5,
            animationTime: 2000
        });
        myMap.geoObjects.add(animatedLine);
        myMap.setBounds( myMap.geoObjects.getBounds());
        function playAnimation() {
            animatedLine.reset();
            animatedLine.animate();
        }
        playAnimation();
    } else {
        console.log('error');
    }
}
function addToList(lat, long, id){
    let ul = document.getElementById("coordList");
    let li = document.createElement("li");
    li.setAttribute("id", id);
    li.appendChild(document.createTextNode(lat + ", " + long));
    ul.appendChild(li);
}

function resetCoords(){
    coords = [];
    let ul = document.getElementById("coordList");
    ul.innerHTML = '';
    animatedLine.reset();
}

function getCenter(A,B){
    return [(A[0]+B[0])/2, (A[1]+B[1])/2];
}
