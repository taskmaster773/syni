/* ============================================================
   Clock, session timer, idle, device status
   ============================================================ */

// ---- Session timer ----
(function(){
  var s = Date.now(), t = document.getElementById('session-time'), h = {};
  function f(m){ var x = Math.floor(m/1000); return String(Math.floor(x/3600)).padStart(2,'0') + ':' + String(Math.floor((x%3600)/60)).padStart(2,'0') + ':' + String(x%60).padStart(2,'0'); }
  setInterval(function(){
    if(!t) return;
    var m = Math.floor((Date.now() - s) / 60000);
    t.textContent = f(Date.now() - s);
    var msgs = {
      1:  ['Okay pretty normal. The record on being on here is 37 minutes btw.','⏱️'],
      20: ['😭','What you been doing for 20 minutes?!'],
      60: ['🫠','An HOUR?! Go touch some grass! 🌿'],
      120:['💀','2 hours?! Bro is LOCKED IN'],
      240:['🏆','4 HOURS?! LEGENDARY SESSION! 😭']
    };
    for(var k in msgs){ if(m >= parseInt(k) && !h[k]){ h[k] = true; addNoti(msgs[k][0], msgs[k][1]); } }
  }, 1000);
})();

// ---- Device status ----
(function(){
  var batteryIcon = document.getElementById('battery-icon');
  var batteryText = document.getElementById('battery-text');
  var isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  var isTabletUA = /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
  if(isMobileUA){ batteryIcon.className = 'fas fa-mobile-alt'; batteryText.textContent = 'Mobile'; }
  else if(isTabletUA){ batteryIcon.className = 'fas fa-tablet-alt'; batteryText.textContent = 'Tablet'; }
  else { batteryIcon.className = 'fas fa-desktop'; batteryText.textContent = 'Desktop'; }
  document.getElementById('battery-status').title = 'Device: ' + batteryText.textContent;
})();

// ---- Top-left menu ----
window.updateTopLeftMenu = function(){
  var now = new Date();
  var hrs = now.getHours(), ampm = hrs >= 12 ? 'PM' : 'AM';
  hrs = hrs % 12; hrs = hrs ? hrs : 12;
  var hrsStr = hrs.toString().padStart(2,'0');
  var min = now.getMinutes().toString().padStart(2,'0');
  var dayNames = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  var timeEl = document.getElementById('menu-time');
  var dayEl  = document.getElementById('menu-day');
  if(timeEl) timeEl.textContent = hrsStr + ':' + min + ' ' + ampm;
  if(dayEl)  dayEl.textContent  = dayNames[now.getDay()];
};
setInterval(updateTopLeftMenu, 1000);
updateTopLeftMenu();

// ---- Lock screen clock ----
window.updateClock = function(){
  var n = new Date();
  var dArr = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];
  var mArr = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
  var hrs = n.getHours().toString().padStart(2,'0');
  var min = n.getMinutes().toString().padStart(2,'0');
  var dNum = n.getDate().toString().padStart(2,'0');
  var dName = dArr[n.getDay()];
  var yr = n.getFullYear();
  var lDay = document.getElementById('lock-day-large');
  var lDat = document.getElementById('lock-date');
  var lTim = document.getElementById('lock-time');
  var hDay = document.getElementById('lbl-day');
  if(lDay) lDay.innerText = dName;
  if(hDay) hDay.innerText = dName;
  if(lDat) lDat.innerText = dNum + ' ' + mArr[n.getMonth()] + ', ' + yr + '.';
  if(lTim) lTim.innerText = '- ' + hrs + ':' + min + ' -';
};
setInterval(updateClock, 1000);

// ---- Idle lock ----
var idleTime = 0;
window.resetIdle = function(){ idleTime = 0; };
document.addEventListener('mousemove', resetIdle);
document.addEventListener('keypress', resetIdle);
setInterval(function(){
  idleTime++;
  var scr = document.getElementById('lock-screen');
  if(sysConfig.idleLock && idleTime >= 180 && !scr.classList.contains('active') && !bootActive){
    if(isMediaPlaying) idleTime = 0;
    else {
      isDesktopActive = false;
      scr.classList.remove('slide-up'); scr.classList.add('active');
      document.getElementById('bg-video').pause();
      var lv = document.getElementById('lock-video');
      if(lv.style.display !== 'none') lv.play().catch(function(){});
    }
  }
}, 1000);
