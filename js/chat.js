/* ============================================================
   Global Chat (Firebase Realtime DB)
   ============================================================ */

var CHAT_FIREBASE_CONFIG  = SYNI_CONFIG.firebase;
var CHAT_OWNER_PASSWORD   = SYNI_CONFIG.chatOwnerPassword;

var chatRef = null;
var chatReady = false;
var chatNickname = '';
var chatSeenIds = {};
var chatCurrentRoom = 'main';
var chatRooms = {
  'main-chat':      { ref: null, listener: null },
  'bugs': { ref: null, listener: null },
  'reviews':     { ref: null, listener: null }
};
var chatUnreadCounts = { 'main': 0, 'off-topic': 0, 'games': 0 };

// ═══════════════════════════════════════════════════════════
// OWNER MODE PASSWORD — change this to whatever you want
// ═══════════════════════════════════════════════════════════
var CHAT_OWNER_PASSWORD = 'syni7731';
// ═══════════════════════════════════════════════════════════

function chatAskOwnerPassword(){
  var pw = prompt('Enter owner password:');
  if(pw === null) return false;                 // cancelled
  if(pw !== CHAT_OWNER_PASSWORD){
    alert('Wrong password.');
    return false;
  }
  return true;
}

function chatDeleteMessage(msgId){
  if(!chatRef || !msgId) return;
  if(!chatAskOwnerPassword()) return;
  chatRef.child(msgId).remove().then(function(){
    // The Firebase 'child_removed' listener will remove it from the UI
  }).catch(function(e){
    alert('Failed to delete: ' + e.message);
  });
}

function chatClearAll(){
  if(!chatRef) return;
  if(!chatAskOwnerPassword()) return;
  if(!confirm('Delete ALL messages? This cannot be undone.')) return;
  chatRef.remove().then(function(){
    var msgs = document.getElementById('chat-messages');
    if(msgs) msgs.innerHTML = '<div class="chat-empty">No messages yet. Say hi!</div>';
    chatSeenIds = {};
  }).catch(function(e){
    alert('Failed to clear: ' + e.message);
  });
}

/* ---------- OWNER MODE ---------- */
var chatOwnerMode = false;

try {
  chatOwnerMode = localStorage.getItem('syni_chat_owner') === 'true';
} catch(e){}

function chatToggleOwner(){
  if(chatOwnerMode){
    // Turn off — no password needed
    chatOwnerMode = false;
    try { localStorage.setItem('syni_chat_owner', 'false'); } catch(e){}
    chatUpdateOwnerButton();
    chatRefreshOwnTags();
    return;
  }
  // Turn on — ask for password
  if(!chatAskOwnerPassword()) return;
  chatOwnerMode = true;
  try { localStorage.setItem('syni_chat_owner', 'true'); } catch(e){}
  chatUpdateOwnerButton();
  chatRefreshOwnTags();
}

/* When toggling owner mode, re-render tags on YOUR OWN messages.
   Past messages keep their old state (they don't retroactively
   become owner messages — that would be weird), but it lets the
   toggle feel responsive. If you want past messages to keep the
   Owner tag forever once sent, this can do nothing at all. */
function chatRefreshOwnTags(){
  // Intentionally left empty — messages store their own owner state
  // at send time, and we don't rewrite history when toggling.
}

function chatUpdateOwnerButton(){
  var btn = document.getElementById('chat-owner-toggle');
  if(!btn) return;
  if(chatOwnerMode) btn.classList.add('active');
  else btn.classList.remove('active');
}

try {
  var savedNick = localStorage.getItem('syni_chat_nick');
  if(savedNick) chatNickname = savedNick;
} catch(e){}

function toggleChat(){
  var w = document.getElementById('chat-window');
  if(!w) return;
  if(w.classList.contains('show')){ w.classList.remove('show'); }
  else {
    w.classList.add('show');
    chatHideDot();                       // ← clear the red dot
    if(!chatReady) chatInit();
    setTimeout(function(){
      var i = document.getElementById('chat-input');
      if(i) i.focus();
      chatScrollBottom();
    }, 100);
  }
}

function chatSetStatus(text, color){
  var s = document.getElementById('chat-status');
  if(!s) return;
  s.textContent = text;
  s.style.color = color || '#666';
}

