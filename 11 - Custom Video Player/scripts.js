/* get elements  */

const player = document.querySelector(".player") ;
const video = player.querySelector(".viewer") ;
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = document.getElementById("fs") ;

/* functions   */
function togglePlay() {
     if (video.paused) {
        video.play();
        }else {
        video.pause();
    }
 }

 function updateButton() {
   const icon = this.paused ?  '►' : '❚ ❚';
   toggle.textContent = icon ;
 }
 
function skip() {
   video.currentTime += parseFloat(this.dataset.skip) ;
}

function handleRangeUpdate(){
    video[this.name] = this.value ;
}

function handleProgress() {
 const percent = (video.currentTime/video.duration) * 100 ;
 progressBar.style.flexBasis = `${percent}%`

}

function scrub(e) {
 const scrubTime = ( e.offsetX/ progress.offsetWidth) * video.duration ;
    video.currentTime = scrubTime ;
}

 video.addEventListener("click", togglePlay) ;
 video.addEventListener("play", updateButton) ;
 video.addEventListener("pause", updateButton) ; 
 video.addEventListener("timeupdate", handleProgress) ;

 toggle.addEventListener("click",togglePlay) ;

 skipButtons.forEach(button => button.addEventListener("click", skip));

 ranges.forEach(range =>range.addEventListener("change", handleRangeUpdate)) ;
 ranges.forEach(range =>range.addEventListener("mousemove", handleRangeUpdate)) ;

 let mousedown = false;
 progress.addEventListener("click", scrub)
 progress.addEventListener("mousemove",(e)=> mousedown && scrub)
 progress.addEventListener("mouseup", ()=> mousedown =false) ;
 progress.addEventListener("mousedown", ()=> mousedown = true);

 // add fullscreen video support

 /* detect if the browsers suports fullscreeen using code from
  Mox dev docs..  https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/cross_browser_video_player    */

  let fullScreenEnabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
 
  if (!fullScreenEnabled) {
   fullscreen.style.display = 'none';

  }
   fullscreen.addEventListener('click', function(e) {
      handleFullscreen();
   });
   

   var handleFullscreen = function() {
      if (isFullScreen()) {
         if (document.exitFullscreen) document.exitFullscreen();
         else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
         else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
         else if (document.msExitFullscreen) document.msExitFullscreen();
         setFullscreenData(false);
      }
      else {
         if (player.requestFullscreen) player.requestFullscreen();
         else if (player.mozRequestFullScreen) player.mozRequestFullScreen();
         else if (player.webkitRequestFullScreen) player.webkitRequestFullScreen();
         else if (player.msRequestFullscreen) player.msRequestFullscreen();
         setFullscreenData(true);
      }
   }
   
   var isFullScreen = function() {
      return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
   }
   
   var setFullscreenData = function(state) {
      player.setAttribute('data-fullscreen', !!state);
   }
   

