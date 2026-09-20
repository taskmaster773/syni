/* ============================================================
   Floating Timer Widget
   ============================================================ */

var timerState = { total:0, remaining:0, running:false, interval:null, finished:false };

window.toggleTimerWidget = function(){
  var w = document.getElementById('timer-widget');
  if(!w) return;
  if(w.classList.contains('show')){ w.classList.remove('show'); }
  else { w.classList.add('show'); }
};

function tmFormat(sec){
  sec = Math.max(0, Math.floor(sec));
  var h = Math.floor(sec / 3600);
  var m = Math.floor((sec % 3600) / 60);
  var s = sec % 60;
  return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

function tmUpdateDisplay(){
  var d = document.getElementById('tm-display');
  if(!d) return;
  if(timerState.total === 0 && !timerState.running){ d.textContent = '00:00:00'; return; }
  d.textContent = tmFormat(timerState.remaining);
}

function tmReadInputs(){
  var h = parseInt(document.getElementById('tm-h').value) || 0;
  var m = parseInt(document.getElementById('tm-m').value) || 0;
  var s = parseInt(document.getElementById('tm-s').value) || 0;
  return (h * 3600) + (m * 60) + s;
}

function tmStart(){
  var widget = document.getElementById('timer-widget');
  var startBtn = document.getElementById('tm-start');

  if(timerState.running){
    clearInterval(timerState.interval);
    timerState.running = false;
    widget.classList.remove('running');
    startBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
    startBtn.classList.add('primary');
    return;
  }
  if(timerState.remaining > 0 && !timerState.finished){
    timerState.running = true;
    widget.classList.add('running');
    startBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    startBtn.classList.remove('primary');
    tmTick();
    timerState.interval = setInterval(tmTick, 1000);
    return;
  }
  var total = tmReadInputs();
  if(total <= 0){ return; }
  timerState.total = total;
  timerState.remaining = total;
  timerState.finished = false;
  timerState.running = true;
  widget.classList.add('running');
  widget.classList.remove('done');
  startBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
  startBtn.classList.remove('primary');
  tmUpdateDisplay();
  clearInterval(timerState.interval);
  timerState.interval = setInterval(tmTick, 1000);
}

function tmTick(){
  if(!timerState.running) return;
  timerState.remaining--;
  if(timerState.remaining <= 0){
    timerState.remaining = 0;
    clearInterval(timerState.interval);
    timerState.running = false;
    timerState.finished = true;
    var widget = document.getElementById('timer-widget');
    var startBtn = document.getElementById('tm-start');
    widget.classList.remove('running');
    widget.classList.add('done');
    startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    startBtn.classList.add('primary');
    try {
      var ctx = new (window.AudioContext || window.webkitAudioContext)();
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.frequency.value = 880;
      osc.type = 'sine';
      osc.connect(gain); gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc.start(); osc.stop(ctx.currentTime + 0.6);
    } catch(e){}
    showNotification('⏰ Timer', 'Time is up!');
  }
  tmUpdateDisplay();
}

function tmReset(){
  clearInterval(timerState.interval);
  timerState.running = false;
  timerState.finished = false;
  timerState.total = 0;
  timerState.remaining = 0;
  var widget = document.getElementById('timer-widget');
  var startBtn = document.getElementById('tm-start');
  widget.classList.remove('running'); widget.classList.remove('done');
  startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
  startBtn.classList.add('primary');
  document.getElementById('tm-h').value = 0;
  document.getElementById('tm-m').value = 0;
  document.getElementById('tm-s').value = 0;
  tmUpdateDisplay();
}

// Wiring
(function(){
  var startBtn = document.getElementById('tm-start');
  var resetBtn = document.getElementById('tm-reset');
  var closeBtn = document.getElementById('tm-close');
  if(startBtn) startBtn.addEventListener('click', tmStart);
  if(resetBtn) resetBtn.addEventListener('click', tmReset);
  if(closeBtn) closeBtn.addEventListener('click', function(){
    var w = document.getElementById('timer-widget');
    if(w) w.classList.remove('show');
  });
  ['tm-h','tm-m','tm-s'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.addEventListener('input', function(){
      var t = tmReadInputs();
      if(!timerState.running && !timerState.finished){
        timerState.total = t;
        timerState.remaining = t;
        tmUpdateDisplay();
      }
    });
  });

  // Drag
  var w = document.getElementById('timer-widget');
  if(w){
    var header = w.querySelector('.tm-header');
    if(header){
      var dragging = false, startX = 0, startY = 0, origX = 0, origY = 0;
      header.addEventListener('mousedown', function(e){
        if(e.target.closest('.tm-close')) return;
        dragging = true;
        startX = e.clientX; startY = e.clientY;
        var rect = w.getBoundingClientRect();
        origX = rect.left; origY = rect.top;
        w.style.left = origX + 'px'; w.style.top = origY + 'px'; w.style.right = 'auto';
        e.preventDefault();
      });
      window.addEventListener('mousemove', function(e){
        if(!dragging) return;
        var dx = e.clientX - startX, dy = e.clientY - startY;
        var nx = Math.max(0, Math.min(window.innerWidth - w.offsetWidth, origX + dx));
        var ny = Math.max(0, Math.min(window.innerHeight - w.offsetHeight, origY + dy));
        w.style.left = nx + 'px'; w.style.top = ny + 'px';
      });
      window.addEventListener('mouseup', function(){ dragging = false; });
    }
  }
})();
