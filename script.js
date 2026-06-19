// ======================================
// SMART MUSEUM GUIDE
// SCRIPT.JS PART 1
// ======================================


// Current selected object

let currentObject = "";

let currentDescription = "";





// ======================================
// HISTORICAL OBJECT DATABASE
// ======================================


const exhibits = [


{
name:"Mona Lisa",
category:"Historic Art",
artist:"Leonardo da Vinci",
year:"1503",
image:"https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg",
description:"The Mona Lisa is one of the world's most famous Renaissance paintings."
},



{
name:"Starry Night",
category:"Historic Art",
artist:"Vincent van Gogh",
year:"1889",
image:"https://upload.wikimedia.org/wikipedia/commons/e/ea/The_Starry_Night.jpg",
description:"A famous post-impressionist painting showing a beautiful night sky."
},



{
name:"The Last Supper",
category:"Historic Art",
artist:"Leonardo da Vinci",
year:"1498",
image:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Leonardo_da_Vinci_-_The_Last_Supper_high_res.jpg",
description:"A famous mural depicting Jesus and his disciples."
},



{
name:"Ajanta Cave Paintings",
category:"Historic Art",
artist:"Ancient Indian Artists",
year:"200 BC",
image:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Ajanta_Caves.jpg",
description:"Ancient Buddhist paintings from Maharashtra, India."
},



{
name:"Rosetta Stone",
category:"Rare Artifact",
artist:"Ancient Egypt",
year:"196 BC",
image:"https://upload.wikimedia.org/wikipedia/commons/c/c3/Rosetta_Stone.JPG",
description:"The artifact that helped decode Egyptian hieroglyphics."
},



{
name:"Tutankhamun Golden Mask",
category:"Rare Artifact",
artist:"Ancient Egypt",
year:"1323 BC",
image:"https://upload.wikimedia.org/wikipedia/commons/e/e1/Tutankhamun%27s_gold_funeral_mask.jpg",
description:"Golden burial mask of Egyptian Pharaoh Tutankhamun."
},



{
name:"Terracotta Army",
category:"Rare Artifact",
artist:"Qin Dynasty China",
year:"210 BC",
image:"https://upload.wikimedia.org/wikipedia/commons/9/9a/Army_of_Terracotta_Warriors.jpg",
description:"Thousands of clay soldiers protecting Emperor Qin."
},



{
name:"Dead Sea Scrolls",
category:"Rare Artifact",
artist:"Ancient Jewish Community",
year:"300 BC",
image:"https://upload.wikimedia.org/wikipedia/commons/5/54/Dead_Sea_Scrolls_3.jpg",
description:"Ancient manuscripts discovered near the Dead Sea."
},




{
name:"David Statue",
category:"Ancient Sculpture",
artist:"Michelangelo",
year:"1504",
image:"https://upload.wikimedia.org/wikipedia/commons/1/1f/Michelangelo%27s_David.jpg",
description:"A Renaissance marble sculpture created by Michelangelo."
},



{
name:"Venus de Milo",
category:"Ancient Sculpture",
artist:"Ancient Greece",
year:"100 BC",
image:"https://upload.wikimedia.org/wikipedia/commons/8/84/Venus_de_Milo_Louvre_Ma399_n4.jpg",
description:"Ancient Greek sculpture representing Aphrodite."
},



{
name:"The Thinker",
category:"Ancient Sculpture",
artist:"Auguste Rodin",
year:"1904",
image:"https://upload.wikimedia.org/wikipedia/commons/f/f8/The_Thinker%2C_Rodin.jpg",
description:"A famous bronze sculpture representing deep thought."
},



{
name:"Moai Statue",
category:"Ancient Sculpture",
artist:"Rapa Nui Civilization",
year:"1200 AD",
image:"https://upload.wikimedia.org/wikipedia/commons/0/0e/Moai_Rano_raraku.jpg",
description:"Huge stone statues from Easter Island."
}


];







