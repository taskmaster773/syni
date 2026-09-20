/* ============================================================
   Wallpaper system
   ============================================================ */

var WP_LIST = [
  {id:'wp1',  name:'King Of Darkness',        url:'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/king-of-darkness.3840x2160.mp4'},
  {id:'wp2',  name:'Snow Fox',                url:'https://cdn.jsdelivr.net/gh/nathanpikelny6-oss/CineOS@main/Videos/SnowFox.mp4'},
  {id:'wp3',  name:'Dark King',               url:'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/dark-king-abyss.3840x2160.mp4'},
  {id:'wp4',  name:'Celestial Veil',          url:'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/celestial-veil.3840x2160%20(1).mp4'},
  {id:'wp5',  name:'Minecraft Northern Light',url:'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/minecraft-northern-light.3840x2160.mp4'},
  {id:'wp6',  name:'Code Error',              url:'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/prana-system-error.1920x1080.mp4'},
  {id:'wp7',  name:'Minecraft 01',            url:'https://cdn.jsdelivr.net/gh/nathanpikelny6-oss/CineOS@main/Videos/Minecraft01.mp4'},
  {id:'wp8',  name:'Minecraft 02',            url:'https://cdn.jsdelivr.net/gh/nathanpikelny6-oss/CineOS@main/Videos/Minecraft02.mp4'},
  {id:'wp9',  name:'Minecraft 03',            url:'https://cdn.jsdelivr.net/gh/nathanpikelny6-oss/CineOS@main/Videos/Minecraft03.mp4'},
  {id:'wp10', name:'Minecraft 04',            url:'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/pc-minecraft-live-wallpaper-free.mp4'},
  {id:'wp11', name:'Minecraft 05',            url:'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/94a519003525a033ab66eec31901c7cf.mp4'},
  {id:'wp12', name:'Minecraft 06',            url:'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/f07b883e34a5865d4c9b5e4ca47d65c2.mp4'}
];

var wpCurrentIndex = 0;

window.applyMediaToElements = function(url, vidEl, imgEl){
  if(!url) return;
  if(url.startsWith('Videos/')) url = 'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/' + url;
  var isVideo = /\.(mp4|mov|webm|avi)(\?|$)/i.test(url);
  if(isVideo){
    imgEl.style.display = 'none';
    vidEl.style.display = 'block';
    vidEl.muted = true; vidEl.loop = true; vidEl.playsInline = true;
    vidEl.src = url; vidEl.load();
    vidEl.play().catch(function(){});
  } else {
    vidEl.style.display = 'none';
    imgEl.style.display = 'block';
    imgEl.src = url;
    imgEl.style.objectFit = 'cover';
  }
};

window.wpApply = function(index){
  if(index < 0) index = WP_LIST.length - 1;
  if(index >= WP_LIST.length) index = 0;
  wpCurrentIndex = index;
  var wp = WP_LIST[index];
  applyMediaToElements(wp.url, document.getElementById('bg-video'),   document.getElementById('bg-img'));
  applyMediaToElements(wp.url, document.getElementById('lock-video'), document.getElementById('lock-img'));
  document.getElementById('lock-screen').style.backgroundImage = 'url(' + wp.url + ')';
  sysConfig.homeWallpaper = wp.id;
  sysConfig.lockWallpaper = wp.id;
  updateSysSetting('homeWallpaper', wp.id);
  updateSysSetting('lockWallpaper', wp.id);
  wpUpdateCounter();
};
window.wpNext = function(){ wpApply(wpCurrentIndex + 1); };
window.wpPrev = function(){ wpApply(wpCurrentIndex - 1); };
window.wpUpdateCounter = function(){
  var el = document.getElementById('wp-counter');
  if(el) el.textContent = (wpCurrentIndex + 1) + ' / ' + WP_LIST.length;
};
window.wpOpenMenu = function(){
  wpMenuOpen = true;
  var menu = document.getElementById('wp-menu');
  if(!menu) return;
  if(menu.showModal) menu.showModal(); else menu.style.display = 'flex';
  menu.classList.add('open');
  wpRenderGrid();
};
window.wpCloseMenu = function(){
  wpMenuOpen = false;
  var menu = document.getElementById('wp-menu');
  if(!menu) return;
  menu.classList.remove('open');
  menu.style.display = 'none';
  if(menu.close) menu.close();
};
window.wpRenderGrid = function(){
  var grid = document.getElementById('wp-grid');
  if(!grid) return;
  grid.innerHTML = '';
  WP_LIST.forEach(function(wp, index){
    var card = document.createElement('div');
    card.className = 'wp-card';
    if(index === wpCurrentIndex) card.classList.add('active-wp');
    var isVideo = /\.(mp4|mov|webm|avi)(\?|$)/i.test(wp.url);
    var mediaHtml = isVideo
      ? '<video src="' + wp.url + '" preload="auto" playsinline muted loop onmouseover="this.play()" onmouseout="this.pause()"></video>'
      : '<img src="' + wp.url + '" alt="' + wp.name + '">';
    card.innerHTML = mediaHtml + '<div class="wp-info">' + wp.name + '</div>';
    card.onclick = function(){ wpApply(index); wpRenderGrid(); };
    grid.appendChild(card);
  });
};

// Keyboard shortcuts
document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowUp'    && !wpMenuOpen){ e.preventDefault(); wpOpenMenu(); }
  else if(e.key === 'ArrowDown'  && wpMenuOpen){ e.preventDefault(); wpCloseMenu(); }
  else if(e.key === 'ArrowRight' && !wpMenuOpen){ e.preventDefault(); wpNext(); }
  else if(e.key === 'ArrowLeft'  && !wpMenuOpen){ e.preventDefault(); wpPrev(); }
  else if(e.key === 'Escape'     && wpMenuOpen){ e.preventDefault(); wpCloseMenu(); }
});
