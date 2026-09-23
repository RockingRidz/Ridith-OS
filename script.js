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
    if (!element) return;
    var initialX = 0, initialY = 0, currentX = 0, currentY = 0;
    var header = document.getElementById(element.id + "header");

    if (header) {
        header.onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
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

// Enable dragging for all OS windows
dragElement(document.querySelector("#welcome"));
dragElement(document.querySelector("#notes"));
dragElement(document.querySelector("#terminal"));
dragElement(document.querySelector("#paint"));
dragElement(document.querySelector("#calculator"));


// --- Window Layering & Top Bar Protection ---
var biggestIndex = 1;
var topBar = document.querySelector("#top");

function openWindow(element) {
    if (!element) return;
    element.style.display = "flex";
    element.style.flexDirection = "column";
    biggestIndex++;   
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}

function closeWindow(element) {
    if (element) {
        element.style.display = "none";
    }
}

function handleWindowTap(element) {
    biggestIndex++;   
    element.style.zIndex = biggestIndex;
    topBar.style.zIndex = biggestIndex + 1;
}

function addWindowTapHandling(element) {
    if (element) {
        element.addEventListener("mousedown", () => handleWindowTap(element));
    }
}

// Add click-to-focus on all windows
addWindowTapHandling(document.querySelector("#welcome"));
addWindowTapHandling(document.querySelector("#notes"));
addWindowTapHandling(document.querySelector("#terminal"));
addWindowTapHandling(document.querySelector("#paint"));
addWindowTapHandling(document.querySelector("#calculator"));


// --- Window Toggle Event Listeners ---
// Welcome Window
var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenClose = document.querySelector("#welcomeclose");
var welcomeScreenOpen = document.querySelector("#welcomeopen");

if (welcomeScreenClose) welcomeScreenClose.addEventListener("click", () => closeWindow(welcomeScreen));
if (welcomeScreenOpen) welcomeScreenOpen.addEventListener("click", () => openWindow(welcomeScreen));

// Notes Window
var notesScreen = document.querySelector("#notes");
var notesScreenClose = document.querySelector("#notesclose");
var notesIcon = document.querySelector("#notesIcon");

if (notesScreenClose) notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));
if (notesIcon) notesIcon.addEventListener("click", () => openWindow(notesScreen));

// Terminal Window
var terminalScreen = document.querySelector("#terminal");
var terminalClose = document.querySelector("#terminalclose");
var terminalIcon = document.querySelector("#terminalIcon");

if (terminalClose) terminalClose.addEventListener("click", () => closeWindow(terminalScreen));
if (terminalIcon) terminalIcon.addEventListener("click", () => openWindow(terminalScreen));

// Paint Window
var paintScreen = document.querySelector("#paint");
var paintClose = document.querySelector("#paintclose");
var paintIcon = document.querySelector("#paintIcon");

if (paintClose) paintClose.addEventListener("click", () => closeWindow(paintScreen));
if (paintIcon) paintIcon.addEventListener("click", () => openWindow(paintScreen));

// Calculator Window
var calcScreen = document.querySelector("#calculator");
var calcClose = document.querySelector("#calcclose");
var calcIcon = document.querySelector("#calcIcon");

if (calcClose) calcClose.addEventListener("click", () => closeWindow(calcScreen));
if (calcIcon) calcIcon.addEventListener("click", () => openWindow(calcScreen));


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
    if (noteDisplay) {
        noteDisplay.innerHTML = content[index].content;
    }
}

function addToSideBar(index) {
    var sidebar = document.querySelector("#sidebar");
    if (!sidebar) return;
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


// --- APP 1: Terminal Command Handler ---
var termInput = document.querySelector("#termInput");
var termOutput = document.querySelector("#termOutput");

if (termInput) {
    termInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            var rawCmd = termInput.value.trim();
            var cmd = rawCmd.toLowerCase();
            var response = "";

            if (cmd === "help") {
                response = "Available commands: help, clear, date, whoami, echo [text], osinfo";
            } else if (cmd === "clear") {
                termOutput.innerHTML = "";
                termInput.value = "";
                return;
            } else if (cmd === "date") {
                response = new Date().toString();
            } else if (cmd === "whoami") {
                response = "ridz_user (Administrator)";
            } else if (cmd === "osinfo") {
                response = "Ridith OS v1.0.0 (Web Architecture)";
            } else if (cmd.startsWith("echo ")) {
                response = rawCmd.substring(5);
            } else if (cmd === "") {
                response = "";
            } else {
                response = "Command not recognized: " + rawCmd + ". Type 'help' for commands.";
            }

            var line = document.createElement("p");
            line.style.margin = "2px 0";
            line.innerHTML = `<span style="color: #00ff66;">ridz@os:~$</span> ${rawCmd}<br>${response ? `<span style="color: #ccc;">${response}</span>` : ""}`;
            termOutput.appendChild(line);

            termInput.value = "";
            var termBody = document.querySelector("#termBody");
            if (termBody) termBody.scrollTop = termBody.scrollHeight;
        }
    });
}


// --- APP 2: Paint App Canvas Engine ---
var canvas = document.querySelector("#paintCanvas");
var paintColor = document.querySelector("#paintColor");
var paintSize = document.querySelector("#paintSize");
var paintClear = document.querySelector("#paintClear");

if (canvas) {
    var ctx = canvas.getContext("2d");
    var isDrawing = false;

    canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    });

    canvas.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = paintColor ? paintColor.value : "#000";
        ctx.lineWidth = paintSize ? paintSize.value : 3;
        ctx.lineCap = "round";
        ctx.stroke();
    });

    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mouseleave", () => isDrawing = false);

    if (paintClear) {
        paintClear.addEventListener("click", () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }
}


// --- APP 3: System Calculator Engine ---
function calcInput(value) {
    var display = document.querySelector("#calcDisplay");
    if (!display) return;

    if (value === "C") {
        display.value = "0";
    } else if (value === "=") {
        try {
            // Evaluates math expressions safely
            display.value = eval(display.value);
        } catch (err) {
            display.value = "Error";
        }
    } else {
        if (display.value === "0" || display.value === "Error") {
            display.value = value;
        } else {
            display.value += value;
        }
    }
}
