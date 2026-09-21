/* ============================================================
   Voice & Video Calls — PeerJS
   ============================================================ */

var callPeer = null;
var activeCall = null;
var localStream = null;

function initPeer(){
  if(callPeer) return;

  // Sanitize: PeerJS only allows a-z, A-Z, 0-9, -, _
  var baseId = (chatNickname || '').replace(/[^a-zA-Z0-9_-]/g, '_');
  if(!baseId) baseId = 'user_' + Math.random().toString(36).slice(2,8);

  callPeer = new Peer(baseId);

  callPeer.on('open', function(id){
    console.log('[Calls] My peer ID:', id);
    showNotification('📞 Ready', 'Calls enabled. Your ID is: ' + id);
  });

  callPeer.on('error', function(err){
    console.warn('[Calls] Peer error:', err);
  });

  callPeer.on('call', function(call){
    if(activeCall){ call.close(); return; }
    var accept = confirm('📞 Incoming call from ' + call.peer + '.\n\nAccept?');
    if(accept) answerCall(call);
    else call.close();
  });
}

function startCall(video){
  if(!callPeer) initPeer();
  if(activeCall) return;

  var targetId = prompt('Enter the username to call:');
  if(!targetId) return;

  window.navigator.mediaDevices.getUserMedia({ audio: true, video: video })
    .then(function(stream){
      localStream = stream;
      showCallUi(stream, null, video);

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

function answerCall(call){
  window.navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(function(stream){
      localStream = stream;
      call.answer(stream);
      activeCall = call;
      showCallUi(stream, null, true);
      wireCallEvents(call);
    })
    .catch(function(){
      call.close();
    });
}

function wireCallEvents(call){
  call.on('stream', function(remoteStream){
    var remoteVideo = document.getElementById('call-remote-video');
    if(remoteVideo) remoteVideo.srcObject = remoteStream;
  });

  call.on('close', function(){ endCall(); });
  call.on('error', function(err){ console.warn('[Calls] Call error:', err); endCall(); });
}

function showCallUi(localStream, remoteStream, video){
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
        '<div id="call-controls">' +
          '<button id="call-mute"><i class="fas fa-microphone"></i></button>' +
          '<button id="call-video-toggle"><i class="fas fa-video"></i></button>' +
          '<button id="call-end"><i class="fas fa-phone-slash"></i></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(ui);

    document.getElementById('call-end').onclick = endCall;
    document.getElementById('call-mute').onclick = toggleMute;
    document.getElementById('call-video-toggle').onclick = toggleVideo;
  }
  ui.style.display = 'flex';

  var localVideo = document.getElementById('call-local-video');
  var remoteVideo = document.getElementById('call-remote-video');
  if(localVideo) localVideo.srcObject = localStream;
  if(remoteVideo && remoteStream) remoteVideo.srcObject = remoteStream;
  if(remoteVideo && !video) remoteVideo.style.display = 'none';
}

function endCall(){
  if(activeCall){ try { activeCall.close(); } catch(e){} activeCall = null; }
  if(localStream){ localStream.getTracks().forEach(function(t){ t.stop(); }); localStream = null; }
  var ui = document.getElementById('call-overlay');
  if(ui) ui.style.display = 'none';
}

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

window.startVoiceCall = function(){ startCall(false); };
window.startVideoCall = function(){ startCall(true); };

/* Auto-init when the page loads */
window.addEventListener('load', function(){
  setTimeout(initPeer, 2000);
});
