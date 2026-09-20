var CIRI_HARDCODED_KEY   = SYNI_CONFIG.ciri.groqKey;
var CIRI_HARDCODED_KEY_2 = SYNI_CONFIG.ciri.edenKey;
var CIRI_MAX_ATTACHMENTS = SYNI_CONFIG.ciri.maxAttachments;
var CIRI_MAX_IMAGE_BYTES = SYNI_CONFIG.ciri.maxImageBytes;

var ciriConversation = [];
var ciriPending = false;
var ciriPendingMessage = null;
var ciriAttachments = [];   // array of { dataUrl, mime, name }
var CIRI_MAX_ATTACHMENTS = 4;
var CIRI_MAX_IMAGE_BYTES = 4 * 1024 * 1024;  // 4 MB per image

function getCiriKey(useVision){
  if(useVision) return CIRI_HARDCODED_KEY_2 || '';
  return CIRI_HARDCODED_KEY || '';
}
function setCiriKey(k, useVision){
  if(useVision) CIRI_HARDCODED_KEY_2 = k;
  else CIRI_HARDCODED_KEY = k;
} // no-op storage replacement

function ciriSetDot(state){
  var dot = document.getElementById('ciri-dot');
  if(!dot) return;
  dot.className = '';
  if(state) dot.classList.add(state);
}
function ciriExpand(){
  if(document.body.classList.contains('ciri-active')) return;
  document.body.classList.add('ciri-active');
  setTimeout(function(){ var i = document.getElementById('ciri-input'); if(i) i.focus(); }, 300);
}
function ciriCollapse(){
  document.body.classList.remove('ciri-active');
  ciriSetDot('ready');
}
function ciriPeek(){
  if(document.body.classList.contains('ciri-active')) return;
  document.body.classList.add('ciri-peek');
}
function ciriUnpeek(){
  if(document.body.classList.contains('ciri-active')) return;
  setTimeout(function(){
    if(!document.body.classList.contains('ciri-active')) document.body.classList.remove('ciri-peek');
  }, 400);
}

(function(){
  var trigger = document.getElementById('ciri-trigger');
  var win = document.getElementById('ciri-window');
  if(!trigger || !win) return;
  trigger.addEventListener('mouseenter', ciriPeek);
  trigger.addEventListener('mouseleave', ciriUnpeek);
  // Click anywhere on the top strip to open Ciri fully
  trigger.addEventListener('click', function(e){
    e.stopPropagation();
    ciriExpand();
  });
  win.addEventListener('mouseleave', function(){
    if(!document.body.classList.contains('ciri-active')){
      var i = document.getElementById('ciri-input');
      if(!i || document.activeElement !== i) ciriUnpeek();
    }
  });
})();

document.addEventListener('click', function(e){
  var win = document.getElementById('ciri-window');
  if(!win) return;
  if(e.target.closest('#ciri-window') && !document.body.classList.contains('ciri-active')){
    if(!e.target.closest('#ciri-input')) ciriExpand();
  }
  if(e.target.id === 'ciri-backdrop') ciriCollapse();
});

var ciriInput = document.getElementById('ciri-input');
if(ciriInput){
  ciriInput.addEventListener('focus', ciriExpand);
  ciriInput.addEventListener('keydown', function(e){
    if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); ciriSend(); }
    if(e.key === 'Escape'){ e.preventDefault(); this.blur(); ciriCollapse(); }
  });
}

document.addEventListener('keydown', function(e){
  if(e.key === 'Escape' && document.body.classList.contains('ciri-active')) ciriCollapse();
});

