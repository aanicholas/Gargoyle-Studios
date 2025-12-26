// Slow the about background video slightly (optional)
const bgVideo = document.querySelector('.background-video');
if (bgVideo) {
  bgVideo.addEventListener('loadedmetadata', () => {
    bgVideo.playbackRate = 0.65;
  });
}
