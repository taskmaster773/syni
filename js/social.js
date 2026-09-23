/* ============================================================
   Social — status, profiles, friends, image sharing
   ============================================================ */

var MY_STATUS = 'online';        // online | idle | dnd
var MY_BIO = '';
var MY_JOINED = Date.now();
var friendsList = [];
var onlineUsers = {};            // { username: { status, room, lastSeen } }
var presenceRef = null;
var friendsRef = null;
var currentProfileUser = null;

/* ---------- Init — called after chat is ready ---------- */

function socialInit(){
  if(!chatReady || !chatNickname) return;

  // Load saved local data
  try {
    var saved = localStorage.getItem('syni_social_me');
    if(saved){
      var me = JSON.parse(saved);
      MY_STATUS = me.status || 'online';
      MY_BIO = me.bio || '';
      MY_JOINED = me.joined || Date.now();
    }
    var savedFriends = localStorage.getItem('syni_friends');
    if(savedFriends) friendsList = JSON.parse(savedFriends) || [];
  } catch(e){}

  // Presence in Firebase
  var db = firebase.database();
  presenceRef = db.ref('presence/' + chatNickname);
  var roomRef = db.ref('presence/' + chatNickname);

  // Mark online
  presenceRef.set({
    status: MY_STATUS,
    room: chatCurrentRoom,
    joined: MY_JOINED,
    bio: MY_BIO,
    lastSeen: Date.now()
  });

  // Update room when user switches
  var _oldSwitch = window.chatSwitchRoom;
  if(_oldSwitch){
    window.chatSwitchRoom = function(room){
      _oldSwitch.apply(this, arguments);
      if(presenceRef) presenceRef.update({ room: room, lastSeen: Date.now() });
    };
  }

  // Mark offline on close
  window.addEventListener('beforeunload', function(){
    if(presenceRef) presenceRef.update({ status: 'offline', lastSeen: Date.now() });
  });

  // Listen to all presence
  db.ref('presence').on('value', function(snap){
    onlineUsers = snap.val() || {};
    renderFriendsList();
    updateAllUserDots();
  });

  // Listen to my own friends (stored globally so all clients see)
  friendsRef = db.ref('friends/' + chatNickname);
  friendsRef.on('value', function(snap){
    var f = snap.val();
    if(f) friendsList = Object.keys(f);
    else friendsList = [];
    try { localStorage.setItem('syni_friends', JSON.stringify(friendsList)); } catch(e){}
    renderFriendsList();
  });

  // Save my profile to Firebase so others can see
  db.ref('users/' + chatNickname).set({
    bio: MY_BIO,
    joined: MY_JOINED,
    status: MY_STATUS
  });

  // Hook image attach button
  var attachBtn = document.getElementById('chat-attach-btn');
  var fileInput = document.getElementById('chat-image-input');
  if(attachBtn && fileInput){
    attachBtn.onclick = function(){ fileInput.click(); };
    fileInput.onchange = function(){
      if(this.files && this.files[0]) chatSendImage(this.files[0]);
      this.value = '';
    };
  }

  // Overlay click to close
  var overlay = document.getElementById('user-profile-overlay');
  if(overlay){
    overlay.onclick = function(e){
      if(e.target === overlay) closeUserProfile();
    };
  }
}

/* ---------- Status helpers ---------- */

function getUserStatus(username){
  if(!onlineUsers[username]) return 'offline';
  var u = onlineUsers[username];
  if(!u) return 'offline';
  if(u.status === 'offline') return 'offline';
  // Consider idle if last seen > 5 min ago
  if(u.lastSeen && Date.now() - u.lastSeen > 5 * 60 * 1000) return 'idle';
  return u.status || 'online';
}

function statusLabel(s){
  return { online: 'Online', idle: 'Idle', dnd: 'Do Not Disturb', offline: 'Offline' }[s] || 'Offline';
}

/* ---------- Update every user dot in chat ---------- */

function updateAllUserDots(){
  var links = document.querySelectorAll('.chat-user-link');
  for(var i = 0; i < links.length; i++){
    var user = links[i].dataset.user;
    if(!user) continue;
    var status = getUserStatus(user);
    var dot = links[i].parentElement.querySelector('.status-dot-user');
    if(dot){
      dot.className = 'status-dot-user ' + status;
    } else {
      dot = document.createElement('span');
      dot.className = 'status-dot-user ' + status;
      links[i].parentElement.insertBefore(dot, links[i]);
    }
  }
}