function ciriAppend(role, text){
  var hist = document.getElementById('ciri-history');
  if(!hist) return;
  var wrap = document.createElement('div');
  wrap.style.display = 'flex';
  wrap.style.flexDirection = 'column';
  wrap.style.alignItems = role === 'user' ? 'flex-end' : 'flex-start';
  wrap.style.maxWidth = '100%';

  var div = document.createElement('div');
  div.className = 'ciri-msg ' + (role === 'user' ? 'user' : role === 'error' ? 'error' : 'ai');
  if(role === 'ai' && window.marked && typeof marked.parse === 'function'){ div.innerHTML = marked.parse(text); }
  else { div.textContent = text; }
  wrap.appendChild(div);

  // Copy button — AI replies only (not user messages, not errors, not greeting)
  if(role === 'ai'){
    var copyBtn = document.createElement('button');
    copyBtn.className = 'ciri-copy-btn';
    copyBtn.type = 'button';
    copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
    copyBtn.addEventListener('click', function(e){
      e.stopPropagation();
      var plain = div.innerText || div.textContent || '';
      copyToClipboard(plain, copyBtn);
    });
    wrap.appendChild(copyBtn);
  }

  hist.appendChild(wrap);
  hist.scrollTop = hist.scrollHeight;
}

function copyToClipboard(text, btn){
  var done = function(){
    var originalHTML = btn.innerHTML;
    btn.classList.add('copied');
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(function(){
      btn.classList.remove('copied');
      btn.innerHTML = originalHTML;
    }, 1500);
  };
  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(done).catch(function(){ fallbackCopy(text, done); });
  } else {
    fallbackCopy(text, done);
  }
}

function fallbackCopy(text, cb){
  var ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.top = '-9999px';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try { document.execCommand('copy'); cb(); } catch(e){}
  document.body.removeChild(ta);
}
function ciriShowThinking(show){
  var t = document.getElementById('ciri-thinking');
  if(t){ if(show) t.classList.add('active'); else t.classList.remove('active'); }
  ciriSetDot(show ? 'thinking' : 'ready');
}
function ciriShowKeyPrompt(show){
  var p = document.getElementById('ciri-key-prompt');
  if(!p) return;
  if(show){ p.classList.remove('hidden'); var k = document.getElementById('ciri-key-input'); if(k) k.focus(); }
  else p.classList.add('hidden');
}
var ciriKeySaveBtn = document.getElementById('ciri-key-save');
if(ciriKeySaveBtn){
  ciriKeySaveBtn.addEventListener('click', function(){
    var k = document.getElementById('ciri-key-input').value.trim();
    if(k.indexOf('gsk_') === 0){
      setCiriKey(k);
      ciriShowKeyPrompt(false);
      ciriAppend('ai', 'API key saved. Ask me anything!');
      // If there's a pending message the user typed, resend it now
      if(ciriPendingMessage){
        var msg = ciriPendingMessage;
        ciriPendingMessage = null;
        var input = document.getElementById('ciri-input');
        if(input){ input.value = msg; }
        ciriSend();
      }
    } else { alert("That doesn't look like a Groq API key (should start with gsk_)."); }
  });
}

var ciriClearBtn = document.getElementById('ciri-clear');
if(ciriClearBtn){
  ciriClearBtn.addEventListener('click', function(e){
    e.stopPropagation();
    ciriConversation = [];
    ciriPendingMessage = null;
    ciriClearAttachments();
    var hist = document.getElementById('ciri-history');
    if(hist) hist.innerHTML = '';
    ciriAppend('ai', 'Chat cleared. What can I help you with?');
  });
}

/* ---------- CIRI ATTACHMENTS ---------- */
function ciriRenderAttachments(){
  var strip = document.getElementById('ciri-attachments');
  if(!strip) return;
  if(ciriAttachments.length === 0){
    strip.classList.remove('has-items');
    strip.innerHTML = '';
    return;
  }
  strip.classList.add('has-items');
  strip.innerHTML = '';
  ciriAttachments.forEach(function(att, idx){
    var wrap = document.createElement('div');
    wrap.className = 'ciri-attachment';
    var img = document.createElement('img');
    img.src = att.dataUrl;
    img.alt = att.name || 'attachment';
    wrap.appendChild(img);

    var rm = document.createElement('button');
    rm.className = 'ciri-attachment-remove';
    rm.type = 'button';
    rm.title = 'Remove';
    rm.innerHTML = '<i class="fas fa-times"></i>';
    rm.addEventListener('click', function(e){
      e.stopPropagation();
      ciriAttachments.splice(idx, 1);
      ciriRenderAttachments();
    });
    wrap.appendChild(rm);
    strip.appendChild(wrap);
  });
}

