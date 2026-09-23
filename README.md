# Ridith OS (Ridz OS)

Welcome to Ridith OS, a custom web-based desktop environment and personal operating system built from scratch using pure Web technologies. This project replicates core desktop mechanics directly inside a web browser, complete with window management, a top bar status engine, and interactive built-in applications.

---

## Features

### Desktop and Window Management
- Custom Desktop Layout: Glassmorphism top status bar, background wallpaper, and desktop app shortcuts.
- Window Management Engine: Full mouse drag-and-drop support across all app windows.
- Dynamic Layering System: Smart z-index tracking ensures active and focused windows always come to the front without clipping behind the top bar.
- Live System Clock: Real-time status bar clock updated continuously via JavaScript.

### Built-In Applications
| Application | Description |
| :--- | :--- |
| Hacker Notes | Modular notes viewer with active sidebar navigation and editable rich-text containers. |
| Terminal | Interactive command-line interface supporting Unix-style commands (help, date, whoami, echo, osinfo, clear). |
| Ridz Paint | HTML5 Canvas drawing tool featuring custom color picking, adjustable brush sizing, and instant canvas resetting. |
| Calculator | Built-in utility for performing real-time arithmetic calculations. |

---

## Technical Architecture

Ridith OS operates on a clean, zero-dependency codebase:

```text
├── index.html     # HTML structure for desktop, status bar, and app window layouts
├── script.js      # OS engine (window dragging, layering, clock loop, app logic)
└── README.md      # Official project documentation