/* ---------- User profile popup ---------- */

window.openUserProfile = function(username){
  if(!username || username === 'anon' || username === 'System') return;
  currentProfileUser = username;

  var overlay = document.getElementById('user-profile-overlay');
  if(!overlay) return;

  var isSelf = (username === chatNickname);
  var isFriend = friendsList.indexOf(username) > -1;
  var status = getUserStatus(username);
  var info = onlineUsers[username] || {};

  var initial = username.charAt(0).toUpperCase();
  var room = info.room || 'main-chat';
  var roomLabel = room.replace('-chat','').replace('-',' ');

  var friendBtnHtml = '';
  if(!isSelf){
    if(isFriend){
      friendBtnHtml = '<button class="user-profile-btn danger" onclick="removeFriend(\'' + username + '\')"><i class="fas fa-user-minus"></i> Remove Friend</button>';
    } else {
      friendBtnHtml = '<button class="user-profile-btn primary" onclick="addFriend(\'' + username + '\')"><i class="fas fa-user-plus"></i> Add Friend</button>';
    }
  }

  var joinBtnHtml = '';
  if(!isSelf && status !== 'offline'){
    joinBtnHtml = '<button class="user-profile-btn secondary" onclick="joinRoomOf(\'' + username + '\')"><i class="fas fa-arrow-right-to-bracket"></i> Join Room</button>';
  }

  overlay.innerHTML =
    '<div class="user-profile-card">' +
      '<div class="user-profile-header">' +
        '<button class="user-profile-close" onclick="closeUserProfile()"><i class="fas fa-times"></i></button>' +
        '<div class="user-profile-avatar">' + initial + '</div>' +
      '</div>' +
      '<div class="user-profile-body">' +
        '<div class="user-profile-name">' + escapeHtml(username) + '</div>' +
        '<div class="user-profile-status-line">' +
          '<span class="status-dot-user ' + status + '"></span>' +
          statusLabel(status) +
        '</div>' +
        '<div class="user-profile-bio">' +
          (info.bio ? escapeHtml(info.bio) : (isSelf ? 'No bio set. Click Edit Profile to add one.' : 'No bio yet.')) +
        '</div>' +
        (status !== 'offline' && info.room ? '<div class="user-profile-room">Currently in <strong>#' + roomLabel + '</strong></div>' : '') +
        '<div class="user-profile-actions">' +
          friendBtnHtml +
          joinBtnHtml +
        '</div>' +
        (isSelf ? '<button class="user-profile-btn secondary" style="width:100%;margin-top:8px;" onclick="editMyProfile()"><i class="fas fa-pen"></i> Edit Profile</button>' : '') +
      '</div>' +
    '</div>';

  overlay.classList.add('show');
};

window.closeUserProfile = function(){
  var overlay = document.getElementById('user-profile-overlay');
  if(overlay) overlay.classList.remove('show');
  currentProfileUser = null;
};

window.editMyProfile = function(){
  var newBio = prompt('Your bio:', MY_BIO || '');
  if(newBio !== null){
    MY_BIO = newBio.trim().slice(0, 100);
    saveMyProfile();
  }
  var statusPick = prompt('Status (online / idle / dnd):', MY_STATUS);
  if(statusPick && ['online','idle','dnd'].indexOf(statusPick) > -1){
    MY_STATUS = statusPick;
    saveMyProfile();
  }
  closeUserProfile();
};

function saveMyProfile(){
  try {
    localStorage.setItem('syni_social_me', JSON.stringify({
      status: MY_STATUS, bio: MY_BIO, joined: MY_JOINED
    }));
  } catch(e){}

  if(presenceRef){
    presenceRef.update({ status: MY_STATUS, bio: MY_BIO, lastSeen: Date.now() });
  }
  firebase.database().ref('users/' + chatNickname).update({
    bio: MY_BIO, status: MY_STATUS, joined: MY_JOINED
  });
}

/* ---------- Friends ---------- */

window.addFriend = function(username){
  if(!friendsRef) return;
  friendsRef.child(username).set(Date.now());
  // Also add to their friends (mutual)
  firebase.database().ref('friends/' + username + '/' + chatNickname).set(Date.now());
  showNotification('👥 Friend Added', username + ' added to your friends.');
  closeUserProfile();
};

