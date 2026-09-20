/* ============================================================
   Grammar Checker
   ============================================================ */

window.openGrammar = function(){
  var w = document.getElementById('win-grammar');
  if(!w) return;
  w.style.display = 'flex'; w.classList.remove('minimized'); w.classList.add('active');
  w.style.zIndex = ++highestZ; activeWindowId = 'grammar';
};
window.closeGrammar = function(){
  var w = document.getElementById('win-grammar');
  if(w){ w.classList.remove('active'); w.classList.add('minimized'); setTimeout(function(){ w.style.display='none'; }, 300); }
  if(activeWindowId === 'grammar'){ activeWindowId = null; endImmersiveMode(); }
};
window.checkGrammar = function(){
  var t = document.getElementById('grammar-input').value;
  var r = document.getElementById('grammar-result');
  if(!t.trim()){ r.innerHTML = '<div style="color:#ff9800;">⚠️ Paste some text first</div>'; return; }
  var fixed = t.replace(/\s+([.,!?])/g,'$1').replace(/([.,!?])(?=[A-Za-z])/g,'$1 ').replace(/\bi\b/g,'I');
  r.innerHTML = '<div style="color:#4caf50;margin-bottom:8px;">✅ Cleaned text:</div><div>' + fixed.replace(/\n/g,'<br>') + '</div>';
};
window.grammarClear = function(){
  document.getElementById('grammar-input').value = '';
  document.getElementById('grammar-result').innerHTML = '<div style="color:#888;">Paste text above and click "Check & Fix"</div>';
};
window.grammarSample = function(){
  document.getElementById('grammar-input').value = 'this is a test sentence  with   extra spaces and punctuation errors .';
  checkGrammar();
};
