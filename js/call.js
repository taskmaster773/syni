/* ============================================================
   Voice & Video Calls — PeerJS
   ============================================================ */

var callPeer = null;
var activeCall = null;
var localStream = null;
var remoteStreamGlobal = null;
var pendingIncomingCall = null;
var callTimerInterval = null;
var callStartTime = null;

/* ---------- Sanitize PeerJS ID ---------- */

function sanitizePeerId(id){
  return String(id || '').replace(/[^a-zA-Z0-9_-]/g, '_');
}

/* ---------- Init Peer ---------- */

function initPeer(){
  if(callPeer) return;

  var baseId = sanitizePeerId(chatNickname) || ('user_' + Math.random().toString(36).slice(2,8));
  callPeer = new Peer(baseId);

  callPeer.on('open', function(id){
    console.log('[Calls] My peer ID:', id);
  });

  callPeer.on('error', function(err){
    console.warn('[Calls] Peer error:', err);
  });

  callPeer.on('call', function(call){
    if(activeCall){
      call.close();
      return;
    }
    showIncomingCall(call);
  });
}

/* ---------- Incoming call UI ---------- */

function showIncomingCall(call){
  pendingIncomingCall = call;

  var ui = document.getElementById('incoming-call-overlay');
  if(!ui){
    ui = document.createElement('div');
    ui.id = 'incoming-call-overlay';
    ui.innerHTML =
      '<div id="incoming-call-card">' +
        '<div class="ic-icon"><i class="fas fa-phone"></i></div>' +
        '<div class="ic-label">Incoming Call</div>' +
        '<div class="ic-from" id="ic-from">—</div>' +
        '<div class="ic-actions">' +
          '<button id="ic-decline" class="ic-btn ic-decline">' +
            '<i class="fas fa-phone-slash"></i><span>Decline</span>' +
          '</button>' +
          '<button id="ic-accept" class="ic-btn ic-accept">' +
            '<i class="fas fa-phone"></i><span>Accept</span>' +
          '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ui);

    document.getElementById('ic-accept').onclick = function(){
      var c = pendingIncomingCall;
      pendingIncomingCall = null;
      ui.style.display = 'none';
      if(c) answerCall(c);
    };
    document.getElementById('ic-decline').onclick = function(){
      var c = pendingIncomingCall;
      pendingIncomingCall = null;
      ui.style.display = 'none';
      if(c) c.close();
    };
  }

  var fromEl = ui.querySelector('#ic-from');
  if(fromEl) fromEl.textContent = call.peer;

  ui.style.display = 'flex';

  // Ringtone
  playRingtone();
}

/* ---------- Ringtone ---------- */

var __ringCtx = null;
var __ringOsc = null;
var __ringGain = null;
var __ringTimeout = null;

function playRingtone(){
  try {
    var AC = window.AudioContext || window.webkitAudioContext;
    if(!AC) return;
    if(!__ringCtx) __ringCtx = new AC();
    if(__ringCtx.state === 'suspended') __ringCtx.resume();

    function beep(){
      if(!pendingIncomingCall) return;
      var now = __ringCtx.currentTime;
      var osc = __ringCtx.createOscillator();
      var gain = __ringCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
      osc.connect(gain); gain.connect(__ringCtx.destination);
      osc.start(now); osc.stop(now + 0.5);

      __ringTimeout = setTimeout(beep, 900);
    }
    beep();
  } catch(e){}
}

function stopRingtone(){
  clearTimeout(__ringTimeout);
  __ringTimeout = null;
}

/* ---------- Start a call ---------- */

function startCall(video){
  if(!callPeer) initPeer();
  if(activeCall) return;

  var targetId = prompt('Enter the call ID to reach:\n\n(Your ID is: ' +
    (callPeer && callPeer.id ? callPeer.id : 'connecting…') + ')');
  if(!targetId) return;
  targetId = sanitizePeerId(targetId);

  window.navigator.mediaDevices.getUserMedia({ audio: true, video: video })
    .then(function(stream){
      localStream = stream;
      showCallUi(video);

      // Attach local video
      var localVid = document.getElementById('call-local-video');
      if(localVid) localVid.srcObject = stream;

      var call = callPeer.call(targetId, stream, {
        metadata: { video: video, from: chatNickname }
      });

      if(!call){
        showNotification('❌ Call failed', 'Could not reach that user.');
        endCall();
        return;
      }
      activeCall = call;
      wireCallEvents(call);
    })
    .catch(function(err){
      showNotification('⚠️ Permission denied', 'Mic/camera access is required.');
      console.warn(err);
    });
}

/* ---------- Answer an incoming call ---------- */