window.removeFriend = function(username){
  if(!friendsRef) return;
  if(!confirm('Remove ' + username + ' from friends?')) return;
  friendsRef.child(username).remove();
  firebase.database().ref('friends/' + username + '/' + chatNickname).remove();
  closeUserProfile();
};

window.joinRoomOf = function(username){
  var info = onlineUsers[username];
  if(!info || !info.room) return;
  chatSwitchRoom(info.room);
  closeUserProfile();
  showNotification('🚪 Joined Room', 'You joined the same room as ' + username + '.');
};

window.toggleFriendsList = function(){
  var p = document.getElementById('friends-panel');
  if(!p) return;
  if(p.classList.contains('show')){ p.classList.remove('show'); }
  else { p.classList.add('show'); renderFriendsList(); }
};

window.renderFriendsList = function(){
  var panel = document.getElementById('friends-panel');
  if(!panel) return;

  var html = '<div class="friends-header"><span>Friends</span><span style="color:#555;font-weight:600;">' + friendsList.length + '</span></div>';
  html += '<div class="friends-list">';

  if(friendsList.length === 0){
    html += '<div class="friends-empty">No friends yet.<br>Click a username in chat to add someone.</div>';
  } else {
    // Sort: online first, then alphabetical
    friendsList.sort(function(a, b){
      var sa = getUserStatus(a), sb = getUserStatus(b);
      var aOn = sa !== 'offline' ? 0 : 1;
      var bOn = sb !== 'offline' ? 0 : 1;
      if(aOn !== bOn) return aOn - bOn;
      return a.localeCompare(b);
    });

    friendsList.forEach(function(name){
      var status = getUserStatus(name);
      var info = onlineUsers[name] || {};
      var room = info.room ? info.room.replace('-chat','') : '';
      var initial = name.charAt(0).toUpperCase();
      html +=
        '<div class="friend-item" onclick="openUserProfile(\'' + name.replace(/'/g, "\\'") + '\')">' +
          '<div class="friend-avatar">' + initial + '</div>' +
          '<div class="friend-info">' +
            '<div class="friend-name"><span class="status-dot-user ' + status + '"></span>' + escapeHtml(name) + '</div>' +
            '<div class="friend-room">' + (status !== 'offline' && room ? 'In #' + room : statusLabel(status)) + '</div>' +
          '</div>' +
        '</div>';
    });
  }
  html += '</div>';
  panel.innerHTML = html;
};

/* ---------- Image sharing ---------- */

window.chatSendImage = function(file){
  if(!chatReady || !chatRef || !chatNickname) return;
  if(!file || !file.type.startsWith('image/')) return;

  if(file.size > 1.5 * 1024 * 1024){
    showNotification('⚠️ Image too large', 'Max 1.5 MB per image.');
    return;
  }

  var reader = new FileReader();
  reader.onload = function(e){
    var msg = {
      user: chatNickname,
      text: '',
      image: e.target.result,
      time: Date.now()
    };
    if(chatOwnerMode) msg.owner = true;
    chatRef.push(msg).catch(function(){
      showNotification('❌ Send failed', 'Could not send image.');
    });
  };
  reader.readAsDataURL(file);
};

/* ---------- Lightbox ---------- */

window.openChatImage = function(src){
  var lb = document.getElementById('chat-image-lightbox');
  if(!lb){
    lb = document.createElement('div');
    lb.id = 'chat-image-lightbox';
    lb.innerHTML = '<img src="">';
    lb.onclick = function(){ lb.classList.remove('show'); };
    document.body.appendChild(lb);
  }
  lb.querySelector('img').src = src;
  lb.classList.add('show');
};

/* ---------- Paste images into chat input ---------- */

document.addEventListener('paste', function(e){
  // Only when chat input is focused
  if(document.activeElement && document.activeElement.id === 'chat-input'){
    var items = e.clipboardData && e.clipboardData.items;
    if(!items) return;
    for(var i = 0; i < items.length; i++){
      if(items[i].type.startsWith('image/')){
        e.preventDefault();
        chatSendImage(items[i].getAsFile());
        return;
      }
    }
  }
});

/* ---------- Auto-init when chat opens ---------- */

var _socialInitTimer = setInterval(function(){
  if(chatReady && chatNickname){
    clearInterval(_socialInitTimer);
    socialInit();
  }
}, 1000);