// ======================================
// LOAD OBJECTS
// ======================================


function loadMuseumObjects(){


let container =
document.getElementById(
"museumContainer"
);



container.innerHTML="";



exhibits.forEach(item=>{


container.innerHTML += `


<div class="card">


<img src="${item.image}">


<h2>
${item.name}
</h2>


<p>
${item.artist}
</p>


<p>
${item.year}
</p>



<button onclick="showDetails('${item.name}')">

📖 Details

</button>


<button onclick="addFavorite('${item.name}')">

❤️ Favorite

</button>


<button onclick="bookTicket('${item.name}')">

🎟 Ticket

</button>


</div>


`;


});


}







// ======================================
// DETAILS POPUP
// ======================================


function showDetails(name){


let item =
exhibits.find(
x=>x.name==name
);



currentObject=item.name;

currentDescription=item.description;



document.getElementById("popup").style.display="block";



document.getElementById("title").innerHTML=item.name;


document.getElementById("objectImage").src=item.image;



document.getElementById("description").innerHTML=

`
Artist:
${item.artist}

<br><br>

Year:
${item.year}

<br><br>

${item.description}

`;

}




function closePopup(){

document.getElementById("popup").style.display="none";

}







// ======================================
// SEARCH
// ======================================


function searchExhibits(){


let value =
document.getElementById("searchBox")
.value
.toLowerCase();



document.querySelectorAll(".card")
.forEach(card=>{


let name =
card.querySelector("h2")
.innerText
.toLowerCase();



card.style.display =
name.includes(value)
?
"block"
:
"none";


});


}







// ======================================
// CATEGORY FILTER
// ======================================


function filterCategory(){


let category =
document.getElementById(
"categoryFilter"
)
.value;



document.querySelectorAll(".card")
.forEach(card=>{


if(category=="all" ||
card.innerText.includes(category)
)

card.style.display="block";


else

card.style.display="none";


});


}






// ======================================
// EXPLORE BUTTON
// ======================================


function scrollToCollection(){


document
.getElementById("museumContainer")
.scrollIntoView({

behavior:"smooth"

});


}
// ======================================
// DARK / LIGHT MODE
// ======================================


function toggleDarkMode(){


document.body.classList.toggle("dark");


let button =
document.getElementById("themeBtn");



if(document.body.classList.contains("dark")){


button.innerHTML="☀️ Light Mode";


localStorage.setItem(
"theme",
"dark"
);


}

else{


button.innerHTML="🌙 Dark Mode";


localStorage.setItem(
"theme",
"light"
);


}


}



function loadTheme(){


if(
localStorage.getItem("theme")
==
"dark"
){


document.body.classList.add("dark");


document.getElementById(
"themeBtn"
).innerHTML="☀️ Light Mode";


}


}








// ======================================
// VISITOR COUNTER
// ======================================


function visitorCounter(){


let visitors =
localStorage.getItem(
"museumVisitors"
);



if(!visitors){

visitors=12500;

}


visitors++;



localStorage.setItem(
"museumVisitors",
visitors
);



let counter =
document.getElementById(
"visitorCount"
);



if(counter){

counter.innerHTML=visitors;

}


}









// ======================================
// FAVORITES
// ======================================


function addFavorite(name){


let fav =

JSON.parse(
localStorage.getItem(
"favorites"
)
)
||
[];




if(!fav.includes(name)){


fav.push(name);



localStorage.setItem(
"favorites",
JSON.stringify(fav)
);


}



showFavorites();



alert(
"Added to favorites ❤️"
);


}




function showFavorites(){


let list =
document.getElementById(
"favoritesList"
);



if(!list)
return;



list.innerHTML="";



let fav =
JSON.parse(
localStorage.getItem(
"favorites"
)
)
||
[];




fav.forEach(item=>{


list.innerHTML+=

`
<li>
❤️ ${item}
</li>
`;


});


}









// ======================================
// VOICE GUIDE
// ======================================


