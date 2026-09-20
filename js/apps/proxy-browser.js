/* ---------- PROXY BROWSER ---------- */
function getProxyBrowserHTML(){
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Proxy Browser</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
    *{margin:0;padding:0;box-sizing:border-box;font-family:'Segoe UI',system-ui,-apple-system,sans-serif;}
  html,body{
    height:100%;
    width:100%;            /* 👈 ensure full width */
    background:#0a0a0a;
    color:#fff;
    overflow:hidden;
    display:flex;          /* 👈 body is now a column flex container */
    flex-direction:column;
  }

  /* ---- TOP TOOLBAR ---- */
  .toolbar{
    display:flex;align-items:center;gap:8px;
    padding:10px 14px;background:#111;
    border-bottom:1px solid #222;
    flex-shrink:0;
  }
  .nav-btn{
    background:#1a1a1a;border:1px solid #2a2a2a;color:#ccc;
    width:36px;height:36px;border-radius:8px;cursor:pointer;
    display:flex;align-items:center;justify-content:center;
    font-size:14px;transition:.15s;flex-shrink:0;
  }
  .nav-btn:hover{background:#2a2a2a;color:#fff;border-color:#444;}
  .nav-btn:active{transform:scale(.94);}
  .nav-btn:disabled{opacity:.35;cursor:not-allowed;}

  .url-display{
    flex:1;display:flex;align-items:center;gap:8px;
    background:#0d0d0d;border:1px solid #2a2a2a;border-radius:10px;
    padding:0 14px;height:38px;overflow:hidden;
    min-width:0;           /* 👈 allows it to shrink properly */
  }
  .url-display i{color:#555;font-size:13px;flex-shrink:0;}
  .url-display span{
    color:#888;font-size:13px;white-space:nowrap;
    overflow:hidden;text-overflow:ellipsis;
  }

  /* ---- STATUS BAR ---- */
  .status{
    display:flex;align-items:center;gap:10px;
    padding:6px 16px;background:#0d0d0d;
    border-bottom:1px solid #1a1a1a;
    font-size:11px;color:#666;flex-shrink:0;
    height:26px;
  }
  .status-dot{
    width:6px;height:6px;border-radius:50%;background:#44ff88;
    animation:pulse 2s infinite;
  }
  .status-dot.loading{background:#ffd54f;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}

  /* ---- MAIN (sidebar + viewport) ---- */
  .main{
    flex:1;                 /* 👈 fill remaining space */
    display:flex;
    overflow:hidden;
    min-height:0;           /* 👈 critical */
  }

  /* ---- SIDEBAR ---- */
  .sidebar{
    width:220px;flex-shrink:0;background:#0d0d0d;
    border-right:1px solid #1a1a1a;overflow-y:auto;
    padding:12px 8px;
  }
  .sidebar::-webkit-scrollbar{width:6px;}
  .sidebar::-webkit-scrollbar-thumb{background:#222;border-radius:3px;}
  .sidebar-title{
    font-size:10px;color:#555;text-transform:uppercase;
    letter-spacing:1.5px;font-weight:700;
    padding:8px 10px 6px 10px;
  }
  .link-item{
    display:flex;align-items:center;gap:10px;
    padding:9px 10px;border-radius:8px;cursor:pointer;
    transition:.12s;color:#ccc;font-size:13px;
  }
  .link-item:hover{background:#1a1a1a;color:#fff;}
  .link-item.active{background:#1a2a3a;color:#4fc3f7;}
  .link-item i{width:16px;text-align:center;font-size:13px;color:#666;flex-shrink:0;}
  .link-item:hover i, .link-item.active i{color:inherit;}

  /* ---- VIEWPORT ---- */
  .viewport{
    flex:1;                 /* 👈 fill remaining horizontal space */
    position:relative;
    background:#000;
    overflow:hidden;
    min-width:0;
    display:flex;           /* 👈 allow iframe to stretch */
    flex-direction:column;
  }
  .viewport iframe{
    flex:1;                 /* 👈 fill viewport */
    width:100%;
    border:none;background:#fff;
    display:block;
    min-height:0;
  }

  /* ---- WELCOME ---- */
  .welcome{
    position:absolute;inset:0;display:flex;
    flex-direction:column;align-items:center;justify-content:center;
    padding:40px;text-align:center;
    background:radial-gradient(circle at center,#1a1a1a 0%,#0a0a0a 70%);
    z-index:5;
  }
  .welcome.hidden{display:none;}
  .welcome i.big{font-size:56px;color:#4fc3f7;margin-bottom:18px;opacity:.85;}
  .welcome h1{font-size:24px;font-weight:800;letter-spacing:-.5px;margin-bottom:8px;}
  .welcome p{color:#888;font-size:13px;max-width:420px;line-height:1.6;}

  /* ---- LOADING BAR ---- */
  .loading-bar{
    position:absolute;top:0;left:0;height:2px;
    background:#4fc3f7;width:0%;transition:width .3s ease;
    z-index:10;pointer-events:none;
  }
  .loading-bar.active{width:80%;}
  .loading-bar.done{width:100%;opacity:0;transition:width .2s,opacity .3s .2s;}
</style>
</head>
<body>

<div class="toolbar">
  <button class="nav-btn" id="btnBack" title="Back" disabled><i class="fas fa-arrow-left"></i></button>
  <button class="nav-btn" id="btnFwd" title="Forward" disabled><i class="fas fa-arrow-right"></i></button>
  <button class="nav-btn" id="btnReload" title="Reload"><i class="fas fa-rotate-right"></i></button>
  <button class="nav-btn" id="btnHome" title="Home"><i class="fas fa-house"></i></button>

  <div class="url-display">
    <i class="fas fa-shield-halved"></i>
    <span id="urlText">No page loaded — pick a shortcut from the sidebar</span>
  </div>
</div>

<div class="status">
  <span class="status-dot" id="statusDot"></span>
  <span id="statusText">Ready</span>
</div>

<div class="main">
  <aside class="sidebar" id="sidebar">
    <!-- populated by JS -->
  </aside>

  <div class="viewport">
    <div class="loading-bar" id="loadingBar"></div>
    <div class="welcome" id="welcome">
      <i class="fas fa-shield-halved big"></i>
      <h1>Proxy Browser</h1>
      <p>Select a premade shortcut from the sidebar to load it through a proxy. If one doesn't work, try another — proxy availability changes often.</p>
    </div>
    <iframe id="proxyFrame" sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-pointer-lock allow-top-navigation allow-downloads"></iframe>
  </div>
</div>

<script>
  /* ============================================================
     PREMADE LINKS — edit this list to add/remove shortcuts.
     Each item: { name, url, icon }
     The url is the EXACT link you want the iframe to load.
     ============================================================ */
  var PROXY_LINKS = [
    // --- TikTok ---
    { name:'TikTok',      url:'https://208.87.242.51/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9La3R1STRueW55V3VzcU0rd3ZDTFNvOTVIZGlXZXljQ1dsTkNybzcvbXhyMlJSM3dSekdDTmNta3RENkNXZG5aZ2EzejJFNXpGTXZqTXdUNmtFUG1hanc9&r=aHR0cHM6Ly8yMDguODcuMjQyLjUxLz9fX2Nwbz1hSFIwY0hNNkx5OTNkM2N1ZEdscmRHOXJMbU52YlE%3D&__cpo=1', icon:'fab fa-tiktok' },
    { name:'YouTube',   url:'https://108.181.11.173/?__cpo=aHR0cHM6Ly93d3cueW91dHViZS5jb20', icon:'fab fa-youtube' },
    { name:'Duck Duck Go',    url:'https://208.87.240.35/__cpi.php?s=UkQ2YXlSaWJuc3ZoeGR2dG04WW9LcUVqblhTMHczNXlUYWRhV0x0RUxqVkxvTzJEV0pLTmJxNnhXMGg1RGQwZU1jS29HMEUwcGdlT3pubmRkWDNicG1DaHBlTHBQY1hjb2JHb0YybkMxQUU9&r=aHR0cHM6Ly8yMDguODcuMjQwLjM1Lz9rbz1zJl9fY3BvPWFIUjBjSE02THk5emRHRnlkQzVrZFdOclpIVmphMmR2TG1OdmJR&__cpo=1', icon:'fab fa-google'  },

    // --- Add your other premade proxied links below ---
    // { name:'YouTube',   url:'https://108.181.11.173/?__cpo=aHR0cHM6Ly93d3cueW91dHViZS5jb20', icon:'fab fa-youtube' },
    // { name:'Duck Duck Go',    url:'https://208.87.240.35/?ko=s&__cpo=aHR0cHM6Ly9zdGFydC5kdWNrZHVja2dvLmNvbQ', icon:'fab fa-google'  },
    // { name:'Reddit',    url:'https://...', icon:'fab fa-reddit'  },
  ];

  var frame       = document.getElementById('proxyFrame');
  var sidebar     = document.getElementById('sidebar');
  var welcome     = document.getElementById('welcome');
  var urlText     = document.getElementById('urlText');
  var statusDot   = document.getElementById('statusDot');
  var statusText  = document.getElementById('statusText');
  var loadingBar  = document.getElementById('loadingBar');

  var history_    = [];
  var historyIdx  = -1;
  var currentName = '';

  function setStatus(text, type){
    statusText.textContent = text;
    statusDot.className = 'status-dot' + (type ? ' ' + type : '');
  }

  /* ---- Build sidebar ---- */
  function renderSidebar(){
    sidebar.innerHTML = '<div class="sidebar-title">Shortcuts</div>';
    PROXY_LINKS.forEach(function(item, idx){
      var el = document.createElement('div');
      el.className = 'link-item';
      el.dataset.idx = idx;
      el.innerHTML = '<i class="' + item.icon + '"></i><span>' + item.name + '</span>';
      el.addEventListener('click', function(){ loadLink(idx, true); });
      sidebar.appendChild(el);
    });
  }

  /* ---- Load a premade link into the iframe ---- */
  function loadLink(idx, pushHistory){
    var item = PROXY_LINKS[idx];
    if(!item) return;

    welcome.classList.add('hidden');
    urlText.textContent = item.name + '  —  ' + item.url;
    currentName = item.name;

    setStatus('Loading ' + item.name + '…', 'loading');
    loadingBar.className = 'loading-bar active';

    // Clear old src first so the browser doesn't cache a stale load
    frame.src = 'about:blank';
    setTimeout(function(){
      try { frame.src = item.url; } catch(e){}
    }, 30);

    // Highlight active link
    document.querySelectorAll('.link-item').forEach(function(el){
      el.classList.toggle('active', parseInt(el.dataset.idx) === idx);
    });

    if(pushHistory !== false){
      history_ = history_.slice(0, historyIdx + 1);
      history_.push(idx);
      historyIdx = history_.length - 1;
    }
    updateNavButtons();
  }

  function updateNavButtons(){
    document.getElementById('btnBack').disabled = historyIdx <= 0;
    document.getElementById('btnFwd').disabled  = historyIdx >= history_.length - 1;
  }

  function goHome(){
    welcome.classList.remove('hidden');
    frame.src = 'about:blank';
    urlText.textContent = 'No page loaded — pick a shortcut from the sidebar';
    currentName = '';
    setStatus('Ready');
    loadingBar.className = 'loading-bar';
    document.querySelectorAll('.link-item').forEach(function(el){
      el.classList.remove('active');
    });
  }

  /* ---- Frame load events ---- */
  frame.addEventListener('load', function(){
    if(frame.src === 'about:blank') return;
    setStatus('Loaded — ' + (currentName || 'page'), '');
    loadingBar.className = 'loading-bar done';
    setTimeout(function(){ loadingBar.className = 'loading-bar'; }, 500);
  });

  frame.addEventListener('error', function(){
    setStatus('Failed to load — try another shortcut', '');
  });

  /* ---- Toolbar buttons ---- */
  document.getElementById('btnBack').addEventListener('click', function(){
    if(historyIdx > 0){ historyIdx--; loadLink(history_[historyIdx], false); }
  });
  document.getElementById('btnFwd').addEventListener('click', function(){
    if(historyIdx < history_.length - 1){ historyIdx++; loadLink(history_[historyIdx], false); }
  });
  document.getElementById('btnReload').addEventListener('click', function(){
    if(historyIdx >= 0) loadLink(history_[historyIdx], false);
  });
  document.getElementById('btnHome').addEventListener('click', goHome);

  /* ---- Init ---- */
  renderSidebar();
  updateNavButtons();
<\/script>
</body>
</html>`;
}
