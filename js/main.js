/* ============================================================
   Syni-OS — bootstrap + system-level functions
   ============================================================ */

window.launchLastPlayed = function(){ toggleApp('files'); };
window.resumeSpotify    = function(){ toggleApp('term'); };
window.openUpdateLog    = function(){
  var u = document.getElementById('update-modal');
  if(u && u.showModal) u.showModal();
  else if(u) u.style.display = 'flex';
};

function updateSidebarData(){
  try {
    var ps = JSON.parse(localStorage.getItem('ps_purchased'));
    if(ps && ps.length > 0) document.getElementById('last-game-name').innerText = 'App Library Ready';
    var sp = JSON.parse(localStorage.getItem('cinify_cache'));
    if(sp){
      var k = Object.keys(sp);
      if(k.length > 0){
        document.getElementById('spotify-track-name').innerText = sp[k[k.length-1]].title || 'Liked Song';
        if(sp[k[k.length-1]].cover) document.getElementById('spotify-album-art').src = sp[k[k.length-1]].cover;
      }
    }
  } catch(e){}
}
setInterval(updateSidebarData, 5000);

function loadDynamicResources(){
  renderUI();
  wpApply(0);
  setupAppContextMenu();
}

document.addEventListener('DOMContentLoaded', function(){
  loadDynamicResources();
  document.getElementById('boot-layer').style.display = 'block';
  loadDesktop();
  updateSidebarData();
});

/* ============================================================
   Refresh / soft reboot / about:blank cloak
   ============================================================ */

window.refreshSystem = function(){
  try {
    if(notepadOpen){ try { saveNotepadContent(); } catch(e){} }
    var loc = window.location.href || '';
    var isBlankOrData = (loc === 'about:blank' || loc.indexOf('about:blank') === 0 || loc.indexOf('data:') === 0);
    if(!isBlankOrData){ window.location.reload(); return; }
    var currentHTML = '<!DOCTYPE html>' + document.documentElement.outerHTML;
    var w = window.open('about:blank', '_blank');
    if(!w){ softReboot(); return; }
    w.document.open();
    w.document.write(
      '<!DOCTYPE html><html><head><meta charset="utf-8"><title>' + (document.title || 'Syni-OS') + '</title>' +
      '<style>html,body{margin:0;padding:0;height:100%;width:100%;background:#000;overflow:hidden}' +
      'iframe{border:0;display:block;width:100vw;height:100vh;position:fixed;top:0;left:0;background:#000}</style>' +
      '</head><body><iframe id="refreshFrame"></iframe></body></html>'
    );
    w.document.close();
    var frame = w.document.getElementById('refreshFrame');
    if(frame) frame.srcdoc = currentHTML;
    try { w.focus(); } catch(e){}
    setTimeout(function(){
      try {
        if(w && !w.closed){
          window.close();
          setTimeout(function(){ if(!document.hidden) softReboot(); }, 150);
        }
      } catch(e){ softReboot(); }
    }, 350);
  } catch(e){ softReboot(); }
};

function softReboot(){
  try {
    try { if(typeof saveNotepadContent === 'function') saveNotepadContent(); } catch(e){}
    var currentHTML = '<!DOCTYPE html>' + document.documentElement.outerHTML;
    document.open(); document.write(currentHTML); document.close();
  } catch(e){
    try {
      document.body.innerHTML = '';
      var boot = document.getElementById('boot-layer');
      if(boot){ boot.style.display = 'flex'; boot.style.opacity = '1'; }
    } catch(_){}
  }
}

window.aboutBlankCloak = async function(){
  try {
    var blankWindow = window.open('about:blank','_blank');
    if(blankWindow){
      var iframe = blankWindow.document.createElement('iframe');
      iframe.setAttribute('allow',
        'autoplay; fullscreen; clipboard-write; clipboard-read; ' +
        'picture-in-picture; web-share; accelerometer; gyroscope; ' +
        'magnetometer; microphone; camera; geolocation'
      );
      iframe.setAttribute('allowfullscreen', '');
      iframe.style.cssText = 'width:100%;height:100%;border:none;position:fixed;top:0;left:0;display:block;background:#000;';
      iframe.src = window.location.href;
      blankWindow.document.body.style.margin = '0';
      blankWindow.document.body.style.overflow = 'hidden';
      blankWindow.document.title = 'about:blank';

      function keepAlive(){
        try { void blankWindow.document.body.offsetHeight; } catch(e){}
        blankWindow.requestAnimationFrame(keepAlive);
      }
      keepAlive();
      blankWindow.document.body.appendChild(iframe);
      showNotification('about:blank Cloak', 'New window opened with about:blank URL!');
    } else {
      showNotification('⚠️ Popup Blocked', 'Allow popups for this site.');
    }
  } catch(e){ alert('Could not open about:blank.'); }
};

window.onbeforeunload = function(e){
  if(sysConfig.redirectConfirm){ var msg = 'Are you sure you want to leave?'; e.returnValue = msg; return msg; }
};

/* Safety net — keep the dock visible when no window is active */
setInterval(function(){
  var openWindows = document.querySelectorAll('.window.active:not(.minimized)');
  var dock = document.getElementById('dock-container');
  if(dock && openWindows.length === 0 && isDesktopActive){
    dock.classList.remove('dock-hidden');
    dock.style.display = 'flex';
  }
}, 500);
