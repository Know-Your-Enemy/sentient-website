const apiKey = 'AIzaSyAuBubosdni-NiKZNDGQFSyKMlUTXk7FKA';
const channelId = 'UCApEt8Xg6oMggQSNzXQBIuQ';
const liveVideo = document.getElementById('live-video');
const streamContainer = document.getElementById('stream-container');
const streamPlaceholder = document.getElementById('stream-placeholder');
const videoModal = document.getElementById('video-modal');
const modalVideo = document.getElementById('modal-video');
const closeModal = document.getElementById('close-modal');


// Check for live stream
function checkLiveStream() {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            if (data.items.length) {
                const videoId = data.items[0].id.videoId;
                liveVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                streamContainer.style.display = 'block';
                streamPlaceholder.style.display = 'none';
            } else {
                streamContainer.style.display = 'none';
                streamPlaceholder.style.display = 'block';
            }
        })
        .catch(error => console.error('Error fetching live stream:', error));
}

function onThumbnailClick(videoId) {
    videoModal.style.display = 'flex';
    modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}
// Fetch channel videos
function fetchChannelVideos() {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=25&order=date&type=video&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            data.items.forEach(item => {
                const videoId = item.id.videoId;
                const thumbnail = item.snippet.thumbnails.medium.url;
                const title = item.snippet.title;

                const videoCard = document.createElement('div');
                videoCard.innerHTML = `
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" rel="noopener">
              <img src="${thumbnail}" alt="${title}">
              <h3>${title}</h3>
            </a>
          `;
                videoCard.onclick = (e) => {
                    e.preventDefault();
                    onThumbnailClick(videoId);
                };

                // Add these event listeners to handle closing the modal
                closeModal.addEventListener('click', () => {
                    videoModal.style.display = 'none';
                    modalVideo.src = '';
                });

                window.addEventListener('click', (event) => {
                    if (event.target === videoModal) {
                        videoModal.style.display = 'none';
                        modalVideo.src = '';
                    }
                });
                videoList.appendChild(videoCard);
            });
        })
        .catch(error => console.error('Error fetching channel videos:', error));
}

// Check for live stream every minute
checkLiveStream();
setInterval(checkLiveStream, 5000);

// Fetch channel videos
fetchChannelVideos();