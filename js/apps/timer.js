/* ============================================================
   Floating Timer Widget
   ============================================================ */

var timerState = {
  total: 0,
  remaining: 0,
  running: false,
  finished: false,
  interval: null,
  endTime: null
};

var TM_CIRCUMFERENCE = 2 * Math.PI * 42;

/* ---------- Open / close ---------- */

window.toggleTimerWidget = function(){
  var w = document.getElementById('timer-widget');
  if(!w) return;
  if(w.classList.contains('show')){
    w.classList.remove('show');
  } else {
    w.classList.add('show');
    if(!timerState.running && timerState.total === 0){
      var h = document.getElementById('tm-h');
      if(h) h.focus();
    }
  }
};

/* ---------- Formatting ---------- */

function tmFormat(sec){
  sec = Math.max(0, Math.floor(sec));
  var h = Math.floor(sec / 3600);
  var m = Math.floor((sec % 3600) / 60);
  var s = sec % 60;
  // Always show H:MM:SS to match the reference layout
  return h + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

function tmFormatClock(date){
  var h = date.getHours();
  var m = date.getMinutes().toString().padStart(2,'0');
  var ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12; h = h ? h : 12;
  return h + ':' + m + ' ' + ampm;
}

/* ---------- Reading inputs ---------- */

function tmReadInputs(){
  var h = parseInt(document.getElementById('tm-h').value) || 0;
  var m = parseInt(document.getElementById('tm-m').value) || 0;
  var s = parseInt(document.getElementById('tm-s').value) || 0;
  return (h * 3600) + (m * 60) + s;
}

function tmSetInputs(totalSec){
  var h = Math.floor(totalSec / 3600);
  var m = Math.floor((totalSec % 3600) / 60);
  var s = totalSec % 60;
  document.getElementById('tm-h').value = h;
  document.getElementById('tm-m').value = m;
  document.getElementById('tm-s').value = s;
}

/* ---------- Display ---------- */

function tmUpdateSubLabel(){
  var el = document.getElementById('tm-sub');
  if(!el) return;
  var total = timerState.total;
  if(total === 0){
    el.textContent = 'Set a duration';
    return;
  }
  var h = Math.floor(total / 3600);
  var m = Math.floor((total % 3600) / 60);
  var s = total % 60;
  var parts = [];
  if(h) parts.push(h + ' Hour' + (h > 1 ? 's' : ''));
  if(m) parts.push(m + ' Minute' + (m > 1 ? 's' : ''));
  if(s && !h) parts.push(s + ' Second' + (s > 1 ? 's' : ''));
  el.textContent = parts.join(' ') || '0 Seconds';
}

function tmUpdateDisplay(){
  var d     = document.getElementById('tm-display');
  var endEl = document.getElementById('tm-end-at');
  var ring  = document.getElementById('tm-ring-progress');
  if(!d || !ring) return;

  d.textContent = tmFormat(timerState.remaining);

  // Ring progress: 0 → nothing drawn, 1 → full
  var pct = timerState.total > 0 ? (timerState.remaining / timerState.total) : 0;
  ring.style.strokeDasharray  = TM_CIRCUMFERENCE;
  ring.style.strokeDashoffset = TM_CIRCUMFERENCE * (1 - pct);

  if(timerState.running && timerState.endTime){
    endEl.textContent = 'Ends ' + tmFormatClock(new Date(timerState.endTime));
  } else if(timerState.total > 0){
    endEl.textContent = 'Paused';
  } else {
    endEl.textContent = 'Ready';
  }
}

/* ---------- Start / pause / resume ---------- */

function tmStart(){
  var w = document.getElementById('timer-widget');
  if(timerState.running){
    clearInterval(timerState.interval);
    timerState.running = false;
    timerState.endTime = null;
    w.classList.remove('running');
    w.classList.add('paused');
    document.getElementById('tm-toggle-icon').className = 'fas fa-play';
    tmUpdateSubLabel();
    tmUpdateDisplay();
    return;
  }
  if(timerState.remaining > 0 && !timerState.finished){
    timerState.running = true;
    timerState.endTime = Date.now() + timerState.remaining * 1000;
    w.classList.add('running');
    w.classList.remove('paused');
    document.getElementById('tm-toggle-icon').className = 'fas fa-pause';
    tmUpdateSubLabel();
    tmUpdateDisplay();
    clearInterval(timerState.interval);
    timerState.interval = setInterval(tmTick, 250);
    return;
  }
  var total = tmReadInputs();
  if(total <= 0) return;
  timerState.total = total;
  timerState.remaining = total;
  timerState.finished = false;
  timerState.running = true;
  timerState.endTime = Date.now() + total * 1000;
  w.classList.add('running');
  w.classList.remove('paused');
  w.classList.remove('done');
  document.getElementById('tm-toggle-icon').className = 'fas fa-pause';
  tmUpdateSubLabel();
  tmUpdateDisplay();
  clearInterval(timerState.interval);
  timerState.interval = setInterval(tmTick, 250);
}

function tmFinish(){
  clearInterval(timerState.interval);
  timerState.running = false;
  timerState.finished = true;
  timerState.remaining = 0;
  timerState.endTime = null;
  var widget = document.getElementById('timer-widget');
  widget.classList.remove('running');
  widget.classList.remove('paused');
  widget.classList.add('done');
  document.getElementById('tm-toggle-icon').className = 'fas fa-play';
  tmUpdateSubLabel();
  tmUpdateDisplay();
  try {
    var AC = window.AudioContext || window.webkitAudioContext;
    if(AC){
      var ctx = new AC();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.frequency.value = 880;
      osc.type = 'sine';
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start(); osc.stop(ctx.currentTime + 0.8);
    }
  } catch(e){}
  if(typeof showNotification === 'function'){
    showNotification('⏰ Timer', 'Time is up!');
  }
}

function tmReset(){
  clearInterval(timerState.interval);
  timerState.running = false;
  timerState.finished = false;
  timerState.total = 0;
  timerState.remaining = 0;
  timerState.endTime = null;
  var widget = document.getElementById('timer-widget');
  widget.classList.remove('running');
  widget.classList.remove('paused');
  widget.classList.remove('done');
  document.getElementById('tm-toggle-icon').className = 'fas fa-play';
  tmSetInputs(0);
  tmUpdateSubLabel();
  tmUpdateDisplay();
}

function tmTick(){
  if(!timerState.running) return;
  if(!timerState.endTime) return;

  var now = Date.now();
  timerState.remaining = Math.max(0, Math.round((timerState.endTime - now) / 1000));
  tmUpdateDisplay();

  if(timerState.remaining <= 0){
    tmFinish();
  }
}

function tmFinish(){
  clearInterval(timerState.interval);
  timerState.running = false;
  timerState.finished = true;
  timerState.remaining = 0;
  timerState.endTime = null;

  var widget = document.getElementById('timer-widget');
  widget.classList.remove('running');
  widget.classList.add('done');
  document.getElementById('tm-toggle-icon').className = 'fas fa-play';
  document.getElementById('tm-toggle').title = 'Start';

  tmUpdateSubLabel();
  tmUpdateDisplay();

  // Beep
  try {
    var AC = window.AudioContext || window.webkitAudioContext;
    if(AC){
      var ctx = new AC();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.frequency.value = 880;
      osc.type = 'sine';
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start(); osc.stop(ctx.currentTime + 0.8);
    }
  } catch(e){}

  if(typeof showNotification === 'function'){
    showNotification('⏰ Timer', 'Time is up!');
  }
}

/* ---------- Cancel / reset ---------- */

function tmReset(){
  clearInterval(timerState.interval);
  timerState.running = false;
  timerState.finished = false;
  timerState.total = 0;
  timerState.remaining = 0;
  timerState.endTime = null;

  var widget = document.getElementById('timer-widget');
  widget.classList.remove('running');
  widget.classList.remove('done');
  document.getElementById('tm-toggle-icon').className = 'fas fa-play';
  document.getElementById('tm-toggle').title = 'Start';

  tmSetInputs(0);
  tmUpdateSubLabel();
  tmUpdateDisplay();
}

/* ---------- Wiring ---------- */

(function(){
  var toggleBtn = document.getElementById('tm-toggle');
  var cancelBtn = document.getElementById('tm-cancel');
  if(toggleBtn) toggleBtn.addEventListener('click', tmStart);
  if(cancelBtn) cancelBtn.addEventListener('click', tmReset);

  ['tm-h','tm-m','tm-s'].forEach(function(id){
    var el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('input', function(){
      if(timerState.running) return;
      var t = tmReadInputs();
      timerState.total = t;
      timerState.remaining = t;
      tmUpdateSubLabel();
      tmUpdateDisplay();
    });
  });

  // Drag
  var w = document.getElementById('timer-widget');
  if(w){
    var header = w.querySelector('.tm-header');
    if(header){
      var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;
      header.addEventListener('mousedown', function(e){
        dragging = true;
        sx = e.clientX; sy = e.clientY;
        var r = w.getBoundingClientRect();
        ox = r.left; oy = r.top;
        w.style.left = ox + 'px';
        w.style.top  = oy + 'px';
        w.style.right = 'auto';
        e.preventDefault();
      });
      window.addEventListener('mousemove', function(e){
        if(!dragging) return;
        var nx = Math.max(0, Math.min(window.innerWidth  - w.offsetWidth,  ox + e.clientX - sx));
        var ny = Math.max(0, Math.min(window.innerHeight - w.offsetHeight, oy + e.clientY - sy));
        w.style.left = nx + 'px';
        w.style.top  = ny + 'px';
      });
      window.addEventListener('mouseup', function(){ dragging = false; });
    }
  }

  // Initial render — starts at 0:00:00 with an empty ring
  tmUpdateSubLabel();
  tmUpdateDisplay();
})();
