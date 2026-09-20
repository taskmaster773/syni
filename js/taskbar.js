/* ============================================================
   Taskbar Appearance (color picker + presets)
   ============================================================ */

var TB_PRESETS = [
  { id:'tb-default',  name:'Default',       color:'#0a0a0a', opacity:80 },
  { id:'tb-black',    name:'Solid Black',   color:'#000000', opacity:100 },
  { id:'tb-white',    name:'Frosted White', color:'#ffffff', opacity:15 },
  { id:'tb-purple',   name:'Purple Haze',   color:'#4a1e9e', opacity:70 },
  { id:'tb-blue',     name:'Ocean Blue',    color:'#1e3a8a', opacity:75 },
  { id:'tb-green',    name:'Forest',        color:'#065f46', opacity:75 },
  { id:'tb-red',      name:'Crimson',       color:'#7f1d1d', opacity:75 },
  { id:'tb-pink',     name:'Rose',          color:'#9d174d', opacity:70 },
  { id:'tb-orange',   name:'Sunset',        color:'#9a3412', opacity:75 },
  { id:'tb-gray',     name:'Slate',         color:'#334155', opacity:80 },
  { id:'tb-cyan',     name:'Cyan Glow',     color:'#0e7490', opacity:70 },
  { id:'tb-amber',    name:'Amber',         color:'#92400e', opacity:75 }
];

var taskbarCfg = { color:'#0a0a0a', opacity:80 };
try {
  var saved = localStorage.getItem('syni_taskbar_cfg');
  if(saved) taskbarCfg = JSON.parse(saved);
} catch(e){}

var tbPickedColor = taskbarCfg.color;

window.tbHexToRgba = function(hex, alpha){
  hex = hex.replace('#','');
  if(hex.length === 3) hex = hex.split('').map(function(c){ return c+c; }).join('');
  var r = parseInt(hex.substr(0,2),16);
  var g = parseInt(hex.substr(2,2),16);
  var b = parseInt(hex.substr(4,2),16);
  return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
};

window.tbRgbToHex = function(r, g, b){
  var toHex = function(n){ return n.toString(16).padStart(2,'0'); };
  return '#' + toHex(r) + toHex(g) + toHex(b);
};

window.tbApply = function(color, opacity){
  taskbarCfg.color = color;
  taskbarCfg.opacity = opacity;
  var dock = document.getElementById('dock-container');
  if(dock){
    dock.style.background = tbHexToRgba(color, opacity/100);
    dock.style.borderColor = 'rgba(255,255,255,' + Math.max(0.05, opacity/400) + ')';
  }
  try { localStorage.setItem('syni_taskbar_cfg', JSON.stringify(taskbarCfg)); } catch(e){}
};

var tbCanvasReady = false;

