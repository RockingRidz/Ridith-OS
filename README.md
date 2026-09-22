Ridith Operating System

Welcome to Ridith Operating System, a custom web based desktop environment and personal operating system built from scratch using HTML, CSS, and JavaScript. This project replicates core desktop mechanics entirely within a web browser, complete with a live clock, window management, custom wallpaper styling, and interactive applications.

Features

Custom Desktop Environment
The system features a personalized desktop interface complete with a top status bar, vibrant custom wallpapers, and an interactive icon layout.

Window Management Engine
Every window on the desktop supports full dragging mechanics, dynamic layer ordering through z-index tracking, and standard window controls like closing and opening.

Live Clock Status Bar
The top bar incorporates a real time clock component that updates every second to display the current date and time cleanly.

Hacker Notes Application
A dedicated built-in application featuring a dynamic sidebar populated from a JavaScript array of note objects, complete with editable content and custom styling.

Technical Architecture

Ridith OS is structured around two primary code files:

index.html
Contains the core DOM structure, including the desktop layout container, the top status bar, desktop app shortcut wrappers, and the modular window templates for both the welcome prompt and the notes application.

script.js
Manages all dynamic behaviors. This includes the real time clock interval loop, the physics engine for mouse dragging windows, window layering and focus management, and the JavaScript array iteration used to dynamically populate the notes sidebar content.

Getting Started Locally

To run or modify this project on your local machine or through a cloud development environment, follow these steps:

Clone or download the repository to your local computer.

Open the project folder inside any code editor such as Visual Studio Code or GitHub Codespaces.

Open the index.html file in any modern web browser or deploy the repository using GitHub Pages to run it live on the web.

Future Development Plans

Future updates and additions planned for the platform include additional desktop utilities, persistent local storage support for user notes, custom theme selection, and expanded interactive applications.
