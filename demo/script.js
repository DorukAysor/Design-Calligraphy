// Application variables
var position = { x: 0, y: window.innerHeight / 2 };
var counter = 0;
var minFontSize = 3;
var angleDistortion = 0;
var letters =
  "In the midst of a sprawling, sun-drenched meadow, where the golden rays of the late afternoon sun bathed the world in a warm, honeyed glow, and the gentle breeze whispered secrets through the leaves of ancient oak trees, a young woman named Eliza, whose eyes sparkled like emeralds in the light, stood contemplatively by a babbling brook, its clear waters shimmering with the reflection of the sky, as she considered the complex tapestry of her life, woven with threads of joy and sorrow, love and loss, dreams realized and ambitions unfulfilled, her thoughts meandering like the brook itself, tracing the winding paths of her memories, from her childhood days spent chasing butterflies and climbing trees in her grandmother’s lush garden, to her teenage years filled with the thrill of first love and the pang of heartbreak, all leading to the present moment where she found herself at a crossroads, contemplating her future with a mixture of excitement and trepidation, as she reflected on the myriad experiences that had shaped her, including the pivotal moment when she decided to leave her small hometown to pursue higher education in a bustling city, where she encountered a diverse array of people and ideas, each contributing to her growth and understanding of the world, and how that journey had led her to this particular meadow, on this particular day, where she found solace in the simplicity of nature and the clarity it brought to her thoughts, as if the brook itself were a metaphor for the flow of her life, constantly moving and evolving, and she realized with a profound sense of peace that every experience, no matter how challenging or joyous, had brought her to this moment of clarity, where she could embrace the future with an open heart and a renewed sense of purpose, knowing that each step she took, each decision she made, would continue to shape the beautiful, ever-unfolding narrative of her existence, and as she breathed in the fresh, earthy scent of the meadow and listened to the harmonious symphony of nature, she felt a deep connection to the world around her, understanding that she was but a small part of a larger, intricate design, and with this realization came a sense of gratitude for the journey she had traveled, the lessons she had learned, and the endless possibilities that lay ahead, as the sun dipped lower in the sky, casting long shadows across the meadow, and the first stars began to twinkle in the twilight, signaling the transition from day to night, she knew that she was ready to embrace whatever came next with courage and optimism, knowing that life’s true beauty lay in its continuous unfolding and the endless potential for growth and discovery.";
// Drawing variables
var canvas;
var context;
var mouse = { x: 0, y: 0, down: false };

function init() {
  canvas = document.getElementById('canvas');
  context = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  canvas.addEventListener('mousemove', mouseMove, false);
  canvas.addEventListener('mousedown', mouseDown, false);
  canvas.addEventListener('mouseup', mouseUp, false);
  canvas.addEventListener('mouseout', mouseUp, false);
  canvas.addEventListener('dblclick', doubleClick, false);

  window.onresize = function (event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
}

function mouseMove(event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
  draw();
}

function draw() {
  if (mouse.down) {
    var d = distance(position, mouse);
    var fontSize = minFontSize + d / 2;
    var letter = letters[counter];
    var stepSize = textWidth(letter, fontSize);

    if (d > stepSize) {
      var angle = Math.atan2(mouse.y - position.y, mouse.x - position.x);

      context.font = fontSize + 'px Georgia';

      context.save();
      context.translate(position.x, position.y);
      context.rotate(angle);
      context.fillText(letter, 0, 0);
      context.restore();

      counter++;
      if (counter > letters.length - 1) {
        counter = 0;
      }

      //console.log (position.x + Math.cos( angle ) * stepSize)
      position.x = position.x + Math.cos(angle) * stepSize;
      position.y = position.y + Math.sin(angle) * stepSize;
    }
  }
}

function distance(pt, pt2) {
  var xs = 0;
  var ys = 0;

  xs = pt2.x - pt.x;
  xs = xs * xs;

  ys = pt2.y - pt.y;
  ys = ys * ys;

  return Math.sqrt(xs + ys);
}

function mouseDown(event) {
  mouse.down = true;
  position.x = event.pageX;
  position.y = event.pageY;

  document.getElementById('info').style.display = 'none';
}

function mouseUp(event) {
  mouse.down = false;
}

function doubleClick(event) {
  canvas.width = canvas.width;
}

function textWidth(string, size) {
  context.font = size + 'px Georgia';

  if (context.fillText) {
    return context.measureText(string).width;
  } else if (context.mozDrawText) {
    return context.mozMeasureText(string);
  }
}

init();
