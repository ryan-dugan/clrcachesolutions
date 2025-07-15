document.addEventListener('DOMContentLoaded', function() {
    // --- Element Declarations ---
    const navLinks = document.querySelectorAll('header a[href^="#"]');
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

    // --- Terminal Expansion Logic ---
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

    const welcomeMessage = 'Welcome to the CLRCACHE Terminal.';

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
                setTimeout(nextLine, 120); // Delay for next line
            } else {
                const blankLine = document.createElement('div');
                blankLine.innerHTML = '&nbsp;';
                terminalHistory.insertBefore(blankLine, inputLineContainer);

                const welcomeLine = document.createElement('div');
                welcomeLine.textContent = welcomeMessage;
                terminalHistory.insertBefore(welcomeLine, inputLineContainer);
                terminalHistory.scrollTop = terminalHistory.scrollHeight;
                isBooting = false; // Re-enable input
            }
        }
        nextLine();
    }

    if (terminalContainer && heroVisualContainer) {
        terminalContainer.addEventListener('mouseenter', () => {
            heroVisualContainer.classList.add('is-expanded');
            if (!hasBooted) {
                hasBooted = true; // Set flag immediately to prevent re-triggering
                runBootSequence();
            }
        });

        heroVisualContainer.addEventListener('mouseleave', () => {
            if (heroVisualContainer.classList.contains('is-expanded')) {
                // 1. Add .is-closing to trigger the closing animations.
                //    The .is-expanded class remains to provide the 'from' state.
                heroVisualContainer.classList.add('is-closing');

                // 2. After the animation duration, remove both classes to reset to the default state.
                setTimeout(() => {
                    heroVisualContainer.classList.remove('is-expanded');
                    heroVisualContainer.classList.remove('is-closing');
                }, 500); // Must match the longest transition duration in the CSS
            }
        });
    }

    // --- Smooth Scrolling ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Mobile Menu Toggle ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Footer Year ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Hero Terminal Input ---
    if (terminalContainer && terminalHistory && terminalInput) {
        document.addEventListener('keydown', (e) => {
            if (terminalContainer.matches(':hover') && !isBooting) {
                e.preventDefault();

                if (e.key === 'Enter') {
                    if (currentLine.trim() !== '') {
                        const historyLine = document.createElement('div');
                        historyLine.textContent = `> ${currentLine}`;
                        // Insert the new history line before the input line
                        terminalHistory.insertBefore(historyLine, inputLineContainer);
                        currentLine = '';
                        // Ensure the history view scrolls to the bottom to show the latest command
                        terminalHistory.scrollTop = terminalHistory.scrollHeight;
                    }
                } else if (e.key === 'Backspace') {
                    currentLine = currentLine.slice(0, -1);
                } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
                    currentLine += e.key;
                }

                terminalInput.textContent = currentLine;
            }
        });
    }

    // --- Comparison Table Hover Effect ---
    if (table) {
        const highlightCells = table.querySelectorAll('.highlight-col');

        const addHoverClass = () => {
            highlightCells.forEach(cell => cell.classList.add('highlight-col-hover'));
        };

        const removeHoverClass = () => {
            highlightCells.forEach(cell => cell.classList.remove('highlight-col-hover'));
        };

        highlightCells.forEach(cell => {
            cell.addEventListener('mouseenter', addHoverClass);
            cell.addEventListener('mouseleave', removeHoverClass);
        });
    }
});
