// 存储图片路径的数组
const imagePaths = [];
for (let i = 1; i <= 4; i++) {
    imagePaths.push(`images/image${i}.jpg`);
}
const videoPath = 'images/video.mp4';

let currentIndex = 0;
let imageSlider = document.getElementById('image-slider');
let videoPlayer = document.getElementById('video-player');
let textContainer = document.getElementById('text-container');
let text = "首先定义了validateUsername函数，接收要验证的用户名作为参数";
let textIndex = 0;
let intervalId;
let videoPlaying = false;

// 初始化图片
function initImageSlider() {
    imageSlider.src = imagePaths[currentIndex];
    imageSlider.style.opacity = 1;
    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % imagePaths.length;
        imageSlider.src = imagePaths[currentIndex];
        imageSlider.style.opacity = 0;
        setTimeout(() => {
            imageSlider.style.opacity = 1;
        }, 500);
    }, 1500);
}

// 开始播放视频
function startVideo() {
    clearInterval(intervalId);
    imageSlider.style.opacity = 0;
    videoPlayer.src = videoPath;
    videoPlayer.style.display = 'block';
    videoPlayer.playbackRate = 1.0;
    videoPlayer.play();
    videoPlaying = true;
    videoPlayer.onended = startTextAnimation;
}

// 开始文字动画
function startTextAnimation() {
    videoPlayer.style.display = 'none';
    textContainer.style.display = 'block';
    intervalId = setInterval(() => {
        if (textIndex < text.length) {
            textContainer.textContent += text[textIndex];
            textIndex++;
        } else {
            clearInterval(intervalId);
        }
    }, 200);
}

// 页面加载完成后开始
window.onload = () => {
    initImageSlider();
    setTimeout(startVideo, imagePaths.length * 1500);
};