function speakInfo(){


let speech =
new SpeechSynthesisUtterance(
currentDescription
);



speech.rate=0.8;


speechSynthesis.speak(
speech
);


}









// ======================================
// AI MUSEUM GUIDE
// ======================================



function openAI(){


document.getElementById(
"aiModal"
).style.display="block";


}



function closeAI(){


document.getElementById(
"aiModal"
).style.display="none";


}




function askAI(){


let question =

document.getElementById(
"aiQuestion"
)
.value
.toLowerCase();



let answer =
"Sorry, I don't have information about this object.";



exhibits.forEach(item=>{


if(
question.includes(
item.name.toLowerCase()
)

){


answer=

`
<b>${item.name}</b>

<br><br>

Created:
${item.year}

<br>

Artist:
${item.artist}

<br><br>

${item.description}

`;



}


});




document.getElementById(
"aiAnswer"
)
.innerHTML=answer;


}









// ======================================
// TICKET BOOKING
// ======================================


let selectedObject="";



function bookTicket(name){


selectedObject=name;


document.getElementById(
"ticketModal"
)
.style.display="block";


}




function closeTicket(){


document.getElementById(
"ticketModal"
)
.style.display="none";


}






function confirmBooking(){


let name =
document.getElementById(
"visitorName"
).value;



let count =
document.getElementById(
"visitors"
).value;




let bookings =

JSON.parse(
localStorage.getItem(
"bookings"
)
)
||
[];




bookings.push({

visitor:name,

object:selectedObject,

people:count

});




localStorage.setItem(

"bookings",

JSON.stringify(bookings)

);




alert(
"🎟 Ticket booked successfully"
);



closeTicket();


}









// ======================================
// SHOW BOOKINGS
// ======================================


function showBookings(){


let box =
document.getElementById(
"bookingList"
);



box.innerHTML="";



let bookings =

JSON.parse(
localStorage.getItem(
"bookings"
)
)
||
[];




bookings.forEach(b=>{


box.innerHTML+=


`
<p>

🎟 Object:
${b.object}

<br>

Visitor:
${b.visitor}

<br>

People:
${b.people}

</p>

<hr>

`;



});



document.getElementById(
"bookingModal"
)
.style.display="block";


}




function closeBookings(){


document.getElementById(
"bookingModal"
)
.style.display="none";


}









// ======================================
// MAP
// ======================================


function showMap(){


document.getElementById(
"mapModal"
)
.style.display="block";


}




function closeMap(){


document.getElementById(
"mapModal"
)
.style.display="none";


}




function enterRoom(room){


alert(

"Welcome to "
+
room

);


}









// ======================================
// QUIZ
// ======================================


let correctAnswer="";



function startQuiz(){


document.getElementById(
"quizModal"
)
.style.display="block";



document.getElementById(
"quizQuestion"
)
.innerHTML=

"Who painted Mona Lisa?";



correctAnswer="leonardo";


}




function checkAnswer(){


let answer =

document.getElementById(
"quizAnswer"
)
.value
.toLowerCase();



if(answer.includes(correctAnswer)){


document.getElementById(
"quizResult"
)
.innerHTML=

"✅ Correct Answer";


}

else{


document.getElementById(
"quizResult"
)
.innerHTML=

"❌ Try Again";


}


}




function closeQuiz(){


document.getElementById(
"quizModal"
)
.style.display="none";


}









// ======================================
// REVIEWS
// ======================================


function addReview(){


let text =

document.getElementById(
"review"
)
.value;



if(text=="")
return;




let reviews =

JSON.parse(
localStorage.getItem(
"reviews"
)
)
||
[];




reviews.push(text);



localStorage.setItem(
"reviews",
JSON.stringify(reviews)
);



displayReviews();



document.getElementById(
"review"
)
.value="";


}




function displayReviews(){


let box =
document.getElementById(
"reviews"
);



if(!box)
return;



box.innerHTML="";



let reviews =

JSON.parse(
localStorage.getItem(
"reviews"
)
)
||
[];




reviews.forEach(r=>{


box.innerHTML+=

`
<p>
⭐ ${r}
</p>
`;


});


}









