document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, options);

    images.forEach(img => imageObserver.observe(img));
        // ... (previous code for smooth scrolling and lazy loading remains unchanged)

        // Video playback handling
        const videoContainer = document.getElementById('videoContainer');
        const video = document.getElementById('motorVideo');
        console.log('Video element:', video); // Debugging: Check if video element is found

        if (video) {
            // Log video properties
            console.log('Video ready state:', video.readyState);
            console.log('Video paused:', video.paused);
            console.log('Video src:', video.currentSrc);

            // Check if the browser can play the video format
            const canPlayMP4 = video.canPlayType('video/mp4') !== '';
            console.log('Can play MP4:', canPlayMP4);

            if (!canPlayMP4) {
                console.error('This browser does not support MP4 video format');
                // Display a message to the user
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'Sorry, your browser does not support the MP4 video format. Please try a different browser.';
                errorMessage.style.color = 'red';
                videoContainer.appendChild(errorMessage);
            } else {
                // Ensure the video has proper attributes
                video.setAttribute('playsinline', '');
                video.setAttribute('muted', '');

                // Create play/pause button
                const playPauseButton = document.createElement('button');
                playPauseButton.textContent = 'Play';
                playPauseButton.classList.add('video-control');
                videoContainer.appendChild(playPauseButton);

                // Create mute/unmute button
                const muteButton = document.createElement('button');
                muteButton.textContent = 'Unmute';
                muteButton.classList.add('video-control');
                videoContainer.appendChild(muteButton);

                // Function to handle play/pause
                function togglePlayPause() {
                    if (video.paused) {
                        video.play().then(() => {
                            console.log('Video started playing');
                            playPauseButton.textContent = 'Pause';
                        }).catch(error => {
                            console.error('Error playing video:', error);
                        });
                    } else {
                        video.pause();
                        console.log('Video paused');
                        playPauseButton.textContent = 'Play';
                    }
                }

                // Function to handle mute/unmute
                function toggleMute() {
                    video.muted = !video.muted;
                    muteButton.textContent = video.muted ? 'Unmute' : 'Mute';
                }

                // Add click event listeners
                playPauseButton.addEventListener('click', togglePlayPause);
                muteButton.addEventListener('click', toggleMute);

                // Attempt to play the video when it's loaded
                video.addEventListener('loadedmetadata', function () {
                    console.log('Video metadata loaded');
                    togglePlayPause();
                });

                // Log any errors that occur during playback
                video.addEventListener('error', function (e) {
                    console.error('Video error:', video.error);
                });

                // Intersection Observer for autoplay attempt
                const videoOptions = {
                    root: null,
                    rootMargin: '0px',
                    threshold: 0.5
                };

                const videoObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        console.log('Video intersection status:', entry.isIntersecting);
                        if (entry.isIntersecting && video.paused) {
                            togglePlayPause(); // Attempt to play when video comes into view
                        }
                    });
                }, videoOptions);

                videoObserver.observe(video);
                console.log('Video observer set up');
            }
        } else {
            console.error('Video element with id "motorVideo" not found');
        }

        // Image pop-up functionality
        const galleryImages = document.querySelectorAll('.project-gallery img');
        const body = document.body;

        galleryImages.forEach(img => {
            img.addEventListener('click', () => {
                const popup = document.createElement('div');
                popup.classList.add('image-popup');

                const popupImg = document.createElement('img');
                popupImg.src = img.src;

                popup.appendChild(popupImg);
                body.appendChild(popup);

                popup.addEventListener('click', () => {
                    body.removeChild(popup);
                });
            });
        });
    });