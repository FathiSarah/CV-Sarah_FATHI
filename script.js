document.addEventListener('keydown', function (event) {
    const pacman = document.querySelector('.pacman');
    const container = document.querySelector('.container');
    const paths = document.querySelectorAll('.path');
    const modal = document.getElementById('message-modal');
    const modalMessage = document.getElementById('modal-message');
    const step = 36;
    const pacmanWidth = pacman.offsetWidth;
    const containerWidth = container.offsetWidth;
    let pacmanLeft = pacman.offsetLeft;

    let isOnPath2 = false; // Flag to track if Pacman is on path 2

    // Moving Pacman
    switch (event.key){
        case 'ArrowLeft':
            if (pacmanLeft > 0) {
                pacman.style.left = `${pacman.offsetLeft - step}px`;
            }
            break;
        case 'ArrowRight':
            if (pacmanLeft + pacmanWidth < containerWidth) {
                pacman.style.left = `${pacman.offsetLeft + step}px`;
            }
            break;
    }

    // Check collision with each path
    paths.forEach(path => {
        const pathRect = path.getBoundingClientRect();
        const pacmanRect = pacman.getBoundingClientRect();

        // Collision detection
        if (
            pacmanRect.left < pathRect.right &&
            pacmanRect.right > pathRect.left &&
            pacmanRect.top < pathRect.bottom &&
            pacmanRect.bottom > pathRect.top
        ) {
            if (path.classList.contains('path2')) {
                // Pacman is on path 2
                const img = path.querySelector('img');
                if (img) {
                    img.style.display = 'block';
                }
                isOnPath2 = true; // Update the flag
            }

            // Show the modal with the specific message
            modalMessage.innerHTML = path.getAttribute('data-message');
            modal.style.display = 'flex'; // Show modal
        }
    });

    // If Pacman is not on path 2, hide the image
    if (!isOnPath2) {
        const path2 = document.querySelector('.path2');
        const img = path2.querySelector('img');
        if (img) {
            img.style.display = 'none';
        }
    }
});

// Close Modal functionality
document.getElementById('close-modal').addEventListener('click', function () {
    document.getElementById('message-modal').style.display = 'none';
});
