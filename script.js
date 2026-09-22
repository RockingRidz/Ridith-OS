// --- Clock Logic ---
function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    if (timeText) {
        timeText.innerHTML = currentTime;
    }
}
setInterval(updateTime, 1000);
updateTime();


// --- Window Dragging Engine ---
function dragElement(element) {
  var initialX = 0, initialY = 0, currentX = 0, currentY = 0;
  var header = document.getElementById(element.id + "header");

  if (header) {
    header.onmousedown = startDragging;
  } else {
    element.onmousedown = startdragging;
  }

  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Enable dragging for both windows
dragElement(document.querySelector("#welcome"));
dragElement(document.querySelector("#notes"));


// --- Window Layering & Top Bar Protection ---
var biggestIndex = 1;
var topBar = document.querySelector("#top");

function openWindow(element) {
  element.style.display = "flex";
  biggestIndex++;  
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function closeWindow(element) {
  element.style.display = "none";
}

function handleWindowTap(element) {
  biggestIndex++;  
  element.style.zIndex = biggestIndex;
  topBar.style.zIndex = biggestIndex + 1;
}

function addWindowTapHandling(element) {
  element.addEventListener("mousedown", () => handleWindowTap(element));
}

addWindowTapHandling(document.querySelector("#welcome"));
addWindowTapHandling(document.querySelector("#notes"));


// --- Window Event Listeners ---
var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

welcomeScreenClose.addEventListener("click", () => closeWindow(welcomeScreen));
welcomeScreenOpen.addEventListener("click", () => openWindow(welcomeScreen));

var notesScreen = document.querySelector("#notes");
var notesScreenClose = document.querySelector("#notesclose");
var notesIcon = document.querySelector("#notesIcon");

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));
notesIcon.addEventListener("click", () => openWindow(notesScreen));


// --- Notes App Data & Dynamic Sidebar ---
var content = [
  {
    title: "Welcome",
    date: "06/28/2023",
    content: `
      <p contenteditable="true">
        Welcome to <strong>Hacker Notes</strong><br><br>
        This is a place where I store my thoughts as they come to mind. What exactly will you find when browsing through these notes?<br><br>
        <blockquote style="background-color: #F9F9F9; margin: 16px 0; padding: 16px; border-radius: 16px;" contenteditable="true">
          <i>Time Will Tell<br>~ Ridith</i>
        </blockquote>
      </p>
    `
  },
  {
    title: "Sample Text",
    date: "06/28/2023",
    content: `
      <p contenteditable="true">
        Here's some sample text for your second note inside RidzOS!
      </p>
    `
  }
];

function setNotesContent(index) {
  var noteDisplay = document.querySelector("#notecontent");
  noteDisplay.innerHTML = content[index].content;
}

function addToSideBar(index) {
  var sidebar = document.querySelector("#sidebar");
  var note = content[index];
  
  var newDiv = document.createElement("div");
  newDiv.style.backgroundColor = "#fff";
  newDiv.style.padding = "8px";
  newDiv.style.marginBottom = "8px";
  newDiv.style.borderRadius = "8px";
  newDiv.style.cursor = "pointer";
  
  newDiv.innerHTML = `
    <p style="margin: 0px; font-weight: bold;">${note.title}</p>
    <p style="font-size: 10px; margin: 0px; color: #666;">${note.date}</p>
  `;
  
  newDiv.addEventListener("click", function() {
    setNotesContent(index);
  });
  
  sidebar.appendChild(newDiv);
}

// Loop through content and populate sidebar
for (let i = 0; i < content.length; i++) {
  addToSideBar(i);
}

// Load default note content
setNotesContent(0);
