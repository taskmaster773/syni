/* ============================================================
   FPS counter + Snow effect
   ============================================================ */

// FPS
var fLT = performance.now(), fFr = 0, fLC = 0;
function chkFps(){
  var nw = performance.now();
  fFr++;
  if(nw - fLT >= 1000){
    var cFps = fFr, fv = document.getElementById('fps-val');
    if(fv) fv.innerText = cFps;
    if(cFps <= 20){
      fLC++;
      if(fLC >= 5 && !sysConfig.optBg){
        sysConfig.optBg = true;
        try { localStorage.setItem('cine_sys_config', JSON.stringify(sysConfig)); } catch(e){}
        var bv = document.getElementById('bg-video'), lv = document.getElementById('lock-video');
        if(bv) bv.pause(); if(lv) lv.pause();
        showNotification('System Optimized', 'Low FPS detected. Backgrounds paused.');
      }
    } else fLC = 0;
    fFr = 0; fLT = nw;
  }
  requestAnimationFrame(chkFps);
}
requestAnimationFrame(chkFps);

// Snow
var cvsSnow = document.getElementById('snow-fx');
if(cvsSnow){
  var ctxSnow = cvsSnow.getContext('2d');
  var sW = window.innerWidth, sH = window.innerHeight;
  cvsSnow.width = sW; cvsSnow.height = sH;
  var flakes = [];
  for(var f=0;f<30;f++) flakes.push({x:Math.random()*sW, y:Math.random()*sH, r:Math.random()*2, s:Math.random()+0.5});
  function drawSnow(){
    if(isDesktopActive){
      ctxSnow.clearRect(0,0,sW,sH);
      ctxSnow.fillStyle = 'rgba(255,255,255,0.3)';
      for(var i=0;i<flakes.length;i++){
        var fl = flakes[i];
        ctxSnow.beginPath();
        ctxSnow.arc(fl.x, fl.y, fl.r, 0, Math.PI*2);
        ctxSnow.fill();
        fl.y += fl.s;
        if(fl.y > sH) fl.y = 0;
      }
    }
    requestAnimationFrame(drawSnow);
  }
  drawSnow();
}