function chatInit(){
  if(CHAT_FIREBASE_CONFIG.apiKey.indexOf('PASTE_') === 0){
    chatSetStatus('config needed', '#ff9800');
    var row = document.getElementById('chat-nick-row');
    if(row) row.style.display = 'none';
    var msgs = document.getElementById('chat-messages');
    if(msgs) msgs.innerHTML = '<div class="chat-empty" style="color:#ff9800;">⚠️ Firebase config not set.<br>Open the file and paste your keys.</div>';
    return;
  }

  try {
    if(!firebase.apps.length){
      firebase.initializeApp(CHAT_FIREBASE_CONFIG);
    }
    chatReady = true;
    chatUpdateOwnerButton();
    chatAttachRoomTabs();

    if(!chatNickname){
      var row = document.getElementById('chat-nick-row');
      if(row) row.style.display = 'flex';
      var inp = document.getElementById('chat-nick-input');
      if(inp) inp.focus();
    } else {
      var row2 = document.getElementById('chat-nick-row');
      if(row2) row2.style.display = 'none';
      chatSwitchRoom('main-chat');
    }
  } catch(e){
    chatSetStatus('error', '#ff5252');
    var msgs = document.getElementById('chat-messages');
    if(msgs) msgs.innerHTML = '<div class="chat-empty" style="color:#ff5252;">Connection failed: ' + e.message + '</div>';
  }
}

/* ---------- CHAT ROOMS ---------- */
function chatAttachRoomTabs(){
  var tabs = document.querySelectorAll('.chat-room-tab');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(e){
      e.stopPropagation();
      chatSwitchRoom(tab.dataset.room);
    });
  });
}

function chatSwitchRoom(room){
  if(!chatReady) return;
  if(!chatRooms[room]){
    console.warn('Unknown chat room:', room);
    return;
  }

  // Detach the current room's listener so we don't keep receiving its messages
  if(chatCurrentRoom && chatRooms[chatCurrentRoom] && chatRooms[chatCurrentRoom].listener){
    chatRooms[chatCurrentRoom].ref.off('child_added', chatRooms[chatCurrentRoom].listener);
    chatRooms[chatCurrentRoom].ref.off('child_removed');
    chatRooms[chatCurrentRoom].listener = null;
  }

  chatCurrentRoom = room;
  chatRef = firebase.database().ref('chats/' + room);
  chatRooms[room].ref = chatRef;

  // Update the active tab styling
  document.querySelectorAll('.chat-room-tab').forEach(function(t){
    t.classList.toggle('active', t.dataset.room === room);
  });

  // Clear the unread count for this room and hide its badge
  chatUnreadCounts[room] = 0;
  chatClearTabBadge(room);

  // If no other room has unread messages, hide the red dot on the chat icon
  var totalUnread = Object.keys(chatUnreadCounts).reduce(function(sum, k){
    return sum + (chatUnreadCounts[k] || 0);
  }, 0);
  if(totalUnread === 0) chatHideDot();

  // Clear the messages area and reload for this room
  var msgs = document.getElementById('chat-messages');
  if(msgs) msgs.innerHTML = '<div class="chat-empty">Loading #' + room + '…</div>';
  chatSeenIds = {};   // reset seen IDs — they only apply to the current room
  chatLoadHistory();
  chatListen();
}

function chatSetTabBadge(room, count){
  var badge = document.querySelector('.chat-tab-badge[data-badge="' + room + '"]');
  if(!badge) return;
  if(count > 0){
    badge.textContent = count > 99 ? '99+' : String(count);
    badge.classList.add('show');
  } else {
    badge.classList.remove('show');
    badge.textContent = '';
  }
}

function chatClearTabBadge(room){
  var badge = document.querySelector('.chat-tab-badge[data-badge="' + room + '"]');
  if(!badge) return;
  badge.classList.remove('show');
  badge.textContent = '';
}

function chatSetNick(){
  var inp = document.getElementById('chat-nick-input');
  if(!inp) return;
  var n = inp.value.trim();
  if(!n) return;
  var oldNick = chatNickname;
  chatNickname = n;
  try { localStorage.setItem('syni_chat_nick', n); } catch(e){}
  var row = document.getElementById('chat-nick-row');
  if(row) row.style.display = 'none';

  // If we already had a nickname, we were already listening — no need to re-init
    if(!oldNick){
    chatLoadHistory();
    chatListen();
  } else if(chatRef) {
    // Just announce the change in the chat
    chatRef.push({
      user: 'System',
      text: 'Name ' + oldNick + ' is now known as ' + n,
      time: Date.now(),
      system: true
    });
  }
}  // ← ADD THIS LINE — closes chatSetNick()

/* Open the nickname input so user can change it */
function chatChangeNick(){
  var row = document.getElementById('chat-nick-row');
  var inp = document.getElementById('chat-nick-input');
  var btn = document.getElementById('chat-nick-btn');
  if(!row || !inp) return;
  row.style.display = 'flex';
  inp.value = chatNickname || '';
  inp.focus();
  inp.select();
  if(btn) btn.textContent = 'Save';
}