window.tbDrawColorCanvas = function(){
  var canvas = document.getElementById('tb-color-canvas');
  if(!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;

  var hueGrad = ctx.createLinearGradient(0, 0, w, 0);
  for(var i = 0; i <= 6; i++) hueGrad.addColorStop(i/6, 'hsl(' + (i*60) + ', 100%, 50%)');
  ctx.fillStyle = hueGrad; ctx.fillRect(0, 0, w, h);

  var whiteGrad = ctx.createLinearGradient(0, 0, 0, h);
  whiteGrad.addColorStop(0,   'rgba(255,255,255,1)');
  whiteGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
  whiteGrad.addColorStop(0.5, 'rgba(0,0,0,0)');
  whiteGrad.addColorStop(1,   'rgba(0,0,0,1)');
  ctx.fillStyle = whiteGrad; ctx.fillRect(0, 0, w, h);

  tbCanvasReady = true;
  tbMoveCursorFromHex(tbPickedColor);
};

window.tbGetColorAt = function(x, y){
  var canvas = document.getElementById('tb-color-canvas');
  if(!canvas || !tbCanvasReady) return '#000000';
  var ctx = canvas.getContext('2d');
  var w = canvas.width, h = canvas.height;
  x = Math.max(0, Math.min(w - 1, Math.floor(x)));
  y = Math.max(0, Math.min(h - 1, Math.floor(y)));
  var d = ctx.getImageData(x, y, 1, 1).data;
  return tbRgbToHex(d[0], d[1], d[2]);
};

window.tbMoveCursorFromHex = function(hex){
  hex = hex.replace('#','');
  if(hex.length === 3) hex = hex.split('').map(function(c){ return c+c; }).join('');
  var r = parseInt(hex.substr(0,2),16)/255;
  var g = parseInt(hex.substr(2,2),16)/255;
  var b = parseInt(hex.substr(4,2),16)/255;
  var max = Math.max(r,g,b), min = Math.min(r,g,b);
  var d = max - min, h = 0;
  if(d !== 0){
    if(max === r) h = ((g-b)/d) % 6;
    else if(max === g) h = (b-r)/d + 2;
    else h = (r-g)/d + 4;
    h *= 60; if(h < 0) h += 360;
  }
  var v = max;
  var cursor = document.getElementById('tb-color-cursor');
  var wrap   = document.getElementById('tb-canvas-wrap');
  if(!cursor || !wrap) return;
  cursor.style.left = ((h/360) * wrap.clientWidth) + 'px';
  cursor.style.top  = ((1-v) * wrap.clientHeight) + 'px';
};

window.tbPickColor = function(hex){
  tbPickedColor = hex;
  var swatch = document.getElementById('tb-preview-swatch');
  var hexEl  = document.getElementById('tb-preview-hex');
  var rgbEl  = document.getElementById('tb-preview-rgb');
  if(swatch) swatch.style.background = hex;
  if(hexEl)  hexEl.textContent = hex.toUpperCase();
  var raw = hex.replace('#','');
  if(raw.length === 3) raw = raw.split('').map(function(c){ return c+c; }).join('');
  var r = parseInt(raw.substr(0,2),16);
  var g = parseInt(raw.substr(2,2),16);
  var b = parseInt(raw.substr(4,2),16);
  if(rgbEl) rgbEl.textContent = 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

window.tbOpenMenu = function(){
  var menu = document.getElementById('taskbar-menu');
  if(!menu) return;
  if(menu.showModal) menu.showModal(); else menu.style.display = 'flex';
  menu.classList.add('open');
  tbPickedColor = taskbarCfg.color;
  var opac = document.getElementById('tb-opacity');
  var opacVal = document.getElementById('tb-opacity-val');
  if(opac) opac.value = taskbarCfg.opacity;
  if(opacVal) opacVal.textContent = taskbarCfg.opacity + '%';
  tbDrawColorCanvas();
  tbPickColor(tbPickedColor);
  tbRenderGrid();
};
window.tbCloseMenu = function(){
  var menu = document.getElementById('taskbar-menu');
  if(!menu) return;
  menu.classList.remove('open');
  menu.style.display = 'none';
  if(menu.close) menu.close();
};
window.tbApplyPreset = function(id){
  var p = TB_PRESETS.find(function(x){ return x.id === id; });
  if(!p) return;
  tbPickedColor = p.color;
  var opac = document.getElementById('tb-opacity');
  var opacVal = document.getElementById('tb-opacity-val');
  if(opac) opac.value = p.opacity;
  if(opacVal) opacVal.textContent = p.opacity + '%';
  tbPickColor(p.color);
  tbMoveCursorFromHex(p.color);
  tbApply(p.color, p.opacity);
  tbRenderGrid();
};
window.tbApplyCustom = function(){
  var opac = document.getElementById('tb-opacity');
  var op = opac ? parseInt(opac.value) : 80;
  tbApply(tbPickedColor, op);
  tbRenderGrid();
  showNotification('✅ Taskbar Updated', 'Your custom taskbar style has been applied.');
  tbCloseMenu();
};
window.tbReset = function(){
  tbApplyPreset('tb-default');
  showNotification('↩️ Taskbar Reset', 'Back to the default look.');
};
window.tbRenderGrid = function(){
  var grid = document.getElementById('tb-grid');
  if(!grid) return;
  grid.innerHTML = '';
  TB_PRESETS.forEach(function(p){
    var card = document.createElement('div');
    card.className = 'tb-card';
    var isActive = (p.color === taskbarCfg.color && p.opacity === taskbarCfg.opacity);
    if(isActive) card.classList.add('active-wp');
    card.innerHTML =
      '<div class="tb-card-preview" style="background:' + tbHexToRgba(p.color, p.opacity/100) + ';">' +
        '<div class="tb-card-pill"></div>' +
      '</div>' +
      '<div class="tb-card-name">' + p.name + '</div>';
    card.onclick = function(){ tbApplyPreset(p.id); };
    grid.appendChild(card);
  });
};

// Canvas + slider wiring
(function(){
  var canvas = document.getElementById('tb-color-canvas');
  var wrap   = document.getElementById('tb-canvas-wrap');
  var cursor = document.getElementById('tb-color-cursor');
  var opac   = document.getElementById('tb-opacity');
  var opacVal= document.getElementById('tb-opacity-val');

  if(canvas && wrap && cursor){
    var dragging = false;
    var updateFromEvent = function(e){
      var rect = wrap.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = (x / rect.width) * canvas.width;
      var cy = (y / rect.height) * canvas.height;
      cx = Math.max(0, Math.min(canvas.width - 1, cx));
      cy = Math.max(0, Math.min(canvas.height - 1, cy));
      tbPickColor(tbGetColorAt(cx, cy));
      cursor.style.left = x + 'px';
      cursor.style.top  = y + 'px';
    };
    wrap.addEventListener('mousedown', function(e){ dragging = true; updateFromEvent(e); e.preventDefault(); });
    window.addEventListener('mousemove', function(e){ if(dragging) updateFromEvent(e); });
    window.addEventListener('mouseup',  function(){ dragging = false; });
    wrap.addEventListener('touchstart', function(e){ dragging = true; if(e.touches[0]) updateFromEvent(e.touches[0]); e.preventDefault(); }, { passive: false });
    wrap.addEventListener('touchmove',  function(e){ if(dragging && e.touches[0]) updateFromEvent(e.touches[0]); e.preventDefault(); }, { passive: false });
    wrap.addEventListener('touchend',   function(){ dragging = false; });
  }
  if(opac && opacVal){
    opac.addEventListener('input', function(){ opacVal.textContent = opac.value + '%'; });
  }
})();

// Apply saved taskbar style on load
(function(){
  var apply = function(){ tbApply(taskbarCfg.color, taskbarCfg.opacity); };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply);
  else apply();
})();
