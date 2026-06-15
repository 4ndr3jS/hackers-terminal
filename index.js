(function() {
    const script = [
        { type: 'cmd', text: 'user@kali:~$ nmap -sV -p 1-1000 192.168.1.105'},
        { type: 'out', text: ''},
        { type: 'out', text: 'Starting Nmap 7.94 ( hhtps://nmap.org ) at 2024-07-15 UTC'},
        { type: 'out', text: 'Host is up (0.0032s latancy).'},
    ];

    let scriptIndex = 0;
    let wordIndex = 0; 
    let currentPrompt = 'user@kali:~$ ';
    let betweenLines = true;
    let hasInteracted = false;

    const linesContainer = document.getElementById('lines');
    const currentLineEl = document.getElementById('current-line');
    const cursor = document.getElementById('cursor');
    const hintEl = document.getElementById('hint');
    const colorSwitcher = document.getElementById('color-switcher');
    const dotsTrigger = document.getElementById('dots-trigger');

    function extractPrompt(cmdText){
        const match = cmdText.match(/^(.+?[\$#]\s)/);
        return match ? match[1] : currentPrompt;
    }

    function getTypingClass(type){
        switch(type){
            case 'cmd':
                return 'cmd-typing';
            case 'warn':
                return 'warn-typing';
            case 'error':
                return 'error-typing';
            case 'success':
                return 'success-typing';
            case 'info':
                return 'info-typing';
            case 'out':
                return 'out-typing';
        }
    }

    function updateCurrentLineDisplay(){
        currentLineEl.className = 'line current';
        if(betweenLines) {
            currentLineEl.textContent = currentPrompt;
            currentLineEl.classList.add('cmd-typing');
            currentLineEl.appendChild(cursor);
        }
        else if(scriptIndex < script.length){
            const line = script[scriptIndex];
            const words = line.text.split(' ');
            const typingClass = getTypingClass(line.type);
        
            if(line.text.trim() === ''){
                currentLineEl.textContent = '';
                currentLineEl.classList.add(typingClass);
                currentLineEl.appendChild(cursor);
            }
            else if(wordIndex === 0){
                currentLineEl.textContent = '';
                currentLineEl.classList.add(typingClass);
                currentLineEl.appendChild(cursor);
            }
            else{
                const revealed = words.slice(0, wordIndex).join(' ');
                currentLineEl.textContent = revealed;
                currentLineEl.classList.add(typingClass);
                currentLineEl.appendChild(cursor);
            }
        }
        else{
            currentLineEl.textContent = currentPrompt;
            currentLineEl.classList.add('cmd-typing');
            currentLineEl.appendChild(cursor);
        }
    }

    function commitCurrentLine(){
        if(scriptIndex >= script.length)
            return;
        const line = script[scriptIndex];
        const text = line.text;
        const historyEl = document.createElement('span');
        historyEl.className = 'line ' + line.type;
        historyEl.textContent = text;
        linesContainer.insertBefore(historyEl, currentLineEl);
        if(line.type === 'cmd' && text.trim() !== ''){
            currentPrompt = extractPrompt(text);
        }
        scriptIndex++;
        wordIndex = 0;
        if(scriptIndex >= script.length){
            scriptIndex = 0;
            wordIndex = 0;
            currentPrompt = 'user@kali:~$ ';
            const sepEl = document.createElement('span');
            sepEl.className = 'line out';
            sepEl.textContent = '';
            linesContainer.insertBefore(sepEl, currentLineEl);
            const sepEl2 = document.createElement('span');
            sepEl2.className = 'line info';
            sepEl2.textContent = '--- RESTARTING ---';
            linesContainer.insertBefore(sepEl2, currentLineEl);
            const sepEl3 = document.createElement('span');
            sepEl3.className = 'line out';
            sepEl3.textContent = '';
            linesContainer.insertBefore(sepEl3, currentLineEl);
        }
        betweenLines = true;
        updateCurrentLineDisplay();
        trimOldLines();
    }

    function trimOldLines(){
        const allLines = linesContainer.querySelectorAll('.line:not(.current)');
        const maxLines = 200;
        if(allLines.length > maxLines){
            const toRemove = allLines.length - maxLines;
            for(let i = 0; i < toRemove; i++){
                if(allLines[i] && allLines[i] !== currentLineEl){
                    allLines[i].remove();
                }
            }
        }
    }

     function advance(){
        if(!hasInteracted){
            hasInteracted = true;
            hintEl.classList.add('fading');
            setTimeout(() => {
                hintEl.style.opacity = '0';
                setTimeout(() => hintEl.remove(), 800);
            }, 300);
        }
        if(scriptIndex >= script.length){
            scriptIndex = 0;
            wordIndex = 0;
            currentPrompt = 'user@kali:~$ ';
            betweenLines = true;
            updateCurrentLineDisplay();
            return;
        }
        const line = script[scriptIndex];
        if(line.text.trim() === '' && !betweenLines ){
            betweenLines = false;
            wordIndex = 0;
            commitCurrentLine();
            return;
        }
        if(betweenLines){
            betweenLines = false;
            wordIndex = 0;
        }
        const words = line.text.split(' ');
        if(wordIndex >= words.length){
            commitCurrentLine();
            return;
        }
        wordIndex++;
        updateCurrentLineDisplay();
    }

    document.addEventListener('keydown', function(e) {
        if(e.key === 'Control' || e.key === 'Shift' || e.key === 'Alt' || e.key === 'Meta' || e.key === 'CapsLock' || e.key === 'NumLock' || e.key === 'ScrollLock' || e.key === 'Fn' || e.key === 'Hyper' || e.key === 'Super' || e.key === 'OS' || e.key === 'Symbol')
            return;
        if(colorSwitcher.contains(e.target))
            return;
        e.preventDefault();
        advance();
    });

    document.addEventListener('click', function(e) {
        if (colorSwitcher.contains(e.target))
            return;
        advance();
    });

    document.addEventListener('touchstart', function(e) {
        if (colorSwitcher.contains(e.target))
            return;
        advance();
    }, { passive: true });

    dotsTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        colorSwitcher.classList.toggle('open');
    });

    const colorOptions = colorSwitcher.querySelectorAll('.opt');
    colorOptions.forEach(function(opt) {
        opt.addEventListener('click', function(e) {
            e.stopPropagation();
            const theme = opt.getAttribute('data-theme');
            document.body.classList.remove('green', 'white', 'red');
            document.body.classList.add(theme);
            colorOptions.forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            colorSwitcher.classList.remove('open');
            cursorSpan.style.animation = 'none';
            cursorSpan.offsetHeight;
            cursorSpan.style.animation = '';
        });
    });

    document.addEventListener('click', function(e) {
        if (!colorSwitcher.contains(e.target)) {
            colorSwitcher.classList.remove('open');
        }
    });

    updateCurrentLineDisplay();
})();