/* Red dot helpers */
function chatShowDot(){
  var dot = document.getElementById('chat-noti-dot');
  if(dot){
    dot.classList.add('show');
    __startChatDotPulse();
  }
}
function chatHideDot(){
  var dot = document.getElementById('chat-noti-dot');
  if(dot){
    dot.classList.remove('show');
    dot.style.transform = '';
    dot.style.boxShadow = '';
  }
  __chatDotPulseRunning = false;
}

/* ---------- CHAT DING (Web Audio — no file needed) ---------- */
var __chatAudioCtx = null;

function playChatDing(){
  try {
    // Lazily create the AudioContext on first use.
    // Browsers require user interaction before audio can play —
    // since the user already clicked to unlock the OS, we're fine.
    if(!__chatAudioCtx){
      var AC = window.AudioContext || window.webkitAudioContext;
      if(!AC) return;
      __chatAudioCtx = new AC();
    }
    // Some browsers suspend the context until explicitly resumed.
    if(__chatAudioCtx.state === 'suspended'){
      __chatAudioCtx.resume().catch(function(){});
    }

    var ctx = __chatAudioCtx;
    var now = ctx.currentTime;

    // --- Tone 1: higher note ---
    var osc1 = ctx.createOscillator();
    var gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(880, now);          // A5
    osc1.frequency.setValueAtTime(1174.66, now + 0.08); // D6 (a quick upward slide)
    gain1.gain.setValueAtTime(0.0001, now);
    gain1.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    // --- Tone 2: subtle harmonic shimmer ---
    var osc2 = ctx.createOscillator();
    var gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1760, now);          // A6 (one octave up)
    gain2.gain.setValueAtTime(0.0001, now);
    gain2.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now);
    osc2.stop(now + 0.25);

  } catch(e){
    // Audio is a nice-to-have; never let it break the app
    console.warn('Chat ding failed:', e);
  }
}

function chatLoadHistory(){
  chatSetStatus('loading…', '#4fc3f7');
  chatRef.orderByChild('time').limitToLast(50).once('value').then(function(snap){
    var msgs = document.getElementById('chat-messages');
    if(msgs) msgs.innerHTML = '';
    snap.forEach(function(child){
      var m = child.val();
      if(m && m.time) chatSeenIds[child.key] = true;
      chatRender(m, child.key, false);
    });
    chatSetStatus('online', '#44ff88');
    chatScrollBottom();
  }).catch(function(e){
    chatSetStatus('denied', '#ff5252');
  });
}

/* ---------- CHAT DOT PULSE (JS-driven — survives iframe throttling) ---------- */
var __chatDotPulseRunning = false;
var __chatDotPulseStart = 0;

function __chatDotPulseLoop(ts){
  var dot = document.getElementById('chat-noti-dot');
  if(!dot || !dot.classList.contains('show')){
    __chatDotPulseRunning = false;
    if(dot){ dot.style.transform = ''; dot.style.boxShadow = ''; }
    return;
  }
  if(!__chatDotPulseStart) __chatDotPulseStart = ts;

  // 1.4-second cycle
  var t = ((ts - __chatDotPulseStart) % 1400) / 1400;   // 0 → 1
  // Smooth sine wave for the scale
  var scale = 1 + 0.25 * Math.sin(t * Math.PI * 2);
  // Glow that fades out as it scales up
  var glow = 6 * (1 - Math.abs(Math.sin(t * Math.PI * 2))) * 0.9;

  dot.style.transform = 'scale(' + scale.toFixed(3) + ')';
  dot.style.boxShadow = '0 0 0 ' + glow.toFixed(2) + 'px rgba(255,68,68,0.6)';

  requestAnimationFrame(__chatDotPulseLoop);
}

function __startChatDotPulse(){
  if(__chatDotPulseRunning) return;
  __chatDotPulseRunning = true;
  __chatDotPulseStart = 0;
  requestAnimationFrame(__chatDotPulseLoop);
}

function chatListen(){
  var thisRoom = chatCurrentRoom;

  chatRef.orderByChild('time').startAt(Date.now()).on('child_added', function(snap){
    var id = snap.key;
    if(chatSeenIds[id]) return;
    chatSeenIds[id] = true;
    var msgData = snap.val();

    // Only render if we're still in this room. If the user switched rooms
    // between when the listener fired and when this callback ran, we just
    // count it as unread.
    var isCurrentRoom = (chatCurrentRoom === thisRoom);

    if(isCurrentRoom){
      chatRender(msgData, id, true);
      chatScrollBottom();
    }

    var isMine = msgData && msgData.user === chatNickname;
    if(!isMine){
      if(isCurrentRoom){
        // Message is in the room we're looking at — just show the icon dot
        chatShowDot();
      } else {
        // Message is in a different room — bump that room's badge
        chatUnreadCounts[thisRoom] = (chatUnreadCounts[thisRoom] || 0) + 1;
        chatSetTabBadge(thisRoom, chatUnreadCounts[thisRoom]);
        chatShowDot();
      }
    }
  });

  // When ANY message is removed by the owner, wipe it from the UI for everyone
  chatRef.on('child_removed', function(snap){
    var id = snap.key;
    delete chatSeenIds[id];
    var el = document.querySelector('.chat-msg[data-id="' + id + '"]');
    if(el) el.remove();
    // If the message list is now empty, show the empty state again
    var msgs = document.getElementById('chat-messages');
    if(msgs && msgs.querySelectorAll('.chat-msg').length === 0){
      msgs.innerHTML = '<div class="chat-empty">No messages yet. Say hi!</div>';
    }
  });
}

