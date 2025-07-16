document.addEventListener('DOMContentLoaded', function() {
    // --- Element Declarations ---
    const navLinks = document.querySelectorAll('nav a');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const yearSpan = document.getElementById('year');
    const terminalContainer = document.getElementById('terminal-container');
    const heroVisualContainer = document.getElementById('hero-visual-container');
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    const inputLineContainer = document.getElementById('input-line-container');
    const table = document.getElementById('comparison-table');
    let currentLine = '';
    let hasBooted = false;
    let isBooting = false;
    let commandHistory = [];
    let historyIndex = -1;

    // --- Data Constants ---
    const bootCommands = [
        '> Initializing CLRCACHE Terminal v1.0...',
        '> Boot sequence started [OK]',
        '> Loading modules: design.engine | seo.core | render.pipeline | client.interface [OK]',
        '> Verifying connection to host... clrcache.solutions [CONNECTED]',
        '> Allocating render memory... 512MB reserved',
        '> Setting viewport: fluid-width / device-adaptive',
        '> Compiling frontend architecture... [COMPLETE]',
        '> Injecting brand personality... ✓'
    ];

    const welcomeMessage = 'Welcome to CLRCache Solutions. Type `help` for a list of commands.';
    const systemInfo = [
        'System Info:',
        '  Owner ............ Ryan Dugan',
        '  Build Type ....... Static Web Application',
        '  Render Engine .... HTML/CSS/JS (Hand-Coded)',
        '  Load Time Target . < 1s',
        '  Mobile Support ... 100% Responsive',
        '  SEO Framework .... Integrated',
        '  Version .......... 2025.1',
        '  Status ........... Ready for Deployment'
    ];

    const helpText = [
        'Available Commands:',
        '  solution    - See what\'s included in the package',
        '  process     - Learn about our development process',
        '  work        - Browse past projects',
        '  about       - Learn more about our team and mission',
        '  contact     - Get in touch with us',
        '  help        - Reprint this list',
        '  clear       - Clear the terminal screen'
    ];

    // --- Core Functions ---
    function runBootSequence() {
        let i = 0;
        isBooting = true;

        function nextLine() {
            if (i < bootCommands.length) {
                const historyLine = document.createElement('div');
                historyLine.textContent = bootCommands[i];
                terminalHistory.insertBefore(historyLine, inputLineContainer);
                terminalHistory.scrollTop = terminalHistory.scrollHeight;
                i++;
                setTimeout(nextLine, 120);
            } else {
                const blankLineAfterBoot = document.createElement('div');
                blankLineAfterBoot.innerHTML = '&nbsp;';
                terminalHistory.insertBefore(blankLineAfterBoot, inputLineContainer);

                setTimeout(() => {
                    let j = 0;
                    function nextInfoLine() {
                        if (j < systemInfo.length) {
                            const infoLine = document.createElement('div');
                            infoLine.textContent = systemInfo[j];
                            terminalHistory.insertBefore(infoLine, inputLineContainer);
                            terminalHistory.scrollTop = terminalHistory.scrollHeight;
                            j++;
                            setTimeout(nextInfoLine, 100);
                        } else {
                            setTimeout(() => {
                                const blankLine1 = document.createElement('div');
                                blankLine1.innerHTML = '&nbsp;';
                                terminalHistory.insertBefore(blankLine1, inputLineContainer);

                                const welcomeLine = document.createElement('div');
                                welcomeLine.textContent = welcomeMessage;
                                terminalHistory.insertBefore(welcomeLine, inputLineContainer);

                                const blankLine2 = document.createElement('div');
                                blankLine2.innerHTML = '&nbsp;';
                                terminalHistory.insertBefore(blankLine2, inputLineContainer);

                                terminalHistory.scrollTop = terminalHistory.scrollHeight;
                                isBooting = false;
                            }, 500);
                        }
                    }
                    nextInfoLine();
                }, 500);
            }
        }
        nextLine();
    }

    function processCommand(command) {
        const lowerCaseCommand = command.toLowerCase().trim();

        const navigateTo = (page, pageName) => {
            const successLine = document.createElement('div');
            successLine.textContent = `Navigating to ${pageName}...`;
            terminalHistory.insertBefore(successLine, inputLineContainer);
            terminalHistory.scrollTop = terminalHistory.scrollHeight;
            setTimeout(() => {
                window.location.href = page;
            }, 1000);
        };

        switch (lowerCaseCommand) {
            case 'help':
                printWithDelay(helpText, 50);
                break;
            case 'clear':
                const childrenToRemove = Array.from(terminalHistory.children).filter(child => child !== inputLineContainer);
                childrenToRemove.forEach(child => terminalHistory.removeChild(child));
                break;
            case 'solution':
                navigateTo('oursolution.html', 'Our Solution');
                break;
            case 'process':
                navigateTo('process.html', 'Process');
                break;
            case 'work':
                navigateTo('work.html', 'Our Work');
                break;
            case 'about':
                navigateTo('about.html', 'About Us');
                break;
            case 'contact':
                navigateTo('contact.html', 'Contact');
                break;
            default:
                const errorLine = document.createElement('div');
                errorLine.textContent = `Command not found: "${command}". Type 'help' for a list of commands.`;
                terminalHistory.insertBefore(errorLine, inputLineContainer);
                break;
        }
    }

    function printWithDelay(lines, delay) {
        let i = 0;
        function nextLine() {
            if (i < lines.length) {
                const line = document.createElement('div');
                line.textContent = lines[i];
                terminalHistory.insertBefore(line, inputLineContainer);
                terminalHistory.scrollTop = terminalHistory.scrollHeight;
                i++;
                setTimeout(nextLine, delay);
            }
        }
        nextLine();
    }

    // --- Event Listeners ---
    if (terminalContainer && heroVisualContainer) {
        heroVisualContainer.addEventListener('mouseenter', () => {
            // Remove the closing class to prevent animation conflicts
            heroVisualContainer.classList.remove('is-closing');

            // Use requestAnimationFrame to ensure the class is re-added after the browser has processed the removal
            requestAnimationFrame(() => {
                heroVisualContainer.classList.add('is-expanded');
            });

            if (!hasBooted) {
                hasBooted = true;
                runBootSequence();
            }
        });

        heroVisualContainer.addEventListener('mouseleave', () => {
            heroVisualContainer.classList.add('is-closing');
            heroVisualContainer.classList.remove('is-expanded');
        });

        heroVisualContainer.addEventListener('animationend', (e) => {
            if (e.animationName === 'contract') {
                heroVisualContainer.classList.remove('is-closing');
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (isBooting || !heroVisualContainer.classList.contains('is-expanded')) return;
        e.preventDefault();

        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            currentLine += e.key;
            terminalInput.textContent = currentLine;
        } else if (e.key === 'Backspace') {
            currentLine = currentLine.slice(0, -1);
            terminalInput.textContent = currentLine;
        } else if (e.key === 'Enter') {
            if (currentLine.trim() === '') return;
            const historyLine = document.createElement('div');
            historyLine.innerHTML = `&gt; ${currentLine}`;
            terminalHistory.insertBefore(historyLine, inputLineContainer);
            commandHistory.push(currentLine);
            historyIndex = commandHistory.length;
            processCommand(currentLine);
            currentLine = '';
            terminalInput.textContent = '';
            terminalHistory.scrollTop = terminalHistory.scrollHeight;
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                currentLine = commandHistory[historyIndex];
                terminalInput.textContent = currentLine;
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                currentLine = commandHistory[historyIndex];
                terminalInput.textContent = currentLine;
            } else {
                historyIndex = commandHistory.length;
                currentLine = '';
                terminalInput.textContent = '';
            }
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Only prevent default and scroll for on-page links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // For external links (e.g., 'about.html'), do nothing and let the browser navigate.
        });
    });

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    if (table) {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.classList.add('bg-primary', 'text-black');
            });
            row.addEventListener('mouseleave', () => {
                row.classList.remove('bg-primary', 'text-black');
            });
        });
    }
});
