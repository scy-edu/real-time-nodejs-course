var socket = io()

var container = document.querySelector('#container');

function randomColor() {
  var colors = ['#2E9AFE', '#40FF00', '#FFBF00', '#FE2EF7', '#FA5858', '#4000FF', '#FE2E9A', '#CEF6E3', '#04B45F'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Handle the bubbling
function bubbleUp(data) {
  var x = data.x,
      y = data.y,
      color = data.color

  var bubble = document.createElement('div.bubble');

  // Set the left and top
  bubble.style.position = 'absolute';
  bubble.style.left = `${x - 50}px`;
  bubble.style.top = `${y - 50}px`;
  bubble.style.backgroundColor = color;
  bubble.style.padding = '50px';
  bubble.style.borderRadius = '50%';
  bubble.style.transition = 'all 1s ease-out';
  bubble.style.pointerEvents = 'none';

  container.appendChild(bubble);

  setTimeout(function () {
    bubble.style.padding = '100px';
    bubble.style.opacity = '0';
  }, 200);

  bubble.addEventListener('transitionend', function() {
    bubble.remove();
  }, false);

}


container.onclick = function(e) {
  var data = {
    x: e.offsetX,
    y: e.offsetY,
    color: randomColor()
  }

  // Emit the message
  socket.emit('color click', data);
  return false;
}

socket.on('color click', function (data) {
  bubbleUp(data);
});