function answerCall(call){
  stopRingtone();

  // Determine if the incoming call has video by checking metadata, else default to video
  var wantsVideo = true;
  try {
    if(call.metadata && call.metadata.video === false) wantsVideo = false;
  } catch(e){}

  window.navigator.mediaDevices.getUserMedia({ audio: true, video: wantsVideo })
    .then(function(stream){
      localStream = stream;
      call.answer(stream);
      activeCall = call;
      showCallUi(wantsVideo);

      var localVid = document.getElementById('call-local-video');
      if(localVid) localVid.srcObject = stream;

      wireCallEvents(call);
    })
    .catch(function(err){
      console.warn('[Calls] Answer failed:', err);
      showNotification('⚠️ Could not answer', 'Mic/camera access is required.');
      call.close();
    });
}

/* ---------- Wire peer events ---------- */

function wireCallEvents(call){
  call.on('stream', function(remoteStream){
    remoteStreamGlobal = remoteStream;
    var remoteVideo = document.getElementById('call-remote-video');
    if(remoteVideo){
      remoteVideo.srcObject = remoteStream;
      // Force play in case autoplay is blocked
      remoteVideo.play().catch(function(){});
    }
    // Show the remote video element (in case we had it hidden)
    if(remoteVideo) remoteVideo.style.display = 'block';
  });

  call.on('close', function(){ endCall(); });
  call.on('error', function(err){ console.warn('[Calls] Call error:', err); endCall(); });
}

/* ---------- Call UI ---------- */

function showCallUi(video){
  var ui = document.getElementById('call-overlay');
  if(!ui){
    ui = document.createElement('div');
    ui.id = 'call-overlay';
    ui.innerHTML =
      '<div id="call-card">' +
        '<div id="call-videos">' +
          '<video id="call-remote-video" autoplay playsinline></video>' +
          '<video id="call-local-video" autoplay playsinline muted></video>' +
        '</div>' +
        '<div id="call-timer" class="call-timer">00:00</div>' +
        '<div id="call-controls">' +
          '<button id="call-mute" title="Mute mic"><i class="fas fa-microphone"></i></button>' +
          '<button id="call-video-toggle" title="Toggle camera"><i class="fas fa-video"></i></button>' +
          '<button id="call-end" title="End call"><i class="fas fa-phone-slash"></i></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ui);

    document.getElementById('call-end').onclick = endCall;
    document.getElementById('call-mute').onclick = toggleMute;
    document.getElementById('call-video-toggle').onclick = toggleVideo;
  }
  ui.style.display = 'flex';

  var remoteVid = document.getElementById('call-remote-video');
  if(remoteVid) remoteVid.style.display = video ? 'block' : 'none';

  startCallTimer();
}

/* ---------- Call timer ---------- */

function startCallTimer(){
  callStartTime = Date.now();
  clearInterval(callTimerInterval);
  callTimerInterval = setInterval(function(){
    var el = document.getElementById('call-timer');
    if(!el) return;
    var sec = Math.floor((Date.now() - callStartTime) / 1000);
    var m = Math.floor(sec / 60);
    var s = sec % 60;
    el.textContent = String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  }, 500);
}

function stopCallTimer(){
  clearInterval(callTimerInterval);
  callTimerInterval = null;
  callStartTime = null;
}

/* ---------- End call ---------- */

function endCall(){
  stopRingtone();
  stopCallTimer();
  if(activeCall){ try { activeCall.close(); } catch(e){} activeCall = null; }
  if(localStream){ localStream.getTracks().forEach(function(t){ t.stop(); }); localStream = null; }
  remoteStreamGlobal = null;
  var ui = document.getElementById('call-overlay');
  if(ui) ui.style.display = 'none';
}

/* ---------- Mute / camera toggle ---------- */

function toggleMute(){
  if(!localStream) return;
  var audio = localStream.getAudioTracks()[0];
  if(audio){
    audio.enabled = !audio.enabled;
    var btn = document.getElementById('call-mute');
    if(btn) btn.innerHTML = audio.enabled ? '<i class="fas fa-microphone"></i>' : '<i class="fas fa-microphone-slash"></i>';
  }
}

function toggleVideo(){
  if(!localStream) return;
  var videoTrack = localStream.getVideoTracks()[0];
  if(videoTrack){
    videoTrack.enabled = !videoTrack.enabled;
    var btn = document.getElementById('call-video-toggle');
    if(btn) btn.innerHTML = videoTrack.enabled ? '<i class="fas fa-video"></i>' : '<i class="fas fa-video-slash"></i>';
  }
}

/* ---------- Expose buttons ---------- */

window.startVoiceCall = function(){ startCall(false); };
window.startVideoCall = function(){ startCall(true); };

/* ---------- Auto-init ---------- */

window.addEventListener('load', function(){
  setTimeout(initPeer, 2000);
});
