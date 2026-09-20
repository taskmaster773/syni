/* ============================================================
   App Store — loads apps/appstore.html into the window
   ============================================================ */

var _appstoreCache = null;

window.getPS5EmuHTML = function(){
  if(_appstoreCache) return Promise.resolve(_appstoreCache);
  return fetch('apps/appstore.html')
    .then(function(r){ return r.text(); })
    .then(function(html){
      _appstoreCache = html;
      return html;
    })
    .catch(function(err){
      _appstoreCache = '<!DOCTYPE html><html><body style="background:#000;color:#f55;'
                    + 'font-family:sans-serif;padding:40px;">'
                    + '<h2>Could not load apps/appstore.html</h2>'
                    + '<p>' + err.message + '</p></body></html>';
      return _appstoreCache;
    });
};
