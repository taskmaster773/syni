/* ============================================================
   Browser app loader
   Loads apps/browser.html and hands it to the iframe
   ============================================================ */

var _browserCache = null;

async function getBrowserHTML() {
  if (_browserCache) return _browserCache;
  try {
    var res = await fetch('apps/browser.html');
    _browserCache = await res.text();
  } catch (e) {
    _browserCache = '<!DOCTYPE html><html><body style="background:#000;color:#f55;'
                  + 'font-family:sans-serif;padding:40px;">'
                  + '<h2>Could not load browser.html</h2>'
                  + '<p>' + e.message + '</p></body></html>';
  }
  return _browserCache;
}
