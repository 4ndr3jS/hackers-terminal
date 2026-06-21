# Hacker Terminal
 
A fake hacker terminal you control with your keyboard. Click or press any key to reveal commands one word at a time — nmap scans, SSH sessions, privilege escalation, the works.
 
---
 
## Features
 
- Word-by-word reveal on every keypress or tap
- Multiple line types: commands, output, warnings, errors, success, info
- Blinking cursor
- Color theme switcher (Green, Red, White)
- Fully responsive, works on mobile too
---
 
## How it works
 
A script array defines each line as a type and text pair. Every keypress or tap advances the terminal one word at a time through the current line, then commits it to history and moves to the next.

Line types control color and style: `cmd` for commands, `out` for standard output, `warn` for highlighted warnings, `err` for errors, `success` for success messages, and `info` for system notices.

---
 
## Tech stack
 
- **HTML**
- **CSS**
- **JavaScript**
---
 
## Getting started

Just open `index.html` in your browser.
 
```bash
git clone https://github.com/your-username/hacker-terminal
cd hacker-terminal
open index.html
```

---


<img width="450" height="450" alt="image" src="https://github.com/user-attachments/assets/21f14cbe-cc33-4a17-a875-bd08945c598d" /> <img width="auto" height="450" alt="image" src="https://github.com/user-attachments/assets/e020c8de-d856-42d3-a361-9729af53c543" />


