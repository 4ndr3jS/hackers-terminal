(function() {
    const script = [
        { type: 'cmd', text: 'user@kali:~$ nmap -sV -p 1-1000 192.168.1.105'},
        { type: 'out', text: ''},
        { type: 'out', text: 'Starting Nmap 7.94 ( hhtps://nmap.org ) at 2024-07-15 UTC'},
        { type: 'out', text: 'Host is up (0.0032s latancy).'},
        { type: 'out', text: ''},
        { type: 'out', text: 'PORT     STATE    SERVICE       VERSION' },
        { type: 'out', text: '22/tcp   open     ssh           OpenSHH 8.9p1 Ubuntu 3ubunmtu0.6' },
        { type: 'out', text: '80/tcp   open     ssh           Apache httpd 2.4.57'},
        { type: 'out', text: '443/tcp  open     http          Apache httpd 2.4.57'},
        { type: 'out', text: '3306/tcp open     mysql         MySQL 8.0.35'},
        { type: 'out', text: ''},
        { type: 'out', text: 'Service detection performed. Nmap done: 1 IP address scanned in 2.87s seconds'},
        { type: 'out', text: ''},
        { type: 'cmd', text: 'user@kali:~$ hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.105 -t 4' },
        { type: 'out', text: '' },
        { type: 'warn', text: '[ATTEMPT] host 192.168.1.105  login: admin  password: password123' },
        { type: 'warn', text: '[ATTEMPT] host 192.168.1.105  login: admin  password: letmein' },
        { type: 'warn', text: '[ATTEMPT] host 192.168.1.105  login: admin  password: qwerty' },
        { type: 'warn', text: '[ATTEMPT] host 192.168.1.105  login: admin  password: trustno1' },
        { type: 'success', text: '[SUCCESS] host 192.168.1.105  login: admin  password: admin2023!' },
        { type: 'out', text: '' },
        { type: 'cmd', text: 'user@kali:~$ ssh admin@192.168.1.105' },
        { type: 'out', text: '' },
        { type: 'out', text: 'admin@192.168.1.105\'s password: ********' },
        { type: 'out', text: '' },
        { type: 'info', text: 'Welcome to Ubuntu 22.04.3 LTS (GNU/Linux 6.5.0-28-generic x86_64)' },
        { type: 'info', text: 'Last login: Mon Jul 15 02:43:19 2024 from 10.0.2.15' },
        { type: 'out', text: '' },
        { type: 'cmd', text: 'admin@app-server:~$ ls -la' },
        { type: 'out', text: 'total 36' },
        { type: 'out', text: 'drwxr-xr-x 4 admin admin 4096 Jul 15 02:44 .' },
        { type: 'out', text: 'drwxr-xr-x 3 root  root  4096 Jul 10 18:22 ..' },
        { type: 'out', text: '-rw-r--r-- 1 admin admin  220 Jul 10 18:22 .bashrc' },
        { type: 'out', text: 'drwxr-xr-x 2 admin admin 4096 Jul 14 11:30 backups' },
        { type: 'out', text: 'drwx------ 2 admin admin 4096 Jul 15 02:43 .ssh' },
        { type: 'warn', text: '-rw-r--r-- 1 admin admin  807 Jul 14 11:31 secrets.cfg' },
        { type: 'out', text: '' },
        { type: 'cmd', text: 'admin@app-server:~$ cat secrets.cfg' },
        { type: 'out', text: '[database]' },
        { type: 'out', text: 'host = localhost' },
        { type: 'out', text: 'user = db_admin' },
        { type: 'warn', text: 'password = Sup3rS3cr3tP@ss!' },
        { type: 'out', text: '' },
        { type: 'out', text: '[admin_panel]' },
        { type: 'out', text: 'endpoint = /internal/admin' },
        { type: 'warn', text: 'api_key = ak-7f8a9b3c2d1e4f5a6b7c8d9e0f1a2b3c' },
        { type: 'out', text: '' },
        { type: 'cmd', text: 'admin@app-server:~$ sudo -l' },
        { type: 'out', text: 'Matching Defaults entries for admin on app-server:' },
        { type: 'out', text: '    env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin' },
        { type: 'out', text: '' },
        { type: 'out', text: 'User admin may run the following commands on app-server:' },
        { type: 'warn', text: '    (ALL : ALL) ALL' },
        { type: 'out', text: '' },
        { type: 'cmd', text: 'admin@app-server:~$ sudo su -' },
        { type: 'out', text: '[sudo] password for admin: ********' },
        { type: 'success', text: 'root@app-server:~# ' },
        { type: 'out', text: '' },
        { type: 'cmd', text: 'root@app-server:~# whoami' },
        { type: 'out', text: 'root' },
        { type: 'out', text: '' },
        { type: 'cmd', text: 'root@app-server:~# cat /etc/shadow | head -3' },
        { type: 'out', text: 'root:$6$xyz...[hash truncated]...:19579:0:99999:7:::' },
        { type: 'out', text: 'daemon:*:19579:0:99999:7:::' },
        { type: 'out', text: 'admin:$6$abc...[hash truncated]...:19600:0:99999:7:::' },
        { type: 'out', text: '' },
        { type: 'warn', text: '*** ALERT: Unauthorized root access detected ***' },
        { type: 'warn', text: '*** Intrusion Detection System triggered ***' },
        { type: 'warn', text: '*** Tracing source IP... 10.0.2.15 identified ***' },
        { type: 'err', text: 'Connection to 192.168.1.105 closed by remote host.' },
        { type: 'err', text: 'Session terminated. This incident has been logged.' },
        { type: 'out', text: '' },
        { type: 'info', text: '--- END OF TRANSMISSION ---' },
        { type: 'out', text: '' },
        { type: 'out', text: '' }
    ]

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
        case 'err':
            return 'err-typing';
        case 'success':
            return 'success-typing';
        case 'info':
            return 'info-typing';
        default:
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
        if(e.repeat)
            return;
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
            cursor.style.animation = 'none';
            cursor.offsetHeight;
            cursor.style.animation = '';
        });
    });

    document.addEventListener('click', function(e) {
        if (!colorSwitcher.contains(e.target)) {
            colorSwitcher.classList.remove('open');
        }
    });

    updateCurrentLineDisplay();
})();