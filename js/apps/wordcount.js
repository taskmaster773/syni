/* ============================================================
   Word Counter
   ============================================================ */

window.openWordCount = function(){
  var w = document.getElementById('win-wordcount');
  if(!w) return;
  w.style.display = 'flex'; w.classList.remove('minimized'); w.classList.add('active');
  w.style.zIndex = ++highestZ; activeWindowId = 'wordcount';
  setTimeout(function(){ var i = document.getElementById('wordcount-input'); if(i) i.focus(); }, 100);
};
window.closeWordCount = function(){
  var w = document.getElementById('win-wordcount');
  if(w){ w.classList.remove('active'); w.classList.add('minimized'); setTimeout(function(){ w.style.display='none'; }, 300); }
  if(activeWindowId === 'wordcount'){ activeWindowId = null; endImmersiveMode(); }
};
window.countWordsNow = function(){
  var input = document.getElementById('wordcount-input');
  var result = document.getElementById('wordcount-result');
  var text = input.value;
  if(!text.trim()){ result.innerHTML = '<div style="color:#ff9800;">⚠️ Please paste some text first</div>'; return; }
  var words = text.trim().split(/\s+/).length;
  var chars = text.length;
  var charsNoSpace = text.replace(/\s/g,'').length;
  var sentences = text.split(/[.!?]+/).filter(function(s){ return s.trim().length > 0; }).length;
  var paragraphs = text.split(/\n\s*\n/).filter(function(p){ return p.trim().length > 0; }).length;
  var lines = text.split('\n').filter(function(l){ return l.trim().length > 0; }).length;
  var wordList = text.toLowerCase().replace(/[^a-z\s']/g,'').split(/\s+/);
  var uniqueWords = {};
  wordList.forEach(function(w){ if(w.length > 1) uniqueWords[w] = (uniqueWords[w] || 0) + 1; });
  var uniqueCount = Object.keys(uniqueWords).length;
  var totalLength = 0; wordList.forEach(function(w){ totalLength += w.length; });
  var avgWordLength = (totalLength / wordList.length).toFixed(1);
  var readingTime = Math.ceil(words / 200);
  var speakingTime = Math.ceil(words / 150);
  var mostCommon = '', maxCount = 0;
  for(var w in uniqueWords){ if(uniqueWords[w] > maxCount){ maxCount = uniqueWords[w]; mostCommon = w; } }
  var html = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">';
  var stats = [['📝 Words',words,'#4fc3f7'],['📖 Characters',chars,'#ff9800'],['🔤 No Spaces',charsNoSpace,'#81c784'],['📄 Sentences',sentences,'#ce93d8'],['📑 Paragraphs',paragraphs,'#4dd0e1'],['📃 Lines',lines,'#ff8a65'],['⭐ Unique',uniqueCount,'#ffd54f'],['📏 Avg Length',avgWordLength+' chars','#90caf9']];
  for(var i=0;i<stats.length;i++){
    html += '<div style="background:#0a0a0a;padding:6px 10px;border-radius:6px;border:1px solid #222;"><div style="color:#666;font-size:10px;text-transform:uppercase;">' + stats[i][0] + '</div><div style="color:' + stats[i][2] + ';font-size:20px;font-weight:bold;">' + stats[i][1] + '</div></div>';
  }
  html += '</div>';
  html += '<div style="display:flex;gap:10px;margin-bottom:10px;"><div style="flex:1;background:#0a0a0a;padding:6px 10px;border-radius:6px;border:1px solid #222;text-align:center;"><div style="color:#666;font-size:10px;">⏱️ Reading Time</div><div style="color:#ff6b6b;font-size:18px;font-weight:bold;">' + readingTime + ' min</div></div><div style="flex:1;background:#0a0a0a;padding:6px 10px;border-radius:6px;border:1px solid #222;text-align:center;"><div style="color:#666;font-size:10px;">🎤 Speaking Time</div><div style="color:#ff6b6b;font-size:18px;font-weight:bold;">' + speakingTime + ' min</div></div></div>';
  if(mostCommon && wordList.length > 5){
    html += '<div style="background:#0a0a0a;padding:6px 10px;border-radius:6px;border:1px solid #2b65f6;margin-bottom:10px;"><div style="color:#888;font-size:11px;">Most common word:</div><div style="color:#4fc3f7;font-size:16px;font-weight:bold;">"' + mostCommon + '"</div><div style="color:#555;font-size:11px;">Appeared ' + maxCount + ' times</div></div>';
  }
  result.innerHTML = html;
  result.scrollTop = 0;
};
window.wordCountClear = function(){
  document.getElementById('wordcount-input').value = '';
  document.getElementById('wordcount-result').innerHTML = '<div style="color:#888;">📝 Paste your text above and click "Count Words"</div>';
  document.getElementById('wordcount-input').focus();
};
window.wordCountSample = function(){
  document.getElementById('wordcount-input').value = 'The quick brown fox jumps over the lazy dog. This is a sample text for the word counter. It counts words, characters, sentences, and more.';
  countWordsNow();
};
