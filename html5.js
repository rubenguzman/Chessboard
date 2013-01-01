//DISPLAY FOR THE TOP BANNER
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var text = canvas.getContext('2d');
//  Create gradient
var grd= ctx.createLinearGradient(0,0,800,0);
grd.addColorStop(0,'#fff');
grd.addColorStop(0.3,'#f8f8f8');
grd.addColorStop(0.7,'#f8f8f8');
grd.addColorStop(1,'#fff');
// Fill with gradient
ctx.fillStyle = grd;
ctx.fillRect(0,0,800,60);

ctx.fillStyle = '#000';
ctx.font = '24px Arial';
ctx.fillText('Simple Chess Game v1.0',70,30);

text.fillStyle = '#f00';
text.font = '12px Arial';
text.fillText('HTML5, CSS3, Javascript/JQuery',70,50);

var canvasBar = document.getElementById('gradientBar');
var contextBar = canvasBar.getContext('2d');
//  Create gradient
var gradientBar = contextBar.createLinearGradient(0,0,800,0);
gradientBar.addColorStop(0,'#fff');
gradientBar.addColorStop(0.3,'#ffcc00');
gradientBar.addColorStop(0.7,'#ffcc00');
gradientBar.addColorStop(1,'#fff');
// Fill with gradient
contextBar.fillStyle = gradientBar;
contextBar.fillRect(0,0,800,10);

var canvasBar_2 = document.getElementById('gradientBar_2');
var contextBar_2 = canvasBar_2.getContext('2d');
//  Create gradient
var gradientBar_2 = contextBar_2.createLinearGradient(0,0,800,0);
gradientBar_2.addColorStop(0,'#fff');
gradientBar_2.addColorStop(0.3,'#ffcc00');
gradientBar_2.addColorStop(0.7,'#ffcc00');
gradientBar_2.addColorStop(1,'#fff');
// Fill with gradient
contextBar_2.fillStyle = gradientBar_2;
contextBar_2.fillRect(0,0,800,10);
//END - DISPLAY FOR THE TOP BANNER