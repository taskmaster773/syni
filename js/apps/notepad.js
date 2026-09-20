/* ============================================================
   Notepad
   ============================================================ */

window.openNotepad = function(){
  var win = document.getElementById('win-notepad');
  if(!win) return;
  win.style.display = 'flex'; win.classList.remove('minimized'); win.classList.add('active');
  win.style.zIndex = ++highestZ;
  setTimeout(function(){ var t = document.getElementById('notepad-text'); if(t) t.focus(); }, 100);
  notepadOpen = true; activeWindowId = 'notepad';
  updateNotepadStats();
  var nd = document.getElementById('noti-dropdown'); if(nd) nd.classList.remove('open');
};
window.closeNotepad = function(){
  var win = document.getElementById('win-notepad');
  if(win){ win.classList.remove('active'); win.classList.add('minimized'); setTimeout(function(){ win.style.display='none'; }, 300); }
  notepadOpen = false;
  if(activeWindowId === 'notepad'){ activeWindowId = null; endImmersiveMode(); }
};
window.updateNotepadStats = function(){
  var t = document.getElementById('notepad-text'); if(!t) return;
  var text = t.value;
  var words = text.trim() ? text.trim().split(/\s+/).length : 0;
  var chars = text.length;
  var we = document.getElementById('notepad-wordcount'); if(we) we.textContent = 'Words: ' + words;
  var ce = document.getElementById('notepad-charcount'); if(ce) ce.textContent = 'Characters: ' + chars;
};
window.saveNotepadContent = function(){
  var t = document.getElementById('notepad-text');
  if(t){ try { localStorage.setItem('notepad_content', t.value); } catch(e){} }
};
window.loadNotepadContent = function(){
  var t = document.getElementById('notepad-text');
  if(t){ try { var s = localStorage.getItem('notepad_content'); if(s !== null){ t.value = s; updateNotepadStats(); } } catch(e){} }
};

setInterval(function(){ if(notepadOpen) saveNotepadContent(); }, 5000);

var notepadSaveTimeout = null;
document.addEventListener('input', function(e){
  if(e.target.id === 'notepad-text'){
    updateNotepadStats();
    clearTimeout(notepadSaveTimeout);
    notepadSaveTimeout = setTimeout(saveNotepadContent, 1000);
  }
});

document.addEventListener('DOMContentLoaded', loadNotepadContent);

document.addEventListener('keydown', function(e){
  if(e.ctrlKey && e.key === 'n'){
    e.preventDefault();
    if(!notepadOpen) openNotepad();
    else { var w = document.getElementById('win-notepad'); if(w){ w.style.zIndex = ++highestZ; var t = document.getElementById('notepad-text'); if(t) t.focus(); } }
  }
});