function chatRender(m, id, isNew){
  if(!m || !m.text) return;
  var msgs = document.getElementById('chat-messages');
  if(!msgs) return;

  var empty = msgs.querySelector('.chat-empty');
  if(empty) empty.remove();

  var mine = (m.user === chatNickname);
  var isOwnerMsg = !!m.owner;              // ← read from the message itself
  var div = document.createElement('div');
  div.className = 'chat-msg ' + (mine ? 'mine' : 'other') + (isOwnerMsg ? ' owner-msg' : '');
  div.setAttribute('data-id', id);

  var time = m.time ? new Date(m.time) : new Date();
  var hh = String(time.getHours()).padStart(2,'0');
  var mm = String(time.getMinutes()).padStart(2,'0');

  var ownerTag = '';                        // ← define the missing variable
  if(isOwnerMsg){
    ownerTag = '<span class="chat-owner-tag"><i class="fas fa-crown"></i> OWNER</span>';
  }

  div.innerHTML = '<div class="chat-msg-meta">' + ownerTag + '<span>' + chatEscape(m.user || 'anon') + '</span><span>' + hh + ':' + mm + '</span></div>' + chatEscape(m.text);
  var delBtn = document.createElement('button');
  delBtn.className = 'chat-delete-btn';
  delBtn.type = 'button';
  delBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Delete';
  delBtn.addEventListener('click', function(ev){
    ev.stopPropagation();
    chatDeleteMessage(id);
  });
  div.appendChild(delBtn);
  msgs.appendChild(div);

  if(isNew && !mine){
    div.style.outline = '1px solid rgba(79,195,247,.4)';
    setTimeout(function(){ div.style.outline = 'none'; }, 800);
  }
}

function chatScrollBottom(){
  var msgs = document.getElementById('chat-messages');
  if(msgs) msgs.scrollTop = msgs.scrollHeight;
}

function chatEscape(s){
  return String(s).replace(/[&<>"']/g, function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
  });
}

function chatSend(){
  if(!chatReady || !chatRef || !chatNickname) return;
  var inp = document.getElementById('chat-input');
  if(!inp) return;
  var text = inp.value.trim();
  if(!text) return;
  inp.value = '';

  var msg = {
    user: chatNickname,
    text: text,
    time: Date.now()
  };
  // If I'm in owner mode, tag the message itself so everyone sees it
  if(chatOwnerMode) msg.owner = true;

    chatRef.push(msg).catch(function(e){
    chatSetStatus('send failed', '#ff5252');
  });
  chatHideDot();   // you just sent it — you obviously saw it
}

(function(){
  var inp = document.getElementById('chat-input');
  if(inp){
    inp.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){ e.preventDefault(); chatSend(); }
    });
  }
  var nickInp = document.getElementById('chat-nick-input');
  if(nickInp){
    nickInp.addEventListener('keydown', function(e){
      if(e.key === 'Enter'){ e.preventDefault(); chatSetNick(); }
    });
  }
})();

(function(){
  var w = document.getElementById('chat-window');
  var handle = document.getElementById('chat-drag-handle');
  if(!w || !handle) return;
  var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;

  handle.addEventListener('mousedown', function(e){
    if(e.target.closest('.chat-close')) return;
    dragging = true;
    sx = e.clientX; sy = e.clientY;
    var r = w.getBoundingClientRect();
    ox = r.left; oy = r.top;
    w.style.left = ox + 'px';
    w.style.top = oy + 'px';
    w.style.bottom = 'auto';
    e.preventDefault();
  });
  window.addEventListener('mousemove', function(e){
    if(!dragging) return;
    var nx = Math.max(0, Math.min(window.innerWidth - w.offsetWidth, ox + e.clientX - sx));
    var ny = Math.max(0, Math.min(window.innerHeight - w.offsetHeight, oy + e.clientY - sy));
    w.style.left = nx + 'px';
    w.style.top = ny + 'px';
  });
  window.addEventListener('mouseup', function(){ dragging = false; });
})();
