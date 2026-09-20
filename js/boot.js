/* ============================================================
   Boot sequence, lock screen, legal notice
   ============================================================ */

window.startBootSequence = function(){ showLegalNotice(); };

window.skipBootSequence = function(){
  if(!bootActive) return;
  bootActive = false;
  var lay = document.getElementById('boot-layer');
  if(lay){ lay.style.opacity = '0'; setTimeout(function(){ lay.style.display = 'none'; }, 600); }
  var lockScreen = document.getElementById('lock-screen');
  if(lockScreen){
    lockScreen.classList.add('active');
    lockScreen.style.display = 'flex';
    var lv = document.getElementById('lock-video');
    if(lv && lv.style.display !== 'none') lv.play().catch(function(){});
  }
  isDesktopActive = false;
  updateClock();
  resetIdle();

  addNoti('Notification Bell', 'Shows updated news about the unblocker website.');
  addNoti('Spotify Player', 'Small and compact but works.');
  addNoti('Website Update', 'This version of the website is up to date.');
  addNoti('Word Counter', 'A little buggy but it works.');
  addNoti('Legal Notice', 'Pops up when you click Enter Syni.');
  addNoti('App Store', 'Fixed app store, more realistic!');
};

window.unlockSystem = function(){
  if(isUnlocking) return;
  isUnlocking = true;
  var scr = document.getElementById('lock-screen');
  if(!scr){ isUnlocking = false; return; }
  if(!scr.classList.contains('active')){ isUnlocking = false; return; }
  scr.classList.add('slide-up');
  setTimeout(function(){
    scr.classList.remove('active'); scr.classList.remove('slide-up');
    scr.style.display = 'none'; scr.style.visibility = 'hidden'; scr.style.pointerEvents = 'none'; scr.style.zIndex = '-1';
    isDesktopActive = true;
    var lv = document.getElementById('lock-video');
    if(lv){ lv.pause(); lv.style.display = 'none'; }
    if(!sysConfig.optBg){
      var bV = document.getElementById('bg-video');
      if(bV && bV.style.display !== 'none') bV.play().catch(function(){});
    }
    var dock = document.getElementById('dock-container');
    if(dock){ dock.classList.remove('dock-hidden'); dock.style.display = 'flex'; }

    if(!welcomeShown){ showNotification('Welcome To Syni', 'System Ready!'); welcomeShown = true; }
    renderUI();
    if(dock) dock.classList.remove('dock-hidden');
    loadDesktop();
    isUnlocking = false;
  }, 600);
  resetIdle();
};

window.showLegalNotice = function(){
  var modal = document.getElementById('legal-modal');
  if(!modal) return;
  modal.style.display = 'flex';
  var scroll = document.getElementById('legal-scroll');
  var btn    = document.getElementById('legal-agree-btn');
  var status = document.getElementById('legal-scroll-status');
  if(scroll) scroll.scrollTop = 0;
  if(btn){ btn.disabled = true; btn.style.background = '#333'; btn.style.color = '#666'; btn.style.cursor = 'not-allowed'; btn.style.opacity = '.5'; btn.textContent = 'Agree & Continue'; }
  if(status){ status.textContent = '⬇️ Scroll to bottom to agree'; status.style.color = '#ff6b6b'; }
};

window.acceptLegal = function(){
  var modal = document.getElementById('legal-modal');
  if(modal) modal.style.display = 'none';
  showNotification('✅ Legal Notice', 'You have agreed to the terms. Welcome to Syni-OS!');
  if(bootActive) setTimeout(skipBootSequence, 500);
};

// Hook up listeners
document.addEventListener('DOMContentLoaded', function(){
  var ls = document.getElementById('lock-screen');
  if(ls) ls.addEventListener('click', unlockSystem);

  var scroll = document.getElementById('legal-scroll');
  var btn    = document.getElementById('legal-agree-btn');
  var status = document.getElementById('legal-scroll-status');
  if(scroll){
    scroll.addEventListener('scroll', function(){
      var atBottom = scroll.scrollHeight - scroll.scrollTop - scroll.clientHeight < 10;
      if(atBottom){
        btn.disabled = false; btn.style.background = '#2b65f6'; btn.style.color = '#fff';
        btn.style.cursor = 'pointer'; btn.style.opacity = '1'; btn.textContent = '✅ Agree & Continue';
        status.textContent = '✅ You can now agree'; status.style.color = '#4caf50';
      }
    });
  }
});

document.addEventListener('keydown', function(e){
  if(bootActive && e.key === 'Enter'){ e.preventDefault(); skipBootSequence(); }
  if(e.key && sysConfig.panicKey && e.key.toLowerCase() === sysConfig.panicKey.toLowerCase()) window.location.href = SYNI_CONFIG.panicUrl;
  if(e.key === 'u' || e.key === 'U') unlockSystem();

  if(e.key === 'Enter'){
    var modal = document.getElementById('legal-modal');
    if(modal && modal.style.display === 'flex'){
      var btn = document.getElementById('legal-agree-btn');
      if(btn && !btn.disabled) acceptLegal();
    }
  }
});
