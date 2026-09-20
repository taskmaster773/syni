/* ============================================================
   Desktop icons, folders, drag system
   ============================================================ */

var desktopLayout = [];
try { desktopLayout = JSON.parse(localStorage.getItem('cine_desktop_v2')) || []; } catch(e){ desktopLayout = []; }
window.desktopLayout = desktopLayout;

window.saveDesktop = function(){
  try { localStorage.setItem('cine_desktop_v2', JSON.stringify(desktopLayout)); } catch(e){}
  loadDesktop();
};

window.loadDesktop = function(){
  var c = document.getElementById('desktop-area');
  var ex = document.querySelectorAll('.desktop-app');
  for(var j=0;j<ex.length;j++) ex[j].remove();
  desktopLayout.forEach(function(item, idx){
    var d = document.createElement('div');
    d.className = 'desktop-app';
    d.style.left = item.x + 'px';
    d.style.top  = item.y + 'px';
    d.setAttribute('data-idx', idx);

    if(item.type === 'folder'){
      var gHTML = '<div class="d-folder-grid">';
      var mx = item.apps.slice(0,4);
      mx.forEach(function(a){ if(APPS[a]) gHTML += '<img src="' + APPS[a].icon + '">'; });
      gHTML += '</div>';
      if(!item.hideName) gHTML += '<div class="d-label">' + (item.customName || 'Folder') + '</div>';
      d.innerHTML = gHTML;
      d.onclick = function(ev){
        if(DragSystem.isDragMove) return;
        ev.stopPropagation();
        if(!this.classList.contains('expanded-folder')){ closeAllFolders(); expandFolder(this, item, idx); }
      };
    } else {
      var a = APPS[item.id];
      if(a){
        var iSrc = item.customIcon || a.icon;
        var lbl  = item.customName || a.title;
        var h = '<img src="' + iSrc + '" class="d-icon">';
        if(!item.hideName) h += '<div class="d-label">' + lbl + '</div>';
        d.innerHTML = h;
        d.ondblclick = function(ev){ ev.stopPropagation(); toggleApp(item.id); };
      }
    }
    d.onmousedown = function(ev){ ev.stopPropagation(); if(ev.button === 0) DragSystem.start(ev, d, 'desktop', idx); };
    d.oncontextmenu = function(ev){
      ev.preventDefault(); ev.stopPropagation(); hideAllCtx();
      var m = document.getElementById('app-context-menu');
      if(m){ m.style.display = 'block'; m.style.left = ev.pageX + 'px'; m.style.top = ev.pageY + 'px'; m.setAttribute('data-target-idx', idx); }
    };
    c.appendChild(d);
  });
};

window.expandFolder = function(el, dat, idx){
  el.classList.add('expanded-folder');
  var h = '<div class="folder-header">' + (dat.customName || 'Folder') + ' <i class="fas fa-times" onclick="closeAllFolders(event)"></i></div><div class="folder-grid-expanded">';
  for(var k=0;k<dat.apps.length;k++){
    var aId = dat.apps[k], info = APPS[aId];
    if(info) h += '<div class="f-app" onclick="event.stopPropagation();toggleApp(\'' + aId + '\')"><img src="' + info.icon + '"><span>' + info.title + '</span></div>';
  }
  h += '</div>';
  el.innerHTML = h;
  setTimeout(function(){
    var rect = el.getBoundingClientRect();
    var sibs = document.querySelectorAll('.desktop-app:not(.expanded-folder)');
    for(var s=0;s<sibs.length;s++){
      var sib = sibs[s], sr = sib.getBoundingClientRect();
      if(!(rect.right < sr.left || rect.left > sr.right || rect.bottom < sr.top || rect.top > sr.bottom)){
        var push = (rect.bottom - sr.top) + 20;
        sib.style.transform = 'translateY(' + push + 'px)';
        sib.setAttribute('data-pushed','true');
      }
    }
  }, 50);
};

window.closeAllFolders = function(ev){
  if(ev) ev.stopPropagation();
  var op = document.querySelectorAll('.expanded-folder');
  if(op.length === 0) return;
  for(var i=0;i<op.length;i++) op[i].classList.remove('expanded-folder');
  var push = document.querySelectorAll('.desktop-app[data-pushed="true"]');
  for(var j=0;j<push.length;j++){ push[j].style.transform = ''; push[j].removeAttribute('data-pushed'); }
  setTimeout(loadDesktop, 250);
};

window.setupAppContextMenu = function(){
  var m = document.getElementById('app-context-menu');
  if(!m) return;
  m.innerHTML = '<li class="ctx-item" id="ctx-rename" role="menuitem" tabindex="0"><i class="fas fa-edit fa-fw"></i> Rename</li><li class="ctx-item" id="ctx-hidename" role="menuitem" tabindex="0"><i class="fas fa-eye-slash fa-fw"></i> Toggle Name</li><li class="ctx-item" id="ctx-changeicon" role="menuitem" tabindex="0"><i class="fas fa-image fa-fw"></i> Change Icon</li><li class="ctx-separator" role="separator"></li><li class="ctx-item" id="ctx-delete" role="menuitem" tabindex="0"><i class="fas fa-trash fa-fw"></i> Remove</li>';
  document.getElementById('ctx-rename').onclick = function(){
    var i = m.getAttribute('data-target-idx');
    var nm = prompt("Enter new name:", desktopLayout[i].customName || "");
    if(nm !== null){ desktopLayout[i].customName = nm.trim() === "" ? "App" : nm; saveDesktop(); }
    m.style.display = 'none';
  };
  document.getElementById('ctx-hidename').onclick = function(){
    var i = m.getAttribute('data-target-idx');
    desktopLayout[i].hideName = !desktopLayout[i].hideName; saveDesktop(); m.style.display = 'none';
  };
  document.getElementById('ctx-changeicon').onclick = function(){
    var i = m.getAttribute('data-target-idx');
    var url = prompt("Enter image URL for custom icon:");
    if(url){ desktopLayout[i].customIcon = url; saveDesktop(); }
    m.style.display = 'none';
  };
  document.getElementById('ctx-delete').onclick = function(){
    var i = m.getAttribute('data-target-idx');
    desktopLayout.splice(i, 1); saveDesktop(); m.style.display = 'none';
  };
};