function ciriAddAttachment(dataUrl, mime, name){
  if(ciriAttachments.length >= CIRI_MAX_ATTACHMENTS){
    ciriAppend('error', 'Max ' + CIRI_MAX_ATTACHMENTS + ' images per message.');
    return;
  }
  // Rough size check: base64 length * 0.75 ≈ bytes
  var approxBytes = Math.floor(dataUrl.length * 0.75);
  if(approxBytes > CIRI_MAX_IMAGE_BYTES){
    ciriAppend('error', 'Image too large (max 4 MB). Try a smaller image.');
    return;
  }
  ciriAttachments.push({ dataUrl: dataUrl, mime: mime, name: name || 'image' });
  ciriRenderAttachments();
  // Make sure Ciri is expanded so the user sees their image
  if(!document.body.classList.contains('ciri-active')) ciriExpand();
}

function ciriClearAttachments(){
  ciriAttachments = [];
  ciriRenderAttachments();
}

function ciriHandleFile(file){
  if(!file || !file.type || file.type.indexOf('image/') !== 0) return;
  var reader = new FileReader();
  reader.onload = function(e){
    ciriAddAttachment(e.target.result, file.type, file.name);
  };
  reader.readAsDataURL(file);
}

/* ---------- PASTE FROM CLIPBOARD ---------- */
document.addEventListener('paste', function(e){
  // Only react if the Ciri window is open
  if(!document.body.classList.contains('ciri-active') &&
     !document.body.classList.contains('ciri-peek')) return;

  var items = (e.clipboardData && e.clipboardData.items) ? e.clipboardData.items : [];
  var handled = false;
  for(var i = 0; i < items.length; i++){
    var item = items[i];
    if(item.type && item.type.indexOf('image/') === 0){
      var file = item.getAsFile();
      if(file){
        ciriHandleFile(file);
        handled = true;
      }
    }
  }
  if(handled){
    e.preventDefault();
    ciriExpand();
  }
});

/* ---------- DRAG & DROP ---------- */
(function(){
  var win = document.getElementById('ciri-window');
  if(!win) return;

  ['dragenter','dragover'].forEach(function(ev){
    win.addEventListener(ev, function(e){
      if(!e.dataTransfer) return;
      // Only show the drop highlight if files are being dragged
      var types = e.dataTransfer.types || [];
      var hasFiles = false;
      for(var i=0;i<types.length;i++){ if(types[i] === 'Files'){ hasFiles = true; break; } }
      if(!hasFiles) return;
      e.preventDefault();
      e.stopPropagation();
      document.body.classList.add('ciri-drag-over');
    });
  });

  ['dragleave','dragend'].forEach(function(ev){
    win.addEventListener(ev, function(e){
      // Only clear when we actually leave the window (not enter a child)
      if(e.relatedTarget && win.contains(e.relatedTarget)) return;
      document.body.classList.remove('ciri-drag-over');
    });
  });

  win.addEventListener('drop', function(e){
    if(!e.dataTransfer) return;
    e.preventDefault();
    e.stopPropagation();
    document.body.classList.remove('ciri-drag-over');
    var files = e.dataTransfer.files || [];
    for(var i = 0; i < files.length; i++){
      ciriHandleFile(files[i]);
    }
  });
})();

/* ---------- ATTACH BUTTON ---------- */
(function(){
  var btn = document.getElementById('ciri-attach-btn');
  var inp = document.getElementById('ciri-file-input');
  if(!btn || !inp) return;
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    inp.click();
  });
  inp.addEventListener('change', function(){
    var files = this.files || [];
    for(var i = 0; i < files.length; i++) ciriHandleFile(files[i]);
    this.value = '';   // reset so the same file can be picked again
  });
})();

