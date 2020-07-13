import WebMWriter from 'webm-writer';


document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('mycanvas');
  const context = canvas.getContext('2d');
  context.fillStyle = '#ffffff'

  const videoWriter = new WebMWriter({
    quality: 0.95,
    frameRate: 24,
  });

  const fillFrame = () => {
    context.fillRect(0, 0, 300, 150)
    context.beginPath();
    context.moveTo(Math.random() * 300, Math.random() * 150);
    context.lineTo(Math.random() * 300, Math.random() * 150);
    context.stroke();
    videoWriter.addFrame(canvas);
  }

  for (let i = 0; i < 100; i++) {
    fillFrame();
  }

  canvas.parentElement.removeChild(canvas);

  videoWriter.complete().then((webMBlob) => {
    const video = document.createElement('video');
    video.src = URL.createObjectURL(webMBlob);
    document.querySelector('body').appendChild(video);
    video.loop = true;
    video.controls = true;
  });

});