window.DragSystem = {
  dragging:false, startPos:{x:0,y:0}, sourceType:null, sourceEl:null, idx:null, appId:null,
  proxy: document.getElementById('drag-proxy'),
  pImg:  document.getElementById('proxy-img'),
  badge: document.getElementById('folder-badge'),
  isDragMove:false,
  init: function(){
    window.addEventListener('mousemove', function(e){ DragSystem.move(e); });
    window.addEventListener('mouseup',   function(e){ DragSystem.end(e); });
  },
  start: function(e, el, type, id){
    this.startPos = {x:e.clientX, y:e.clientY};
    this.sourceType = type; this.sourceEl = el; this.isDragMove = false;
    if(type === 'drawer' || type === 'dock') this.appId = id;
    else if(type === 'desktop'){ this.idx = id; this.sourceEl.style.opacity = '0.5'; }
  },
  startWinDrag: function(e, id){
    this.startPos = {x:e.clientX, y:e.clientY};
    this.sourceType = 'window'; this.sourceEl = document.getElementById('win-' + id); this.isDragMove = false;
  },
  move: function(e){
    if(!this.sourceEl) return;
    var dx = Math.abs(e.clientX - this.startPos.x), dy = Math.abs(e.clientY - this.startPos.y);
    if(dx > 3 || dy > 3){
      this.dragging = true; this.isDragMove = true;
      if(this.sourceType === 'desktop' || this.sourceType === 'drawer' || this.sourceType === 'dock'){
        if(this.sourceType === 'drawer') toggleAppDrawer();
        this.proxy.style.display = 'block';
        this.proxy.style.left = (e.clientX - 25) + 'px';
        this.proxy.style.top  = (e.clientY - 25) + 'px';
        if(this.sourceType === 'drawer' || this.sourceType === 'dock'){ if(APPS[this.appId]) this.pImg.src = APPS[this.appId].icon; }
        else {
          var itm = desktopLayout[this.idx];
          if(itm.type === 'app'){ if(APPS[itm.id]) this.pImg.src = APPS[itm.id].icon; }
          else { this.pImg.src = ''; this.badge.style.display = 'flex'; this.badge.innerText = itm.apps.length; }
        }
      }
    }
  },
  end: function(e){
    if(!this.sourceEl){ return; }
    if(!this.isDragMove && this.sourceType === 'desktop'){ this.reset(); return; }
    if(!this.dragging){ this.reset(); return; }
    if(this.sourceType === 'desktop' || this.sourceType === 'drawer' || this.sourceType === 'dock'){
      var nx = Math.round((e.clientX - 40) / 90) * 90;
      var ny = Math.round((e.clientY - 40) / 100) * 100;
      if(e.clientY > window.innerHeight - 80){ if(this.sourceType === 'desktop') desktopLayout.splice(this.idx, 1); }
      else {
        var tIdx = -1;
        var aAll = document.querySelectorAll('.desktop-app');
        for(var i=0;i<aAll.length;i++){
          if(aAll[i] !== this.sourceEl){
            var r = aAll[i].getBoundingClientRect();
            if(e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) tIdx = aAll[i].dataset.idx;
          }
        }
        if(tIdx > -1){
          var targ = desktopLayout[tIdx];
          var drp = (this.sourceType === 'drawer' || this.sourceType === 'dock') ? [this.appId] : (desktopLayout[this.idx].type === 'app' ? [desktopLayout[this.idx].id] : desktopLayout[this.idx].apps);
          if(targ.type === 'app'){ targ.type = 'folder'; targ.apps = [targ.id].concat(drp); delete targ.id; }
          else { targ.apps.push.apply(targ.apps, drp); }
          if(this.sourceType === 'desktop') desktopLayout.splice(this.idx, 1);
        } else {
          if(this.sourceType === 'drawer' || this.sourceType === 'dock') desktopLayout.push({type:'app', id:this.appId, x:nx, y:ny});
          else { desktopLayout[this.idx].x = nx; desktopLayout[this.idx].y = ny; }
        }
      }
      saveDesktop();
    }
    this.reset();
  },
  reset: function(){
    this.dragging = false;
    if(this.sourceEl) this.sourceEl.style.opacity = '1';
    this.sourceEl = null;
    this.proxy.style.display = 'none';
    this.badge.style.display = 'none';
  }
};
DragSystem.init();

window.toggleDesktopSize = function(l){
  if(l) document.getElementById('desktop-area').classList.add('desktop-large-mode');
  else  document.getElementById('desktop-area').classList.remove('desktop-large-mode');
  document.getElementById('desktop-context-menu').style.display = 'none';
};

// Global right-click
document.oncontextmenu = function(e){
  if(e.target.closest('iframe')) return true;
  e.preventDefault();
  var m = document.getElementById('desktop-context-menu');
  if(m){ m.style.display='block'; m.style.left=e.pageX+'px'; m.style.top=e.pageY+'px'; }
};