async function ciriSend(){
  if(ciriPending) return;
  var input = document.getElementById('ciri-input');
  if(!input) return;
  var text = input.value.trim();

  // Allow sending with just an image and no text
  var hasImages = ciriAttachments.length > 0;
  if(!text && !hasImages) return;

    // If there's no text, give it a placeholder so the AI has a prompt
  if(!text && hasImages) text = 'What do you think about this image?';

  input.value = '';

  var apiKey = getCiriKey(hasImages);
  var model  = hasImages ? 'gemma-4-26b-a4b-it' : 'openai/gpt-oss-120b';
  var apiUrl = hasImages
    ? 'https://api.edenai.run/v2/text/chat'         // Eden AI endpoint
    : 'https://api.groq.com/openai/v1/chat/completions'; // Groq endpoint

  // Build the user message. If we have images, use the multimodal content format
  // ({ type: "text", text: ... } + { type: "image_url", image_url: { url: ... } }).
  // If not, keep the simple string format that plain Groq models expect.
  var userContent;
  if(hasImages){
    userContent = [{ type: 'text', text: text }];
    ciriAttachments.forEach(function(att){
      userContent.push({
        type: 'image_url',
        image_url: { url: att.dataUrl }
      });
    });
  } else {
    userContent = text;
  }

  // Show the user's message in the chat log (text only — images are shown in the strip)
  var userLabel = text;
  if(hasImages){
    userLabel = (text ? text + ' ' : '') + '[' + ciriAttachments.length + ' image' + (ciriAttachments.length === 1 ? '' : 's') + ']';
  }
  ciriAppend('user', userLabel);
  ciriConversation.push({ role: 'user', content: userContent });

  // Clear the attachment strip now that it's queued
  ciriClearAttachments();

  ciriPending = true;
  ciriShowThinking(true);
  try {
    var res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'system', content: 'You are Ciri, a witty, concise, helpful assistant built into Syni-OS. Keep answers short unless asked for detail. Use markdown when helpful.' }].concat(ciriConversation),
        temperature: 0.7, max_tokens: 800
      })
    });
    var data = await res.json();
    ciriShowThinking(false);
    if(!res.ok){
      var em = (data && data.error && data.error.message) ? data.error.message : ('HTTP ' + res.status);
      ciriAppend('error', 'Groq error: ' + em);
      ciriSetDot('error');
      ciriConversation.pop();
      setTimeout(function(){ ciriSetDot('ready'); }, 2000);
    } else {
      var reply = data.choices[0].message.content;
      ciriConversation.push({ role: 'assistant', content: reply });
      ciriAppend('ai', reply);
      ciriSetDot('ready');
    }
  } catch(e){
    ciriShowThinking(false);
    ciriAppend('error', 'Connection failed: ' + e.message);
    ciriSetDot('error');
    ciriConversation.pop();
    setTimeout(function(){ ciriSetDot('ready'); }, 2000);
  } finally { ciriPending = false; }
}

document.addEventListener('keydown', function(e){
  var tag = (e.target.tagName || '').toUpperCase();
  if(tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;
  if(e.key === 'm' || e.key === 'M'){
    e.preventDefault();
    if(document.body.classList.contains('ciri-active')) ciriCollapse();
    else { ciriPeek(); setTimeout(ciriExpand, 200); }
  }
  if(e.key === 'f' || e.key === 'F'){
    e.preventDefault();
    ciriCollapse();
    document.body.classList.remove('ciri-peek');
  }
});

window.autoGrow = function(el){ el.style.height = '5px'; el.style.height = (el.scrollHeight) + 'px'; };
window.cycleMode = function(){};
window.handleSend = function(){ ciriSend(); };
window.handleFileUpload = function(){};
window.clearImage = function(){};
window.closeCiri = ciriCollapse;

(function(){
  // Only prompt if the hardcoded key is truly empty/invalid
  if(!getCiriKey() || getCiriKey().indexOf('gsk_') !== 0){
    setTimeout(function(){ ciriShowKeyPrompt(true); }, 500);
  } else {
    ciriShowKeyPrompt(false);
  }
})();
