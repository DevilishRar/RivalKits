document.getElementById('menuBtn').addEventListener('click', function() {
    const menu = document.getElementById('menu');
    if (menu.classList.contains('menu-show')) {
        menu.classList.remove('menu-show');
        menu.style.opacity = '0';
        menu.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            menu.style.display = 'none';
        }, 300);
    } else {
        menu.style.display = 'block';
        setTimeout(() => {
            menu.classList.add('menu-show');
            menu.style.opacity = '1';
            menu.style.transform = 'translateY(0)';
        }, 10);
    }
});

function adjustResponsiveElements() {
    var elements = document.querySelectorAll('.responsive');
    elements.forEach(function(element) {
        element.style.width = window.innerWidth + 'px';
        element.style.height = window.innerHeight + 'px';
    });
}

function forceResize() {
    adjustResponsiveElements();
    setTimeout(forceResize, 1000); // Adjust elements every second to counter any unresizing issues
}

function detectDeviceType() {
    const ua = navigator.userAgent;
    if (/Mobi|Android/i.test(ua)) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.add('desktop');
    }
}

function checkAndResize() {
    var docWidth = document.documentElement.clientWidth;
    var bodyWidth = document.body.scrollWidth;
    if (bodyWidth > docWidth) {
        adjustResponsiveElements();
    }
    setTimeout(checkAndResize, 2500); // Check every 2.5 seconds
}

// Log and resize on unresizing issues
function monitorResizeIssues() {
    setInterval(() => {
        const docWidth = document.documentElement.clientWidth;
        const bodyWidth = document.body.scrollWidth;
        if (bodyWidth > docWidth) {
            console.error('Unresizing issue detected: bodyWidth > docWidth');
            adjustResponsiveElements();
        }
    }, 1000);
}

// Adjust elements on page load and resize
window.onload = () => {
    detectDeviceType();
    forceResize();
    checkAndResize();
    monitorResizeIssues();
};
window.onresize = forceResize;
