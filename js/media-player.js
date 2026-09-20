/* ---------- MEDIA PLAYER ---------- */
var cNoti = document.getElementById('cine-noti');
function showNoti(){
  if(!cNoti) return;
  cNoti.classList.add('active'); cNoti.classList.remove('minimized');
  var rb = document.getElementById('restore-btn'); if(rb) rb.classList.remove('visible');
  resetNH();
}
function hideNoti(){
  if(!cNoti) return;
  cNoti.classList.remove('active'); cNoti.classList.remove('minimized');
  var rb = document.getElementById('restore-btn'); if(rb) rb.classList.remove('visible');
  clearTimeout(nHide);
}
function resetNH(){
  clearTimeout(nHide);
  if(cNoti && cNoti.classList.contains('active') && !cNoti.classList.contains('minimized')){
    nHide = setTimeout(function(){
      cNoti.classList.add('minimized');
      setTimeout(function(){ var rb = document.getElementById('restore-btn'); if(rb) rb.classList.add('visible'); }, 300);
    }, 5000);
  }
}
if(cNoti){
  cNoti.addEventListener('mouseenter', function(){ clearTimeout(nHide); });
  cNoti.addEventListener('mouseleave', resetNH);
  var mn = document.getElementById('minimize-noti-btn');
  if(mn) mn.onclick = function(){
    cNoti.classList.add('minimized');
    setTimeout(function(){ var rb = document.getElementById('restore-btn'); if(rb) rb.classList.add('visible'); }, 300);
  };
  var rbtn = document.getElementById('restore-btn');
  if(rbtn) rbtn.onclick = function(){ this.classList.remove('visible'); cNoti.classList.remove('minimized'); resetNH(); };
  var clbtn = document.getElementById('close-noti-btn');
  if(clbtn) clbtn.onclick = function(){ if(aMedia) aMedia.pause(); hideNoti(); };
}
setInterval(function(){
  var fnd = null;
  var md = document.querySelectorAll('audio, video');
  for(var i=0;i<md.length;i++){
    var m = md[i];
    if(!m.paused && !m.muted && m.volume > 0 && !['bg-video','lock-video','boot-video'].includes(m.id)) fnd = m;
  }
  var ifr = document.querySelectorAll('iframe');
  for(var j=0;j<ifr.length;j++){
    try {
      var idc = ifr[j].contentDocument || ifr[j].contentWindow.document;
      if(idc){
        var imd = idc.querySelectorAll('audio, video');
        for(var k=0;k<imd.length;k++){
          if(!imd[k].paused && !imd[k].muted && imd[k].volume > 0) fnd = imd[k];
        }
      }
    } catch(e){}
  }
  isMediaPlaying = !!fnd;
  if(fnd !== aMedia){
    if(fnd){ aMedia = fnd; setupM(); showNoti(); }
    else { aMedia = null; hideNoti(); }
  }
  if(aMedia){
    var ct = document.getElementById('current-time');
    if(ct) ct.textContent = fmtT(aMedia.currentTime);
    if(isFinite(aMedia.duration) && aMedia.duration > 0){
      var pf = document.getElementById('progress-fill');
      if(pf) pf.style.width = ((aMedia.currentTime / aMedia.duration) * 100) + '%';
      var tt = document.getElementById('total-time');
      if(tt) tt.textContent = fmtT(aMedia.duration);
    }
  }
}, 1000);
function setupM(){
  if(!aMedia) return;
  var nt = document.getElementById('noti-title');
  if(nt) nt.innerText = aMedia.title || 'Web Media Playing';
  var pp = document.getElementById('play-pause');
  if(pp) pp.onclick = function(){ aMedia.paused ? aMedia.play() : aMedia.pause(); resetNH(); };
  aMedia.addEventListener('play', function(){
    var iPl = document.getElementById('icon-play'), iPa = document.getElementById('icon-pause');
    if(iPl) iPl.classList.add('hidden-svg');
    if(iPa) iPa.classList.add('visible-svg');
    showNoti();
  });
  aMedia.addEventListener('pause', function(){
    var iPl = document.getElementById('icon-play'), iPa = document.getElementById('icon-pause');
    if(iPl){ iPl.classList.remove('hidden-svg'); iPl.classList.add('visible-svg'); }
    if(iPa){ iPa.classList.remove('visible-svg'); iPa.classList.add('hidden-svg'); }
  });
  var sb = document.getElementById('skip-back');
  if(sb) sb.onclick = function(){ if(isFinite(aMedia.currentTime)) aMedia.currentTime = Math.max(0, aMedia.currentTime - 15); resetNH(); };
  var sf = document.getElementById('skip-forward');
  if(sf) sf.onclick = function(){ if(isFinite(aMedia.duration) && aMedia.duration > 0) aMedia.currentTime = Math.min(aMedia.duration, aMedia.currentTime + 15); resetNH(); };
  var pha = document.getElementById('progress-hit-area');
  if(pha) pha.onclick = function(e){
    if(isFinite(aMedia.duration) && aMedia.duration > 0){
      var r = this.getBoundingClientRect();
      var p = (e.clientX - r.left) / r.width;
      aMedia.currentTime = p * aMedia.duration;
    }
    resetNH();
  };
}
function fmtT(s){
  if(isNaN(s) || !isFinite(s)) return '0:00';
  var m = Math.floor(s / 60), se = Math.floor(s % 60);
  return m + ':' + se.toString().padStart(2,'0');
}
function drawFV(){
  requestAnimationFrame(drawFV);
  var cv = document.getElementById('visualizer');
  if(!cv) return;
  var cx = cv.getContext('2d');
  cv.width = cv.parentElement.clientWidth; cv.height = 14;
  var bL = 32;
  cx.clearRect(0, 0, cv.width, cv.height);
  var bW = (cv.width / bL) * 2, xP = 0;
  for(var i=0;i<bL;i++){
    var bH = aMedia && !aMedia.paused ? (Math.random() * cv.height) : 2;
    cx.fillStyle = '#fff';
    cx.fillRect(xP, cv.height - bH, bW - 1.5, bH);
    xP += bW;
  }
}
drawFV();