// ======================================
// INITIAL LOAD
// ======================================


window.addEventListener(
"load",
()=>{


loadMuseumObjects();

loadTheme();

visitorCounter();

showFavorites();

displayReviews();


});
// ======================================
// 3D VIRTUAL MUSEUM
// ======================================


let scene;
let camera;
let renderer;



function openVirtualMuseum(){


let container =
document.getElementById(
"virtualMuseum"
);



container.style.display="block";



if(renderer)
return;



scene =
new THREE.Scene();



scene.background =
new THREE.Color(
0x111111
);




camera =
new THREE.PerspectiveCamera(

75,

container.clientWidth /
container.clientHeight,

0.1,

1000

);



renderer =
new THREE.WebGLRenderer();



renderer.setSize(

container.clientWidth,

container.clientHeight

);



container.appendChild(
renderer.domElement
);





// Museum floor


let floorGeometry =
new THREE.PlaneGeometry(
20,
20
);



let floorMaterial =
new THREE.MeshBasicMaterial({

color:0x555555

});



let floor =
new THREE.Mesh(

floorGeometry,

floorMaterial

);



floor.rotation.x =
-Math.PI/2;



scene.add(floor);







// Create exhibition objects


exhibits.slice(0,10)
.forEach((item,index)=>{


let geometry =
new THREE.BoxGeometry(
1,
1,
1
);



let material =
new THREE.MeshBasicMaterial({

color:
Math.random()*0xffffff

});



let cube =
new THREE.Mesh(
geometry,
material
);



cube.position.x =
(index%5)*3-6;



cube.position.z =
Math.floor(index/5)*3;



cube.userData =
item.name;



scene.add(cube);


});





camera.position.set(
0,
5,
10
);



camera.lookAt(
0,
0,
0
);




animateMuseum();



}







function animateMuseum(){


requestAnimationFrame(
animateMuseum
);



renderer.render(
scene,
camera
);


}










// ======================================
// IMPROVED AI GUIDE
// ======================================



const aiKnowledge={


"mona lisa":

"The Mona Lisa was painted by Leonardo da Vinci around 1503. It is famous for its mysterious smile.",


"taj mahal":

"The Taj Mahal was built by Shah Jahan in memory of Mumtaz Mahal.",


"pyramids":

"The Egyptian pyramids were built as tombs for ancient pharaohs.",


"david":

"David is a Renaissance sculpture created by Michelangelo.",


"rosetta stone":

"The Rosetta Stone helped historians understand Egyptian hieroglyphs."


};





function advancedAI(question){


question =
question.toLowerCase();



for(let key in aiKnowledge){


if(question.includes(key)){


return aiKnowledge[key];


}


}



return 
"I can guide you about paintings, artifacts, sculptures and ancient history.";


}







// ======================================
// SHOP / BUY FEATURE
// ======================================



function buyItem(item){


let orders =

JSON.parse(
localStorage.getItem(
"orders"
)
)
||
[];




orders.push(item);



localStorage.setItem(

"orders",

JSON.stringify(orders)

);



alert(

"🛒 "+item+
" purchased successfully"

);


}







// ======================================
// ADD MORE OBJECTS SUPPORT
// ======================================



function addNewArtifact(

name,

category,

year,

artist,

image,

description

){



exhibits.push({

name:name,

category:category,

year:year,

artist:artist,

image:image,

description:description


});



loadMuseumObjects();


}








// ======================================
// WINDOW RESIZE FOR 3D
// ======================================


window.addEventListener(

"resize",

()=>{


if(!renderer)
return;



let container =
document.getElementById(
"virtualMuseum"
);



camera.aspect =

container.clientWidth /
container.clientHeight;



camera.updateProjectionMatrix();



renderer.setSize(

container.clientWidth,

container.clientHeight

);



}

);