/* ============================================================
   Custom Rooms — create, browse, join (public + locked)
   ============================================================ */

var _roomPrivacy = 'public';
var _roomsListener = null;
var _allRooms = {};
var _roomBrowserSection = 'public';

/* ---------- Open the creator ---------- */

window.openRoomCreator = function(){
  var ov = document.getElementById('room-creator-overlay');
  if(!ov) return;
  document.getElementById('room-title-input').value = '';
  document.getElementById('room-id-input').value = '';
  document.getElementById('room-password-input').value = '';
  pickPrivacy('public');
  ov.classList.add('show');
};

window.closeRoomCreator = function(){
  var ov = document.getElementById('room-creator-overlay');
  if(ov) ov.classList.remove('show');
};

window.pickPrivacy = function(mode){
  _roomPrivacy = mode;
  document.querySelectorAll('.room-privacy-btn').forEach(function(b){
    b.classList.toggle('active', b.dataset.privacy === mode);
  });
  document.getElementById('room-password-wrap').style.display = (mode === 'locked') ? 'block' : 'none';
};

/* ---------- Create the room ---------- */

window.createRoom = function(){
  if(!chatReady){
    showNotification('⚠️ Not connected', 'Wait for chat to connect first.');
    return;
  }

  var title = document.getElementById('room-title-input').value.trim();
  var id = document.getElementById('room-id-input').value.trim().toLowerCase();
  var pwd = document.getElementById('room-password-input').value;

  if(!title){ showNotification('⚠️ Room title required', ''); return; }
  if(!id){ showNotification('⚠️ Room ID required', ''); return; }

  // Validate ID: lowercase letters, numbers, dashes only
  if(!/^[a-z0-9-]+$/.test(id)){
    showNotification('⚠️ Invalid room ID', 'Only lowercase letters, numbers, and dashes.');
    return;
  }
  if(id.length < 3){
    showNotification('⚠️ Room ID too short', 'Minimum 3 characters.');
    return;
  }
  if(_roomPrivacy === 'locked' && !pwd){
    showNotification('⚠️ Password required', 'Locked rooms need a password.');
    return;
  }

  var roomRef = firebase.database().ref('rooms/' + id);

  // Check if it already exists
  roomRef.once('value').then(function(snap){
    if(snap.exists()){
      showNotification('⚠️ Room already exists', 'Pick a different ID.');
      return;
    }

    var roomData = {
      title: title,
      privacy: _roomPrivacy,
      createdAt: Date.now(),
      createdBy: chatNickname
    };
    if(_roomPrivacy === 'locked'){
      // Simple hash — not real security, but avoids plaintext
      roomData.passwordHash = _simpleHash(pwd);
    }

    roomRef.set(roomData).then(function(){
      closeRoomCreator();
      showNotification('✅ Room created', '#' + title);
      chatSwitchRoom(id);
    }).catch(function(err){
      showNotification('❌ Create failed', err.message);
    });
  });
};

/* Tiny obfuscation — not cryptographic, just so passwords aren't readable in DB */
function _simpleHash(str){
  var h = 0;
  for(var i = 0; i < str.length; i++){
    h = ((h << 5) - h) + str.charCodeAt(i);
    h = h | 0;
  }
  return String(h);
}

/* ---------- Browse rooms ---------- */

window.openRoomBrowser = function(){
  closeRoomCreator();
  var ov = document.getElementById('room-browser-overlay');
  if(!ov) return;
  ov.classList.add('show');
  switchRoomBrowserTab('public');
  listenToRooms();
};

window.closeRoomBrowser = function(){
  var ov = document.getElementById('room-browser-overlay');
  if(ov) ov.classList.remove('show');
};

window.switchRoomBrowserTab = function(section){
  _roomBrowserSection = section;
  document.querySelectorAll('.room-browser-tab').forEach(function(t){
    t.classList.toggle('active', t.dataset.section === section);
  });
  renderRoomBrowser();
};

function listenToRooms(){
  if(_roomsListener) return;
  var roomsRef = firebase.database().ref('rooms');
  _roomsListener = roomsRef.on('value', function(snap){
    _allRooms = snap.val() || {};
    renderRoomBrowser();
  });
}

