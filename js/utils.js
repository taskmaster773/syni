/* ============================================================
   Shared helpers
   ============================================================ */

window.escapeHtml = function(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
  });
};

window.formatNum = function(n){
  if(n >= 1000000) return (n/1000000).toFixed(1)+'M';
  if(n >= 1000)    return (n/1000).toFixed(1)+'K';
  return String(n);
};

window.dataUrlToBlobUrl = function(dataUrl){
  try {
    if(dataUrl.indexOf('data:') !== 0) return dataUrl;
    var parts = dataUrl.split(',');
    var meta  = parts[0];
    var body  = parts.slice(1).join(',');
    var mimeMatch = meta.match(/data:([^;]+)/);
    var mime = mimeMatch ? mimeMatch[1] : 'text/html';
    var isBase64 = meta.indexOf('base64') > -1;
    var content = isBase64 ? atob(body) : decodeURIComponent(body);
    var bytes = new Uint8Array(content.length);
    for(var i = 0; i < content.length; i++) bytes[i] = content.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes], { type: mime }));
  } catch(e){
    console.warn('Blob conversion failed:', e);
    return dataUrl;
  }
};

window.copyToClipboard = function(text, btn){
  var done = function(){
    var original = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(function(){
      btn.classList.remove('copied');
      btn.innerHTML = original;
    }, 1500);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(function(){ fallbackCopy(text, done); });
  } else {
    fallbackCopy(text, done);
  }
};

window.fallbackCopy = function(text, cb){
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.top = '-9999px';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); cb(); } catch(e){}
  document.body.removeChild(ta);
};

window.fmtT = function(s){
  if(isNaN(s) || !isFinite(s)) return '0:00';
  var m = Math.floor(s/60), se = Math.floor(s%60);
  return m + ':' + se.toString().padStart(2,'0');
};
