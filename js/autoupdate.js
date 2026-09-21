/* ============================================================
   Syni-OS Auto-Update
   Checks version.json for a newer build and notifies the user
   ============================================================ */

var _latestVersion = null;
var _updateNotified = false;

window.checkForUpdates = function(manual){
  var url = SYNI_CONFIG.versionCheckUrl || 'version.json';

  // Cache-bust so we always get the fresh file
  fetch(url + '?t=' + Date.now(), { cache: 'no-store' })
    .then(function(r){ return r.json(); })
    .then(function(data){
      if(!data || !data.version) return;

      _latestVersion = data;

      var current = SYNI_CONFIG.buildVersion;
      var latest  = data.version;

      if(compareVersions(latest, current) > 0){
        // Newer version exists
        if(!_updateNotified || manual){
          showUpdateNotification(data);
          _updateNotified = true;
        }
      } else if(manual){
        showNotification('✅ Up to date', 'You are running v' + current + '.');
      }
    })
    .catch(function(err){
      console.warn('[AutoUpdate] version check failed:', err);
      if(manual) showNotification('⚠️ Update check failed', 'Could not reach the update server.');
    });
};

function compareVersions(a, b){
  var pa = String(a).split('.').map(Number);
  var pb = String(b).split('.').map(Number);
  var len = Math.max(pa.length, pb.length);
  for(var i = 0; i < len; i++){
    var na = pa[i] || 0, nb = pb[i] || 0;
    if(na > nb) return 1;
    if(na < nb) return -1;
  }
  return 0;
}

function showUpdateNotification(data){
  var c = document.getElementById('toast-container');
  if(!c) return;

  var t = document.createElement('div');
  t.className = 'toast-notification';
  t.innerHTML =
    '<div class="toast-header">' +
      '<div class="toast-app-info">' +
        '<div class="toast-icon"><i class="fas fa-download"></i></div>' +
        '<span>System Update</span>' +
      '</div>' +
      '<i class="fas fa-times toast-close"></i>' +
    '</div>' +
    '<div class="toast-title">Version ' + data.version + ' available</div>' +
    '<div class="toast-body">' +
      (data.notes || 'A new version is ready.') +
      '<br><br>' +
      '<button id="syni-update-btn" style="background:#2b65f6;border:none;color:#fff;padding:8px 18px;border-radius:6px;font-weight:700;cursor:pointer;font-family:inherit;font-size:13px;">' +
        '<i class="fas fa-sync"></i> Update Now' +
      '</button>' +
    '</div>';

  c.appendChild(t);
  setTimeout(function(){ t.classList.add('show'); }, 100);

  // Close button
  var close = t.querySelector('.toast-close');
  close.onclick = function(){
    t.classList.remove('show');
    setTimeout(function(){ t.remove(); }, 400);
  };

  // Update button
  var btn = t.querySelector('#syni-update-btn');
  if(btn){
    btn.onclick = function(){
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Updating…';
      applyUpdate();
    };
  }

  // Auto-hide after 30 seconds (but leave the button working if they hover)
  var hideTimer = setTimeout(function(){
    t.classList.remove('show');
    setTimeout(function(){ t.remove(); }, 400);
  }, 30000);

  t.addEventListener('mouseenter', function(){ clearTimeout(hideTimer); });
}

function applyUpdate(){
  // Save any unsaved state first
  try {
    if(typeof saveNotepadContent === 'function') saveNotepadContent();
  } catch(e){}

  // Hard reload with cache-bust
  var url = window.location.href.split('?')[0];
  var bust = '_syni_v=' + Date.now();
  var sep = url.indexOf('?') === -1 ? '?' : '&';
  window.location.href = url + sep + bust;
}

// Auto-check on boot (delayed so it doesn't fight with other startup)
window.addEventListener('load', function(){
  if(SYNI_CONFIG.versionCheckOnBoot){
    setTimeout(function(){ checkForUpdates(false); }, 8000);
  }

  // Periodic re-check
  if(SYNI_CONFIG.versionCheckInterval > 0){
    setInterval(function(){ checkForUpdates(false); }, SYNI_CONFIG.versionCheckInterval);
  }
});

// Expose manual check for terminal or settings
window.manualUpdateCheck = function(){
  checkForUpdates(true);
};
