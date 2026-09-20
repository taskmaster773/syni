/* ============================================================
   Browser app — loads apps/browser.html into the window
   ============================================================ */

var _browserCache = null;

window.getBrowserHTML = function(){
  if(_browserCache) return Promise.resolve(_browserCache);
  return fetch('apps/browser.html')
    .then(function(r){ return r.text(); })
    .then(function(html){
      _browserCache = html;
      return html;
    })
    .catch(function(err){
      _browserCache = '<!DOCTYPE html><html><body style="background:#000;color:#f55;font-family:sans-serif;padding:40px;">'
                    + '<h2>Could not load apps/browser.html</h2>'
                    + '<p>' + err.message + '</p>'
                    + '<p>Make sure you created the file and you\'re serving from a web server (not file://).</p>'
                    + '</body></html>';
      return _browserCache;
    });
};
