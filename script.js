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
             pacmanRect.right > pathRect.left) {
             // Show the modal with the specific message from data-message
             modalMessage.innerHTML = path.getAttribute('data-message');
             modal.style.display = 'flex'; // Show modal
         }
     });
 });
 
 // Close Modal functionality
 document.getElementById('close-modal').addEventListener('click', function () {
     document.getElementById('message-modal').style.display = 'none';
 });
