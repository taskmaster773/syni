/* ============================================================
   Notifications (bell dropdown + toasts)
   ============================================================ */

var notiData = [];
window.notiData = notiData;

window.renderNoti = function(){
  var list = document.getElementById('noti-list');
  if(!list) return;
  if(notiData.length === 0){ list.innerHTML = '<div class="noti-empty">No notifications</div>'; return; }
  var html = '';
  for(var i=0;i<notiData.length;i++){
    var n = notiData[i];
    html += '<div class="noti-item"><strong>' + n.title + '</strong>' + n.msg + '<br><span>' + n.time + '</span></div>';
  }
  list.innerHTML = html;
};

window.addNoti = function(title, msg){
  notiData.push({title:title, msg:msg, time:new Date().toLocaleTimeString()});
  if(notiData.length > 20) notiData.shift();
  renderNoti();
  var dot = document.getElementById('noti-dot');
  if(dot) dot.classList.add('show');
};

window.toggleNoti = function(){
  var d = document.getElementById('noti-dropdown');
  if(!d) return;
  if(d.classList.contains('open')) d.classList.remove('open');
  else { d.classList.add('open'); var dot = document.getElementById('noti-dot'); if(dot) dot.classList.remove('show'); }
};

document.addEventListener('click', function(e){
  var bell = document.getElementById('noti-bell');
  var drop = document.getElementById('noti-dropdown');
  if(!bell || !drop) return;
  if(!bell.contains(e.target) && !drop.contains(e.target)) drop.classList.remove('open');
});

window.showNotification = function(title, msg){
  var c = document.getElementById('toast-container');
  if(!c) return;
  var t = document.createElement('div');
  t.className = 'toast-notification';
  t.innerHTML = '<div class="toast-header"><div class="toast-app-info"><div class="toast-icon"><i class="fas fa-bell"></i></div><span>System</span></div><i class="fas fa-times toast-close"></i></div><div class="toast-title">' + title + '</div><div class="toast-body">' + msg + '</div>';
  c.appendChild(t);
  setTimeout(function(){ t.classList.add('show'); }, 100);
  t.onclick = function(){ t.classList.remove('show'); setTimeout(function(){ t.remove(); }, 400); };
  setTimeout(t.onclick, 6000);
};
