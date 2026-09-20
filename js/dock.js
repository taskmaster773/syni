/* ============================================================
   Dock, start menu, app drawer, pins
   ============================================================ */

window.renderUI = function(){
  var dock = document.getElementById('dock-container');
  var dHTML = '<div class="dock-item" onclick="toggleStartMenu()"><img src="https://missionsupport.archden.org/wp-content/uploads/2022/02/windows11-icon.png"></div><div class="dock-sep"></div><div class="dock-item" onclick="toggleAppDrawer()"><svg width="24" height="24" viewBox="0 0 24 24" fill="#aaa"><path d="M4 4h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 10h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4zM4 16h4v4H4zm6 0h4v4h-4zm6 0h4v4h-4z"/></svg></div><div class="dock-sep"></div>';
  var pGrid = document.getElementById('pinned-grid');
  var pHTML = '';
  for(var id in APPS){
    if(APPS[id].pinned){
      dHTML += '<div class="dock-item" data-id="' + id + '" onmousedown="DragSystem.start(event,this,\'dock\',\'' + id + '\')" onclick="toggleApp(\'' + id + '\')" oncontextmenu="openDockCtx(event,\'' + id + '\')"><img src="' + APPS[id].icon + '"></div>';
      pHTML += '<div class="pinned-item" onclick="toggleApp(\'' + id + '\')"><img src="' + APPS[id].icon + '"><span>' + APPS[id].title + '</span></div>';
    }
  }
  if(dock) dock.innerHTML = dHTML;
  if(pGrid) pGrid.innerHTML = pHTML;
  populateDrawer();
};

window.populateDrawer = function(){
  var g = document.getElementById('drawer-grid');
  if(!g) return;
  g.innerHTML = '';
  for(var key in APPS){
    var a = APPS[key];
    var d = document.createElement('div');
    d.className = 'drawer-item';
    d.dataset.id = key;
    d.innerHTML = '<img src="' + a.icon + '" style="pointer-events:none;"><span>' + a.title + '</span>';
    d.onmousedown = function(e){ DragSystem.start(e, this, 'drawer', this.dataset.id); };
    d.onclick     = function(e){ if(!DragSystem.isDragMove){ toggleApp(this.dataset.id); toggleAppDrawer(); } };
    d.oncontextmenu = function(e){ openDrawerCtx(e, this.dataset.id); };
    g.appendChild(d);
  }
};

window.filterDrawer = function(val){
  var items = document.querySelectorAll('.drawer-item');
  var q = val.toLowerCase();
  for(var i=0;i<items.length;i++){
    items[i].style.display = items[i].innerText.toLowerCase().includes(q) ? 'flex' : 'none';
  }
};

window.toggleAppDrawer = function(){
  var d = document.getElementById('app-drawer');
  if(!d) return;
  if(d.classList.contains('open')){ d.classList.remove('open'); setTimeout(function(){ d.style.display='none'; }, 300); }
  else { d.style.display = 'block'; setTimeout(function(){ d.classList.add('open'); }, 10); }
};

window.openDockCtx = function(e, id){
  e.preventDefault(); e.stopPropagation(); hideAllCtx(); activeCtxId = id;
  var m = document.getElementById('dock-ctx-menu');
  if(m){ m.style.display = 'block'; m.style.left = e.pageX + 'px'; m.style.top = e.pageY + 'px'; }
};

window.openDrawerCtx = function(e, id){
  e.preventDefault(); e.stopPropagation(); hideAllCtx(); activeCtxId = id;
  var m = document.getElementById('drawer-ctx-menu');
  if(m){ m.style.display = 'block'; m.style.left = e.pageX + 'px'; m.style.top = e.pageY + 'px'; }
};

document.getElementById('ctx-pin-app').onclick = function(){
  if(activeCtxId && APPS[activeCtxId]){ APPS[activeCtxId].pinned = true; syncPins(); renderUI(); }
  hideAllCtx();
};
document.getElementById('ctx-unpin-app').onclick = function(){
  if(activeCtxId && APPS[activeCtxId]){ APPS[activeCtxId].pinned = false; syncPins(); renderUI(); }
  hideAllCtx();
};

window.hideAllCtx = function(){
  var menus = ['app-context-menu','desktop-context-menu','drawer-ctx-menu','dock-ctx-menu'];
  for(var i=0;i<menus.length;i++){ var m = document.getElementById(menus[i]); if(m) m.style.display = 'none'; }
};
document.addEventListener('click', hideAllCtx);

window.toggleStartMenu = function(){
  var sm = document.getElementById('start-menu');
  if(!sm) return;
  if(sm.classList.contains('open')){ sm.classList.remove('open'); setTimeout(function(){ sm.style.display='none'; }, 300); }
  else { sm.style.display = 'flex'; setTimeout(function(){ sm.classList.add('open'); }, 10); }
};
document.addEventListener('click', function(e){
  var sm = document.getElementById('start-menu');
  if(sm && !sm.contains(e.target) && !e.target.closest('.dock-item')){
    sm.classList.remove('open'); setTimeout(function(){ sm.style.display='none'; }, 300);
  }
});