function renderRoomBrowser(){
  var body = document.getElementById('room-browser-body');
  if(!body) return;

  var rooms = [];
  for(var id in _allRooms){
    var r = _allRooms[id];
    r._id = id;
    if(r.privacy === _roomBrowserSection) rooms.push(r);
  }

  // Sort newest first
  rooms.sort(function(a, b){ return (b.createdAt || 0) - (a.createdAt || 0); });

  if(rooms.length === 0){
    body.innerHTML =
      '<div class="room-empty">' +
        '<i class="fas fa-' + (_roomBrowserSection === 'public' ? 'globe' : 'lock') + '"></i>' +
        'No ' + _roomBrowserSection + ' rooms yet.<br>' +
        'Be the first to create one!' +
      '</div>';
    return;
  }

  var html = '';
  rooms.forEach(function(r){
    var icon = r.privacy === 'locked' ? 'lock' : 'globe';
    var count = 0;
    // Count occupants from presence
    for(var u in (onlineUsers || {})){
      if(onlineUsers[u] && onlineUsers[u].room === r._id) count++;
    }
    html +=
      '<div class="room-card ' + (r.privacy === 'locked' ? 'locked' : '') + '" onclick="attemptJoinRoom(\'' + r._id + '\')">' +
        '<div class="room-card-icon"><i class="fas fa-' + icon + '"></i></div>' +
        '<div class="room-card-info">' +
          '<div class="room-card-title">' + escapeHtml(r.title || r._id) + '</div>' +
          '<div class="room-card-meta">' +
            '<span>#' + r._id + '</span>' +
            '<span class="dot">•</span>' +
            '<span>' + count + ' online</span>' +
            '<span class="dot">•</span>' +
            '<span>by ' + escapeHtml(r.createdBy || 'unknown') + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
  });
  body.innerHTML = html;
}

/* ---------- Join flow ---------- */

window.attemptJoinRoom = function(roomId){
  var room = _allRooms[roomId];
  if(!room) return;

  if(room.privacy === 'locked'){
    var pwd = prompt('🔒 Password for "' + room.title + '":');
    if(pwd === null) return;
    if(_simpleHash(pwd) !== room.passwordHash){
      showNotification('❌ Wrong password', 'Try again.');
      return;
    }
  }

  closeRoomBrowser();
  joinCustomRoom(roomId, room);
};

function joinCustomRoom(roomId, roomData){
  // If the room isn't already a tab, add one
  if(!chatRooms[roomId]){
    chatRooms[roomId] = { ref: null, listener: null };
    chatUnreadCounts[roomId] = 0;
    addRoomTab(roomId, roomData.title, roomData.privacy === 'locked');
  }
  chatSwitchRoom(roomId);
  showNotification('🚪 Joined', '#' + (roomData.title || roomId));
}

function addRoomTab(roomId, title, isLocked){
  var tabs = document.getElementById('chat-room-tabs');
  if(!tabs) return;
  if(tabs.querySelector('.chat-room-tab[data-room="' + roomId + '"]')) return;

  var btn = document.createElement('button');
  btn.className = 'chat-room-tab';
  btn.dataset.room = roomId;
  btn.innerHTML =
    '<i class="fas fa-' + (isLocked ? 'lock' : 'hashtag') + '"></i> ' +
    escapeHtml(title) +
    '<span class="chat-tab-badge" data-badge="' + roomId + '"></span>';
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    chatSwitchRoom(roomId);
  });

  // Insert before the "+" button
  var addBtn = tabs.querySelector('.chat-room-add');
  if(addBtn) tabs.insertBefore(btn, addBtn);
  else tabs.appendChild(btn);
}

/* ---------- Auto-load rooms this user has already joined ---------- */

function restoreJoinedRooms(){
  // Any room the user is currently "in" per presence — recreate tab
  var myPresence = onlineUsers[chatNickname];
  if(!myPresence || !myPresence.room) return;
  var id = myPresence.room;
  if(id === 'main-chat' || id === 'bugs' || id === 'reviews') return;
  if(_allRooms[id]){
    joinCustomRoom(id, _allRooms[id]);
  }
}

/* ---------- Auto-start listening when chat connects ---------- */

var _roomsInitTimer = setInterval(function(){
  if(chatReady && chatNickname){
    clearInterval(_roomsInitTimer);
    listenToRooms();
    // Restore any custom rooms I was in
    setTimeout(restoreJoinedRooms, 2000);
  }
}, 1000);

/* ---------- Overlay click-to-close ---------- */

document.addEventListener('click', function(e){
  if(e.target.id === 'room-creator-overlay') closeRoomCreator();
  if(e.target.id === 'room-browser-overlay') closeRoomBrowser();
});
