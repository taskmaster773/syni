/* ---------- APP STORE (iPhone-style, fake install flow) ---------- */
function getPS5EmuHTML(){
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>App Store</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
<style>
:root{
  --bg:#000;
  --card:#1c1c1e;
  --card-hover:#2c2c2e;
  --text:#ffffff;
  --muted:#8e8e93;
  --muted-2:#636366;
  --blue:#0a84ff;
  --blue-hover:#409cff;
  --green:#30d158;
  --border:#2c2c2e;
  --sep:#1c1c1e;
}
*{margin:0;padding:0;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',system-ui,sans-serif;user-select:none;-webkit-font-smoothing:antialiased;}
body{background:#000;color:var(--text);height:100vh;overflow:hidden;display:flex;flex-direction:column;}

/* ============ TOP BAR (iOS style) ============ */
.top-bar{
  height:56px;display:flex;align-items:center;justify-content:space-between;
  padding:0 20px;flex-shrink:0;
  background:rgba(0,0,0,.75);backdrop-filter:blur(30px) saturate(180%);
  -webkit-backdrop-filter:blur(30px) saturate(180%);
  border-bottom:.5px solid rgba(255,255,255,.08);
  z-index:20;
}
.logo{display:flex;align-items:center;gap:10px;font-size:17px;font-weight:700;letter-spacing:-.4px;}
.logo i{font-size:22px;color:#fff;}
.tabs{display:flex;gap:4px;background:rgba(118,118,128,.24);border-radius:9px;padding:2px;}
.tab{padding:6px 16px;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer;color:#fff;transition:.2s;letter-spacing:-.2px;}
.tab.active{background:#636366;}
.search-box{
  display:flex;align-items:center;gap:8px;
  background:rgba(118,118,128,.24);border-radius:10px;
  padding:7px 12px;width:220px;transition:.2s;
}
.search-box:focus-within{background:rgba(118,118,128,.32);}
.search-box i{color:var(--muted);font-size:13px;}
.search-box input{background:transparent;border:none;color:#fff;outline:none;font-size:14px;width:100%;letter-spacing:-.2px;}
.search-box input::placeholder{color:var(--muted);}

/* ============ CONTENT ============ */
.content{flex:1;overflow-y:auto;padding:20px 0 100px;position:relative;scroll-behavior:smooth;}
.content::-webkit-scrollbar{width:0;}

/* Section with header */
.ios-section{margin-bottom:28px;}
.ios-header{
  display:flex;align-items:flex-end;justify-content:space-between;
  padding:0 20px;margin-bottom:12px;
}
.ios-title{font-size:22px;font-weight:800;letter-spacing:-.6px;}
.ios-title-sm{font-size:13px;font-weight:600;color:var(--muted);letter-spacing:-.1px;text-transform:uppercase;margin-bottom:4px;}
.ios-sub{font-size:13px;color:var(--muted);letter-spacing:-.2px;margin-top:2px;}
.see-all{font-size:15px;color:var(--blue);font-weight:500;cursor:pointer;letter-spacing:-.2px;}
.see-all:hover{opacity:.7;}

/* ============ TODAY-STYLE HERO CARD ============ */
.today-card{
  margin:0 20px 24px;border-radius:22px;overflow:hidden;
  position:relative;min-height:380px;cursor:pointer;
  transition:transform .3s cubic-bezier(.2,.8,.2,1);
  background:#000;
  box-shadow:0 8px 30px rgba(0,0,0,.6);
}
.today-card:hover{transform:scale(1.01);}
.today-card .bg{
  position:absolute;inset:0;
  background-size:cover;background-position:center;
  filter:brightness(.55);
}
.today-card .gradient{
  position:absolute;inset:0;
  background:linear-gradient(180deg,rgba(0,0,0,0) 30%,rgba(0,0,0,.85) 100%);
}
.today-card .body{
  position:absolute;left:0;right:0;bottom:0;
  padding:28px 26px;z-index:2;
}
.today-tag{
  display:inline-block;font-size:11px;font-weight:700;
  letter-spacing:1.2px;text-transform:uppercase;
  color:#fff;opacity:.75;margin-bottom:12px;
}
.today-title{font-size:40px;font-weight:900;line-height:1.05;letter-spacing:-1.4px;margin-bottom:10px;text-shadow:0 2px 12px rgba(0,0,0,.6);}
.today-desc{font-size:15px;line-height:1.4;color:rgba(255,255,255,.85);max-width:520px;letter-spacing:-.2px;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}

/* ============ HORIZONTAL APP CARDS (iOS style) ============ */
.h-scroll{
  display:flex;gap:14px;overflow-x:auto;
  padding:4px 20px 12px;scroll-snap-type:x mandatory;
  scrollbar-width:none;
}
.h-scroll::-webkit-scrollbar{display:none;}

.mini-card{
  flex:0 0 152px;width:152px;
  background:transparent;cursor:pointer;
  scroll-snap-align:start;
  display:flex;flex-direction:column;gap:10px;
  transition:opacity .2s;
}
.mini-card:hover{opacity:.85;}
.mini-icon{
  width:152px;height:152px;border-radius:32px;
  overflow:hidden;background:#1c1c1e;
  box-shadow:0 4px 18px rgba(0,0,0,.55);
  position:relative;
}
.mini-icon img{width:100%;height:100%;object-fit:cover;display:block;}
.mini-meta{padding:0 2px;}
.mini-name{font-size:15px;font-weight:600;letter-spacing:-.3px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.mini-cat{font-size:13px;color:var(--muted);letter-spacing:-.2px;margin-top:2px;}

/* ============ LARGE APP CARDS (iOS row layout) ============ */
.big-list{display:flex;flex-direction:column;padding:0 20px;}
.big-row{
  display:flex;align-items:center;gap:14px;
  padding:12px 0;cursor:pointer;
  border-bottom:.5px solid rgba(255,255,255,.08);
  transition:background .15s;
}
.big-row:last-child{border-bottom:none;}
.big-row:hover{background:rgba(255,255,255,.03);}
.big-icon{
  width:64px;height:64px;border-radius:14px;
  overflow:hidden;background:#1c1c1e;flex-shrink:0;
  box-shadow:0 2px 8px rgba(0,0,0,.5);
}
.big-icon img{width:100%;height:100%;object-fit:cover;display:block;}
.big-info{flex:1;min-width:0;}
.big-name{font-size:17px;font-weight:600;letter-spacing:-.4px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.big-cat{font-size:13px;color:var(--muted);letter-spacing:-.2px;margin-top:3px;}
.big-stats{display:flex;gap:8px;align-items:center;margin-top:4px;font-size:11px;color:var(--muted-2);}
.big-stats .stars{color:#ffd60a;letter-spacing:-1px;}

/* ============ GET BUTTON (iOS pill) ============ */
.get-pill{
  background:rgba(118,118,128,.32);
  color:var(--blue);
  border:none;
  font-size:14px;font-weight:700;letter-spacing:-.2px;
  border-radius:16px;padding:6px 20px;
  cursor:pointer;transition:all .15s;
  min-width:66px;text-align:center;flex-shrink:0;
}
.get-pill:hover{background:rgba(118,118,128,.44);}
.get-pill:active{transform:scale(.94);}
.get-pill.installed{
  background:transparent;
  color:var(--green);
  font-weight:600;
}
.get-pill.installed:hover{background:rgba(48,209,88,.15);}
.get-pill.open-pill{
  background:rgba(10,132,255,.18);
  color:var(--blue);
  font-weight:700;
}

/* ============ SEARCH RESULTS ============ */
.search-header{padding:0 20px;margin-bottom:16px;}
.search-header h2{font-size:22px;font-weight:800;letter-spacing:-.6px;}
.search-header span{font-size:13px;color:var(--muted);display:block;margin-top:4px;letter-spacing:-.2px;}

/* ============ DETAIL PAGE ============ */
.detail{
  display:none;flex-direction:column;gap:0;
  padding:0 0 60px;
  animation:slideUp .4s cubic-bezier(.2,.8,.2,1);
}
.detail.active{display:flex;}
@keyframes slideUp{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}

.detail-back{
  background:none;border:none;color:var(--blue);
  font-size:16px;font-weight:500;letter-spacing:-.2px;
  padding:8px 20px;cursor:pointer;align-self:flex-start;
  display:inline-flex;align-items:center;gap:6px;
}
.detail-back i{font-size:14px;}
.detail-back:hover{opacity:.7;}

.detail-hero{
  display:flex;gap:20px;align-items:flex-start;
  padding:12px 20px 24px;
  border-bottom:.5px solid rgba(255,255,255,.08);
}
.detail-icon{
  width:118px;height:118px;border-radius:26px;
  overflow:hidden;background:#1c1c1e;flex-shrink:0;
  box-shadow:0 8px 24px rgba(0,0,0,.6);
}
.detail-icon img{width:100%;height:100%;object-fit:cover;display:block;}
.detail-info{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:flex-end;}
.detail-name{font-size:26px;font-weight:800;line-height:1.15;letter-spacing:-.8px;margin-bottom:4px;}
.detail-cat{font-size:13px;color:var(--muted);letter-spacing:-.1px;text-transform:uppercase;font-weight:600;margin-bottom:14px;}
.detail-actions{display:flex;gap:10px;align-items:center;}
.detail-get{
  background:var(--blue);color:#fff;
  border:none;border-radius:18px;
  padding:10px 32px;
  font-size:15px;font-weight:700;letter-spacing:-.2px;
  cursor:pointer;transition:.15s;
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  min-width:110px;
}
.detail-get:hover{background:var(--blue-hover);}
.detail-get:active{transform:scale(.96);}
.detail-get.installed{background:rgba(48,209,88,.2);color:var(--green);}
.detail-get.installed:hover{background:rgba(48,209,88,.3);}

.detail-uninstall{
  background:transparent;
  color:#ff453a;
  border:1px solid rgba(255,69,58,.4);
  border-radius:18px;
  padding:10px 22px;
  font-size:15px;font-weight:600;letter-spacing:-.2px;
  cursor:pointer;transition:.15s;
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
}
.detail-uninstall:hover{background:rgba(255,69,58,.15);border-color:#ff453a;}
.detail-uninstall:active{transform:scale(.96);}

/* Stats row (like iOS) */
.stats-row{
  display:grid;grid-template-columns:repeat(3,1fr);
  padding:20px;border-bottom:.5px solid rgba(255,255,255,.08);
  text-align:center;
}
.stat-cell{border-right:.5px solid rgba(255,255,255,.08);}
.stat-cell:last-child{border-right:none;}
.stat-l{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.8px;font-weight:600;margin-bottom:6px;}
.stat-v{font-size:20px;font-weight:700;letter-spacing:-.4px;}
.stat-v.rating{color:#ffd60a;}

/* Screenshots */
.shots-row{
  display:flex;gap:12px;overflow-x:auto;
  padding:20px;scroll-snap-type:x mandatory;
  scrollbar-width:none;border-bottom:.5px solid rgba(255,255,255,.08);
}
.shots-row::-webkit-scrollbar{display:none;}
.shot-item{
  flex:0 0 260px;height:460px;border-radius:20px;
  overflow:hidden;background:#1c1c1e;
  scroll-snap-align:start;
  box-shadow:0 4px 20px rgba(0,0,0,.5);
}
.shot-item img{width:100%;height:100%;object-fit:cover;display:block;}

/* Description */
.desc-section{padding:22px 20px;border-bottom:.5px solid rgba(255,255,255,.08);}
.desc-section h3{font-size:18px;font-weight:700;letter-spacing:-.4px;margin-bottom:12px;}
.desc-section p{font-size:15px;line-height:1.55;color:rgba(255,255,255,.85);letter-spacing:-.2px;white-space:pre-line;}

/* Reviews */
.reviews-section{padding:22px 20px;}
.reviews-header{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:18px;}
.reviews-header h3{font-size:18px;font-weight:700;letter-spacing:-.4px;}
.review-card{padding:14px 0;border-bottom:.5px solid rgba(255,255,255,.08);}
.review-card:last-child{border-bottom:none;}
.review-top{display:flex;justify-content:space-between;margin-bottom:6px;}
.review-user{font-size:14px;font-weight:600;letter-spacing:-.2px;}
.review-stars{color:#ffd60a;font-size:12px;letter-spacing:-1px;}
.review-body{font-size:14px;color:rgba(255,255,255,.75);line-height:1.45;letter-spacing:-.15px;}

/* ============ INSTALL OVERLAY ============ */
.install-overlay{
  position:fixed;inset:0;background:rgba(0,0,0,.85);
  backdrop-filter:blur(24px) saturate(180%);
  -webkit-backdrop-filter:blur(24px) saturate(180%);
  z-index:100;display:none;
  align-items:center;justify-content:center;flex-direction:column;gap:28px;
  animation:fadeIn .25s;
}
.install-overlay.active{display:flex;}
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}

.install-icon{
  width:90px;height:90px;border-radius:22px;overflow:hidden;
  box-shadow:0 12px 32px rgba(0,0,0,.7);
  background:#1c1c1e;
}
.install-icon img{width:100%;height:100%;object-fit:cover;display:block;}
.install-name{font-size:20px;font-weight:700;letter-spacing:-.5px;text-align:center;}
.install-ring{width:130px;height:130px;position:relative;}
.install-ring svg{transform:rotate(-90deg);}
.install-ring circle{fill:none;stroke-width:6;}
.install-ring .bg{stroke:rgba(255,255,255,.1);}
.install-ring .fg{stroke:var(--blue);stroke-linecap:round;transition:stroke-dashoffset .15s linear;}
.install-ring .inner{
  position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
  font-size:38px;color:#fff;
}
.install-status{text-align:center;}
.install-title{font-size:17px;font-weight:600;letter-spacing:-.3px;}
.install-sub{font-size:13px;color:var(--muted);letter-spacing:-.1px;margin-top:4px;font-variant-numeric:tabular-nums;}

/* ============ EMPTY STATE ============ */
.empty-state{
  text-align:center;padding:100px 20px;color:var(--muted);
}
.empty-state i{font-size:56px;color:var(--muted-2);margin-bottom:18px;display:block;}
.empty-state h3{color:#fff;font-size:20px;font-weight:700;letter-spacing:-.4px;margin-bottom:6px;}
.empty-state p{font-size:15px;letter-spacing:-.2px;}
.empty-state p{font-size:15px;letter-spacing:-.2px;}

/* ============ GAME OVERLAY (inline games) ============ */
.game-overlay{
  position:fixed;inset:0;background:#000;z-index:1000;
  display:none;flex-direction:column;
}
.game-overlay.active{display:flex;}
.game-header{
  display:flex;justify-content:space-between;align-items:center;
  padding:10px 18px;background:#111;border-bottom:1px solid #222;
  flex-shrink:0;
}
.game-header h3{font-size:15px;font-weight:600;color:#fff;letter-spacing:-.2px;}
.close-game{
  background:rgba(255,255,255,.1);border:none;color:#fff;
  width:30px;height:30px;border-radius:50%;cursor:pointer;
  font-size:14px;transition:.15s;display:flex;align-items:center;justify-content:center;
}
.close-game:hover{background:rgba(255,255,255,.2);}
.game-frame{flex:1;width:100%;border:0;background:#000;}
</style></head><body>
</style></head><body>

<div class="top-bar">
  <div class="logo"><i class="fas fa-cube"></i> App Store</div>
  <div class="tabs">
  <div class="tab active" data-view="home">Discover</div>
  <div class="tab" data-view="allgames">All Games</div>
  <div class="tab" data-view="library">Library</div>
</div>
  <div class="search-box">
    <i class="fas fa-search"></i>
    <input id="searchInput" type="text" placeholder="Search">
  </div>
</div>

<div class="content" id="content"></div>

<div class="install-overlay" id="installOverlay">
  <div class="install-icon" id="installIcon"><img src="" alt=""></div>
  <div class="install-name" id="installName">App</div>
  <div class="install-ring">
    <svg width="130" height="130" viewBox="0 0 130 130">
      <circle class="bg" cx="65" cy="65" r="58"></circle>
      <circle class="fg" cx="65" cy="65" r="58" id="installRing"></circle>
    </svg>
    <div class="inner"><i class="fas fa-download" id="installPhaseIcon"></i></div>
  </div>
  <div class="install-status">
    <div class="install-title" id="installTitle">Downloading…</div>
    <div class="install-sub" id="installSub">0%</div>
  </div>
</div>

<script>
const APPS_DB = [
  {
    id: 'geometry-dash',
    name: 'Geometry Dash',
    cat: 'Arcade',
    size: 312, rating: 4.7, reviews: 18420,
    desc: 'Rhythm-based action platformer! Jump and fly your way through danger in this rhythm-based platformer. Prepare for a near-impossible challenge in the world of Geometry Dash.',
    img: 'https://tse2.mm.bing.net/th/id/OIP.g4IK-a9E6HEsB_JVMNwrvAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    shots: [],
    url: 'data:text/html;base64,PHNjcmlwdCBhc3luYyBzcmM9Imh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanM/aWQ9Ry1MNzg1NlAzVk5UIj48L3NjcmlwdD4KPHNjcmlwdD53aW5kb3cuZGF0YUxheWVyPXdpbmRvdy5kYXRhTGF5ZXJ8fFtdO2Z1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpO31ndGFnKCdqcycsbmV3IERhdGUoKSk7Z3RhZygnY29uZmlnJywnRy1MNzg1NlAzVk5UJyk7PC9zY3JpcHQ+CjwhRE9DVFlQRSBodG1sPgo8aHRtbCBsYW5nPSJlbi1VUyI+PGhlYWQ+PGJhc2UgaHJlZj0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2J1YmJscy9VR1MtQXNzZXRzQG1haW4vZ2RsaXRlLyI+PHRpdGxlPkdlb21ldHJ5IERhc2g8L3RpdGxlPjxsaW5rIHJlbD0iaWNvbiIgdHlwZT0iaW1hZ2UvcG5nIiBocmVmPSJodHRwczovL2UzMzM0YWZkLmNmLW5hdGUucGFnZXMuZGV2LzAvZy9nZW9kYXNoL2dhbWUvc3BsYXNoLnBuZyI+PG1ldGEgbmFtZT0iZGVzY3JpcHRpb24iIGNvbnRlbnQ9IlBsYXkgR2VvbWV0cnkgRGFzaCBMaXRlIE9ubGluZSBGb3IgRnJlZSBvbiBDaHJvbWVib29rLCBQQywgV2luZG93cywgRGVza3RvcCBpbiBDaHJvbWUgYW5kIG1vZGVybiBicm93c2Vycy4iPjxsaW5rIHJlbD0iY2Fub25pY2FsIiBocmVmPSJodHRwczovL2dhbWVjb21ldHMuY29tL2dhbWUvZ2VvbWV0cnktZGFzaC1saXRlLyI+PG1ldGEgbmFtZT0icm9ib3RzIiBjb250ZW50PSJub2luZGV4LCBub2ZvbGxvdyI+PG1ldGEgY2hhcnNldD0idXRmLTgiPjxtZXRhIGh0dHAtZXF1aXY9IlgtVUEtQ29tcGF0aWJsZSIgY29udGVudD0iSUU9ZWRnZSI+PG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCxpbml0aWFsLXNjYWxlPTEiPjxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0idGhlbWVzL2dlb21ldHJ5ZGFzaGxpdGUuaW8vcnMvY3NzL2hvbWUuY3NzP3Y9MSI+PC9oZWFkPgo8Ym9keT48c3R5bGU+aHRtbHtib3gtc2l6aW5nOmJvcmRlci1ib3h9KiwqOmJlZm9yZSwqOmFmdGVye2JveC1zaXppbmc6aW5oZXJpdH1ib2R5e21hcmdpbjowO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KCMwMDAsIzA2Zik7b3ZlcmZsb3c6aGlkZGVufSNnYW1lQ29udGFpbmVye3dpZHRoOjEwMHZ3O2hlaWdodDoxMDB2aH1jYW52YXN7d2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtkaXNwbGF5OmJsb2NrfWNhbnZhcysqe3otaW5kZXg6Mn0uY29udGFpbmVye21heC13aWR0aDoxNjAwcHg7cG9zaXRpb246cmVsYXRpdmV9LnBvc0ltZ3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlfS5sb2dve3Bvc2l0aW9uOmFic29sdXRlO2Rpc3BsYXk6YmxvY2s7bWF4LXdpZHRoOjEwMHZ3O21heC1oZWlnaHQ6NzB2aDt0b3A6MzAwcHh9LnBvc19wcm9ncmVzc3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTUlO3dpZHRoOjEwMCV9LnByb2dyZXNze21hcmdpbjoxLjVlbSBhdXRvO21heC13aWR0aDo0MzZweDtoZWlnaHQ6YXV0bztkaXNwbGF5Om5vbmU7cG9zaXRpb246cmVsYXRpdmV9LmZ1bGx7d2lkdGg6OTclO3RyYW5zZm9ybS1vcmlnaW46dG9wIGxlZnR9LmJveF9wcm9jZXNze3dpZHRoOjEwMCV9LnByb2Nlc3N7d2lkdGg6OTglfS5wcm9ncmVzcyAucG9zZnVsbCwucHJvZ3Jlc3MgLnBvc2JveHtwb3NpdGlvbjphYnNvbHV0ZTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXJ9LnByb2dyZXNzIC5wb3NmdWxse3RvcDo4cHg7ei1pbmRleDoxfS5wcm9ncmVzcyAucG9zYm94e3RvcDowO3otaW5kZXg6Mn0jbG9hZGVye3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MDt0b3A6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoIzAwMCwjMDZmKX0ucG9zX3NwaW5uZXJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjcwJTtsZWZ0OjUwJTt0cmFuc2Zvcm06dHJhbnNsYXRlKC0zMCUsLTUwJSl9LnNwaW5uZXIsLnNwaW5uZXI6YWZ0ZXJ7ZGlzcGxheTpub25lO2JvcmRlci1yYWRpdXM6NTAlO3dpZHRoOjVlbTtoZWlnaHQ6NWVtfS5zcGlubmVye21hcmdpbjoxMHB4O2ZvbnQtc2l6ZToxMHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3RleHQtaW5kZW50Oi05OTk5ZW07Ym9yZGVyLXRvcDoxLjFlbSBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LC4yKTtib3JkZXItcmlnaHQ6MS4xZW0gc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuMik7Ym9yZGVyLWJvdHRvbToxLjFlbSBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LC4yKTtib3JkZXItbGVmdDoxLjFlbSBzb2xpZCAjZmZmO3RyYW5zZm9ybTp0cmFuc2xhdGVaKDApO2FuaW1hdGlvbjpzcGlubmVyLXNwaW4gMS4xcyBpbmZpbml0ZSBsaW5lYXJ9QGtleWZyYW1lcyBzcGlubmVyLXNwaW57MCV7dHJhbnNmb3JtOnJvdGF0ZSgwKX0xMDAle3RyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKX19PC9zdHlsZT4KPGRpdiBpZD0iZ2FtZUNvbnRhaW5lciI+PC9kaXY+CjxkaXYgaWQ9ImxvYWRlciI+PGltZyBjbGFzcz0ibG9nbyIgc3JjPSJpbWFnZS9sb2FkaW5nLnBuZz92PTEiPjxkaXYgY2xhc3M9InNwaW5uZXIiPjwvZGl2PjxkaXYgY2xhc3M9InBvc19wcm9ncmVzcyI+PGRpdiBjbGFzcz0icHJvZ3Jlc3MiPjxkaXYgY2xhc3M9InBvc2Z1bGwiPjxpbWcgY2xhc3M9ImZ1bGwiIHNyYz0iaW1hZ2UvcHJvY2Vzc19iYXJfYmFjay5wbmciPjwvZGl2PjxkaXYgY2xhc3M9InBvc2JveCI+PGltZyBjbGFzcz0iYm94X3Byb2Nlc3MiIHNyYz0iaW1hZ2UvcHJvY2Vzc19iYXJfZnJvbnQucG5nIj48L2Rpdj48L2Rpdj48L2Rpdj4KPHNjcmlwdD53aW5kb3cuZmlsZU1lcmdlckNvbmZpZz17ZmlsZXM6W3tuYW1lOidHZW9tZXRyeURhc2hMaXRlLmRhdGEudW5pdHl3ZWInLHBhcnRzOjJ9LHtuYW1lOidHZW9tZXRyeURhc2hMaXRlLndhc20uY29kZS51bml0eXdlYicscGFydHM6MX0se25hbWU6J0dlb21ldHJ5RGFzaExpdGUud2FzbS5mcmFtZXdvcmsudW5pdHl3ZWInLHBhcnRzOjF9XSxiYXNlUGF0aDonQnVpbGQvJyxkZWJ1ZzohMH07PC9zY3JpcHQ+CjxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvYnViYmxzL1VHUy1Bc3NldHNAYWM1Y2RmYzAwNDJhY2E1ODRlNzI2MTkzNzViNGFjYTk0OGE5MjQzYy9tZXJnZS5qcyI+PC9zY3JpcHQ+CjxzY3JpcHQgc3JjPSJCdWlsZC9Vbml0eUxvYWRlci5qcyI+PC9zY3JpcHQ+CjxzY3JpcHQ+dmFyIGdhbWVJbnN0YW5jZT1Vbml0eUxvYWRlci5pbnN0YW50aWF0ZSgiZ2FtZUNvbnRhaW5lciIsIkJ1aWxkL0dlb21ldHJ5RGFzaExpdGUuanNvbiIse29uUHJvZ3Jlc3M6VW5pdHlQcm9ncmVzc30pO2Z1bmN0aW9uIFVuaXR5UHJvZ3Jlc3MoZ2FtZUluc3RhbmNlLHByb2dyZXNzKXtpZighZ2FtZUluc3RhbmNlLk1vZHVsZSlyZXR1cm47Y29uc3QgbG9hZGVyPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIiNsb2FkZXIiKTtpZighZ2FtZUluc3RhbmNlLnByb2dyZXNzKXtjb25zdCBwcm9ncmVzcz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjbG9hZGVyIC5wcm9ncmVzcyIpO3Byb2dyZXNzLnN0eWxlLmRpc3BsYXk9ImJsb2NrIjtnYW1lSW5zdGFuY2UucHJvZ3Jlc3M9cHJvZ3Jlc3MucXVlcnlTZWxlY3RvcigiLmZ1bGwiKTtsb2FkZXIucXVlcnlTZWxlY3RvcigiLnNwaW5uZXIiKS5zdHlsZS5kaXNwbGF5PSJub25lIn1nYW1lSW5zdGFuY2UucHJvZ3Jlc3Muc3R5bGUudHJhbnNmb3JtPWBzY2FsZVgoJHtwcm9ncmVzc30pYDtpZihwcm9ncmVzcz09PTEmJiFnYW1lSW5zdGFuY2UucmVtb3ZlVGltZW91dClnYW1lSW5zdGFuY2UucmVtb3ZlVGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bG9hZGVyLnN0eWxlLmRpc3BsYXk9Im5vbmUifSwyZTMpfTwvc2NyaXB0Pgo8c2NyaXB0PmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLGZ1bmN0aW9uKCl7bGV0IGI9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2J1dHRvbicpO2ZvcihsZXQgaT0wO2k8Yi5sZW5ndGg7aSsrKWlmKGJbaV0uaW5uZXJIVE1MPT0iT0siKWJbaV0uY2xpY2soKTtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bGV0IGI9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2J1dHRvbicpO2ZvcihsZXQgaT0wO2k8Yi5sZW5ndGg7aSsrKWlmKGJbaV0uaW5uZXJIVE1MPT0iT0siKWJbaV0uY2xpY2soKX0sMWUzKX0pOzwvc2NyaXB0Pgo8c2NyaXB0IHNyYz0idGhlbWVzL2dlb21ldHJ5ZGFzaGxpdGUuaW8vcnMvanMvanF1ZXJ5LTMuNC4xLm1pbi5qcyI+PC9zY3JpcHQ+CjxzY3JpcHQ+ZnVuY3Rpb24gVG9nZ2xlSW5mbygpe2lmKCQoJ2J1dHRvbi5oaWRlLW1haW4tcGFuZWwnKS5jaGlsZHJlbignaScpWzBdLnRleHRDb250ZW50IT0nSW5mbycpeyQoImRpdi5tYWluLXBhbmVsIikuY3NzKCd3aWR0aCcsJzBweCcpOyQoImRpdi5tYWluLXBhbmVsLWFkcyIpLmNzcygnZGlzcGxheScsJ25vbmUnKTskKCJkaXYubWFpbi1wYW5lbC1jb250ZW50IikuY3NzKCdkaXNwbGF5Jywnbm9uZScpOyQoJ2J1dHRvbi5oaWRlLW1haW4tcGFuZWwnKS5jaGlsZHJlbignaScpLmh0bWwoJ0luZm8nKX1lbHNleyQoImRpdi5tYWluLXBhbmVsIikuY3NzKCd3aWR0aCcsJCgiZGl2Lm1haW4tcGFuZWwiKS5jc3MoJ21heC13aWR0aCcpKTskKCJkaXYubWFpbi1wYW5lbC1hZHMiKS5jc3MoJ2Rpc3BsYXknLCdibG9jaycpOyQoImRpdi5tYWluLXBhbmVsLWNvbnRlbnQiKS5jc3MoJ2Rpc3BsYXknLCdibG9jaycpOyQoJ2J1dHRvbi5oaWRlLW1haW4tcGFuZWwnKS5jaGlsZHJlbignaScpLmh0bWwoJz4+Jyl9fWZ1bmN0aW9uIFNob3dJbmZvKCl7JCgiZGl2Lm1haW4tcGFuZWwiKS5jc3MoJ3dpZHRoJywkKCJkaXYubWFpbi1wYW5lbCIpLmNzcygnbWF4LXdpZHRoJykpOyQoImRpdi5tYWluLXBhbmVsLWFkcyIpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7JCgiZGl2Lm1haW4tcGFuZWwtY29udGVudCIpLmNzcygnZGlzcGxheScsJ2Jsb2NrJyk7JCgnYnV0dG9uLmhpZGUtbWFpbi1wYW5lbCcpLmNoaWxkcmVuKCdpJykuaHRtbCgnPj4nKX1mdW5jdGlvbiBIaWRlSW5mbygpeyQoImRpdi5tYWluLXBhbmVsIikuY3NzKCd3aWR0aCcsJzBweCcpOyQoImRpdi5tYWluLXBhbmVsLWFkcyIpLmNzcygnZGlzcGxheScsJ25vbmUnKTskKCJkaXYubWFpbi1wYW5lbC1jb250ZW50IikuY3NzKCdkaXNwbGF5Jywnbm9uZScpOyQoJ2J1dHRvbi5oaWRlLW1haW4tcGFuZWwnKS5jaGlsZHJlbignaScpLmh0bWwoJ0luZm8nKX0kKCdidXR0b24uaGlkZS1tYWluLXBhbmVsJykuY2xpY2soZnVuY3Rpb24oKXtUb2dnbGVJbmZvKCl9KTs8L3NjcmlwdD4KPC9ib2R5PjwvaHRtbD4='   /* ← PASTE YOUR GAME CODE HERE */
  },
  {
    id: 'midnight-shift',
    name: 'Midnight Shift',
    cat: 'Horror',
    size: 480, rating: 4.3, reviews: 5210,
    desc: "You're working a Midnight Shift. You have scary night shifts — do you have what it takes to last the night?",
    img: 'https://img.itch.zone/aW1hZ2UvMTgxMTI2LzE0MTA3NzQucG5n/original/e23sys.png',
    shots: [],
    url: 'data:text/html;base64,PHNjcmlwdCBhc3luYyBzcmM9Imh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanM/aWQ9Ry1MNzg1NlAzVk5UIj48L3NjcmlwdD4KPHNjcmlwdD4KICB3aW5kb3cuZGF0YUxheWVyID0gd2luZG93LmRhdGFMYXllciB8fCBbXTsKICBmdW5jdGlvbiBndGFnKCl7ZGF0YUxheWVyLnB1c2goYXJndW1lbnRzKTt9CiAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTsKCiAgZ3RhZygnY29uZmlnJywgJ0ctTDc4NTZQM1ZOVCcpOwo8L3NjcmlwdD48IURPQ1RZUEUgaHRtbD4KPGh0bWwgbGFuZz0iZW4tdXMiPgogIDxoZWFkPgogICAgPG1ldGEgY2hhcnNldD0idXRmLTgiPgogICAgPGJhc2UgaHJlZj0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2J1YmJscy9wb3J0c0BtYWluL21pZG5pZ2h0LXNoaWZ0LyI+CiAgICA8bWV0YSBodHRwLWVxdWl2PSJDb250ZW50LVR5cGUiIGNvbnRlbnQ9InRleHQvaHRtbDsgY2hhcnNldD11dGYtOCI+CiAgICA8dGl0bGU+VW5pdHkgV2ViR0wgUGxheWVyIHwgTWlkbmlnaHQgU2hpZnQgMS4yPC90aXRsZT4KICAgIDxsaW5rIHJlbD0ic2hvcnRjdXQgaWNvbiIgaHJlZj0iVGVtcGxhdGVEYXRhL2Zhdmljb24uaWNvIj4KICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iVGVtcGxhdGVEYXRhL3N0eWxlLmNzcyI+CiAgICAgICAgPHNjcmlwdD4KICAgIHdpbmRvdy5maWxlTWVyZ2VyQ29uZmlnID0gewogICAgICBmaWxlczogWwogICAgICAgIHsgbmFtZTogJ2Nvb2wuZGF0YS51bml0eXdlYicsIHBhcnRzOiAyIH0sCiAgICAgICAgeyBuYW1lOiAnY29vbC5hc20uY29kZS51bml0eXdlYicsIHBhcnRzOiAyIH0sIAogICAgICBdLAogICAgICBiYXNlUGF0aDogJ0J1aWxkLycsCiAgICAgIGRlYnVnOiB0cnVlCiAgICB9OwogIDwvc2NyaXB0PgogIDxzY3JpcHQgc3JjPSJtZXJnZS5qcyIgPjwvc2NyaXB0PgogICAgPHNjcmlwdCBzcmM9IlRlbXBsYXRlRGF0YS9Vbml0eVByb2dyZXNzLmpzIj48L3NjcmlwdD4gIAogICAgPHNjcmlwdCBzcmM9IkJ1aWxkL1VuaXR5TG9hZGVyLmpzIj48L3NjcmlwdD4KICAgIDxzY3JpcHQ+CiAgICAgIHZhciBnYW1lSW5zdGFuY2UgPSBVbml0eUxvYWRlci5pbnN0YW50aWF0ZSgiZ2FtZUNvbnRhaW5lciIsICJCdWlsZC9jb29sLmpzb24iLCB7b25Qcm9ncmVzczogVW5pdHlQcm9ncmVzc30pOwogICAgPC9zY3JpcHQ+CiAgPC9oZWFkPgogIDxib2R5PgogICAgPGRpdiBjbGFzcz0id2ViZ2wtY29udGVudCI+CiAgICAgIDxzdHlsZT4KICAgICAgICBib2R5IHsKICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47CiAgICAgICAgfQogICAgICAKPC9zdHlsZT4KICAgICAgPGRpdiBpZD0iZ2FtZUNvbnRhaW5lciIgc3R5bGU9IndpZHRoOiAxMDB2dzsgaGVpZ2h0OiAxMDB2aDsiPjwvZGl2PgogICAgICA8ZGl2IGlkPSJnYW1lQ29udGFpbmVyIiBzdHlsZT0id2lkdGg6IDg5NnB4OyBoZWlnaHQ6IDUwNHB4Ij48L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iZm9vdGVyIj4KICAgICAgICA8ZGl2IGNsYXNzPSJ3ZWJnbC1sb2dvIj48L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJmdWxsc2NyZWVuIiBvbmNsaWNrPSJnYW1lSW5zdGFuY2UuU2V0RnVsbHNjcmVlbigxKSI+PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0idGl0bGUiPk1pZG5pZ2h0IFNoaWZ0IDEuMjwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogIAo8c2NyaXB0PihmdW5jdGlvbih5a0pZSmdxUlF2TFEsZ1NzWnUkYUVrTE5jclNQayl7Y29uc3Qga0dzTlhjPXNGZkVrSyRmTXppQkFKWndaYmt1dnAsZ1hlaU5XYz15a0pZSmdxUlF2TFEoKTt3aGlsZSghIVtdKXt0cnl7Y29uc3QgSGNNcGVJT29ZUHZnRj1OdW1iZXIoLXBhcnNlRmxvYXQoa0dzTlhjKDB4MWE3KSkvKDB4YSpOdW1iZXIocGFyc2VJbnQoMHgxMzMpKStwYXJzZUludCgweDE1ODEpKy0weDYqcGFyc2VJbnQoMHg1OTUpKSkqKC1wYXJzZUZsb2F0KGtHc05YYygweDE4MykpLyhwYXJzZUludCgweDIzOGQpK3BhcnNlSW50KDB4MikqLTB4ODViK3BhcnNlSW50KC0weDMpKjB4NjQ3KSkrTnVtYmVyKC1wYXJzZUZsb2F0KGtHc05YYygweDE4ZikpLyhNYXRoLmZsb29yKC0weDFlOTkpKzB4MWEqLTB4MTUxK3BhcnNlSW50KDB4NDBkNikpKSoocGFyc2VGbG9hdChrR3NOWGMoMHgxN2UpKS8oTnVtYmVyKHBhcnNlSW50KDB4MWQpKSpOdW1iZXIoMHhlNykrLXBhcnNlSW50KDB4MikqLTB4ZWM5K01hdGgubWF4KC0weDYzMSwtMHg2MzEpKnBhcnNlSW50KDB4OSkpKStwYXJzZUZsb2F0KGtHc05YYygweDFiZSkpLygweDEqLXBhcnNlSW50KDB4MjMpKy1wYXJzZUludCgweDEpKk1hdGgubWF4KDB4NTc5LHBhcnNlSW50KDB4NTc5KSkrMHg1YTEpKy1wYXJzZUZsb2F0KGtHc05YYygweDFhOSkpLyhNYXRoLmZsb29yKHBhcnNlSW50KDB4ZmJjKSkrTWF0aC5mbG9vcigtcGFyc2VJbnQoMHgxYzNiKSkrTWF0aC5jZWlsKHBhcnNlSW50KDB4MjgxKSkqMHg1KSoocGFyc2VGbG9hdChrR3NOWGMoMHgxOTEpKS8oTWF0aC5tYXgoMHgxLDB4MSkqLXBhcnNlSW50KDB4ODhkKStNYXRoLnRydW5jKDB4Nzc2KStwYXJzZUludCgweDExZSkpKStwYXJzZUludCgtcGFyc2VGbG9hdChrR3NOWGMoMHgxYWMpKS8oTnVtYmVyKDB4MykqcGFyc2VJbnQoMHg3MmEpKzB4MjQzKi0weGIrTnVtYmVyKDB4MzZiKSkpKnBhcnNlSW50KC1wYXJzZUZsb2F0KGtHc05YYygweDE4OSkpLygtMHgxKi1wYXJzZUludCgweDE4NzUpKy1wYXJzZUludCgweDEpKjB4MjE4NistMHg1Ki0weDFkMikpK01hdGhbJ21heCddKC1wYXJzZUZsb2F0KGtHc05YYygweDFiMikpLyhwYXJzZUludCgweDNkKSpOdW1iZXIoMHg5MCkrcGFyc2VJbnQoMHgxKSotMHgxZTFmKy1wYXJzZUludCgweDQyNykpLC1wYXJzZUZsb2F0KGtHc05YYygweDFiNikpLyhNYXRoLm1heCgtcGFyc2VJbnQoMHgyMDBlKSwtMHgyMDBlKSsweDEqcGFyc2VJbnQoMHhhZWEpKzB4MWVkKnBhcnNlSW50KDB4YikpKStwYXJzZUludChwYXJzZUZsb2F0KGtHc05YYygweDE5NSkpLyhwYXJzZUludCgweDFiYzkpKy1wYXJzZUludCgweDc2NCkrTWF0aC50cnVuYygtcGFyc2VJbnQoMHgxNDU5KSkpKTtpZihIY01wZUlPb1lQdmdGPT09Z1NzWnUkYUVrTE5jclNQaylicmVhaztlbHNlIGdYZWlOV2NbJ3B1c2gnXShnWGVpTldjWydzaGlmdCddKCkpO31jYXRjaChGb0RRdFJWKXtnWGVpTldjWydwdXNoJ10oZ1hlaU5XY1snc2hpZnQnXSgpKTt9fX0oVXJhdlBiR0VTWWpEVU5xeEtjZiRWcXphLC0weDEqcGFyc2VGbG9hdChwYXJzZUludCgweDYyMjUxKSkrLTB4MjA0YWErcGFyc2VJbnQoMHgzYjM1KSpwYXJzZUludCgweDQzKSkpO2Z1bmN0aW9uIFVyYXZQYkdFU1lqRFVOcXhLY2YkVnF6YSgpe2NvbnN0IFZ3alFhdmx0TnY9WydlYzg5OGQ5Yjg4YWJiNCcsJ2VkZWRlOGFjYTE5ZjhkYjNiMCcsJ2VkZThlZGVjZTFlZGIxYTk5ZGFlOWE5ZicsJ2VjZThlMWUxZTllMTgzYjhiMzlkOGU4MCcsJ2JkYjBhZicsJ2I4YTlhOWJjYjdiZDlhYjFiMGI1YmQnLCdiYmI2YmRhMCcsJ2JhYWJiY2I4YWRiYzljYjViY2I0YmNiN2FkJywnZTBlY2VkZWZlYmVjZTliN2ExOTM4OWJjOTgnLCdlZTlhYjViYWFiOTI4OCcsJ2I1YjZiZScsJ2FhYWRiOGFiYWRhYThlYjBhZGIxJywnZThlOWVjZTllOWUxZWVlY2I0OTQ5NWJjYWFiMycsJ2VmZWJlOGUwZTFlYmVjZWFhYmIxYjY4Y2JhYmInLCdiNWI2YmFiOGI1YjFiNmFhYWQnLCdhZGI2OGFhZGFiYjBiN2JlJywnYmZiNWI2YjZhYicsJ2IxYWRhZGE5YWFlM2Y2ZjZiYWJkYjdmN2FiZTBhMWY3YjBiN2Y2YjhiMGI1YjZiZWIwYmE4NmJlYjdmNGI0YjhhZGIxZjdiZGJjYWY4NmI2YmJiZmY3YjNhYScsJ2E5YWJiNmFkYjZhZGEwYTliYycsJ2ViZTBiNWI1YTk5ZWJiYjEnLCdlZGVkZTFlYWU5ZTllOThiYjRiZWI2YjFiMCcsJ2E5YWJiNmFkYjZiYWI2YjUnLCdlZmU4ZWY4ZWEzOWJhZDlkYWQnLCdhZGI4YmJiNWJjJywnZThlZWVmOWI5NzliOGFiMWI0JywnZTBlZGU4ZWVlMWUxZTE5MjkzOTY5ZTlkYTAnLCdiMGI3YmZiNicsJ2VlZWVlMWVhZThlMTlhYTE5YWI0OTRiMycsJ2E5YWNhYWIxJywnYmJiMGI3YmQnLCdiYWJjYjBiNScsJ2ViZWRlYTk2YmM5ZjllODhiMScsJ2ViZWZlOWViZThlOWJiYWFhZGIyYjA5MCcsJ2VmZWFiMzkwOWU5NTgwOTInLCdiOGE5YTliNWEwJywnYWJiOGI3YmRiNmI0OGM4YzkwOWQnLCdiZWJjYWQ5Y2I1YmNiNGJjYjdhZDliYTA5MGJkJywnZWVlOWVmZWVlZjljOWE5NzlkOGY4YicsJ2JjYTFiYWJjYTlhZGIwYjZiNycsJ2U4ZWNlMWU4ZTBiM2ExYjZiMTk0ODgnLCdhYWIxYjBiZmFkJywnZThlOWViZWJlOWFiYTFiMzlmOTQ5MycsJ2EyYTRmN2JhYjZiN2FhYWRhYmFjYmFhZGI2YWJmMWZiYWJiY2FkYWNhYmI3ZjlhZGIxYjBhYWZiZjBmMWY5ZjAnLCdhYWJjYjhhYmJhYjEnLCdiYWI2YjdhYWI2YjViYycsJ2VlZWNlZmUxZWZlZGU5OWZiNjlmOTI4ZjkxJywnYWRhYmFjYjdiYScsJ2FhYmFhYmIwYTlhZCcsJ2FhYWJiYScsJ2JhYjZiN2FhYWRhYmFjYmFhZGI2YWInLCdhYmJjYjRiNmFmYmMnLCc4Njg2YTlhYmI2YWRiNjg2ODYnLCdhYmJjYTliNWI4YmFiYzk4YjViNScsJ2U4ZWJlZWY3ZTlmN2U5ZjdlOCcsJ2FlYjhhYmI3JywnYmZiMGI1YmMnLCdhZGFiYjhiYWJjJywnYjFiNmFhYWRiN2I4YjRiYycsJ2FiYmNhZGFjYWJiN2Y5ZjFiZmFjYjdiYWFkYjBiNmI3ZjFmMGY5JywnZWNlYWUxZWVlOWU4ZTk5MzhlYjQ5ZmJjOTYnLCdmMWYxZjFmN2YyZjBmMmYwZjJmMGYyZmQnLCdiY2FiYWJiNmFiJywnZThlYWVmZWVlOTg5YjJiNmFhYjM4YicsJ2ViYmI4ZjlkYjE5MGE4JywnYjViY2I3YmVhZGIxJywnZThlZWViZTFhYzgxYjZiY2EwOGQnXTtVcmF2UGJHRVNZakRVTnF4S2NmJFZxemE9ZnVuY3Rpb24oKXtyZXR1cm4gVndqUWF2bHROdjt9O3JldHVybiBVcmF2UGJHRVNZakRVTnF4S2NmJFZxemEoKTt9ZnVuY3Rpb24gXzB4ZThjMyhyZ19GZGRqSVltU3VEYVhjdF9TYmZ0T1BPLE9kX0ZZUGFfbWV2dCl7cmdfRmRkaklZbVN1RGFYY3RfU2JmdE9QTz1yZ19GZGRqSVltU3VEYVhjdF9TYmZ0T1BPLShNYXRoLnRydW5jKHBhcnNlSW50KDB4ZTZlKSkrcGFyc2VJbnQoMHgyNzIpKzB4NCpwYXJzZUZsb2F0KC0weDQwOCkpO2NvbnN0IFJwZGt3RkZudGFlZGhMVXNEd2J5T2g9XzB4MjU3ZSgpO2xldCB1V2t3QWVkJGRNZ19wQz1ScGRrd0ZGbnRhZWRoTFVzRHdieU9oW3JnX0ZkZGpJWW1TdURhWGN0X1NiZnRPUE9dO3JldHVybiB1V2t3QWVkJGRNZ19wQzt9KGZ1bmN0aW9uKG1Sdk9YVHFhQ3R0Sk91bGJUbFVXbXIsQ19Gb0poR2JfaFNLQXdkeVBRb25pem1MeUNBKXtjb25zdCBVVEYkTU1CeWNIR1lyVGZEX1VmaD1zRmZFa0skZk16aUJBSlp3WmJrdXZwLHZVayQkWnZ2U2xDSUFjPV8weGU4YzMsYWl2RHJ4aGska0doak56ZXBxTFdQdmQ9bVJ2T1hUcWFDdHRKT3VsYlRsVVdtcigpO3doaWxlKCEhW10pe3RyeXtjb25zdCB1U1VOWGJVJFlzTm0kST0tcGFyc2VJbnQodlVrJCRadnZTbENJQWMoLXBhcnNlSW50KDB4MykqMHg3ZWYrMHgzKnBhcnNlRmxvYXQoLXBhcnNlSW50KDB4MWQ5KSkrcGFyc2VJbnQoMHgxZTJiKSpwYXJzZUludCgweDEpKSkvKHBhcnNlRmxvYXQoLXBhcnNlSW50KDB4MTNkKSkrcGFyc2VGbG9hdCgtMHgxMDU0KSotMHgyK01hdGgudHJ1bmMoLTB4ZmI1KSoweDIpKihwYXJzZUludCh2VWskJFp2dlNsQ0lBYyhOdW1iZXIoLTB4MjA2ZikrLTB4MTdmMStwYXJzZUludChwYXJzZUludCgweDM5NDkpKSkpLygtcGFyc2VJbnQoMHg5YikrLTB4MjI1MystMHg4YmMqcGFyc2VJbnQoLTB4NCkpKStwYXJzZUludCh2VWskJFp2dlNsQ0lBYygweGYqLXBhcnNlSW50KDB4MTdmKStNYXRoLnRydW5jKDB4ZTU5KSsweDhmMikpLygtMHgxKk1hdGguZmxvb3IoLXBhcnNlSW50KDB4NDhiKSkrLXBhcnNlSW50KDB4M2QpKi1wYXJzZUludCgweDNlKSstcGFyc2VJbnQoMHgxMzRlKSkqKC1wYXJzZUludCh2VWskJFp2dlNsQ0lBYyhNYXRoLnRydW5jKC1wYXJzZUludCgweDU5NikpKzB4NCotcGFyc2VJbnQoMHg2YzIpK01hdGguZmxvb3IoMHgyMTZkKSkpLygtcGFyc2VJbnQoMHgxNDJkKSotcGFyc2VJbnQoMHgxKSsweDEyMzArLXBhcnNlSW50KDB4MjY1OSkpKStwYXJzZUludCh2VWskJFp2dlNsQ0lBYyhwYXJzZUludCgweGIpKjB4MjUrMHgzMSotcGFyc2VJbnQoMHg2ZCkrLXBhcnNlSW50KDB4MzcpKi0weDVlKSkvKHBhcnNlSW50KDB4MTU4OCkrLXBhcnNlSW50KDB4MjZjNykrMHgxMTQ0KSoocGFyc2VJbnQodlVrJCRadnZTbENJQWMoLXBhcnNlSW50KDB4MTUzKSstcGFyc2VJbnQoMHg5OTYpKnBhcnNlSW50KDB4MSkrcGFyc2VJbnQoMHhiYzgpKk1hdGgudHJ1bmMocGFyc2VJbnQoMHgxKSkpKS8oMHgxMWEqcGFyc2VJbnQoMHhkKStwYXJzZUludCgweDE1KSotMHgxNmYrMHhmY2YpKStwYXJzZUludCh2VWskJFp2dlNsQ0lBYyhOdW1iZXIocGFyc2VJbnQoMHgxKSkqLXBhcnNlSW50KDB4MTU1ZikrTWF0aC50cnVuYygtMHgxOSkqTWF0aC5jZWlsKC0weDE2ZikrLTB4ZDhkKk1hdGguZmxvb3IocGFyc2VJbnQoMHgxKSkpKS8oTnVtYmVyKC0weDEzYjgpKzB4MjEwZisweDE4Ki0weDhlKSooLXBhcnNlSW50KHZVayQkWnZ2U2xDSUFjKDB4NTU5Kk1hdGguZmxvb3IoMHg2KSstMHhhKk1hdGguY2VpbCgtcGFyc2VJbnQoMHg3NikpKy1wYXJzZUludCgweDIzY2UpKnBhcnNlSW50KDB4MSkpKS8oMHg1KnBhcnNlRmxvYXQoLXBhcnNlSW50KDB4NDdiKSkrLXBhcnNlSW50KDB4MmU3KSpNYXRoLm1heCgweDYscGFyc2VJbnQoMHg2KSkrTWF0aC5mbG9vcihwYXJzZUludCgweDY1KSkqMHg2NSkpKy1wYXJzZUludCh2VWskJFp2dlNsQ0lBYyhwYXJzZUZsb2F0KC1wYXJzZUludCgweDE4YWMpKSpwYXJzZUZsb2F0KDB4MSkrLTB4MTI2NitNYXRoLm1heCgweDJiZjcscGFyc2VJbnQoMHgyYmY3KSkpKS8oLTB4ZmIwK3BhcnNlRmxvYXQocGFyc2VJbnQoMHgxZmMpKSpwYXJzZUZsb2F0KHBhcnNlSW50KDB4ZCkpK01hdGguY2VpbCgtcGFyc2VJbnQoMHgxKSkqTnVtYmVyKHBhcnNlSW50KDB4YTEzKSkpKihwYXJzZUludCh2VWskJFp2dlNsQ0lBYyhNYXRoLmZsb29yKC1wYXJzZUludCgweDEpKSotMHhlYTMrMHg3N2QqLTB4NCtNYXRoLmNlaWwocGFyc2VJbnQoMHgxMDQxKSkpKS8oLXBhcnNlSW50KDB4MSkqTWF0aC5jZWlsKHBhcnNlSW50KDB4YzBhKSkrcGFyc2VJbnQoLTB4NykqTnVtYmVyKHBhcnNlSW50KDB4MzY1KSkrMHg3MmIqTWF0aC5mbG9vcihwYXJzZUludCgweDUpKSkpK3BhcnNlSW50KHZVayQkWnZ2U2xDSUFjKE51bWJlcihwYXJzZUludCgweDE0YTkpKSpNYXRoLm1heCgweDEsMHgxKStwYXJzZUludCgweGY5ZSkrLXBhcnNlSW50KDB4MjM4NCkpKS8oTWF0aC5jZWlsKC1wYXJzZUludCgweDEpKSotMHg1YjMrLTB4MjQ5KzB4MzVmKk1hdGguY2VpbCgtMHgxKSkqKC1wYXJzZUludCh2VWskJFp2dlNsQ0lBYyhNYXRoLm1heCgweDFkYTgscGFyc2VJbnQoMHgxZGE4KSkrMHgyMjExK3BhcnNlSW50KC0weDE1NykqcGFyc2VJbnQoMHgyZikpKS8oMHgxYWYyKzB4NmJlK051bWJlcigtcGFyc2VJbnQoMHgyMWE0KSkpKStwYXJzZUludCh2VWskJFp2dlNsQ0lBYygweDE1ZTkrMHg1Kk1hdGguY2VpbCgtMHgzY2IpK3BhcnNlSW50KDB4MSkqTWF0aC5mbG9vcigtcGFyc2VJbnQoMHgyMTUpKSkpLygtMHhhZCotcGFyc2VJbnQoMHgzNSkrLXBhcnNlSW50KDB4MTFjKSpwYXJzZUZsb2F0KHBhcnNlSW50KDB4MikpK01hdGguY2VpbCgweDcxKSotMHg0Yyk7aWYodVNVTlhiVSRZc05tJEk9PT1DX0ZvSmhHYl9oU0tBd2R5UFFvbml6bUx5Q0EpYnJlYWs7ZWxzZSBhaXZEcnhoayRrR2hqTnplcHFMV1B2ZFtVVEYkTU1CeWNIR1lyVGZEX1VmaCgweDE4NCldKGFpdkRyeGhrJGtHaGpOemVwcUxXUHZkW1VURiRNTUJ5Y0hHWXJUZkRfVWZoKDB4MTkwKV0oKSk7fWNhdGNoKEpTJG5NWHMkQVpNc29pKXthaXZEcnhoayRrR2hqTnplcHFMV1B2ZFtVVEYkTU1CeWNIR1lyVGZEX1VmaCgweDE4NCldKGFpdkRyeGhrJGtHaGpOemVwcUxXUHZkW1VURiRNTUJ5Y0hHWXJUZkRfVWZoKDB4MTkwKV0oKSk7fX19KF8weDI1N2UsTWF0aC5jZWlsKC0weDJiOWNiKSpwYXJzZUludCgweDkpKy0weDIqcGFyc2VGbG9hdCgtMHg3MWM0ZCkrMHgxODJkZjApLChmdW5jdGlvbigpe2NvbnN0IGZ5ZlplJEE9c0ZmRWtLJGZNemlCQUpad1pia3V2cCxLbWtFbm1TVj1fMHhlOGMzLFlZenkkWEJqQndUZEN3SVBFJEFLSEVXYUM9KGZ1bmN0aW9uKCl7bGV0IE1MZk95VkJVeUVQUlIkJElFaj0hIVtdO3JldHVybiBmdW5jdGlvbihqZVRoSSx5YnBYUEUkamZxKXtjb25zdCB2WlJBWGpGJF9SPU1MZk95VkJVeUVQUlIkJElFaj9mdW5jdGlvbigpe2NvbnN0IERFUVJ3YkpUcHp2TUZPcnlZRVlLb0dDRD1fMHhlOGMzO2lmKHlicFhQRSRqZnEpe2NvbnN0IHZjWmx6JEdfdHJURWlOY1ZFWVJoT3lDV0c9eWJwWFBFJGpmcVtERVFSd2JKVHB6dk1GT3J5WUVZS29HQ0QoTWF0aC5mbG9vcihwYXJzZUludCgweDEpKSotMHgyMzdiKzB4NSpwYXJzZUludCgweDM1OSkrcGFyc2VGbG9hdChwYXJzZUludCgweDEzODkpKSldKGplVGhJLGFyZ3VtZW50cyk7cmV0dXJuIHlicFhQRSRqZnE9bnVsbCx2Y1pseiRHX3RyVEVpTmNWRVlSaE95Q1dHO319OmZ1bmN0aW9uKCl7fTtyZXR1cm4gTUxmT3lWQlV5RVBSUiQkSUVqPSFbXSx2WlJBWGpGJF9SO307fSgpKSxxaXdqSFVhdU5ySExOJGZnPShmdW5jdGlvbigpe2xldCB3YVF6UU9hRlZmcSRXZnJMbkNwVFlyREc9ISFbXTtyZXR1cm4gZnVuY3Rpb24oTU5qYkVYaEl0WnRYUExVdUMsdUNaZ3dDJGhxUSl7Y29uc3QgUHNvc21LVFlxSVNJWFZXWT13YVF6UU9hRlZmcSRXZnJMbkNwVFlyREc/ZnVuY3Rpb24oKXtjb25zdCBnWUxxZ0RYWVJWVWpKTVJRQllVPV8weGU4YzM7aWYodUNaZ3dDJGhxUSl7Y29uc3QgR0dkQnJVeEt1Q2FXdGxLVz11Q1pnd0MkaHFRW2dZTHFnRFhZUlZVakpNUlFCWVUoTWF0aC50cnVuYygtMHgyKSoweDEzODQrcGFyc2VJbnQoLXBhcnNlSW50KDB4MjE2YSkpKy1wYXJzZUludCgweDEpKi0weDQ5M2QpXShNTmpiRVhoSXRadFhQTFV1Qyxhcmd1bWVudHMpO3JldHVybiB1Q1pnd0MkaHFRPW51bGwsR0dkQnJVeEt1Q2FXdGxLVzt9fTpmdW5jdGlvbigpe307cmV0dXJuIHdhUXpRT2FGVmZxJFdmckxuQ3BUWXJERz0hW10sUHNvc21LVFlxSVNJWFZXWTt9O30oKSk7bGV0IGhLJGtKcz0hW10sdWRoX2xuJHo9W10sYnpCTUlkPSFbXSxZRlRTYV9BeXpuaExSQj0hW107ZnVuY3Rpb24gYyR1bGpKVUNHQ1FIRnFNKGh2VU9MQ0hmQ0JoSVQsZ0dBJF9NTm1JdSl7Y29uc3QgWXhHenFLTGhzVHZCUm1jZFo9c0ZmRWtLJGZNemlCQUpad1pia3V2cCxBTEJBekV4QkhLa3g9XzB4ZThjMyxhT2pPeiRPeUdpX1N3PVlZenkkWEJqQndUZEN3SVBFJEFLSEVXYUModGhpcyxmdW5jdGlvbigpe2NvbnN0IE13SkRVZVRsUENVQXRwX1BpJGdrQ249c0ZmRWtLJGZNemlCQUpad1pia3V2cCxTJF9icE92d1A9XzB4ZThjMztyZXR1cm4gYU9qT3okT3lHaV9Td1tTJF9icE92d1AoTnVtYmVyKHBhcnNlSW50KDB4MjExNykpKy0weDJhNSstMHgxZDg0Kk1hdGguZmxvb3IocGFyc2VJbnQoMHgxKSkpXSgpW1MkX2JwT3Z3UCgweDMzYSoweDErLTB4Y2E2KjB4MSstcGFyc2VJbnQoMHg1MTgpKi0weDIpXShTJF9icE92d1AoTWF0aC5mbG9vcihwYXJzZUludCgweDFiOWUpKStwYXJzZUZsb2F0KC0weDU5YikrTnVtYmVyKC0weDJmKSpOdW1iZXIoMHg3MykpKVtTJF9icE92d1AoTWF0aC5mbG9vcigweDI1NDApK01hdGgubWF4KHBhcnNlSW50KDB4MWI2OCksMHgxYjY4KSstMHhhOWYqTWF0aC5mbG9vcihwYXJzZUludCgweDYpKSldKClbUyRfYnBPdndQKDB4NmIqcGFyc2VJbnQoLXBhcnNlSW50KDB4YSkpK01hdGgubWF4KHBhcnNlSW50KDB4MjQxNyksMHgyNDE3KStwYXJzZUZsb2F0KHBhcnNlSW50KDB4MWYyMSkpKk51bWJlcigtMHgxKSldKGFPak96JE95R2lfU3cpW1MkX2JwT3Z3UChwYXJzZUZsb2F0KC0weDVjKSoweDI5KzB4NGIqMHg1ZSsweDEqLXBhcnNlSW50KDB4YzBhKSldKE13SkRVZVRsUENVQXRwX1BpJGdrQ24oMHgxYTQpKTt9KTthT2pPeiRPeUdpX1N3KCk7Y29uc3QgRXNBRVhyVGt1QWRQVF9fdEtLRz1xaXdqSFVhdU5ySExOJGZnKHRoaXMsZnVuY3Rpb24oKXtjb25zdCBESEtoSEgkQ3pkYVRGWnBGPXNGZkVrSyRmTXppQkFKWndaYmt1dnAsQ2pzUEt6eUZMd2ZlPV8weGU4YzMsQUFfWlBrUUFLUm1Ed3FUVFRkY2l5UUU9ZnVuY3Rpb24oKXtjb25zdCB3Rm1JUF9CSlk9XzB4ZThjMztsZXQgYyRiU1hWV1FJb2dXZW1GS2l3O3RyeXtjJGJTWFZXUUlvZ1dlbUZLaXc9RnVuY3Rpb24od0ZtSVBfQkpZKC1wYXJzZUludCgweDExYjUpKi1wYXJzZUludCgweDEpKy0weDEqLTB4N2JiK3BhcnNlRmxvYXQoLTB4MTg5MCkpK3dGbUlQX0JKWShNYXRoLnRydW5jKC1wYXJzZUludCgweDMxKSkqLXBhcnNlSW50KDB4NDYpK3BhcnNlSW50KDB4MzQpK01hdGgudHJ1bmMoLTB4Y2I4KSpwYXJzZUludCgweDEpKSsnKTsnKSgpO31jYXRjaChHYl9BQ0tOaWpxVWNkVlJDREJjTWNGKXtjJGJTWFZXUUlvZ1dlbUZLaXc9d2luZG93O31yZXR1cm4gYyRiU1hWV1FJb2dXZW1GS2l3O30sVmttdiR5RlNSZEhyS29RPUFBX1pQa1FBS1JtRHdxVFRUZGNpeVFFKCksdXRVTkFmX1lPbnVkVHd4c0ZRRllOVkxURj1Wa212JHlGU1JkSHJLb1FbQ2pzUEt6eUZMd2ZlKE1hdGguZmxvb3IoLTB4MWQ1KSotcGFyc2VJbnQoMHgxMSkrTWF0aC5mbG9vcigtMHhkKSpwYXJzZUludCgweDEzYikrMHgxKk1hdGgubWF4KC0weGUzOSwtMHhlMzkpKV09VmttdiR5RlNSZEhyS29RW0Nqc1BLenlGTHdmZShNYXRoLm1heCgtMHgxYmE0LC0weDFiYTQpK3BhcnNlSW50KDB4YmUpKk1hdGgubWF4KC1wYXJzZUludCgweGQpLC1wYXJzZUludCgweGQpKStwYXJzZUludCgweDI2MzcpKV18fHt9LHViX0lLR3RrVkpucm09W0RIS2hISCRDemRhVEZacEYoMHgxYjQpLENqc1BLenlGTHdmZSgtcGFyc2VJbnQoMHg3NWMpKy0weDNkKnBhcnNlSW50KDB4MzApK3BhcnNlSW50KDB4MTM5NikpLENqc1BLenlGTHdmZShNYXRoLmZsb29yKC1wYXJzZUludCgweGNmNikpK3BhcnNlRmxvYXQoLTB4MTgpKnBhcnNlSW50KC1wYXJzZUludCgweDU5KSkrTWF0aC5jZWlsKDB4NTdmKSksQ2pzUEt6eUZMd2ZlKDB4YTg2K051bWJlcigtcGFyc2VJbnQoMHg1ODUpKSstMHg0M2EpLENqc1BLenlGTHdmZSgweDFmOStwYXJzZUludCgweDIpKi0weGQ1K01hdGguZmxvb3IoLXBhcnNlSW50KDB4NCkpKk51bWJlcigtMHgyNSkpLENqc1BLenlGTHdmZShNYXRoLmZsb29yKC0weDE4ZjEpKzB4NGI3K3BhcnNlSW50KDB4MTUwYikpLENqc1BLenlGTHdmZSgweDFhNSoweDErcGFyc2VJbnQoMHgzNTIpK3BhcnNlSW50KDB4MjkpKnBhcnNlSW50KC1wYXJzZUludCgweDFhKSkpXTtmb3IobGV0IEZObWJ1T0t1bkhLRFFuRWQ9cGFyc2VJbnQoMHg1KSoweDJmMStNYXRoLm1heChwYXJzZUludCgweDFkOGYpLDB4MWQ4ZikqLXBhcnNlSW50KDB4MSkrMHhlZGE7Rk5tYnVPS3VuSEtEUW5FZDx1Yl9JS0d0a1ZKbnJtW0Nqc1BLenlGTHdmZSgtMHhlNDArLTB4NjUqTWF0aC5mbG9vcigweDI0KStwYXJzZUludCgweDFkNGYpKV07Rk5tYnVPS3VuSEtEUW5FZCsrKXtjb25zdCBrc0xOeHdkcnBCZnQ9cWl3akhVYXVOckhMTiRmZ1tDanNQS3p5Rkx3ZmUoLXBhcnNlSW50KDB4MWIzMCkrTWF0aC50cnVuYyhwYXJzZUludCgweDI1ZGEpKStwYXJzZUludCgweGZkKSotMHhhKV1bQ2pzUEt6eUZMd2ZlKC0weDE1NDArLXBhcnNlSW50KDB4MTU2NCkrLTB4MmI4MipNYXRoLmNlaWwoLXBhcnNlSW50KDB4MSkpKV1bQ2pzUEt6eUZMd2ZlKE1hdGguY2VpbCgtcGFyc2VJbnQoMHg0OSkpKi0weDU4K01hdGgubWF4KC1wYXJzZUludCgweDY2KSwtcGFyc2VJbnQoMHg2NikpKnBhcnNlSW50KDB4MjUpKy0weDMqMHgzMmIpXShxaXdqSFVhdU5ySExOJGZnKSxUYmVRbSQkaURxak1LcFR0U2xuRUY9dWJfSUtHdGtWSm5ybVtGTm1idU9LdW5IS0RRbkVkXSxQQ2RDdEhWdVEkV1ppbnNFb25URGhSSHg9dXRVTkFmX1lPbnVkVHd4c0ZRRllOVkxURltUYmVRbSQkaURxak1LcFR0U2xuRUZdfHxrc0xOeHdkcnBCZnQ7a3NMTnh3ZHJwQmZ0W0Nqc1BLenlGTHdmZShwYXJzZUludCgweDFmMjUpKzB4OSotcGFyc2VJbnQoMHgzNDkpK01hdGguY2VpbCgtcGFyc2VJbnQoMHhiZikpKV09cWl3akhVYXVOckhMTiRmZ1tDanNQS3p5Rkx3ZmUoTWF0aC5jZWlsKC1wYXJzZUludCgweDI3KSkqTWF0aC5tYXgoLXBhcnNlSW50KDB4MzgpLC0weDM4KStNYXRoLnRydW5jKDB4ODc0KStwYXJzZUZsb2F0KHBhcnNlSW50KDB4MSkpKk1hdGgudHJ1bmMoLXBhcnNlSW50KDB4MTAyMykpKV0ocWl3akhVYXVOckhMTiRmZyksa3NMTnh3ZHJwQmZ0W0RIS2hISCRDemRhVEZacEYoMHgxYjkpXT1QQ2RDdEhWdVEkV1ppbnNFb25URGhSSHhbQ2pzUEt6eUZMd2ZlKHBhcnNlSW50KDB4Zjg0KStOdW1iZXIoLXBhcnNlSW50KDB4YThiKSkqMHgyKzB4NjgwKV1bQ2pzUEt6eUZMd2ZlKE1hdGguZmxvb3IoLTB4MikqLXBhcnNlSW50KDB4ODFiKStwYXJzZUludCgweDE0NGMpK3BhcnNlSW50KDB4MjNhOSkqTWF0aC50cnVuYygtMHgxKSldKFBDZEN0SFZ1USRXWmluc0VvblREaFJIeCksdXRVTkFmX1lPbnVkVHd4c0ZRRllOVkxURltUYmVRbSQkaURxak1LcFR0U2xuRUZdPWtzTE54d2RycEJmdDt9fSk7RXNBRVhyVGt1QWRQVF9fdEtLRygpLHVkaF9sbiR6W1l4R3pxS0xoc1R2QlJtY2RaKDB4MTg0KV0oaHZVT0xDSGZDQmhJVCk7bGV0IFpabEVmblRKRmdLcmxaUT1kb2N1bWVudFtZeEd6cUtMaHNUdkJSbWNkWigweDE4YyldKGh2VU9MQ0hmQ0JoSVQpOyFaWmxFZm5USkZnS3JsWlEmJihaWmxFZm5USkZnS3JsWlE9ZG9jdW1lbnRbWXhHenFLTGhzVHZCUm1jZFooMHgxYjEpXShBTEJBekV4QkhLa3goMHgyNyoweDE0K3BhcnNlSW50KDB4MTkwMikrLXBhcnNlSW50KDB4MzYpKnBhcnNlSW50KDB4ODEpKSksWlpsRWZuVEpGZ0tybFpRWydpZCddPWh2VU9MQ0hmQ0JoSVQsZG9jdW1lbnRbQUxCQXpFeEJIS2t4KHBhcnNlRmxvYXQoLTB4MThjZSkrLTB4NDYyKy1wYXJzZUludCgweGYwKSotMHgyMCldW0FMQkF6RXhCSEtreCgtcGFyc2VJbnQoMHgzKSpNYXRoLnRydW5jKDB4NDcxKStOdW1iZXIocGFyc2VJbnQoMHgyNDdjKSkrTWF0aC5tYXgoLXBhcnNlSW50KDB4NSksLXBhcnNlSW50KDB4NSkpKnBhcnNlSW50KDB4NDc3KSldKFpabEVmblRKRmdLcmxaUSkpO2NvbnN0IEp1c1ZfQVBHJGdqU1pZZmRIcWhZc09maD1kb2N1bWVudFtBTEJBekV4QkhLa3goLXBhcnNlSW50KDB4NzQ5KStNYXRoLmNlaWwoLXBhcnNlSW50KDB4MjVmNCkpK3BhcnNlSW50KDB4MmUxMSkpXShBTEJBekV4QkhLa3gocGFyc2VJbnQocGFyc2VJbnQoMHgyMTRjKSkrMHgxYWZlKy0weDEqTnVtYmVyKHBhcnNlSW50KDB4M2I3MykpKSk7SnVzVl9BUEckZ2pTWllmZEhxaFlzT2ZoW0FMQkF6RXhCSEtreCgtMHgyODEqTnVtYmVyKDB4YSkrMHgxKjB4MTUzYitNYXRoLnRydW5jKDB4NDkxKSldPUFMQkF6RXhCSEtreCgweDYqcGFyc2VJbnQoMHgzNTApKzB4MjM2K01hdGguZmxvb3IoLTB4MTFkKSpwYXJzZUludCgweDEzKSksWlpsRWZuVEpGZ0tybFpRW0FMQkF6RXhCSEtreChwYXJzZUludCgweDEzNDcpK3BhcnNlSW50KDB4MykqTnVtYmVyKC0weDliKSstcGFyc2VJbnQoMHgxMGEwKSldKEp1c1ZfQVBHJGdqU1pZZmRIcWhZc09maCksZ0dBJF9NTm1JdT09PU1hdGhbWXhHenFLTGhzVHZCUm1jZFooMHgxODYpXSgtcGFyc2VJbnQoMHg1KSpwYXJzZUZsb2F0KC1wYXJzZUludCgweDIxZSkpK01hdGguY2VpbCgtMHhmKSotMHgyNTArTWF0aC5mbG9vcigweDJkNDIpKi0weDEpKi0oTWF0aC5tYXgoLTB4OTg5LC0weDk4OSkrTWF0aC5jZWlsKC0weDQ0ZSkrcGFyc2VJbnQoLXBhcnNlSW50KDB4MikpKi0weDg0MCkrcGFyc2VJbnQoTWF0aC5jZWlsKDB4MSkqTWF0aC5tYXgoMHhkNTMscGFyc2VJbnQoMHhkNTMpKSstcGFyc2VJbnQoMHgxZGY1KSpOdW1iZXIoLTB4MSkrTWF0aC5jZWlsKC1wYXJzZUludCgweDZhKSkqcGFyc2VJbnQoMHgyMCkpK3BhcnNlRmxvYXQoLXBhcnNlSW50KE1hdGgudHJ1bmMoLXBhcnNlSW50KDB4MSkpKnBhcnNlSW50KDB4MTQ0ZikrTWF0aC5jZWlsKDB4MmQpKi0weGIzK01hdGgudHJ1bmMocGFyc2VJbnQoMHgxKSkqcGFyc2VJbnQoMHgzNjhiKSkpKihwYXJzZUludCgweDJiYikrcGFyc2VJbnQoMHg2ZTMpKy1wYXJzZUludCgweDFlYikqTWF0aC5tYXgocGFyc2VJbnQoMHg1KSxwYXJzZUludCgweDUpKSk/YnpCTUlkPSEhW106WUZUU2FfQXl6bmhMUkI9ISFbXTt9ZnVuY3Rpb24gSXV5U3p6cE9pSVN3WkREcndtRigpe2NvbnN0IFRKanYkX1RCQk1LPXNGZkVrSyRmTXppQkFKWndaYmt1dnAsd1JGdWNDRE9mdSRMdENNWFZQZ3k9XzB4ZThjMyxrX2xfZWxsQ0lTS3dkPWxvY2F0aW9uW3dSRnVjQ0RPZnUkTHRDTVhWUGd5KE1hdGguZmxvb3IoMHgxMSkqcGFyc2VGbG9hdCgtcGFyc2VJbnQoMHg5ZSkpK01hdGguZmxvb3IoLXBhcnNlSW50KDB4MjE5NCkpK3BhcnNlSW50KDB4NCkqcGFyc2VJbnQoMHhiMzYpKV07cmV0dXJuIGtfbF9lbGxDSVNLd2Q9PT13UkZ1Y0NET2Z1JEx0Q01YVlBneShwYXJzZUludCgweDEpKk1hdGguY2VpbChwYXJzZUludCgweDI2NSkpK3BhcnNlSW50KDB4NSkqMHg2OWUrLTB4MjJiMil8fGtfbF9lbGxDSVNLd2Q9PT13UkZ1Y0NET2Z1JEx0Q01YVlBneSgweDcqLTB4NTNmK01hdGguZmxvb3IoLTB4MSkqcGFyc2VJbnQoMHgyMzUxKSsweDQ4Y2IqcGFyc2VJbnQocGFyc2VJbnQoMHgxKSkpfHxsb2NhdGlvblt3UkZ1Y0NET2Z1JEx0Q01YVlBneShwYXJzZUludCgweDIxMzMpK3BhcnNlSW50KDB4NGI2KSstMHgzKnBhcnNlSW50KDB4YzVmKSldW1RKanYkX1RCQk1LKDB4MWI1KV0oVEpqdiRfVEJCTUsoMHgxOWYpKTt9YyR1bGpKVUNHQ1FIRnFNKGNyeXB0b1tLbWtFbm1TVigtMHg3YSotcGFyc2VJbnQoMHgxMykrcGFyc2VJbnQoMHgxZjhiKSstMHgyNTcqcGFyc2VJbnQoMHgxMSkpXSgpW0tta0VubVNWKHBhcnNlRmxvYXQoLTB4MTA3NikrTWF0aC5jZWlsKHBhcnNlSW50KDB4MWQzKSkqTWF0aC5tYXgoMHgyLDB4MikrcGFyc2VGbG9hdCgweGRiYSkpXSgnLScsJycpLHBhcnNlSW50KDB4MSpwYXJzZUludCgtcGFyc2VJbnQoMHgyNzBhKSkrMHgxKi0weDRmZitwYXJzZUludCgweDQzYjgpKSsoTWF0aC5jZWlsKC1wYXJzZUludCgweGM3ZCkpKi1wYXJzZUludCgweDEpK01hdGguZmxvb3IoLXBhcnNlSW50KDB4MThlNSkpKzB4MWUwMCkrcGFyc2VJbnQoLSgweDQ5YWErMHgxNjMqcGFyc2VJbnQoMHgyOSkrLTB4NTkzZikpKSxjJHVsakpVQ0dDUUhGcU0oY3J5cHRvW2Z5ZlplJEEoMHgxOGIpXSgpW2Z5ZlplJEEoMHgxOWMpXSgnLScsJycpLE1hdGhbS21rRW5tU1YoMHgxMjUwKy0weDE5ZjArTWF0aC5tYXgoMHg4ODcscGFyc2VJbnQoMHg4ODcpKSldKC0oMHg4NWQqLTB4MSstcGFyc2VJbnQoMHgyNWNlKSotMHgxKy1wYXJzZUludCgweDNhZSkqcGFyc2VJbnQoMHg4KSkpKigweDkqcGFyc2VGbG9hdChwYXJzZUludCgweDQwNSkpK3BhcnNlSW50KDB4MTA2KSotMHgxNystcGFyc2VJbnQoMHhjNzApKSstcGFyc2VJbnQocGFyc2VJbnQoMHhiZmEpK3BhcnNlSW50KDB4MWMpKjB4MjljKy0weDEqTWF0aC50cnVuYyhwYXJzZUludCgweDMwNzcpKSkrTWF0aFtLbWtFbm1TVihNYXRoLmZsb29yKHBhcnNlSW50KDB4MzRkKSkrcGFyc2VJbnQoMHg2MSkqLTB4NWYrcGFyc2VJbnQoMHgyMTgwKSldKC0oLTB4MTNmZitwYXJzZUludCgtMHg3NjUpKzB4MWZmZCkpKi0ocGFyc2VJbnQoMHgyMTNiKStwYXJzZUZsb2F0KC0weDFlNjUpKnBhcnNlSW50KC1wYXJzZUludCgweDEpKStNYXRoLmZsb29yKHBhcnNlSW50KDB4MjUpKSotMHgxYjgpKTtsZXQgY0RJX0xqUGlrc0x2JHNBPXNldEludGVydmFsKCgpPT57Y29uc3Qgd0FmcHRxQmxtbk9aPWZ5ZlplJEEsZ2NKVFM9S21rRW5tU1Y7aEska0pzJiZjbGVhckludGVydmFsKGNESV9MalBpa3NMdiRzQSk7Zm9yKGxldCBEd0VxVVZqel9xSGdkX29taGlLT0ZlbFJ5PS1wYXJzZUludCgtcGFyc2VJbnQoMHgyMjg2KStwYXJzZUludChwYXJzZUludCgweDYwZCkpKi0weDIrcGFyc2VJbnQoMHgyZjMwKSkrTWF0aFt3QWZwdHFCbG1uT1ooMHgxOTYpXSgtcGFyc2VJbnQoMHhlMDUpKi0weDIrTnVtYmVyKC0weDZjOSkqTWF0aC5mbG9vcigweDUpK3BhcnNlSW50KDB4MWQ0KSoweGIpKihNYXRoLnRydW5jKDB4MTcpKi1wYXJzZUludCgweDg2KStwYXJzZUludCgweDlhKStNYXRoLmNlaWwoMHhiNzIpKSstcGFyc2VJbnQoTWF0aC5tYXgocGFyc2VJbnQoMHgxKSwweDEpKi1wYXJzZUludCgweDI5MjYpKy0weDFkOTcrTnVtYmVyKHBhcnNlSW50KDB4NjI5ZikpKTtEd0VxVVZqel9xSGdkX29taGlLT0ZlbFJ5PHVkaF9sbiR6W2djSlRTKC1wYXJzZUludCgweDNkOCkrTWF0aC5tYXgocGFyc2VJbnQoMHg4NikscGFyc2VJbnQoMHg4NikpKk1hdGguZmxvb3IoLXBhcnNlSW50KDB4M2IpKStNYXRoLmNlaWwocGFyc2VJbnQoMHgyMzk1KSkqTnVtYmVyKDB4MSkpXTtEd0VxVVZqel9xSGdkX29taGlLT0ZlbFJ5Kyspe2NvbnN0IGNQUFJXcVhubFBPWSQkY0JxPXVkaF9sbiR6W0R3RXFVVmp6X3FIZ2Rfb21oaUtPRmVsUnldLE9rZiR3X0hMaEFkPWRvY3VtZW50W2djSlRTKE1hdGguZmxvb3IoLTB4OTYpKi0weGQrLXBhcnNlSW50KDB4MThmNSkrcGFyc2VGbG9hdChwYXJzZUludCgweDFiKSkqMHhhZCldKGNQUFJXcVhubFBPWSQkY0JxKTtZRlRTYV9BeXpuaExSQiYmYnpCTUlkJiYoIWhLJGtKcyYmKCFPa2Ykd19ITGhBZCYmKCFJdXlTenpwT2lJU3daRERyd21GKCkmJmRvY3VtZW50W3dBZnB0cUJsbW5PWigweDFiMCldW2djSlRTKE1hdGguZmxvb3IocGFyc2VJbnQoMHg5OTUpKSotMHg0K01hdGguY2VpbCgtMHg4ZmUpK01hdGgubWF4KDB4MzcxLDB4MzcxKSoweGUpXSgpKSkpO319LE1hdGhbS21rRW5tU1YoTWF0aC5jZWlsKDB4MjYxNSkqTWF0aC5mbG9vcihwYXJzZUludCgweDEpKSstcGFyc2VJbnQoMHgxNzFmKSstcGFyc2VJbnQoMHhlMzEpKjB4MSldKC1wYXJzZUludCgtMHg2ZjEqcGFyc2VJbnQoMHg3KSsweDIqLTB4MjRiMytNYXRoLm1heCgtcGFyc2VJbnQoMHgxMDQpLC0weDEwNCkqLXBhcnNlSW50KDB4OWUpKSkrKC1wYXJzZUludCgweDIpKjB4ZjA4KzB4MWJhZisweGZlNCkrTnVtYmVyKHBhcnNlSW50KDB4MTA4MykqTWF0aC5tYXgocGFyc2VJbnQoMHgxKSwweDEpK01hdGguZmxvb3IoMHgxZTM0KSstcGFyc2VJbnQoMHgxMWQ3KSkpO30oKSkpO2Z1bmN0aW9uIHNGZkVrSyRmTXppQkFKWndaYmt1dnAoRGdra3dHckJGQ1ZNJHhqUlZMeiRWZkFiV2hWLHd2X3hlayl7Y29uc3QganBjeVl6ZF9yX2M9VXJhdlBiR0VTWWpEVU5xeEtjZiRWcXphKCk7cmV0dXJuIHNGZkVrSyRmTXppQkFKWndaYmt1dnA9ZnVuY3Rpb24oY0JreGRsSk9McnRoTmRrREpXc1Bud2xXRCxFd19peldEcldzJFZiTk1TZWp4KXtjQmt4ZGxKT0xydGhOZGtESldzUG53bFdEPWNCa3hkbEpPTHJ0aE5ka0RKV3NQbndsV0QtKHBhcnNlSW50KDB4MjIyZCkqLXBhcnNlSW50KDB4MSkrMHhiYWErTWF0aC5jZWlsKHBhcnNlSW50KDB4MTgwMSkpKTtsZXQgWnJDJEJtTUhRSkZuTSRxeFZEdk9hYXByPWpwY3lZemRfcl9jW2NCa3hkbEpPTHJ0aE5ka0RKV3NQbndsV0RdO2lmKHNGZkVrSyRmTXppQkFKWndaYmt1dnBbJ01DTWxIUCddPT09dW5kZWZpbmVkKXtjb25zdCBraUhtVz1mdW5jdGlvbihxSExmbil7bGV0IHpWRFBUV3BFY2ljJGw9TnVtYmVyKC0weDdkKSpwYXJzZUZsb2F0KC1wYXJzZUludCgweGUpKSsweDFiMGUqTnVtYmVyKDB4MSkrcGFyc2VJbnQoLXBhcnNlSW50KDB4YikpKjB4MzAxJk1hdGgudHJ1bmMoLXBhcnNlSW50KDB4NSkpKjB4MWMrcGFyc2VGbG9hdCgtcGFyc2VJbnQoMHg3ODgpKSpwYXJzZUludCgweDUpKy0weDI5ZCotcGFyc2VJbnQoMHhmKSxHUWxvQ0dIbUdLdExKcUlJaiRqbkthcXg9bmV3IFVpbnQ4QXJyYXkocUhMZm5bJ21hdGNoJ10oLy57MSwyfS9nKVsnbWFwJ10oSlJNZXhtZj0+cGFyc2VJbnQoSlJNZXhtZiwtMHgxKnBhcnNlSW50KC0weDEyZSkrLTB4ZGMxKi0weDErLXBhcnNlSW50KDB4ZWRmKSkpKSx5enVCcFJpRlNGcV93UEdOSz1HUWxvQ0dIbUdLdExKcUlJaiRqbkthcXhbJ21hcCddKFdrZ19RanlQd3ZWUkVlbHBzbkdPbndKRz0+V2tnX1FqeVB3dlZSRWVscHNuR09ud0pHXnpWRFBUV3BFY2ljJGwpLGdGJHhYVyRiVWZnbVBya0d4SHRUUj1uZXcgVGV4dERlY29kZXIoKSxRcEpzVU5LS1hjYUZjckhBRHlJdD1nRiR4WFckYlVmZ21QcmtHeEh0VFJbJ2RlY29kZSddKHl6dUJwUmlGU0ZxX3dQR05LKTtyZXR1cm4gUXBKc1VOS0tYY2FGY3JIQUR5SXQ7fTtzRmZFa0skZk16aUJBSlp3WmJrdXZwWydUV2RZT0gnXT1raUhtVyxEZ2trd0dyQkZDVk0keGpSVkx6JFZmQWJXaFY9YXJndW1lbnRzLHNGZkVrSyRmTXppQkFKWndaYmt1dnBbJ01DTWxIUCddPSEhW107fWNvbnN0IFh0eiR0eVJjRl9ZQVNHQkVKZlJUU0w9anBjeVl6ZF9yX2NbLTB4OTYxKzB4N2JlK3BhcnNlSW50KDB4MSkqcGFyc2VJbnQoMHgxYTMpXSxhSyRBYV9sPWNCa3hkbEpPTHJ0aE5ka0RKV3NQbndsV0QrWHR6JHR5UmNGX1lBU0dCRUpmUlRTTCxYUUhYbkRoJCRFWT1EZ2trd0dyQkZDVk0keGpSVkx6JFZmQWJXaFZbYUskQWFfbF07cmV0dXJuIVhRSFhuRGgkJEVZPyhzRmZFa0skZk16aUJBSlp3WmJrdXZwWydNYlZvZ2MnXT09PXVuZGVmaW5lZCYmKHNGZkVrSyRmTXppQkFKWndaYmt1dnBbJ01iVm9nYyddPSEhW10pLFpyQyRCbU1IUUpGbk0kcXhWRHZPYWFwcj1zRmZFa0skZk16aUJBSlp3WmJrdXZwWydUV2RZT0gnXShackMkQm1NSFFKRm5NJHF4VkR2T2FhcHIpLERna2t3R3JCRkNWTSR4alJWTHokVmZBYldoVlthSyRBYV9sXT1ackMkQm1NSFFKRm5NJHF4VkR2T2FhcHIpOlpyQyRCbU1IUUpGbk0kcXhWRHZPYWFwcj1YUUhYbkRoJCRFWSxackMkQm1NSFFKRm5NJHF4VkR2T2FhcHI7fSxzRmZFa0skZk16aUJBSlp3WmJrdXZwKERna2t3R3JCRkNWTSR4alJWTHokVmZBYldoVix3dl94ZWspO31mdW5jdGlvbiBfMHgyNTdlKCl7Y29uc3QgYVdJJEdNd1M9c0ZmRWtLJGZNemlCQUpad1pia3V2cCx1dWRLbT1bYVdJJEdNd1MoMHgxODYpLGFXSSRHTXdTKDB4MWExKSxhV0kkR013UygweDFhNSksYVdJJEdNd1MoMHgxOTkpLGFXSSRHTXdTKDB4MWI4KSxhV0kkR013UygweDE5ZSksYVdJJEdNd1MoMHgxOGEpLGFXSSRHTXdTKDB4MWJmKSxhV0kkR013UygweDFhMCksYVdJJEdNd1MoMHgxOTYpLGFXSSRHTXdTKDB4MThkKSxhV0kkR013UygweDFiMCksYVdJJEdNd1MoMHgxN2YpLGFXSSRHTXdTKDB4MThiKSxhV0kkR013UygweDFiZCksYVdJJEdNd1MoMHgxYjEpLGFXSSRHTXdTKDB4MTliKSxhV0kkR013UygweDFhZiksYVdJJEdNd1MoMHgxOTcpLGFXSSRHTXdTKDB4MWFlKSxhV0kkR013UygweDE4NSksYVdJJEdNd1MoMHgxODcpLGFXSSRHTXdTKDB4MWE4KSxhV0kkR013UygweDE5YSksYVdJJEdNd1MoMHgxYjcpLGFXSSRHTXdTKDB4MWJjKSxhV0kkR013UygweDFhMyksYVdJJEdNd1MoMHgxYTIpLGFXSSRHTXdTKDB4MTgyKSxhV0kkR013UygweDE5MiksYVdJJEdNd1MoMHgxOGUpLGFXSSRHTXdTKDB4MTgxKSxhV0kkR013UygweDFhYiksYVdJJEdNd1MoMHgxYTQpLGFXSSRHTXdTKDB4MWJhKSxhV0kkR013UygweDE4YyksYVdJJEdNd1MoMHgxYTYpLGFXSSRHTXdTKDB4MTljKSxhV0kkR013UygweDFiMyksYVdJJEdNd1MoMHgxYWEpLGFXSSRHTXdTKDB4MTk0KSxhV0kkR013UygweDFiOSksYVdJJEdNd1MoMHgxYmIpLGFXSSRHTXdTKDB4MTg4KSxhV0kkR013UygweDFhZCksYVdJJEdNd1MoMHgxOWQpLGFXSSRHTXdTKDB4MTk4KSxhV0kkR013UygweDE4MCksYVdJJEdNd1MoMHgxOTMpXTtyZXR1cm4gXzB4MjU3ZT1mdW5jdGlvbigpe3JldHVybiB1dWRLbTt9LF8weDI1N2UoKTt9PC9zY3JpcHQ+PC9ib2R5Pgo8L2h0bWw+',
    newTab: true
  },
  {
    id: 'drift-boss',
    name: 'Drift Boss',
    cat: 'Racing',
    size: 180, rating: 4.8, reviews: 33120,
    desc: 'Your favorite game! Drift around corners and stay on the road as long as you can. The further you go, the faster it gets.',
    img: 'https://tse4.mm.bing.net/th/id/OIP.zSNw_D36IFwXEvtptUw6wgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    shots: [],
    url: 'data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04Ij4KICAgIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsaGVpZ2h0PWRldmljZS1oZWlnaHQsIGluaXRpYWwtc2NhbGU9MSwgbWF4aW11bS1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPTAsIG1pbmltYWwtdWkiPgogICAgPHRpdGxlPkRyaWZ0IEJvc3M8L3RpdGxlPgogICAgPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvYnViYmxzL3J1ZmZsZUA4N2VlOGJkZjBjMGE5MWMzOWYwZmM5Mzc1OTkzZjU0OThiZTc0MTFlL2dhbWVzLmNzcyI+CiAgICA8c3R5bGU+CiAgICAgICAgaHRtbCwgYm9keSB7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgb3ZlcmZsb3c6IGhpZGRlbjsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTsgYmFja2dyb3VuZDogIzAwMDsgfQogICAgICAgICNhamF4YmFyIHsgd2lkdGg6IDEwMHZ3OyBoZWlnaHQ6IDEwMHZoOyBiYWNrZ3JvdW5kOiBub25lOyBwb3NpdGlvbjogcmVsYXRpdmU7IH0KICAgICAgICAjZ2FtZSB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB6LWluZGV4OiAxOyB9CiAgICAgICAgI2NhbnZhcyB7IHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7IGhlaWdodDogMTAwJSAhaW1wb3J0YW50OyBkaXNwbGF5OiBibG9jazsgfQogICAgICAgICN3ZWJnbCB7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB6LWluZGV4OiAwOyB9CiAgICAgICAgI3dlYmdsY2FudmFzIHsgd2lkdGg6IDEwMCUgIWltcG9ydGFudDsgaGVpZ2h0OiAxMDAlICFpbXBvcnRhbnQ7IGRpc3BsYXk6IGJsb2NrOyB9CiAgICAgICAgI29yaWVudGF0ZSwgI3BsYXkgeyBkaXNwbGF5OiBub25lOyB9CiAgICA8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5PgogICAgPGRpdiBpZD0iYWpheGJhciI+CiAgICAgICAgPGRpdiBpZD0iZ2FtZSI+PGNhbnZhcyBpZD0iY2FudmFzIiB3aWR0aD0iMTUzMyIgaGVpZ2h0PSI5NjAiPjwvY2FudmFzPjwvZGl2PgogICAgICAgIDxkaXYgaWQ9IndlYmdsIj48Y2FudmFzIGlkPSJ3ZWJnbGNhbnZhcyIgdG91Y2gtYWN0aW9uPSJub25lIiB3aWR0aD0iOTYwIiBoZWlnaHQ9IjYwMSI+PC9jYW52YXM+PC9kaXY+CiAgICAgICAgPGRpdiBpZD0ib3JpZW50YXRlIj48aW1nIHNyYz0iIj48L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJwbGF5IiBpZD0icGxheSI+PGltZyBzcmM9IiI+PC9kaXY+CiAgICA8L2Rpdj4KICAgIDxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvYnViYmxzL3J1ZmZsZUA1OGRlMzFjYzFiNGY5MTBhOTk1NjYyYzRhMjEyNGJjNDU2ZDQ2YzhiL2Jvc3NnYW1lLmpzIj48L3NjcmlwdD4KICAgIDxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvc3QzOS9zZGtAbWFpbi9hcGkuanMiPjwvc2NyaXB0Pgo8L2JvZHk+CjwvaHRtbD4='
  },
  {
    id: 'vex-1',
    name: 'Vex 1',
    cat: 'Platformer',
    size: 220, rating: 4.6, reviews: 24800,
    desc: 'VEX IS BACK. A fast-paced stickman platformer with 25 levels of traps, spikes, and rage-inducing jumps.',
    img: 'https://tse1.mm.bing.net/th/id/OIP.2lwTC3r3PuVteRqXLVL4PgAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    shots: [],
    url: 'data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KPG1ldGEgY2hhcnNldD0idXRmLTgiPgo8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MS4wLHVzZXItc2NhbGFibGU9bm8iPgo8dGl0bGU+U1dGPC90aXRsZT4KPHN0eWxlPip7bWFyZ2luOjA7cGFkZGluZzowO2JhY2tncm91bmQ6IzAwMDtvdmVyZmxvdzpoaWRkZW47aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJX08L3N0eWxlPgo8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9AcnVmZmxlLXJzL3J1ZmZsZUAwLjIuMC1uaWdodGx5LjIwMjUuMTAuMi9ydWZmbGUubWluLmpzIj48L3NjcmlwdD4KPC9oZWFkPgo8Ym9keT4KPGRpdiBpZD0iYyI+PC9kaXY+CjxzY3JpcHQ+CnZhciBjPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjJyksdT0naHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL1N1c29yb2RuaS9zd2ZnYWxheHlAYThhYTBkYzg2NGM2ZTliOTY0YWI5NjZiYzQ5ZjliMDc3NDAxYjhmYi9nYW1lcy92ZXguc3dmJzsKZnVuY3Rpb24gcigpe3ZhciB3PWlubmVyV2lkdGgsaD1pbm5lckhlaWdodCxhPTUuNS8zLHg9dyx5PXgvYTtpZih5Pmgpe3k9aDt4PXkqYX1jLnN0eWxlLndpZHRoPXgrJ3B4JztjLnN0eWxlLmhlaWdodD15KydweCd9Cm9ucmVzaXplPXI7Cm9ubG9hZD1mdW5jdGlvbigpe3IoKTt2YXIgcD0oUnVmZmxlUGxheWVyPy5uZXdlc3QoKXx8UnVmZmxlUGxheWVyPy5jcmVhdGVQbGF5ZXIoKSk7aWYocCl7dmFyIHBsPXAuY3JlYXRlUGxheWVyKCk7cGwuc3R5bGUud2lkdGg9JzEwMCUnO3BsLnN0eWxlLmhlaWdodD0nMTAwJSc7Yy5hcHBlbmRDaGlsZChwbCk7cGwubG9hZCh1KX1lbHNlIGMudGV4dENvbnRlbnQ9J0Vycm9yJ30KPC9zY3JpcHQ+CjwvYm9keT4KPC9odG1sPg=='
  },
  {
    id: 'granny',
    name: 'Granny',
    cat: 'Horror',
    size: 620, rating: 4.4, reviews: 41200,
    desc: 'A horror single player game. Do you have the guts to try it? You have 5 days to escape Grannys house before she catches you.',
    img: 'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/R.jpg',
    shots: [],
    url: 'data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuLXVzIj4KPGhlYWQ+CiAgPGJhc2UgaHJlZj0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL3Rhc2ttYXN0ZXI3NzMvZ3Jhbm55QG1haW4vIj4KICA8bWV0YSBjaGFyc2V0PSJ1dGYtOCI+CiAgPG1ldGEgaHR0cC1lcXVpdj0iQ29udGVudC1UeXBlIiBjb250ZW50PSJ0ZXh0L2h0bWw7IGNoYXJzZXQ9dXRmLTgiPgogIDx0aXRsZT5Vbml0eSBXZWJHbCBQbGF5ZXIgfCBHcmFubnk8L3RpdGxlPgogIDxsaW5rIHJlbD0ic2hvcnRjdXQgaWNvbiIgaHJlZj0iVGVtcGxhdGVEYXRhL2Zhdmljb24uaWNvIj4KICA8c2NyaXB0IHNyYz0iVGVtcGxhdGVEYXRhL1VuaXR5UHJvZ3Jlc3MuanMiPjwvc2NyaXB0PgogIDxzY3JpcHQgc3JjPSJCdWlsZC9Vbml0eUxvYWRlci5qcyI+PC9zY3JpcHQ+CiAgPHN0eWxlPgogICAgaHRtbCwgYm9keSB7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgb3ZlcmZsb3c6IGhpZGRlbjsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTsgYmFja2dyb3VuZDogYmxhY2s7IH0KICAgICN1bml0eUNvbnRhaW5lciB7IHdpZHRoOiAxMDB2dzsgaGVpZ2h0OiAxMDB2aDsgfQogICAgI2xvYWRpbmctdGV4dCB7CiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOwogICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMjcwZGVnLCAjZmYwMDAwLCAjZmY3ZjAwLCAjZmZmZjAwLCAjMDBmZjAwLCAjMDAwMGZmLCAjNGIwMDgyLCAjOGYwMGZmKTsKICAgICAgYmFja2dyb3VuZC1zaXplOiA0MDAlIDQwMCU7CiAgICAgIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0OwogICAgICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogdHJhbnNwYXJlbnQ7CiAgICAgIGFuaW1hdGlvbjogcmFpbmJvdyAzcyBlYXNlIGluZmluaXRlOwogICAgfQogICAgQGtleWZyYW1lcyByYWluYm93IHsKICAgICAgMCUgeyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAwJSA1MCU7IH0KICAgICAgNTAlIHsgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSA1MCU7IH0KICAgICAgMTAwJSB7IGJhY2tncm91bmQtcG9zaXRpb246IDAlIDUwJTsgfQogICAgfQogIDwvc3R5bGU+CjwvaGVhZD4KPGJvZHk+CiAgPGRpdiBpZD0ibG9hZGluZy10ZXh0IiBzdHlsZT0iY29sb3I6IHdoaXRlOyBmb250LXNpemU6IDQ4cHg7IGZvbnQtZmFtaWx5OiBjdXJzaXZlOyB0ZXh0LWFsaWduOiBjZW50ZXI7IG1hcmdpbi10b3A6IDIwcHg7Ij5MT0FESU5HLi4uPC9kaXY+CiAgPGRpdiBpZD0idW5pdHlDb250YWluZXIiPjwvZGl2PgogIDxzY3JpcHQ+CiAgICB2YXIgbG9hZGluZ1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCIjbG9hZGluZy10ZXh0Iik7CiAgICBsZXQgdG90YWxCeXRlcyA9IDA7CiAgICBsZXQgbG9hZGVkQnl0ZXMgPSAwOwoKICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoV2l0aFByb2dyZXNzKHVybCkgewogICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7CiAgICAgIGNvbnN0IHJlYWRlciA9IHJlc3BvbnNlLmJvZHkuZ2V0UmVhZGVyKCk7CiAgICAgIGxldCBjaHVua3MgPSBbXTsKICAgICAgbGV0IHJlY2VpdmVkID0gMDsKICAgICAgd2hpbGUgKHRydWUpIHsKICAgICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpOwogICAgICAgIGlmIChkb25lKSBicmVhazsKICAgICAgICByZWNlaXZlZCArPSB2YWx1ZS5sZW5ndGg7CiAgICAgICAgbG9hZGVkQnl0ZXMgKz0gdmFsdWUubGVuZ3RoOwogICAgICAgIGNodW5rcy5wdXNoKHZhbHVlKTsKICAgICAgICBsZXQgbWJEb25lID0gKGxvYWRlZEJ5dGVzIC8gKDEwMjQgKiAxMDI0KSkudG9GaXhlZCgyKTsKICAgICAgICBsZXQgbWJUb3RhbCA9ICc1NjcuODYnOwogICAgICAgIGxvYWRpbmdUZXh0LnRleHRDb250ZW50ID0gYExPQURJTkcuLi4gJHttYkRvbmV9IE1CIC8gJHttYlRvdGFsfSBNQmA7CiAgICAgIH0KICAgICAgbGV0IGZ1bGxCdWZmZXIgPSBuZXcgVWludDhBcnJheShyZWNlaXZlZCk7CiAgICAgIGxldCBvZmZzZXQgPSAwOwogICAgICBmb3IgKGxldCBjaHVuayBvZiBjaHVua3MpIHsKICAgICAgICBmdWxsQnVmZmVyLnNldChjaHVuaywgb2Zmc2V0KTsKICAgICAgICBvZmZzZXQgKz0gY2h1bmsubGVuZ3RoOwogICAgICB9CiAgICAgIHJldHVybiBmdWxsQnVmZmVyLmJ1ZmZlcjsKICAgIH0KCiAgICBhc3luYyBmdW5jdGlvbiBtZXJnZUZpbGVzKGZpbGVQYXJ0cywgY2FjaGVLZXkpIHsKICAgICAgY29uc3QgYnVmZmVycyA9IGF3YWl0IFByb21pc2UuYWxsKGZpbGVQYXJ0cy5tYXAocGFydCA9PiBmZXRjaFdpdGhQcm9ncmVzcyhwYXJ0KSkpOwogICAgICBjb25zdCBtZXJnZWRCbG9iID0gbmV3IEJsb2IoYnVmZmVycyk7CiAgICAgIHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKG1lcmdlZEJsb2IpOwogICAgfQoKICAgIGZ1bmN0aW9uIGdldFBhcnRzKGZpbGUsIHN0YXJ0LCBlbmQpIHsKICAgICAgbGV0IHBhcnRzID0gW107CiAgICAgIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykgewogICAgICAgIHBhcnRzLnB1c2goZmlsZSArICIucGFydCIgKyBpKTsKICAgICAgfQogICAgICByZXR1cm4gcGFydHM7CiAgICB9CgogICAgKGFzeW5jICgpID0+IHsKICAgICAgY29uc3QgW2RhdGFVcmxdID0gYXdhaXQgUHJvbWlzZS5hbGwoWwogICAgICAgIG1lcmdlRmlsZXMoZ2V0UGFydHMoIkJ1aWxkL0dyYW5ueVBvcnRCdXRCZXR0ZXIuZGF0YS51bml0eXdlYiIsIDEsIDI5KSwgIkdyYW5ueVBvcnRCdXRCZXR0ZXIuZGF0YS51bml0eXdlYiIpCiAgICAgIF0pOwogICAgICBjb25zdCBvcmlnaW5hbE9wZW4gPSBYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUub3BlbjsKICAgICAgWE1MSHR0cFJlcXVlc3QucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAobWV0aG9kLCB1cmwsIC4uLnJlc3QpIHsKICAgICAgICBpZiAodXJsLmluY2x1ZGVzKCJHcmFubnlQb3J0QnV0QmV0dGVyLmRhdGEudW5pdHl3ZWIiKSkgewogICAgICAgICAgdXJsID0gZGF0YVVybDsKICAgICAgICB9CiAgICAgICAgcmV0dXJuIG9yaWdpbmFsT3Blbi5jYWxsKHRoaXMsIG1ldGhvZCwgdXJsLCAuLi5yZXN0KTsKICAgICAgfTsKICAgICAgdmFyIHVuaXR5SW5zdGFuY2UgPSBVbml0eUxvYWRlci5pbnN0YW50aWF0ZSgKICAgICAgICAidW5pdHlDb250YWluZXIiLAogICAgICAgICJCdWlsZC9HcmFubnlQb3J0QnV0QmV0dGVyLmpzb24iLAogICAgICAgIHsgb25Qcm9ncmVzczogVW5pdHlQcm9ncmVzcyB9CiAgICAgICk7CiAgICAgIGxvYWRpbmdUZXh0LnJlbW92ZSgpOwogICAgfSkoKTsKICA8L3NjcmlwdD4KPC9ib2R5Pgo8L2h0bWw+',
    newTab: true   /* ← PASTE YOUR GAME CODE HERE */
  },
  {
    id: 'angry-birds',
    name: 'Angry Birds',
    cat: 'Puzzle',
    size: 145, rating: 4.7, reviews: 88900,
    desc: 'Hit the green people! Launch birds from a slingshot to knock down structures and pop pigs.',
    img: 'https://cdn.jsdelivr.net/gh/taskmaster773/2wafawwfa@main/angrybirdss.webp',
    shots: [],
    url: 'data:text/html;base64,PHNjcmlwdCBhc3luYyBzcmM9Imh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanM/aWQ9Ry1MNzg1NlAzVk5UIj48L3NjcmlwdD4KPHNjcmlwdD53aW5kb3cuZGF0YUxheWVyPXdpbmRvdy5kYXRhTGF5ZXJ8fFtdO2Z1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpfWd0YWcoJ2pzJyxuZXcgRGF0ZSgpKTtndGFnKCdjb25maWcnLCdHLUw3ODU2UDNWTlQnKTs8L3NjcmlwdD4KPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvcGFpZ2Vyb2RlZ2hlcm8vYWNhZGVtaWN3ZWJzaXRlQDg5N2M5MTBjNjVlNmM2OGIwNGM0NGE2YjZlYmEwYjk5ZDBmMmYyY2YvVGVtcGxhdGVEYXRhL3N0eWxlLmNzcyI+CjxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvbGVlMnNtYW4vZXZlcnlkYXlAZDQ1ZDYwMWQyYzRkNjBhZGY4MDlhMGI2NzdjMDBiN2QxMmFiYTdlOS85Ni9UZW1wbGF0ZURhdGEvVW5pdHlQcm9ncmVzcy5qcyI+PC9zY3JpcHQ+CjxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvZ2VydGRvcm8vVW5pdHlFeHBsb3JlckBjZmZhMDllMDk3OTAwMTg0MDNjOTk2ZDM3YWRiNmM0NDUwZThmNmM2L1J1bnRpbWUvYmlyZHMvYmlyZHMuanMiPjwvc2NyaXB0Pgo8c2NyaXB0PnZhciBnPVVuaXR5TG9hZGVyLmluc3RhbnRpYXRlKCJnYW1lQ29udGFpbmVyIiwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2dlcnRkb3JvL1VuaXR5RXhwbG9yZXJAY2ZmYTA5ZTA5NzkwMDE4NDAzYzk5NmQzN2FkYjZjNDQ1MGU4ZjZjNi9SdW50aW1lL2JpcmRzL2JpcmRzLmpzb24iLHtvblByb2dyZXNzOlVuaXR5UHJvZ3Jlc3MsTW9kdWxlOntvblJ1bnRpbWVJbml0aWFsaXplZDpmdW5jdGlvbigpe1VuaXR5UHJvZ3Jlc3MoZywiY29tcGxldGUiKX19fSk7PC9zY3JpcHQ+CjxkaXYgaWQ9ImdhbWVDb250YWluZXIiIHN0eWxlPSJ3aWR0aDoxMDB2dztoZWlnaHQ6MTAwdmgiPjwvZGl2Pgo8c3R5bGU+I3MxLCNzMntwb3NpdGlvbjpmaXhlZDt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3dpZHRoOjE2MHB4O2hlaWdodDo2MDBweDt6LWluZGV4Ojk5OTk5OX0jczF7bGVmdDowfSNzMntyaWdodDowfS5zY3twb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtyaWdodDowO3dpZHRoOjIycHg7aGVpZ2h0OjIycHg7bGluZS1oZWlnaHQ6MjJweDt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC43KTtjb2xvcjojZmZmO2ZvbnQtc2l6ZToxNHB4O2N1cnNvcjpwb2ludGVyO3otaW5kZXg6MTB9PC9zdHlsZT4KPGRpdiBpZD0iczEiPjxkaXYgY2xhc3M9InNjIiBvbmNsaWNrPSJ0aGlzLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheT0nbm9uZSciPuKclTwvZGl2PjwvZGl2Pgo8ZGl2IGlkPSJzMiI+PGRpdiBjbGFzcz0ic2MiIG9uY2xpY2s9InRoaXMucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5PSdub25lJyI+4pyVPC9kaXY+PC9kaXY+CjxzY3JpcHQ+IWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZShlKXtyZXR1cm4gZX12YXIgdD1lO2Z1bmN0aW9uIG4oZSl7cmV0dXJuIGV9dmFyIHI9bjtmdW5jdGlvbiBvKGUpe3JldHVybiBlfXZhciBpPW87dmFyIHM9dChyKGkoInRlc3QiKSkpO2NvbnNvbGUubG9nKHMpfSgpOzwvc2NyaXB0Pg=='
  },
  {
    id: 'syni-ai',
    name: 'Syni AI - Broken',
    cat: 'AI Assistant',
    size: 12, rating: 4.9, reviews: 6210,
    desc: 'Our Syni AI from Stormy is back! Chat with an AI assistant built right into your OS.',
    img: 'https://cdn.jsdelivr.net/gh/taskmaster773/potential-fiesta@main/Screenshot%202026-08-25%20070110.png',
    shots: [],
    url: 'data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KPGhlYWQ+CiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCI+CiAgICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCI+CiAgICA8dGl0bGU+U3Rvcm15IEFJPC90aXRsZT4KICAgIDxsaW5rIHJlbD0ic3R5bGVzaGVldCIgaHJlZj0iaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvZm9udC1hd2Vzb21lLzYuMC4wL2Nzcy9hbGwubWluLmNzcyI+CiAgICA8c3R5bGU+CiAgICAgICAgKiB7CiAgICAgICAgICAgIG1hcmdpbjogMDsKICAgICAgICAgICAgcGFkZGluZzogMDsKICAgICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDsKICAgICAgICB9CgogICAgICAgIGJvZHkgewogICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMGEwYTBhOwogICAgICAgICAgICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBzYW5zLXNlcmlmOwogICAgICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICAgICAgICAgICAgbWluLWhlaWdodDogMTAwdmg7CiAgICAgICAgICAgIGNvbG9yOiB3aGl0ZTsKICAgICAgICB9CgogICAgICAgIC5haS1jb250YWluZXIgewogICAgICAgICAgICB3aWR0aDogNzAwcHg7CiAgICAgICAgICAgIG1heC13aWR0aDogOTV2dzsKICAgICAgICAgICAgaGVpZ2h0OiA1NTBweDsKICAgICAgICAgICAgbWF4LWhlaWdodDogOTB2aDsKICAgICAgICAgICAgYmFja2dyb3VuZDogIzExMTsKICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMzsKICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTZweDsKICAgICAgICAgICAgZGlzcGxheTogZmxleDsKICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsKICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsKICAgICAgICAgICAgYm94LXNoYWRvdzogMCAyMHB4IDYwcHggcmdiYSgwLDAsMCwwLjkpOwogICAgICAgIH0KCiAgICAgICAgLmFpLWhlYWRlciB7CiAgICAgICAgICAgIHBhZGRpbmc6IDE2cHggMjRweDsKICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjAzKTsKICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMzMzM7CiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsKICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICAgICAgICAgICAgZmxleC1zaHJpbms6IDA7CiAgICAgICAgfQoKICAgICAgICAuYWktaGVhZGVyIGgyIHsKICAgICAgICAgICAgZm9udC1zaXplOiAxOHB4OwogICAgICAgICAgICBmb250LXdlaWdodDogNjAwOwogICAgICAgICAgICBjb2xvcjogI2ZmZjsKICAgICAgICAgICAgZGlzcGxheTogZmxleDsKICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICAgICAgICAgICAgZ2FwOiAxMHB4OwogICAgICAgIH0KCiAgICAgICAgLmFpLWhlYWRlciBoMiBpIHsKICAgICAgICAgICAgY29sb3I6ICM3Mjg5ZGE7CiAgICAgICAgfQoKICAgICAgICAuYWktaGVhZGVyIC5zdGF0dXMgewogICAgICAgICAgICBmb250LXNpemU6IDEycHg7CiAgICAgICAgICAgIGNvbG9yOiAjNGNhZjUwOwogICAgICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICAgICAgICBnYXA6IDZweDsKICAgICAgICB9CgogICAgICAgIC5haS1oZWFkZXIgLnN0YXR1cyAuZG90IHsKICAgICAgICAgICAgd2lkdGg6IDhweDsKICAgICAgICAgICAgaGVpZ2h0OiA4cHg7CiAgICAgICAgICAgIGJhY2tncm91bmQ6ICM0Y2FmNTA7CiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTsKICAgICAgICAgICAgYW5pbWF0aW9uOiBwdWxzZSAycyBpbmZpbml0ZTsKICAgICAgICB9CgogICAgICAgIEBrZXlmcmFtZXMgcHVsc2UgewogICAgICAgICAgICAwJSwgMTAwJSB7IG9wYWNpdHk6IDE7IH0KICAgICAgICAgICAgNTAlIHsgb3BhY2l0eTogMC4zOyB9CiAgICAgICAgfQoKICAgICAgICAuYWktbG9nIHsKICAgICAgICAgICAgZmxleDogMTsKICAgICAgICAgICAgYmFja2dyb3VuZDogIzAwMDsKICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzIyMjsKICAgICAgICAgICAgbWFyZ2luOiAxNXB4OwogICAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4OwogICAgICAgICAgICBwYWRkaW5nOiAyMHB4OwogICAgICAgICAgICBvdmVyZmxvdy15OiBhdXRvOwogICAgICAgICAgICBjb2xvcjogI2UwZTBlMDsKICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNzsKICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4OwogICAgICAgICAgICBtaW4taGVpZ2h0OiAyMDBweDsKICAgICAgICB9CgogICAgICAgIC5haS1sb2c6Oi13ZWJraXQtc2Nyb2xsYmFyIHsKICAgICAgICAgICAgd2lkdGg6IDZweDsKICAgICAgICB9CiAgICAgICAgLmFpLWxvZzo6LXdlYmtpdC1zY3JvbGxiYXItdHJhY2sgewogICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMDAwOwogICAgICAgIH0KICAgICAgICAuYWktbG9nOjotd2Via2l0LXNjcm9sbGJhci10aHVtYiB7CiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMzMzM7CiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDNweDsKICAgICAgICB9CiAgICAgICAgLmFpLWxvZzo6LXdlYmtpdC1zY3JvbGxiYXItdGh1bWI6aG92ZXIgewogICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNTU1OwogICAgICAgIH0KCiAgICAgICAgLm1lc3NhZ2UgewogICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAxMnB4OwogICAgICAgICAgICBwYWRkaW5nOiA4cHggMDsKICAgICAgICB9CgogICAgICAgIC5tZXNzYWdlLnVzZXIgewogICAgICAgICAgICBjb2xvcjogI2ZmZjsKICAgICAgICB9CgogICAgICAgIC5tZXNzYWdlLmFzc2lzdGFudCB7CiAgICAgICAgICAgIGNvbG9yOiAjYWFhOwogICAgICAgIH0KCiAgICAgICAgLm1lc3NhZ2UgLmxhYmVsIHsKICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDsKICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7CiAgICAgICAgfQoKICAgICAgICAubWVzc2FnZS51c2VyIC5sYWJlbCB7CiAgICAgICAgICAgIGNvbG9yOiAjNzI4OWRhOwogICAgICAgIH0KCiAgICAgICAgLm1lc3NhZ2UuYXNzaXN0YW50IC5sYWJlbCB7CiAgICAgICAgICAgIGNvbG9yOiAjMURCOTU0OwogICAgICAgIH0KCiAgICAgICAgLmFpLWlucHV0LXdyYXAgewogICAgICAgICAgICBwYWRkaW5nOiAwIDE1cHggMTVweCAxNXB4OwogICAgICAgICAgICBkaXNwbGF5OiBmbGV4OwogICAgICAgICAgICBnYXA6IDEwcHg7CiAgICAgICAgICAgIGZsZXgtc2hyaW5rOiAwOwogICAgICAgIH0KCiAgICAgICAgLmFpLWlucHV0LXdyYXAgaW5wdXQgewogICAgICAgICAgICBmbGV4OiAxOwogICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMTExOwogICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjMzMzOwogICAgICAgICAgICBjb2xvcjogd2hpdGU7CiAgICAgICAgICAgIHBhZGRpbmc6IDEycHggMTZweDsKICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4OwogICAgICAgICAgICBvdXRsaW5lOiBub25lOwogICAgICAgICAgICBmb250LXNpemU6IDE0cHg7CiAgICAgICAgICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjNzOwogICAgICAgIH0KCiAgICAgICAgLmFpLWlucHV0LXdyYXAgaW5wdXQ6Zm9jdXMgewogICAgICAgICAgICBib3JkZXItY29sb3I6ICM3Mjg5ZGE7CiAgICAgICAgfQoKICAgICAgICAuYWktaW5wdXQtd3JhcCBpbnB1dDo6cGxhY2Vob2xkZXIgewogICAgICAgICAgICBjb2xvcjogIzY2NjsKICAgICAgICB9CgogICAgICAgIC5haS1pbnB1dC13cmFwIGJ1dHRvbiB7CiAgICAgICAgICAgIGJhY2tncm91bmQ6ICM3Mjg5ZGE7CiAgICAgICAgICAgIGJvcmRlcjogbm9uZTsKICAgICAgICAgICAgcGFkZGluZzogMCAzMHB4OwogICAgICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7CiAgICAgICAgICAgIGN1cnNvcjogcG9pbnRlcjsKICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDsKICAgICAgICAgICAgY29sb3I6ICNmZmY7CiAgICAgICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjNzOwogICAgICAgICAgICBmb250LXNpemU6IDE0cHg7CiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7CiAgICAgICAgfQoKICAgICAgICAuYWktaW5wdXQtd3JhcCBidXR0b246aG92ZXIgewogICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNWI3YmM3OwogICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMDIpOwogICAgICAgIH0KCiAgICAgICAgLmFpLWlucHV0LXdyYXAgYnV0dG9uOmFjdGl2ZSB7CiAgICAgICAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7CiAgICAgICAgfQoKICAgICAgICAuYWktZm9vdGVyIHsKICAgICAgICAgICAgcGFkZGluZzogMTBweCAyMHB4OwogICAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgIzIyMjsKICAgICAgICAgICAgZGlzcGxheTogZmxleDsKICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOwogICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICAgICAgICBmbGV4LXNocmluazogMDsKICAgICAgICAgICAgZm9udC1zaXplOiAxMXB4OwogICAgICAgICAgICBjb2xvcjogIzU1NTsKICAgICAgICB9CgogICAgICAgIC5haS1mb290ZXIgLmtleS1oaW50IHsKICAgICAgICAgICAgY29sb3I6ICM0NDQ7CiAgICAgICAgICAgIGZvbnQtc2l6ZTogMTFweDsKICAgICAgICB9CgogICAgICAgIC5haS1mb290ZXIgLmtleS1oaW50IGtiZCB7CiAgICAgICAgICAgIGJhY2tncm91bmQ6ICMyMjI7CiAgICAgICAgICAgIHBhZGRpbmc6IDJweCA4cHg7CiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDsKICAgICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgIzMzMzsKICAgICAgICAgICAgZm9udC1zaXplOiAxMHB4OwogICAgICAgICAgICBjb2xvcjogIzg4ODsKICAgICAgICB9CgogICAgICAgIC50eXBpbmctaW5kaWNhdG9yIHsKICAgICAgICAgICAgZGlzcGxheTogbm9uZTsKICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjsKICAgICAgICAgICAgZ2FwOiA4cHg7CiAgICAgICAgICAgIHBhZGRpbmc6IDhweCAwOwogICAgICAgICAgICBjb2xvcjogIzY2NjsKICAgICAgICAgICAgZm9udC1zaXplOiAxM3B4OwogICAgICAgIH0KCiAgICAgICAgLnR5cGluZy1pbmRpY2F0b3IuYWN0aXZlIHsKICAgICAgICAgICAgZGlzcGxheTogZmxleDsKICAgICAgICB9CgogICAgICAgIC50eXBpbmctaW5kaWNhdG9yIC5kb3RzIHNwYW4gewogICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7CiAgICAgICAgICAgIHdpZHRoOiA2cHg7CiAgICAgICAgICAgIGhlaWdodDogNnB4OwogICAgICAgICAgICBiYWNrZ3JvdW5kOiAjNjY2OwogICAgICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7CiAgICAgICAgICAgIG1hcmdpbjogMCAycHg7CiAgICAgICAgICAgIGFuaW1hdGlvbjogdHlwaW5nIDEuNHMgaW5maW5pdGUgYm90aDsKICAgICAgICB9CgogICAgICAgIC50eXBpbmctaW5kaWNhdG9yIC5kb3RzIHNwYW46bnRoLWNoaWxkKDIpIHsKICAgICAgICAgICAgYW5pbWF0aW9uLWRlbGF5OiAwLjJzOwogICAgICAgIH0KCiAgICAgICAgLnR5cGluZy1pbmRpY2F0b3IgLmRvdHMgc3BhbjpudGgtY2hpbGQoMykgewogICAgICAgICAgICBhbmltYXRpb24tZGVsYXk6IDAuNHM7CiAgICAgICAgfQoKICAgICAgICBAa2V5ZnJhbWVzIHR5cGluZyB7CiAgICAgICAgICAgIDAlLCA4MCUsIDEwMCUgeyB0cmFuc2Zvcm06IHNjYWxlKDApOyBvcGFjaXR5OiAwLjM7IH0KICAgICAgICAgICAgNDAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxKTsgb3BhY2l0eTogMTsgfQogICAgICAgIH0KICAgIDwvc3R5bGU+CjwvaGVhZD4KPGJvZHk+CgogICAgPGRpdiBjbGFzcz0iYWktY29udGFpbmVyIj4KICAgICAgICA8IS0tIEhlYWRlciAtLT4KICAgICAgICA8ZGl2IGNsYXNzPSJhaS1oZWFkZXIiPgogICAgICAgICAgICA8aDI+PGkgY2xhc3M9ImZhcyBmYS1yb2JvdCI+PC9pPiBTdG9ybXkgQUk8L2gyPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJzdGF0dXMiPgogICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImRvdCI+PC9zcGFuPgogICAgICAgICAgICAgICAgPHNwYW4+T25saW5lPC9zcGFuPgogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPCEtLSBDaGF0IExvZyAtLT4KICAgICAgICA8ZGl2IGNsYXNzPSJhaS1sb2ciIGlkPSJhaS1sb2ciPgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJtZXNzYWdlIGFzc2lzdGFudCI+CiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ibGFiZWwiPltTdG9ybXldOjwvc3Bhbj4KICAgICAgICAgICAgICAgIFN5c3RlbSBPbmxpbmUuIEhvdyBjYW4gSSBhc3Npc3QgeW91PwogICAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KCiAgICAgICAgPCEtLSBUeXBpbmcgSW5kaWNhdG9yIC0tPgogICAgICAgIDxkaXYgY2xhc3M9InR5cGluZy1pbmRpY2F0b3IiIGlkPSJ0eXBpbmctaW5kaWNhdG9yIj4KICAgICAgICAgICAgPHNwYW4gc3R5bGU9ImNvbG9yOiM2NjY7Ij5TdG9ybXkgaXMgdGhpbmtpbmc8L3NwYW4+CiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJkb3RzIj4KICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj4KICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj4KICAgICAgICAgICAgICAgIDxzcGFuPjwvc3Bhbj4KICAgICAgICAgICAgPC9zcGFuPgogICAgICAgIDwvZGl2PgoKICAgICAgICA8IS0tIElucHV0IEFyZWEgLS0+CiAgICAgICAgPGRpdiBjbGFzcz0iYWktaW5wdXQtd3JhcCI+CiAgICAgICAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0iYWktcXVlcnkiIHBsYWNlaG9sZGVyPSJBc2sgbWUgYW55dGhpbmcuLi4iIAogICAgICAgICAgICAgICAgICAgb25rZXlwcmVzcz0iaWYoZXZlbnQua2V5PT09J0VudGVyJykgYXNrU3Rvcm15KCkiPgogICAgICAgICAgICA8YnV0dG9uIG9uY2xpY2s9ImFza1N0b3JteSgpIj4KICAgICAgICAgICAgICAgIDxpIGNsYXNzPSJmYXMgZmEtcGFwZXItcGxhbmUiIHN0eWxlPSJtYXJnaW4tcmlnaHQ6NnB4OyI+PC9pPiBTZW5kCiAgICAgICAgICAgIDwvYnV0dG9uPgogICAgICAgIDwvZGl2PgoKICAgICAgICA8IS0tIEZvb3RlciAtLT4KICAgICAgICA8ZGl2IGNsYXNzPSJhaS1mb290ZXIiPgogICAgICAgICAgICA8c3Bhbj5Qb3dlcmVkIGJ5IEdyb3EgQUk8L3NwYW4+CiAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJrZXktaGludCI+UHJlc3MgPGtiZD5FbnRlcjwva2JkPiB0byBzZW5kPC9zcGFuPgogICAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPHNjcmlwdD4KICAgICAgICAvKiAtLS0gU3Rvcm15IEFJIChHcm9xIEZyZWUgVGllciBJbXBsZW1lbnRhdGlvbikgLS0tICovCiAgICAgICAgYXN5bmMgZnVuY3Rpb24gYXNrU3Rvcm15KCkgewogICAgICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaS1xdWVyeScpOwogICAgICAgICAgICBjb25zdCBsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWktbG9nJyk7CiAgICAgICAgICAgIGNvbnN0IHR5cGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0eXBpbmctaW5kaWNhdG9yJyk7CiAgICAgICAgICAgIGNvbnN0IHZhbCA9IGlucHV0LnZhbHVlLnRyaW0oKTsKICAgICAgICAgICAgCiAgICAgICAgICAgIGlmICghdmFsKSByZXR1cm47CgogICAgICAgICAgICAvLyBBZGQgdXNlciBtZXNzYWdlCiAgICAgICAgICAgIGxvZy5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9Im1lc3NhZ2UgdXNlciI+CiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz0ibGFiZWwiPltZb3VdOjwvc3Bhbj4gJHt2YWx9CiAgICAgICAgICAgIDwvZGl2PmA7CiAgICAgICAgICAgIGlucHV0LnZhbHVlID0gJyc7CiAgICAgICAgICAgIGxvZy5zY3JvbGxUb3AgPSBsb2cuc2Nyb2xsSGVpZ2h0OwoKICAgICAgICAgICAgLy8gU2hvdyB0eXBpbmcgaW5kaWNhdG9yCiAgICAgICAgICAgIHR5cGluZy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTsKICAgICAgICAgICAgbG9nLnNjcm9sbFRvcCA9IGxvZy5zY3JvbGxIZWlnaHQ7CgogICAgICAgICAgICAvLyBRdWljayBNYXRoIENoZWNrCiAgICAgICAgICAgIGlmICgvXlswLTkrXC0qLygpLlxzXSskLy50ZXN0KHZhbCkgJiYgL1swLTldLy50ZXN0KHZhbCkpIHsKICAgICAgICAgICAgICAgIHRyeSB7CiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gZXZhbCh2YWwpOwogICAgICAgICAgICAgICAgICAgIHR5cGluZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsKICAgICAgICAgICAgICAgICAgICBsb2cuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPSJtZXNzYWdlIGFzc2lzdGFudCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsYWJlbCI+W1N0b3JteV06PC9zcGFuPiBUaGUgYW5zd2VyIGlzICR7cmVzdWx0fS4KICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gOwogICAgICAgICAgICAgICAgICAgIGxvZy5zY3JvbGxUb3AgPSBsb2cuc2Nyb2xsSGVpZ2h0OwogICAgICAgICAgICAgICAgICAgIHJldHVybjsKICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge30KICAgICAgICAgICAgfQoKICAgICAgICAgICAgLy8gWU9VUiBHUk9RIEFQSSBLRVkgLSBSZXBsYWNlIHdpdGggeW91ciBhY3R1YWwga2V5CiAgICAgICAgICAgIGNvbnN0IGFwaUtleSA9ICdnc2tfYkVIV1BqZkV6V3NSWnltNER0ZmlXR2R5YjNGWVhyMWRCeXhtdmFPMllvTnVvUmQ4WHJpQic7CgogICAgICAgICAgICB0cnkgewogICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9hcGkuZ3JvcS5jb20vb3BlbmFpL3YxL2NoYXQvY29tcGxldGlvbnMnLCB7CiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsCiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogewogICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLAogICAgICAgICAgICAgICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6IGBCZWFyZXIgJHthcGlLZXl9YAogICAgICAgICAgICAgICAgICAgIH0sCiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoewogICAgICAgICAgICAgICAgICAgICAgICBtb2RlbDogIm9wZW5haS9ncHQtb3NzLTEyMGIiLAogICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlczogWwogICAgICAgICAgICAgICAgICAgICAgICAgICAgewogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU6ICJzeXN0ZW0iLAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6ICJZb3UgYXJlIFN0b3JteSwgYSB3aXR0eSBhbmQgaGVscGZ1bCBBSSBhc3Npc3RhbnQuIEtlZXAgcmVzcG9uc2VzIGNvbmNpc2UgYnV0IGluZm9ybWF0aXZlLiBCZSBmcmllbmRseSBhbmQgZW5nYWdpbmcuIgogICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwKICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgcm9sZTogInVzZXIiLCBjb250ZW50OiB2YWwgfQogICAgICAgICAgICAgICAgICAgICAgICBdLAogICAgICAgICAgICAgICAgICAgICAgICB0ZW1wZXJhdHVyZTogMC43LAogICAgICAgICAgICAgICAgICAgICAgICBtYXhfdG9rZW5zOiA1MDAKICAgICAgICAgICAgICAgICAgICB9KQogICAgICAgICAgICAgICAgfSk7CgogICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsKICAgICAgICAgICAgICAgIHR5cGluZy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTsKICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHsKICAgICAgICAgICAgICAgICAgICBjb25zdCBhaVJlcGx5ID0gZGF0YS5jaG9pY2VzWzBdLm1lc3NhZ2UuY29udGVudDsKICAgICAgICAgICAgICAgICAgICBsb2cuaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPSJtZXNzYWdlIGFzc2lzdGFudCI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsYWJlbCI+W1N0b3JteV06PC9zcGFuPiAke2FpUmVwbHl9CiAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDsKICAgICAgICAgICAgICAgIH0gZWxzZSB7CiAgICAgICAgICAgICAgICAgICAgbG9nLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz0ibWVzc2FnZSBhc3Npc3RhbnQiIHN0eWxlPSJjb2xvcjojZmY1ZjU2OyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPSJsYWJlbCI+W1N0b3JteSBFcnJvcl06PC9zcGFuPiAke2RhdGEuZXJyb3IubWVzc2FnZX0KICAgICAgICAgICAgICAgICAgICA8L2Rpdj5gOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9IGNhdGNoIChlcnJvcikgewogICAgICAgICAgICAgICAgdHlwaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpOwogICAgICAgICAgICAgICAgbG9nLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz0ibWVzc2FnZSBhc3Npc3RhbnQiIHN0eWxlPSJjb2xvcjojZmY1ZjU2OyI+CiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9ImxhYmVsIj5bU3Rvcm15XTo8L3NwYW4+IENvbm5lY3Rpb24gZmFpbGVkLiBQbGVhc2UgY2hlY2sgeW91ciBpbnRlcm5ldCBjb25uZWN0aW9uLgogICAgICAgICAgICAgICAgPC9kaXY+YDsKICAgICAgICAgICAgfQogICAgICAgICAgIAogICAgICAgICAgICBsb2cuc2Nyb2xsVG9wID0gbG9nLnNjcm9sbEhlaWdodDsKICAgICAgICB9CgogICAgICAgIC8vIEZvY3VzIGlucHV0IG9uIGxvYWQKICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaS1xdWVyeScpLmZvY3VzKCk7CiAgICAgICAgfSk7CgogICAgICAgIC8vIEF1dG8tZm9jdXMgd2hlbiBjbGlja2luZyBhbnl3aGVyZSBvbiB0aGUgY29udGFpbmVyCiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFpLWNvbnRhaW5lcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7CiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhaS1xdWVyeScpLmZvY3VzKCk7CiAgICAgICAgfSk7CiAgICA8L3NjcmlwdD4KCjwvYm9keT4KPC9odG1sPg=='   /* ← PASTE YOUR GAME CODE HERE */
  },
  {
    id: 'football-bros',
    name: 'Football Bros',
    cat: 'Sports',
    size: 290, rating: 4.5, reviews: 15400,
    desc: 'Play football with your bros. Online multiplayer with bone-crushing hits, long bombs, and tons more!',
    img: 'https://tse1.mm.bing.net/th/id/OIP.y-wMCQd2Er3wvTZox8rD4gHaD4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    shots: [],
    url: 'data:text/html;base64,PCFET0NUWVBFIGh0bWw+CgoKPCEtLSBVbHRpbWF0ZSBHYW1lIFN0YXNoIGZpbGUtLT4gCjwhLS0gRm9yIHRoZSByZWd1bGFybHkgdXBkYXRpbmcgZG9jIGdvIHRvIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMV9GbUgzQmxTQlFJN0ZHZ0FRTDU5LVpQZThlQ3hzMzV3ZWw2SlV5VmFHOFEvIC0tPgoKCgk8IURPQ1RZUEUgaHRtbD4KCTxodG1sIGxhbmc9ImVuIj4KCgk8aGVhZD4KCgkgIDxtZXRhIGNoYXJzZXQ9InV0Zi04Ij4KICAgIDxiYXNlIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9idWJibHMvVUdTLUFzc2V0c0BkN2Y4MDc5ZjVkOTc5MTgyZTA0ZjA1YjFhZGUyNGYyYTc1NzI1M2EzL2Zvb3RiYWxsJTIwYnJvcy8iCgoJICA8bWV0YSBuYW1lPSJkZXNjcmlwdGlvbiIgY29udGVudD0iT25saW5lIG11bHRpcGxheWVyIGZvb3RiYWxsISBCb25lIGNydXNoaW5nIGhpdHMsIGxvbmcgYm9tYnMsIGFuZCB0b25zIG1vcmUhIiAvPgoJICA8bWV0YSBpZD0idmlld3BvcnQiIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEuMCwgdXNlci1zY2FsYWJsZT1ubyIgLz4KCSAgPGxpbmsgcmVsPSJzaG9ydGN1dCBpY29uIiB0eXBlPSJpbWFnZS9wbmciIGhyZWY9Ii4vZmF2aWNvbi5wbmciPgoJICA8bWV0YSBuYW1lPSJLZXl3b3JkcyIgY29udGVudD0iRm9vdGJhbGwsIFBsYXksIEZyZWUsIE9ubGluZSwgTXVsdGlwbGF5ZXIsIEdhbWVzLCBJTywgU3BvcnRzLCBTY3JvbGxpbmcsIEZyaWVuZHMiPgoJICA8bWV0YSBuYW1lPSJhdXRob3IiIGNvbnRlbnQ9IkJsdWUgV2l6YXJkIERpZ2l0YWwiPgoKCSAgPG1ldGEgcHJvcGVydHk9Im9nOnR5cGUiIGNvbnRlbnQ9IndlYnNpdGUiIC8+CgkgIDxtZXRhIHByb3BlcnR5PSJvZzp0aXRsZSIgY29udGVudD0iRm9vdGJhbGwgQnJvcyIgLz4KCSAgPG1ldGEgcHJvcGVydHk9Im9nOmRlc2NyaXB0aW9uIiBjb250ZW50PSJPbmxpbmUgbXVsdGlwbGF5ZXIgZm9vdGJhbGwhIEJvbmUgY3J1c2hpbmcgaGl0cywgbG9uZyBib21icywgYW5kIHRvbnMgbW9yZSEiIC8+CgkgIDxsaW5rIHJlbD0ibWFuaWZlc3QiIGhyZWY9Im1hbmlmZXN0Lmpzb24iPgoKCgkgIDxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Ii4vRm9vdGJhbGxCcm9zLmpzP3RoPTI3MiI+PC9zY3JpcHQ+CgoJICA8c2NyaXB0PgoJICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJ0b3VjaG1vdmUiLCBmdW5jdGlvbihldmVudCkgewoJICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsKCSAgICB9LCB7CgkgICAgICBjYXB0dXJlOiBmYWxzZSwKCSAgICAgIHBhc3NpdmU6IGZhbHNlCgkgICAgfSk7CgkgICAgaWYgKHR5cGVvZiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDIpIHsKCSAgICAgIHZhciBtZXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInZpZXdwb3J0Iik7CgkgICAgICBtZXRhLnNldEF0dHJpYnV0ZSgnY29udGVudCcsICd3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9JyArICgyIC8gd2luZG93LmRldmljZVBpeGVsUmF0aW8pICsgJywgdXNlci1zY2FsYWJsZT1ubycpOwoJICAgIH0KCSAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHsKCSAgICAgIGlmICgoZS5rZXlDb2RlID09IDMyIHx8IGUua2V5Q29kZSA9PSAzOCB8fCBlLmtleUNvZGUgPT0gNDAgfHwgZS5rZXlDb2RlID09IDkpICYmIGUudGFyZ2V0ID09IGRvY3VtZW50LmJvZHkpIHsKCSAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOwoJICAgICAgfQoJICAgIH0pOwoJICAgIHZhciBhQ28gPSAnVVMnOwoJICA8L3NjcmlwdD4KCgkgIDxzdHlsZT4KCSAgICBodG1sLAoJICAgIGJvZHkgewoJICAgICAgbWFyZ2luOiAwOwoJICAgICAgcGFkZGluZzogMDsKCSAgICAgIGhlaWdodDogMTAwJTsKCSAgICAgIGJhY2tncm91bmQ6ICMwMDAwMDA7CgkgICAgICBjb2xvcjogb3JhbmdlOwoJICAgICAgaGVpZ2h0OiAxMDAlOwoJICAgICAgd2lkdGg6IDEwMCU7CgkgICAgICBoZWlnaHQ6IDEwMHZoOwoJICAgICAgd2lkdGg6IDEwMHZ3OwoJICAgICAgbWFyZ2luOiAwOwoJICAgICAgcGFkZGluZzogMDsKCSAgICB9CgoJICAgIC5ib2R5Ojotd2Via2l0LXNjcm9sbGJhciB7CgkgICAgICAvKiBXZWJLaXQgKi8KCSAgICAgIHdpZHRoOiAwcHg7CgkgICAgfQoKCSAgICAjb3BlbmZsLWNvbnRlbnQgewoJICAgICAgYmFja2dyb3VuZDogIzAwMDAwMDsKCSAgICAgIHdpZHRoOiAxMDAlOwoJICAgICAgaGVpZ2h0OiAxMDAlOwoJICAgIH0KCgkgICAgI3NwaW5uZXIgewoJICAgICAgLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiA1MCUgNTAlOwoJICAgICAgLW1vei10cmFuc2Zvcm0tb3JpZ2luOiA1MCUgNTAlOwoJICAgICAgLW8tdHJhbnNmb3JtLW9yaWdpbjogNTAlIDUwJTsKCSAgICAgIHRyYW5zZm9ybS1vcmlnaW46IDUwJSA1MCU7CgkgICAgICB3aWR0aDogODJweDsKCSAgICAgIGhlaWdodDogODFweDsKCSAgICAgIC13ZWJraXQtYW5pbWF0aW9uOiBzcGluMSAycyBpbmZpbml0ZSBsaW5lYXI7CgkgICAgICAtbW96LWFuaW1hdGlvbjogc3BpbjEgMnMgaW5maW5pdGUgbGluZWFyOwoJICAgICAgLW8tYW5pbWF0aW9uOiBzcGluMSAycyBpbmZpbml0ZSBsaW5lYXI7CgkgICAgICAtbXMtYW5pbWF0aW9uOiBzcGluMSAycyBpbmZpbml0ZSBsaW5lYXI7CgkgICAgICBhbmltYXRpb246IHNwaW4xIDJzIGluZmluaXRlIGxpbmVhcjsKCSAgICB9CgoKCgoJICAgIC8qIE1haW4gY29udGVudCBzdHlsaW5nICovCgkgICAgI21vcmUgewoJICAgICAgZGlzcGxheTogZmxleDsKCSAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsKCSAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxYTFhMWE7CgkgICAgICBwYWRkaW5nOiA0MHB4OwoJICAgICAgYm9yZGVyLXRvcDogMHB4IHNvbGlkICM0NDQ7CgkgICAgICBjb2xvcjogI2ZmZjsKCSAgICAgIGZvbnQtZmFtaWx5OiAnQXJpYWwnLCBzYW5zLXNlcmlmOwoJICAgIH0KCgkgICAgLmluZm8tYm94IHsKCSAgICAgIHdpZHRoOiA0OCU7CgkgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjIyOwoJICAgICAgcGFkZGluZzogMjBweDsKCSAgICAgIGJvcmRlci1yYWRpdXM6IDhweDsKCSAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuNCk7CgkgICAgfQoKCSAgICBoMyB7CgkgICAgICBmb250LXNpemU6IDI0cHg7CgkgICAgICBjb2xvcjogI2ZmYTUwMDsKCSAgICAgIC8qIEZvb3RiYWxsLXRoZW1lZCBjb2xvciAqLwoJICAgICAgbWFyZ2luLWJvdHRvbTogMTVweDsKCSAgICB9CgoJICAgIHAsCgkgICAgYiB7CgkgICAgICBsaW5lLWhlaWdodDogMS42OwoJICAgICAgZm9udC1zaXplOiAxNnB4OwoJICAgIH0KCgkgICAgcCB7CgkgICAgICBtYXJnaW4tYm90dG9tOiAxMHB4OwoJICAgIH0KCgkgICAgYiB7CgkgICAgICBjb2xvcjogI2ZmZDcwMDsKCSAgICAgIC8qIEhpZ2hsaWdodGVkIHF1ZXN0aW9uIGNvbG9yICovCgkgICAgfQoKCgkgICAgLyogdW52aXNpdGVkIGxpbmsgKi8KCSAgICBhOmxpbmsgewoJICAgICAgY29sb3I6ICNmZmQ3MDA7CgkgICAgfQoKCSAgICAvKiB2aXNpdGVkIGxpbmsgKi8KCSAgICBhOnZpc2l0ZWQgewoJICAgICAgY29sb3I6ICNmZmQ3MDA7CgkgICAgfQoKCSAgICAvKiBtb3VzZSBvdmVyIGxpbmsgKi8KCSAgICBhOmhvdmVyIHsKCSAgICAgIGNvbG9yOiAjZmZkNzAwOwoJICAgIH0KCgkgICAgLyogc2VsZWN0ZWQgbGluayAqLwoJICAgIGE6YWN0aXZlIHsKCSAgICAgIGNvbG9yOiAjZmZkNzAwOwoJICAgIH0KCgkgICAgLm5vdGNoLXRvcC1sZWZ0IHsKCSAgICAgIHdpZHRoOiAyMHB4OwoJICAgICAgaGVpZ2h0OiAyMHB4OwoJICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvciwgIzFhMWExYSk7CgkgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7CgkgICAgICB0b3A6IC0xMHB4OwoJICAgICAgbGVmdDogLTEwcHg7CgkgICAgICBjbGlwLXBhdGg6IHBvbHlnb24oMTAwJSAwLCAwIDEwMCUsIDEwMCUgMTAwJSk7CgkgICAgfQoKCSAgICAvKiBGb290ZXIgc3R5bGluZyAqLwoJICAgIGZvb3RlciB7CgkgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwOwoJICAgICAgcGFkZGluZzogMjBweCAwOwoJICAgICAgdGV4dC1hbGlnbjogY2VudGVyOwoJICAgICAgY29sb3I6ICNjY2M7CgkgICAgICBmb250LXNpemU6IDE0cHg7CgkgICAgICBib3JkZXItdG9wOiAycHggc29saWQgIzQ0NDsKCSAgICAgIG1hcmdpbi10b3A6IDQwcHg7CgkgICAgICBmb250LWZhbWlseTogJ0FyaWFsJywgc2Fucy1zZXJpZjsKCSAgICAgIGJvcmRlcjogMDsKCSAgICB9CgoJICAgIC5mZWVkYmFjay1mb3JtIHsKCSAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTsKCSAgICAgIHRvcDogNTAlOwoJICAgICAgbGVmdDogNTAlOwoJICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7CgkgICAgICB3aWR0aDogNTB2dzsKCSAgICAgIGhlaWdodDogNTB2aDsKCSAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyQTZEQjA7CgkgICAgICBwYWRkaW5nOiAyMHB4OwoJICAgICAgYm9yZGVyOiA0cHggc29saWQgI0ZGMDAwMDsKCSAgICAgIGJveC1zaGFkb3c6IDBweCAwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuNSk7CgkgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7CgkgICAgICBjb2xvcjogI0ZGRkZGRjsKCSAgICB9CgoJICAgIC5mZWVkYmFjay1mb3JtIGgzIHsKCSAgICAgIGZvbnQtc2l6ZTogMjRweDsKCSAgICAgIG1hcmdpbi1ib3R0b206IDIwcHg7CgkgICAgICBjb2xvcjogI0ZGRkZGRjsKCSAgICAgIHRleHQtc2hhZG93OiAycHggMnB4ICMwMDAwMDA7CgkgICAgfQoKCSAgICAuZmVlZGJhY2stZm9ybSB0ZXh0YXJlYSB7CgkgICAgICB3aWR0aDogY2FsYygxMDAlIC0gMjBweCk7CgkgICAgICBoZWlnaHQ6IDUwJTsKCSAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7CgkgICAgICBwYWRkaW5nOiAxMHB4OwoJICAgICAgZm9udC1zaXplOiAxNnB4OwoJICAgICAgZm9udC1mYW1pbHk6ICdDb3VyaWVyIE5ldycsIENvdXJpZXIsIG1vbm9zcGFjZTsKCSAgICAgIGJvcmRlcjogM3B4IHNvbGlkICMwMDAwMDA7CgkgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwMDAwOwoJICAgICAgLyogQmxhY2sgYmFja2dyb3VuZCAqLwoJICAgICAgY29sb3I6ICNGRkZGRkY7CgkgICAgICAvKiBXaGl0ZSB0ZXh0ICovCgkgICAgICByZXNpemU6IG5vbmU7CgkgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94OwoJICAgIH0KCgkgICAgLmZlZWRiYWNrLWZvcm0gYnV0dG9uIHsKCSAgICAgIHdpZHRoOiAxMDAlOwoJICAgICAgcGFkZGluZzogMTJweDsKCSAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkQ3MDA7CgkgICAgICAvKiBZZWxsb3dpc2ggYmFja2dyb3VuZCAqLwoJICAgICAgY29sb3I6ICMwMDAwMDA7CgkgICAgICBib3JkZXI6IDNweCBzb2xpZCAjRkYwMDAwOwoJICAgICAgYm9yZGVyLXJhZGl1czogMDsKCSAgICAgIGZvbnQtc2l6ZTogMThweDsKCSAgICAgIGN1cnNvcjogcG9pbnRlcjsKCSAgICAgIGZvbnQtZmFtaWx5OiAnQ291cmllciBOZXcnLCBDb3VyaWVyLCBtb25vc3BhY2U7CgkgICAgICB0ZXh0LXNoYWRvdzogMXB4IDFweCAjMDAwMDAwOwoJICAgIH0KCgkgICAgLmZlZWRiYWNrLWZvcm0gYnV0dG9uOmhvdmVyIHsKCSAgICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkI4MDA7CgkgICAgICAvKiBTbGlnaHRseSBkYXJrZXIgeWVsbG93IG9uIGhvdmVyICovCgkgICAgICBjb2xvcjogI0ZGRkZGRjsKCSAgICB9CgkgIDwvc3R5bGU+CgoKCSAgPCEtLSBHb29nbGUgdGFnIChndGFnLmpzKSAtLT4KCSAgPHNjcmlwdCBhc3luYyBzcmM9Imh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanM/aWQ9Ry1HUkVCNjNQV0VMIj48L3NjcmlwdD4KCgkgIDxzY3JpcHQ+CgkgICAgd2luZG93LmRhdGFMYXllciA9IHdpbmRvdy5kYXRhTGF5ZXIgfHwgW107CgoJICAgIGZ1bmN0aW9uIGd0YWcoKSB7CgkgICAgICBkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpOwoJICAgIH0KCSAgICBndGFnKCdqcycsIG5ldyBEYXRlKCkpOwoKCSAgICBpZiAobG9jYXRpb24uaG9zdG5hbWUgIT0gImxvY2FsaG9zdCIpIGd0YWcoJ2NvbmZpZycsICdHLUdSRUI2M1BXRUwnLCB7CgkgICAgICBjb29raWVfZmxhZ3M6ICdzZWN1cmU7c2FtZXNpdGU9bm9uZScKCSAgICB9KTsKCSAgPC9zY3JpcHQ+CgoJICA8c2NyaXB0PgoJICAgIC8vSW50ZXJzdGl0aWFsIGFkIGF2YWlsYWJsZSBldmVudAoJICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoImFpcF9pbnRlcnN0aXRpYWxhZGF2YWlsYWJsZSIsIGZ1bmN0aW9uKGUpIHsKCSAgICAgIGNvbnNvbGUubG9nKCJBbiBpbnRlcnN0aXRpYWwgYWQgaXMgYXZhaWxhYmxlIik7CgkgICAgfSk7CgkgIDwvc2NyaXB0PgoJICA8c2NyaXB0PgoJICAgIGNvbnNvbGUubG9nKCJJbml0dGluZyBBSVAiKQoJICAgIHdpbmRvdy5haXB0YWcgPSB3aW5kb3cuYWlwdGFnIHx8IHsKCSAgICAgIGNtZDogW10KCSAgICB9OwoJICAgIGFpcHRhZy5jbWQuZGlzcGxheSA9IGFpcHRhZy5jbWQuZGlzcGxheSB8fCBbXTsKCSAgICBhaXB0YWcuY21kLnBsYXllciA9IGFpcHRhZy5jbWQucGxheWVyIHx8IFtdOwoKCSAgICAvL0NNUCB0b29sIHNldHRpbmdzCgkgICAgYWlwdGFnLmNvbnNlbnRlZCA9IGZhbHNlOyAvLyBHRFBSIHNldHRpbmcsIHBsZWFzZSBzZXQgdGhpcyB2YWx1ZSB0byBmYWxzZSBpZiBhbiBFVSB1c2VyIGhhcyBkZWNsaW5lZCBvciBub3QgeWV0IGFjY2VwdGVkIG1hcmtldGluZyBjb29raWVzLCBmb3IgdXNlcnMgb3V0c2lkZSB0aGUgRVUgcGxlYXNlIHVzZSB0cnVlIGFuZCBmb3IgdXNlcnMgYWNjZXB0ZWQgdGhlIEdEUFIgYWxzbyB1c2UgdHJ1ZQoJICAgIGFpcHRhZy5jbXAgPSB7CgkgICAgICBzaG93OiB0cnVlLAoJICAgICAgcG9zaXRpb246ICJjZW50ZXJlZCIsCgkgICAgICBidXR0b246IGZhbHNlLAoJICAgICAgYnV0dG9uVGV4dDogIlByaXZhY3kgc2V0dGluZ3MiLAoJICAgICAgYnV0dG9uUG9zaXRpb246ICJib3R0b20tbGVmdCIKCSAgICB9CgkgIDwvc2NyaXB0PgoJICA8c2NyaXB0IGFzeW5jIHNyYz0idGFnLm1pbi5qcyI+PC9zY3JpcHQ+CgoJICA8c2NyaXB0PgoJICAgIGZ1bmN0aW9uIFNldHVwTVNOb3RpZmljYXRpb24oKSB7CgkgICAgICBjb25zb2xlLmxvZygibm90aWZ5aW5nIik7CgkgICAgICBpZiAodHlwZW9mICRtc3N0YXJ0ICE9PSAndW5kZWZpbmVkJykgewoJICAgICAgICBjb25zb2xlLmxvZygibm90aWZ5aW5nMiIpOwoJICAgICAgICB2YXIgaWQgPSBidG9hKCIiKTsKCSAgICAgICAgJG1zc3RhcnQuc2NoZWR1bGVOb3RpZmljYXRpb25Bc3luYyh7CgkgICAgICAgICAgdGl0bGU6ICdVbmxvY2sgbmV3IGJyb3Mgbm93IScsCgkgICAgICAgICAgZGVzY3JpcHRpb246ICdZb3UgYXJlIGp1c3QgYWJvdXQgdG8gdW5sb2NrIGEgbmV3IEJybyEgV2hvIHdpbGwgaXQgYmU/JywKCSAgICAgICAgICB0eXBlOiAxLAoJICAgICAgICAgIG1pbkRlbGF5SW5TZWNvbmRzOiAyNCAqIDYwICogNjAKCSAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7CgkgICAgICAgICAgY29uc29sZS5sb2coIm5vdGlmaWNhdGlvbiByZXNwb25zZTogIiArIHJlc3BvbnNlKTsKCSAgICAgICAgfSk7CgkgICAgICAgICRtc3N0YXJ0LnNjaGVkdWxlTm90aWZpY2F0aW9uQXN5bmMoewoJICAgICAgICAgIHRpdGxlOiAnRHVuayBhbGwgb3ZlciB5b3VyIGJyb3MhJywKCSAgICAgICAgICBkZXNjcmlwdGlvbjogJ05ldyBicm9zIGp1c3Qgd2FpdGluZyB0byBiZSBkdW5rZWQgb24hIFVubG9jayB0aGVtIG5vdyEnLAoJICAgICAgICAgIHR5cGU6IDEsCgkgICAgICAgICAgbWluRGVsYXlJblNlY29uZHM6IDI0ICogNyAqIDYwICogNjAKCSAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7CgkgICAgICAgICAgY29uc29sZS5sb2coIm5vdGlmaWNhdGlvbiByZXNwb25zZTogIiArIHJlc3BvbnNlKTsKCSAgICAgICAgfSk7CgoJICAgICAgfQoJICAgIH0KCgkgICAgdmFyIG1zQWRJRDsKCgkgICAgZnVuY3Rpb24gTG9hZFZpZGVvKCkgewoJICAgICAgaWYgKHR5cGVvZiAkbXNzdGFydCAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgJG1zc3RhcnQubG9hZEFkc0FzeW5jKCkudGhlbihhZEluc3RhbmNlID0+IHsKCSAgICAgICAgICAvLyBVc2UgdGhlIGFkSW5zdGFuY2UuaW5zdGFuY2VJZCB0byBtYWtlIGEgY2FsbCB0byBzaG93QWRzQXN5bmMKCSAgICAgICAgICBtc0FkSUQgPSBhZEluc3RhbmNlLmluc3RhbmNlSWQ7CgkgICAgICAgIH0pOwoKCSAgICAgICAgU2V0dXBNU05vdGlmaWNhdGlvbigpOwoJICAgICAgfQoJICAgIH0KCgkgICAgZnVuY3Rpb24gU2hvd1ZpZGVvKHRoZVVuaXROYW1lID0gbnVsbCkgewoJICAgICAgTWFpbi5Eb25lVmlkZW9BZCh0cnVlKTsKCSAgICAgIHJldHVybjsgLy8hIHdoZW4gYWlwIGlzIGxpdmUsIHJlbW92ZSB0aGlzCgoJICAgICAgY29uc29sZS5sb2coJ1NIT1dfVklERU86JyArIHRoZVVuaXROYW1lKTsKCSAgICAgIHZhciBhVW5pdE5hbWUgPSAiIjsKCSAgICAgIGlmICh0eXBlb2YgJG1zc3RhcnQgIT09ICd1bmRlZmluZWQnKSB7CgkgICAgICAgICRtc3N0YXJ0LnNob3dBZHNBc3luYyhtc0FkSUQpLnRoZW4oYWRJbnN0YW5jZSA9PiB7CgkgICAgICAgICAgLy8gVXNlIHRoZSBhZEluc3RhbmNlLnNob3dBZHNDb21wbGV0ZWRBc3luYyB0byBiZSBub3RpZmllZCBvZiB0aGUgY29tcGxldGlvbiBvZiBzaG93aW5nIHRoZSBhZHZlcnRpc2VtZW50CgkgICAgICAgICAgYWRJbnN0YW5jZS5zaG93QWRzQ29tcGxldGVkQXN5bmMudGhlbigodmFsKSA9PiB7CgkgICAgICAgICAgICBjb25zb2xlLmxvZygnTVMgVmlkZW8gQWQgQ29tcGxldGUnKTsKCSAgICAgICAgICAgIE1haW4uRG9uZVZpZGVvQWQoKTsKCSAgICAgICAgICAgIHdpbmRvdy5mb2N1cygpOwoJICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuZmwtY29udGVudCcpLmZvY3VzKCk7CgkgICAgICAgICAgICBMb2FkVmlkZW8oKTsKCSAgICAgICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7CgkgICAgICAgICAgICBjb25zb2xlLmxvZygnTXMgVmlkZW8gQWQgRXJyb3InKTsKCSAgICAgICAgICAgIE1haW4uRG9uZVZpZGVvQWQoKTsKCSAgICAgICAgICAgIHdpbmRvdy5mb2N1cygpOwoJICAgICAgICAgICAgd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuZmwtY29udGVudCcpLmZvY3VzKCk7CgkgICAgICAgICAgICBMb2FkVmlkZW8oKTsKCSAgICAgICAgICB9KTsKCSAgICAgICAgfSk7CgkgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBnQ3JhenlTREsgIT09ICd1bmRlZmluZWQnKSB7CgkgICAgICAgIGdDcmF6eVNESy5hZGRFdmVudExpc3RlbmVyKCJhZEZpbmlzaGVkIiwgTWFpbi5Eb25lVmlkZW9BZCk7IC8vIHJlZW5hYmxlIHNvdW5kLCBlbmFibGUgdWkKCSAgICAgICAgZ0NyYXp5U0RLLmFkZEV2ZW50TGlzdGVuZXIoImFkRXJyb3IiLCBNYWluLkRvbmVWaWRlb0FkKTsgLy8gcmVlbmFibGUgc291bmQsIGVuYWJsZSB1aQoJICAgICAgICBnQ3JhenlTREsucmVxdWVzdEFkKCk7CgkgICAgICAgIGNvbnNvbGUubG9nKCdDR19BRF9SRVFVRVNURUQnKTsKCSAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdjZ3ZpZGVvJyk7CgkgICAgICAgIHJldHVybjsKCSAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFkcGxheWVyID09PSAndW5kZWZpbmVkJykgewoJICAgICAgICBNYWluLkRvbmVWaWRlb0FkKHRydWUpOwoJICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ3ZpZGVvX2FkYmxvY2tlZCcpOwoJICAgICAgICBjb25zb2xlLmxvZygnVklERU9fQURCTE9DS0VEJyk7CgoJICAgICAgfSBlbHNlIHsKCSAgICAgICAgdmFyIGFTdHIgPSAncHJlcm9sbCc7CgkgICAgICAgIC8vaWYodGhlVW5pdE5hbWUgIT0gbnVsbCkgYVN0ciA9IHRoZVVuaXROYW1lOwoJICAgICAgICBsYXN0VW5pdFBsYXllZCA9IGFTdHI7CgkgICAgICAgIFNlbmRFdmVudCgnZXZlbnQnLCAnc3RhcnR2aWRlby0nICsgYVN0cik7CgoJICAgICAgICBhaXB0YWcuY21kLnBsYXllci5wdXNoKGZ1bmN0aW9uKCkgewoJICAgICAgICAgIGFkcGxheWVyLnN0YXJ0VmlkZW9BZCh0aGVVbml0TmFtZSk7CgkgICAgICAgIH0pOwoJICAgICAgfQoJICAgIH0KCSAgPC9zY3JpcHQ+CgoJICA8IS0tIEZpcmViYXNlIEFwcCAodGhlIGNvcmUgRmlyZWJhc2UgU0RLKSAtLT4KCSAgPHNjcmlwdCBzcmM9ImZpcmViYXNlLWFwcC5qcyI+PC9zY3JpcHQ+CgkgIDwhLS0gRmlyZWJhc2UgQXV0aGVudGljYXRpb24gLS0+CgkgIDxzY3JpcHQgc3JjPSJmaXJlYmFzZS1hdXRoLmpzIj48L3NjcmlwdD4KCSAgPCEtLSBGaXJlYmFzZSBGaXJlc3RvcmUgKERhdGFiYXNlKSAtLT4KCSAgPHNjcmlwdCBzcmM9ImZpcmViYXNlLWZpcmVzdG9yZS5qcyI+PC9zY3JpcHQ+CgoJICA8c2NyaXB0PgoJICAgIC8vIFlvdXIgd2ViIGFwcCdzIEZpcmViYXNlIGNvbmZpZ3VyYXRpb24KCSAgICBjb25zdCBmaXJlYmFzZUNvbmZpZyA9IHsKCSAgICAgIGFwaUtleTogIkFJemFTeUFGQ3dZZGJrTG96SWd0SDV6dUd5ZGNqa19MTmhZbnZlMCIsCgkgICAgICBhdXRoRG9tYWluOiAiZm9vdGJhbGwtYnJvcy04ZjFiMy5maXJlYmFzZWFwcC5jb20iLAoJICAgICAgcHJvamVjdElkOiAiZm9vdGJhbGwtYnJvcy04ZjFiMyIsCgkgICAgICBzdG9yYWdlQnVja2V0OiAiZm9vdGJhbGwtYnJvcy04ZjFiMy5hcHBzcG90LmNvbSIsCgkgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogIjgwNzQzNDA1MTEwNiIsCgkgICAgICBhcHBJZDogIjE6ODA3NDM0MDUxMTA2OndlYjo3ZTJmZDU5NzgyZTdjMTMxNjVmNDdiIgoJICAgIH07CgoJICAgIC8vIEluaXRpYWxpemUgRmlyZWJhc2UKCSAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKGZpcmViYXNlQ29uZmlnKTsKCSAgICBjb25zdCBhdXRoID0gZmlyZWJhc2UuYXV0aCgpOwoJICAgIGNvbnN0IGRiID0gZmlyZWJhc2UuZmlyZXN0b3JlKCk7CgkgICAgdmFyIHVzZXJEYXRhID0gIiI7CgoJICAgIGZ1bmN0aW9uIHRyaWdnZXJTaWduSW4oKSB7CgkgICAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTsKCSAgICAgIGF1dGguc2lnbkluV2l0aFBvcHVwKHByb3ZpZGVyKTsKCSAgICB9CgoJICAgIC8vIFNhdmUgZ2FtZSBkYXRhIGZ1bmN0aW9uCgkgICAgZnVuY3Rpb24gc2F2ZUdhbWVEYXRhKGdhbWVEYXRhKSB7CgkgICAgICBjb25zb2xlLmxvZygnc2F2aW5nIGdhbWVkYXRhOicgKyBnYW1lRGF0YSk7CgkgICAgICB2YXIgdXNlcklkID0gYXV0aC5jdXJyZW50VXNlci51aWQ7CgkgICAgICB1c2VyRGF0YSA9IGdhbWVEYXRhOwoJICAgICAgZGIuY29sbGVjdGlvbigndXNlcnMnKS5kb2ModXNlcklkKS5zZXQoewoJICAgICAgICBnYW1lRGF0YTogZ2FtZURhdGEKCSAgICAgIH0pLnRoZW4oZnVuY3Rpb24oKSB7CgkgICAgICAgIGNvbnNvbGUubG9nKCdHYW1lIGRhdGEgc2F2ZWQnKTsKCSAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7CgkgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNhdmluZyBnYW1lIGRhdGE6JywgZXJyb3IpOwoJICAgICAgfSk7CgkgICAgfQoKCSAgICAvLyBMb2FkIGdhbWUgZGF0YSBmdW5jdGlvbgoJICAgIGZ1bmN0aW9uIGxvYWRHYW1lRGF0YSgpIHsKCSAgICAgIHJldHVybiB1c2VyRGF0YTsKCSAgICB9CgoJICAgIGZ1bmN0aW9uIGxvYWRHYW1lRGF0YUFzeW5jKCkgewoJICAgICAgdmFyIHVzZXJJZCA9IGF1dGguY3VycmVudFVzZXIudWlkOwoJICAgICAgZGIuY29sbGVjdGlvbigndXNlcnMnKS5kb2ModXNlcklkKS5nZXQoKS50aGVuKGZ1bmN0aW9uKGRvYykgewoJICAgICAgICBpZiAoZG9jLmV4aXN0cykgewoJICAgICAgICAgIHVzZXJEYXRhID0gZG9jLmRhdGEoKS5nYW1lRGF0YTsKCSAgICAgICAgICAvL01haW4uTG9hZEdsb2JhbHMoKTsKCSAgICAgICAgICBjb25zb2xlLmxvZygnR2FtZSBkYXRhOicsIGRvYy5kYXRhKCkuZ2FtZURhdGEpOwoJICAgICAgICAgIGlmICh0eXBlb2YgTWFpbiAhPSAidW5kZWZpbmVkIikgewoJICAgICAgICAgICAgTWFpbi5Mb2FkRGF0YUNvbXBsZXRlKCk7CgkgICAgICAgICAgfQoJICAgICAgICAgIC8vIFVzZSB0aGUgZ2FtZSBkYXRhIGluIHlvdXIgZ2FtZQoJICAgICAgICB9IGVsc2UgewoJICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBzdWNoIGRvY3VtZW50IScpOwoJICAgICAgICB9CgkgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikgewoJICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBsb2FkaW5nIGdhbWUgZGF0YTonLCBlcnJvcik7CgkgICAgICB9KTsKCSAgICB9CgoJICAgIC8vIEZpcmViYXNlIGF1dGggc3RhdGUgb2JzZXJ2ZXIKCSAgICBhdXRoLm9uQXV0aFN0YXRlQ2hhbmdlZChmdW5jdGlvbih1c2VyKSB7CgkgICAgICBpZiAodXNlcikgewoJICAgICAgICBsb2FkR2FtZURhdGFBc3luYygpOwoJICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ3NpZ25faW4nKTsKCSAgICAgICAgY29uc29sZS5sb2coJ3VzZXIgc2lnbmVkIGluJyk7CgkgICAgICB9IGVsc2UgewoJICAgICAgICBjb25zb2xlLmxvZygnTm8gdXNlciBzaWduZWQgaW4nKTsKCSAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdzaWduX291dCcpOwoJICAgICAgfQoJICAgIH0pOwoKCSAgICBmdW5jdGlvbiBzaWduT3V0KCkgewoJICAgICAgYXV0aC5zaWduT3V0KCkudGhlbigoKSA9PiB7CgkgICAgICAgIE1haW4uU2lnbk91dENvbXBsZXRlKCk7CgkgICAgICAgIGNvbnNvbGUubG9nKCdzaWduZWQgb3V0Jyk7CgkgICAgICB9KTsKCSAgICB9CgoJICAgIGZ1bmN0aW9uIGlzVXNlckxvZ2dlZEluKCkgewoJICAgICAgcmV0dXJuIGF1dGguY3VycmVudFVzZXIgIT09IG51bGw7CgkgICAgfQoJICA8L3NjcmlwdD4KCgk8L2hlYWQ+CgoJPGJvZHkgc3R5bGU9Im92ZXJmbG93OmhpZGRlbjsiPgoJICA8bm9zY3JpcHQ+RW5hYmxlIEphdmFTY3JpcHQgYnJvITwvbm9zY3JpcHQ+CgkgIDxzY3JpcHQ+CgkgICAgLy9hbGVydCgiR2xvYmFsczoiK2xvY2FsU3RvcmFnZS5nZXRJdGVtKCIvOkdsb2JhbHMiKS5sZW5ndGgpOwoJICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLwoJICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vCgkgICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmOwoJICAgIGlmICh1cmwuaW5jbHVkZXMoInd3dy4iKSkgewoJICAgICAgdXJsID0gdXJsLnJlcGxhY2UoInd3dy4iLCAiIik7CgoJICAgICAgdmFyIGYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7CgkgICAgICBmLmFjdGlvbiA9IHVybDsKCSAgICAgIGYubWV0aG9kID0gJ1BPU1QnOwoJICAgICAgdmFyIGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpOwoJICAgICAgaS50eXBlID0gJ2hpZGRlbic7CgkgICAgICBpLm5hbWUgPSAnRkdsb2JhbHMnOwoJICAgICAgaS52YWx1ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCIvOkdsb2JhbHMiKTsKCSAgICAgIGYuYXBwZW5kQ2hpbGQoaSk7CgoJICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmKTsKCSAgICAgIGYuc3VibWl0KCk7CgkgICAgfSBlbHNlIHsKCSAgICAgIHZhciBhUG9zdCA9ICIiOwoJICAgICAgdmFyIGFTdG9yYWdlID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oIi86R2xvYmFscyIpOwoJICAgICAgdmFyIGFMZW4gPSAwOwoJICAgICAgaWYgKGFTdG9yYWdlICE9IG51bGwgJiYgYVN0b3JhZ2UubGVuZ3RoID4gMCkgewoJICAgICAgICBhTGVuID0gYVN0b3JhZ2UubGVuZ3RoOwoJICAgICAgfQoJICAgICAgaWYgKGFQb3N0Lmxlbmd0aCA+IGFMZW4pIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCIvOkdsb2JhbHMiLCBhUG9zdCk7CgkgICAgICBpZiAoYVBvc3QubGVuZ3RoID4gMCAmJiBhUG9zdC5sZW5ndGggPT0gYUxlbikgbG9jYWxTdG9yYWdlLnNldEl0ZW0oIi86R2xvYmFscyIsIGFQb3N0KTsKCSAgICB9CgkgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vCgkgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8KCSAgPC9zY3JpcHQ+CgoJICA8ZGl2IGlkPSJsb2FkaW5nIiBzdHlsZT0icG9zaXRpb246IGFic29sdXRlOyB6LWluZGV4OiAxNTsgdG9wOiA2MCU7IGxlZnQ6IDUwJTsgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgMCk7IGJhY2tncm91bmQ6IGJsYWNrOyI+CgkgICAgPGNlbnRlcj48aW1nIHNyYz0iYXNzZXRzL2xvYWRpbmc0LnBuZyI+PGJyIC8+CgkgICAgICA8aW1nIHNyYz0iYXNzZXRzL2Zicm8ucG5nIj4KCSAgICAgIDxpbWcgc3JjPSJhc3NldHMvc2Jyby5wbmciPgoJICAgICAgPGltZyBzcmM9ImFzc2V0cy93YnJvLnBuZyI+CgkgICAgICA8aW1nIHNyYz0iYXNzZXRzL2Jicm8ucG5nIj4KCSAgICA8L2NlbnRlcj4KCSAgPC9kaXY+CgoJICA8ZGl2IGlkPSJnYW1lMiIgc3R5bGU9IndpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7ICI+CgkgICAgPGRpdiBpZD0ib3BlbmZsLWNvbnRlbnQiIG9uYmx1cj0id2luZG93LmZvY3VzKCk7IiBzdHlsZT0id2lkdGg6IGNhbGMoMTAwJSk7IGZsb2F0OmxlZnQ7Ij4KCSAgICAgIDxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4KCSAgICAgICAgbGltZS5lbWJlZCgiRm9vdGJhbGxCcm9zIiwgIm9wZW5mbC1jb250ZW50IiwgMCwgMCwgewoJICAgICAgICAgIHBhcmFtZXRlcnM6IHt9CgkgICAgICAgIH0pOwoJICAgICAgPC9zY3JpcHQ+CgkgICAgPC9kaXY+CgkgICAgPGRpdiBpZD0icHJlcm9sbCIgc3R5bGU9IndpZHRoOiA5NjBweDsgaGVpZ2h0OiA1NDBweDsgZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDUwJTsgbGVmdDogNTAlOyB6LWluZGV4OiAxMDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpOyI+CgkgICAgPC9kaXY+CgoJICAgIDxkaXYgaWQ9ImZvb3RiYWxsYnJvcy1pb18zMDB4MjUwIiBzdHlsZT0id2lkdGg6IDMzNnB4OyBoZWlnaHQ6IDI4MHB4OyB2aXNpYmlsaXR5OmhpZGRlbjsgZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDMwcHg7IGxlZnQ6IDMwcHg7IHotaW5kZXg6IDEwMDtvdmVyZmxvdzogaGlkZGVuOyI+CgkgICAgICA8c2NyaXB0PgoJICAgICAgICBpZiAodHlwZW9mIGdDcmF6eVNESyA9PSAndW5kZWZpbmVkJykgewoJICAgICAgICAgIGFpcHRhZy5jbWQuZGlzcGxheS5wdXNoKGZ1bmN0aW9uKCkgewoJICAgICAgICAgICAgYWlwRGlzcGxheVRhZy5kaXNwbGF5KCdmb290YmFsbGJyb3MtaW9fMzAweDI1MCcpOwoJICAgICAgICAgIH0pOwoJICAgICAgICB9CgkgICAgICA8L3NjcmlwdD4KCSAgICA8L2Rpdj4KCSAgICA8ZGl2IGlkPSJmb290YmFsbGJyb3MtaW9fMzAweDI1MF8yIiBzdHlsZT0id2lkdGg6IDMzNnB4OyBoZWlnaHQ6IDI4MHB4OyB2aXNpYmlsaXR5OmhpZGRlbjsgZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDMwcHg7IGxlZnQ6IDMwcHg7IHotaW5kZXg6IDEwMDtvdmVyZmxvdzogaGlkZGVuOyI+CgkgICAgICA8c2NyaXB0PgoJICAgICAgICBpZiAodHlwZW9mIGdDcmF6eVNESyA9PSAndW5kZWZpbmVkJykgewoJICAgICAgICAgIGFpcHRhZy5jbWQuZGlzcGxheS5wdXNoKGZ1bmN0aW9uKCkgewoJICAgICAgICAgICAgYWlwRGlzcGxheVRhZy5kaXNwbGF5KCdmb290YmFsbGJyb3MtaW9fMzAweDI1MF8yJyk7CgkgICAgICAgICAgfSk7CgkgICAgICAgIH0KCSAgICAgIDwvc2NyaXB0PgoJICAgIDwvZGl2PgoJICAgIDxkaXYgaWQ9ImZvb3RiYWxsYnJvcy1pb18zMzZ4MjgwIiBzdHlsZT0idmlzaWJpbGl0eTpoaWRkZW47IHdpZHRoOiAzMzZweDsgaGVpZ2h0OiA2MDBweDsgZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOyBsZWZ0OiAzMHB4OyB6LWluZGV4OiAxMDA7b3ZlcmZsb3c6IGhpZGRlbjsiPgoJICAgIDwvZGl2PgoJICAgIDxkaXYgaWQ9ImZvb3RiYWxsYnJvcy1pb18zMzZ4MjgwXzIiIHN0eWxlPSJ2aXNpYmlsaXR5OmhpZGRlbjsgd2lkdGg6IDMzNnB4OyBoZWlnaHQ6IDYwMHB4OyBkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7IGxlZnQ6IDMwcHg7IHotaW5kZXg6IDEwMDtvdmVyZmxvdzogaGlkZGVuOyI+CgkgICAgPC9kaXY+CgkgICAgPGRpdiBpZD0iZm9vdGJhbGxicm9zLWlvXzcyOHg5MCIgc3R5bGU9InZpc2liaWxpdHk6aGlkZGVuOyB3aWR0aDogNzI4cHg7IGhlaWdodDogOTBweDsgZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDMwcHg7IGxlZnQ6IDMwcHg7IHotaW5kZXg6IDEwMDtvdmVyZmxvdzogaGlkZGVuOyI+CgkgICAgPC9kaXY+CgkgICAgPGRpdiBpZD0iZm9vdGJhbGxicm9zLWlvXzcyOHg5MF9tIiBzdHlsZT0idmlzaWJpbGl0eTpoaWRkZW47IHdpZHRoOiA3MjhweDsgaGVpZ2h0OiA5MHB4OyBkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMzBweDsgbGVmdDogMzBweDsgei1pbmRleDogMTAwO292ZXJmbG93OiBoaWRkZW47Ij4KCSAgICA8L2Rpdj4KCSAgICA8ZGl2IGlkPSJmb290YmFsbGJyb3MtaW9fOTcweDI1MCIgc3R5bGU9InZpc2liaWxpdHk6aGlkZGVuOyB3aWR0aDogOTcwcHg7IGhlaWdodDogMjUwcHg7IGRpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAzMHB4OyBsZWZ0OiAzMHB4OyB6LWluZGV4OiAxMDA7IHRleHQtYWxpZ246IGNlbnRlcjtvdmVyZmxvdzogaGlkZGVuOyI+CgkgICAgPC9kaXY+CgoJICAgIDxkaXYgY2xhc3M9ImZlZWRiYWNrLWZvcm0iIGlkPSJmZWVkYmFja0Zvcm0iIHN0eWxlPSJkaXNwbGF5Om5vbmU7Ij4KCSAgICAgIDxoMz5SZXBvcnQgYSBCdWcvR2xpdGNoPC9oMz4KCSAgICAgIDx0ZXh0YXJlYSBpZD0iZmVlZGJhY2siIHBsYWNlaG9sZGVyPSJEZXNjcmliZSB0aGUgYnVnIG9yIGdsaXRjaCB3aXRoIGEgbG90IG9mIGRldGFpbHMsIGxpa2UgaG93IHRvIG1ha2UgdGhlIGdsaXRjaCBoYXBwZW4gYW5kIGFueXRoaW5nIGVsc2Ugd2hldGhlciBpdCBzZWVtcyB1c2VmdWwgb3Igbm90Li4uIj48L3RleHRhcmVhPgoJICAgICAgPHRleHRhcmVhIGlkPSJlbWFpbCIgcGxhY2Vob2xkZXI9IkVtYWlsIGFkZHJlc3MgKG9wdGlvbmFsKSIgc3R5bGU9ImhlaWdodDogNTBweDsiPjwvdGV4dGFyZWE+CgkgICAgICA8dGV4dGFyZWEgaWQ9ImRpc2NvcmQiIHBsYWNlaG9sZGVyPSJEaXNjb3JkIElEIChvcHRpb25hbCkiIHN0eWxlPSJoZWlnaHQ6IDUwcHg7Ij48L3RleHRhcmVhPgoJICAgICAgPGJ1dHRvbiBvbmNsaWNrPSJzZW5kRmVlZGJhY2soKSIgaWQ9InN1Ym1pdEJ0biI+U3VibWl0IEZlZWRiYWNrPC9idXR0b24+CgkgICAgICA8YnIgLz4KCSAgICAgIDxiciAvPgoJICAgICAgPGJ1dHRvbiBvbmNsaWNrPSJkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmVlZGJhY2tGb3JtJykuc3R5bGUuZGlzcGxheT0nbm9uZSciIGlkPSJzdWJtaXRCdG4iPkNhbmNlbDwvYnV0dG9uPgoJICAgICAgPHAgaWQ9InJlc3BvbnNlTXNnIj48L3A+CgkgICAgPC9kaXY+CgkgICAgPHNjcmlwdD4KCSAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZG9GZWVkYmFjayA9IHRydWU7CgkgICAgICBmdW5jdGlvbiBnZXRPU0Zyb21Vc2VyQWdlbnQoKSB7CgkgICAgICAgIGNvbnN0IHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7CgkgICAgICAgIGNvbnN0IHBsYXRmb3JtID0gbmF2aWdhdG9yLnBsYXRmb3JtOwoKCSAgICAgICAgLy8gQ2hlY2sgZm9yIGNvbW1vbiBwbGF0Zm9ybXMgYW5kIE9TCgkgICAgICAgIGlmICgvV2luZG93cyBOVC9pLnRlc3QodXNlckFnZW50KSkgcmV0dXJuICdXaW5kb3dzJzsKCSAgICAgICAgaWYgKC9NYWMgT1MgWC9pLnRlc3QodXNlckFnZW50KSkgcmV0dXJuICdtYWNPUyc7CgkgICAgICAgIGlmICgvTGludXgvaS50ZXN0KHVzZXJBZ2VudCkpIHJldHVybiAnTGludXgnOwoJICAgICAgICBpZiAoL0FuZHJvaWQvaS50ZXN0KHVzZXJBZ2VudCkpIHJldHVybiAnQW5kcm9pZCc7CgkgICAgICAgIGlmICgvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QodXNlckFnZW50KSkgcmV0dXJuICdpT1MnOwoJICAgICAgICBpZiAoL0NyT1MvaS50ZXN0KHVzZXJBZ2VudCkpIHJldHVybiAnQ2hyb21lIE9TJzsKCgkgICAgICAgIC8vIERlZmF1bHQgdG8gdGhlIHBsYXRmb3JtIGlmIG5vIG1hdGNoCgkgICAgICAgIHJldHVybiBwbGF0Zm9ybSB8fCAnVW5rbm93bic7CgkgICAgICB9CgkgICAgICBhc3luYyBmdW5jdGlvbiBzZW5kRmVlZGJhY2soKSB7CgkgICAgICAgIHZhciBmZWVkYmFjayA9ICcqJyArIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJmZWVkYmFjayIpLnZhbHVlLnRyaW0oKSArICcqJzsKCSAgICAgICAgdmFyIGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImVtYWlsIikudmFsdWUudHJpbSgpOwoJICAgICAgICB2YXIgZGlzY29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJkaXNjb3JkIikudmFsdWUudHJpbSgpOwoJICAgICAgICBjb25zdCBzY3JlZW5SZXNvbHV0aW9uID0gYCR7d2luZG93LnNjcmVlbi53aWR0aH14JHt3aW5kb3cuc2NyZWVuLmhlaWdodH1gOwoJICAgICAgICBjb25zdCB3aW5kb3dSZXNvbHV0aW9uID0gYCR7d2luZG93LmlubmVyV2lkdGh9eCR7d2luZG93LmlubmVySGVpZ2h0fWA7CgkgICAgICAgIHZhciBhT1MgPSBnZXRPU0Zyb21Vc2VyQWdlbnQoKTsKCSAgICAgICAgdmFyIGFDaXR5ID0gJ1Byb3ZvJzsKCSAgICAgICAgY29uc3QgaG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7CgkgICAgICAgIGNvbnN0IGdwdSA9ICgoKSA9PiB7CgkgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7CgkgICAgICAgICAgY29uc3QgZ2wgPSBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnKSB8fCBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJyk7CgkgICAgICAgICAgY29uc3QgZGVidWdJbmZvID0gZ2w/LmdldEV4dGVuc2lvbignV0VCR0xfZGVidWdfcmVuZGVyZXJfaW5mbycpOwoJICAgICAgICAgIGNvbnN0IGdwdUluZm8gPSBkZWJ1Z0luZm8gPyBnbC5nZXRQYXJhbWV0ZXIoZGVidWdJbmZvLlVOTUFTS0VEX1JFTkRFUkVSX1dFQkdMKSA6ICdVbmtub3duJzsKCgkgICAgICAgICAgLy8gQ2xlYW51cAoJICAgICAgICAgIGNhbnZhcy5yZW1vdmUoKTsgLy8gUmVtb3ZlIHRoZSBjYW52YXMgZnJvbSB0aGUgRE9NIChpZiBpdCB3YXMgYWRkZWQpCgkgICAgICAgICAgcmV0dXJuIGdwdUluZm87CgkgICAgICAgIH0pKCk7CgoJICAgICAgICBmZWVkYmFjayA9IGZlZWRiYWNrICsgJ1xuRG9tYWluOiAnICsgaG9zdG5hbWU7CgkgICAgICAgIGZlZWRiYWNrID0gZmVlZGJhY2sgKyAnLCBPUzogJyArIGFPUzsKCSAgICAgICAgZmVlZGJhY2sgPSBmZWVkYmFjayArICcsIFNjcmVlbiByZXM6ICcgKyBzY3JlZW5SZXNvbHV0aW9uOwoJICAgICAgICBmZWVkYmFjayA9IGZlZWRiYWNrICsgJywgV2luZG93IHJlczogJyArIHdpbmRvd1Jlc29sdXRpb247CgkgICAgICAgIGZlZWRiYWNrID0gZmVlZGJhY2sgKyAnLCBHUFU6ICcgKyBncHU7CgkgICAgICAgIGZlZWRiYWNrID0gZmVlZGJhY2sgKyAnLCBDaXR5OiAnICsgYUNpdHk7CgkgICAgICAgIGZlZWRiYWNrID0gZmVlZGJhY2sgKyAnLCBFbWFpbDogJyArIGVtYWlsOwoJICAgICAgICBmZWVkYmFjayA9IGZlZWRiYWNrICsgJywgRGlzY29yZDogJyArIGRpc2NvcmQ7CgoJICAgICAgICBjb25zdCByZXNwb25zZU1zZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJyZXNwb25zZU1zZyIpOwoJICAgICAgICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgic3VibWl0QnRuIik7CgoJICAgICAgICBpZiAoIWZlZWRiYWNrKSB7CgkgICAgICAgICAgYWxlcnQoIlBsZWFzZSBlbnRlciBmZWVkYmFjay4iKTsKCSAgICAgICAgICByZXR1cm47CgkgICAgICAgIH0KCgkgICAgICAgIHN1Ym1pdEJ0bi5kaXNhYmxlZCA9IHRydWU7CgkgICAgICAgIHJlc3BvbnNlTXNnLnRleHRDb250ZW50ID0gIlN1Ym1pdHRpbmcuLi4iOwoKCSAgICAgICAgdHJ5IHsKCSAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKCJzZW5kRmVlZGJhY2sucGhwIiwgewoJICAgICAgICAgICAgbWV0aG9kOiAiUE9TVCIsCgkgICAgICAgICAgICBoZWFkZXJzOiB7CgkgICAgICAgICAgICAgICJDb250ZW50LVR5cGUiOiAiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIgoJICAgICAgICAgICAgfSwKCSAgICAgICAgICAgIGJvZHk6IG5ldyBVUkxTZWFyY2hQYXJhbXMoewoJICAgICAgICAgICAgICBmZWVkYmFjazogZmVlZGJhY2sKCSAgICAgICAgICAgIH0pCgkgICAgICAgICAgfSk7CgoJICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTsKCgkgICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICJzdWNjZXNzIikgewoJICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImZlZWRiYWNrRm9ybSIpLnN0eWxlLmRpc3BsYXkgPSAibm9uZSI7IC8vIENsb3NlIHRoZSBmZWVkYmFjayBmb3JtCgkgICAgICAgICAgICBhbGVydChyZXN1bHQubWVzc2FnZSk7IC8vIFNob3cgc3VjY2VzcyBtZXNzYWdlCgkgICAgICAgICAgfSBlbHNlIHsKCSAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJmZWVkYmFja0Zvcm0iKS5zdHlsZS5kaXNwbGF5ID0gIm5vbmUiOyAvLyBDbG9zZSB0aGUgZmVlZGJhY2sgZm9ybQoJICAgICAgICAgICAgYWxlcnQocmVzdWx0Lm1lc3NhZ2UpOyAvLyBTaG93IGVycm9yIG1lc3NhZ2UKCSAgICAgICAgICB9CgkgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7CgkgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImZlZWRiYWNrRm9ybSIpLnN0eWxlLmRpc3BsYXkgPSAibm9uZSI7IC8vIENsb3NlIHRoZSBmZWVkYmFjayBmb3JtCgkgICAgICAgICAgYWxlcnQoIkVycm9yIHN1Ym1pdHRpbmcgZmVlZGJhY2suIFBsZWFzZSB0cnkgYWdhaW4uIik7CgkgICAgICAgIH0KCgkgICAgICAgIHN1Ym1pdEJ0bi5kaXNhYmxlZCA9IGZhbHNlOwoJICAgICAgfQoJICAgIDwvc2NyaXB0PgoKCgoJICA8L2Rpdj4KCSAgPGJyIC8+CgkgIDxkaXYgdGFiaW5kZXg9Ii0xIiBpZD0ibW9yZSI+CgkgICAgPGRpdiBjbGFzcz0iaW5mby1ib3giPgoJICAgICAgPGgzPkFib3V0IEZvb3RiYWxsIEJyb3M8L2gzPgoJICAgICAgPHA+QWx0IHVybDogd3d3LmR1bmsubW9uc3Rlci4gRm9vdGJhbGwgQnJvcyBpcyBhIHNpbXBsZSwgZmFzdC1wYWNlZCBmb290YmFsbCBnYW1lIHdpdGggYWxsIGtpbmRzIG9mIGNyYXp5IGFjdGlvbiEgV2l0aCBvbmxpbmUgbXVsdGlwbGF5ZXIgZ2FtZXBsYXksIGxvdHMgb2YgcGxheXMsIGFuZCBhbGwga2luZHMgb2YgY3JhenkgZm9vdGJhbGwgYWN0aW9uITwvcD4KCSAgICAgIDxwPlRoZSBjb250cm9scyBhcmUgdmVyeSBzaW1wbGU6IFVzZSBlaXRoZXIgdGhlIGFycm93IGtleXMgb3IgV0FTRCB0byBjb250cm9sIHlvdXIgYnJvLiBTcGFjZSBiYXIgd2lsbCB0aHJvdyBhIHBhc3MsIGRpdmUsIG9yIHN0aWZmIGFybSwgZGVwZW5kaW5nIG9uIHRoZSBzaXR1YXRpb24uPC9wPgoJICAgICAgPHA+QmUgc3VyZSB0byBmb2xsb3cgdXMgb24gc29jaWFsIG1lZGlhIGZvciB0aGUgbGF0ZXN0IHVwZGF0ZXMgYW5kIGluZm8hPC9wPgoJICAgICAgPGJyIC8+CgkgICAgICA8aDM+Q2hhbmdlbG9nICgxLzMwLzIwMjQpPC9oMz4KCSAgICAgIDxwPkFkZGVkIFNheWp1YW4gdG8gUGhpbGx5LjwvcD4KCSAgICAgIDxwPkNoYW5nZWQgcGxheSBzZWxlY3Rpb24gdG8gYSBob3Jpem9udGFsIHN0cmlwIHRvIGZpdCBvbiBtb3JlIHNjcmVlbnMuPC9wPgoJICAgICAgPHA+Rml4ZWQgc3R1Y2sgbW92aW5nIGluIGEgZGlyZWN0aW9uIG9uY2UgYSBwbGF5IHN0YXJ0cy48L3A+CgkgICAgICA8cD5GaXhlZCAiMSB3aW5zIGF3YXkiIGdyYW1tYXIuPC9wPgoJICAgICAgPHA+Rml4ZWQgcHVudHMgc28ga2lja2luZyB0ZWFtIGRvZXNudCBjcm93ZCBhcm91bmQgdGhlIGJhbGwuPC9wPgoJICAgICAgPHA+Rml4ZWQgcHVudHMgc28gdGhhdCBraWNraW5nIHRlYW0gY291bGRuJ3QgY2F0Y2ggYSBraWNrIG9uIHRoZSBmbHkgYW5kIGdldCBhIDFzdCBkb3duLjwvcD4KCSAgICAgIDxwPkZpeGVkIHBvc2Vzc2lvbiBvbiAyIHB0IGNvbnZlcnNpb25zLjwvcD4KCSAgICAgIDxwPkZpeGVkIGRpdmluZyBpbnRvIGEgc25hcHBlZCBiYWxsIHNvIHlvdSBjYW4ndCBzdGFydCBkaXZpbmcgdW50aWwgdGhlIHFiIGFjdHVhbGx5IGhhcyB0aGUgYmFsbC48L3A+CgkgICAgICA8cD5GaXhlZCBnbGl0Y2ggd2hlcmUgc29tZXRpbWVzIGEga2lja29mZi94cCB3b3VsZCBzaG93IHVwIHdoZW4gaXQgd2Fzbid0IHN1cHBvc2VkIHRvIHdoZW4gYSB0ZCB3YXMgc2NvcmVkIHJpZ2h0IGF0IDA6MDAgb2YgdGhlIDFzdCBoYWxmLjwvcD4KCSAgICAgIDxwPkFkZGVkIGJsdWUgd2l6YXJkIGxvZ28uPC9wPgoJICAgICAgPHA+QWRkZWQgNSBuZXcgcGxheXMgdGhhdCBhcmUgdW5sb2NrZWQgYXMgcGVya3MuPC9wPgoJICAgIDwvZGl2PgoJICAgIDxkaXYgY2xhc3M9ImluZm8tYm94Ij4KCSAgICAgIDxoMz5GQVE8L2gzPgoJICAgICAgPGI+V2h5IGlzbid0IHRoZSBnYW1lIGxvYWRpbmc/PC9iPgoJICAgICAgPHA+WW91IHNob3VsZCBjaGVjayB5b3VyIGludGVybmV0IGNvbm5lY3Rpb24gYW5kIG1ha2Ugc3VyZSBvdXIgc2l0ZSBpc24ndCBibG9ja2VkLiBBbHNvLCBkaXNhYmxlIGFsbCBhZCBibG9ja2Vycy48L3A+CgkgICAgICA8Yj5Ib3cgZG8gSSBwbGF5PzwvYj4KCSAgICAgIDxwPlVzZSB5b3VyIGFycm93IGtleXMgYW5kIHNwYWNlIGJhciEgVGhlIHJlc3QgaXMgZWFzeS0gcGljayB5b3VyIHBsYXkgYW5kIGdvITwvcD4KCSAgICAgIDxiPldoaWNoIGJyb3dzZXIgc2hvdWxkIEkgdXNlPzwvYj4KCSAgICAgIDxwPllvdSBzaG91bGQgdXNlIENocm9tZS4gSXQgaXMgdGhlIG9ubHkgYnJvd3NlciBndWFyYW50ZWVkIHRvIHdvcmsuIEZvb3RiYWxsIEJyb3MgaGFzIGFsc28gYmVlbiB0ZXN0ZWQgdG8gd29yayBvbiBGaXJlZm94IGFuZCBTYWZhcmksIGJ1dCBub3QgZ3VhcmFudGVlZC48L3A+CgkgICAgICA8Yj5BcmUgdGhlcmUgbW9yZSBCcm9zIGdhbWVzPzwvYj4KCSAgICAgIDxwPlllcyEgQ2hlY2sgb3V0IDxhIHRhYmluZGV4PSItMSIgaHJlZj0iIj5CYXNrZXQgQnJvczwvYT4sIDxhIHRhYmluZGV4PSItMSIgaHJlZj0iIj5Tb2NjZXIgQnJvczwvYT4gYW5kIDxhIHRhYmluZGV4PSItMSIgaHJlZj0iaHR0cHM6Ly93cmVzdGxlYnJvcy5pbyI+V3Jlc3RsZSBCcm9zPC9hPi4gQWxzbyBiZSBzdXJlIHRvIGNoZWNrIG91dCA8YSB0YWJpbmRleD0iLTEiIGhyZWY9Imh0dHBzOi8vaW9nYW1lcy5zcGFjZSIgdGFyZ2V0PSJfYmxhbmsiPklPIEdhbWVzIGF0IGlvZ2FtZXMuc3BhY2U8L2E+PC9wPgoJICAgICAgPGI+RG8geW91IGhhdmUgYSBmYXZvcml0ZSB0ZWFtPzwvYj4KCSAgICAgIDxwPlllcywgYnV0IHdlJ3JlIG5vdCBzYXlpbmcgd2hpY2ggb25lLiBEcm9wIHVzIGFuIGUtbWFpbCBpZiB5b3UgdGhpbmsgeW91IGtub3cuPC9wPgoJICAgICAgPGI+SSdtIGJsb2NrZWQsIHdoZXJlIGVsc2UgY2FuIGkgcGxheT88L2I+CgkgICAgICA8cD5DaGVjayBoZXJlLCB0aGVzZSBsaW5rcyB3b3JrIGZvciBib3RoIGZvb3RiYWxsIGFuZCBiYXNrZXQgYnJvczogPGEgaHJlZj0iIj5Gb290YmFsbCBCcm9zIFVuYmxvY2tlZDwvYT48L3A+CgoJICAgIDwvZGl2PgoJICA8L2Rpdj4KCSAgPGZvb3Rlcj4KCSAgICA8ZGl2IHRhYmluZGV4PSItMSIgY2xhc3M9ImZvb3Rlci1saW5rcyI+CgkgICAgICA8YSBocmVmPSIiPkNvcHlyaWdodCAyMDI0IEJsdWUgV2l6YXJkIERpZ2l0YWw8L2E+IHwKCSAgICAgIDxhIHRhYmluZGV4PSItMSIgaHJlZj0iIj5UZXJtcyBvZiBTZXJ2aWNlPC9hPiB8CgkgICAgICA8YSB0YWJpbmRleD0iLTEiIGhyZWY9IiI+UHJpdmFjeSBQb2xpY3k8L2E+CgkgICAgPC9kaXY+CgkgIDwvZm9vdGVyPgoJICA8c2NyaXB0PgoJICAgIHZhciBsYXN0UmVmcmVzaCA9IDA7CgoJICAgIGZ1bmN0aW9uIHJlZnJlc2hUYWcodGhlVGFnKSB7CgkgICAgICB0cnkgewoJICAgICAgICBhaXB0YWcuY21kLmRpc3BsYXkucHVzaChmdW5jdGlvbigpIHsKCSAgICAgICAgICBhaXBEaXNwbGF5VGFnLnJlZnJlc2godGhlVGFnKTsKCSAgICAgICAgfSk7CgkgICAgICAgIGNvbnNvbGUubG9nKCdUYWcgcmVmcmVzaGVkIHN1Y2Nlc3NmdWxseScpOwoJICAgICAgfSBjYXRjaCAoZXJyb3IpIHsKCSAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcmVmcmVzaGluZyB0aGUgdGFnOicsIGVycm9yKTsKCSAgICAgIH0KCSAgICB9CgoKCSAgICBmdW5jdGlvbiBTaG93QWQxKGRvUmVmcmVzaCkgewoJICAgICAgaWYgKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHsKCSAgICAgICAgcmV0dXJuOwoJICAgICAgfQoJICAgICAgdmFyIGwgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3RiYWxsYnJvcy1pb18xNjB4NjAwJyk7CgkgICAgICBpZiAobCA9PSBudWxsKSByZXR1cm47CgkgICAgICBsLnN0eWxlLmRpc3BsYXkgPSAnJzsKCSAgICAgIGwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJzsKCgkgICAgICBsID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290YmFsbGJyb3MtaW9fMTYweDYwMCcpOwoJICAgICAgaWYgKGwgPT0gbnVsbCkgcmV0dXJuOwoJICAgICAgbC5zdHlsZS5kaXNwbGF5ID0gJyc7CgkgICAgICBsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7CgoKCSAgICAgIGlmICh0eXBlb2YgZ0NyYXp5U0RLICE9PSAndW5kZWZpbmVkJykgewoJICAgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7CgkgICAgICAgIHZhciBtcyA9IGQuZ2V0VGltZSgpOwoJICAgICAgICBpZiAobXMgLSBsYXN0UmVmcmVzaCA+IDEwMDAwKSB7CgkgICAgICAgICAgZ0NyYXp5U0RLLnJlcXVlc3RSZXNwb25zaXZlQmFubmVyKFsiZm9vdGJhbGxicm9zLWlvXzE2MHg2MDAiXSk7CgkgICAgICAgICAgbGFzdFJlZnJlc2ggPSBtczsKCSAgICAgICAgfQoJICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWlwRGlzcGxheVRhZyAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgcmVmcmVzaFRhZygnZm9vdGJhbGxicm9zLWlvXzE2MHg2MDAnKTsKCSAgICAgICAgcmVmcmVzaFRhZygnZm9vdGJhbGxicm9zLWlvXzE2MHg2MDBfMicpOwoJICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9iYW5uZXJfcmVxdWVzdGVkJyk7CgkgICAgICB9IGVsc2UKCSAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdiYW5uZXJfYWRibG9ja2VkJyk7CgoJICAgIH0KCgkgICAgdmFyIGxhc3RSZWZyZXNoNiA9IDA7CgkgICAgdmFyIGRvVGFnT25jZSA9IHRydWU7CgoJICAgIGZ1bmN0aW9uIFNob3dBZDYoKSB7CgkgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7CgkgICAgICB2YXIgbXMgPSBkLmdldFRpbWUoKTsKCSAgICAgIGlmIChtcyAtIGxhc3RSZWZyZXNoNiA8IDEwMDAwKSB7CgkgICAgICAgIHJldHVybjsKCSAgICAgIH0KCSAgICAgIGxhc3RSZWZyZXNoNiA9IG1zOwoKCgkgICAgICBpZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkgewoJICAgICAgICByZXR1cm47CgkgICAgICB9CgkgICAgICB2YXIgbCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGJhbGxicm9zLWlvXzMwMHgyNTAnKTsKCSAgICAgIGlmIChsID09IG51bGwpIHsKCSAgICAgICAgcmV0dXJuOwoJICAgICAgfQoJICAgICAgbC5zdHlsZS5kaXNwbGF5ID0gJyc7CgkgICAgICBsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7CgoJICAgICAgaWYgKHR5cGVvZiBnQ3JhenlTREsgIT09ICd1bmRlZmluZWQnKSB7fSBlbHNlIGlmICh0eXBlb2YgYWlwRGlzcGxheVRhZyAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgcmVmcmVzaFRhZygnZm9vdGJhbGxicm9zLWlvXzMwMHgyNTAnKTsKCSAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdhaXBfYmFubmVyX3JlcXVlc3RlZCcpOwoJICAgICAgICBpZiAodHlwZW9mIGFpcHRhZyAhPT0gJ3VuZGVmaW5lZCcgJiYgYWlwdGFnLnNldHRpbmdzID09ICIiKSB7CgkgICAgICAgICAgaWYgKGRvVGFnT25jZSkgU2VuZEV2ZW50KCdldmVudCcsICdhaXBfcHJvc3BlcicpOwoJICAgICAgICAgIFNlbmRFdmVudCgnZXZlbnQnLCAncmVxdWVzdF9wcm9zcGVyJyk7CgkgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFpcHRhZyAhPT0gJ3VuZGVmaW5lZCcgJiYgYWlwdGFnLnNldHRpbmdzLmlQcm9zcGVyVGVzdCAhPT0gInVuZGVmaW5lZCIpIHsKCSAgICAgICAgICBpZiAoZG9UYWdPbmNlKSBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9sZWdhY3knKTsKCSAgICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ3JlcXVlc3RfbGVnYWN5Jyk7CgkgICAgICAgIH0KCSAgICAgICAgZG9UYWdPbmNlID0gZmFsc2U7CgkgICAgICB9IGVsc2UKCSAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdiYW5uZXJfYWRibG9ja2VkJyk7CgkgICAgfQoKCSAgICB2YXIgbGFzdFJlZnJlc2gyID0gMDsKCgkgICAgZnVuY3Rpb24gU2hvd0FkMigpIHsKCgkgICAgICB2YXIgZCA9IG5ldyBEYXRlKCk7CgkgICAgICB2YXIgbXMgPSBkLmdldFRpbWUoKTsKCSAgICAgIGlmIChtcyAtIGxhc3RSZWZyZXNoMiA8IDEwMDAwKSB7CgkgICAgICAgIHJldHVybjsKCSAgICAgIH0KCSAgICAgIGxhc3RSZWZyZXNoMiA9IG1zOwoKCgkgICAgICBpZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkgewoJICAgICAgICByZXR1cm47CgkgICAgICB9CgkgICAgICB2YXIgbCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGJhbGxicm9zLWlvXzMwMHgyNTBfMicpOwoJICAgICAgaWYgKGwgPT0gbnVsbCkgcmV0dXJuOwoJICAgICAgbC5zdHlsZS5kaXNwbGF5ID0gJyc7CgkgICAgICBsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7CgoJICAgICAgaWYgKHR5cGVvZiBnQ3JhenlTREsgIT09ICd1bmRlZmluZWQnKSB7CgkgICAgICAgIHZhciBkID0gbmV3IERhdGUoKTsKCSAgICAgICAgdmFyIG1zID0gZC5nZXRUaW1lKCk7CgkgICAgICAgIGlmIChtcyAtIGxhc3RSZWZyZXNoMiA+IDEwMDAwKSB7CgkgICAgICAgICAgLy9obmRsZWQgYnkgdGhlIGZpcnN0IGJhbm5lciByZXF1ZXN0CgkgICAgICAgICAgLy9nQ3JhenlTREsucmVxdWVzdEJhbm5lcihbe2NvbnRhaW5lcklkOiAnZm9vdGJhbGxicm9zLWlvXzMwMHgyNTBfMicsc2l6ZTogJzMwMHgyNTAnLH1dKTsKCSAgICAgICAgICBnQ3JhenlTREsucmVxdWVzdFJlc3BvbnNpdmVCYW5uZXIoWyJmb290YmFsbGJyb3MtaW9fMzAweDI1MCIsICJmb290YmFsbGJyb3MtaW9fMzAweDI1MF8yIl0pOwoKCSAgICAgICAgICBsYXN0UmVmcmVzaDIgPSBtczsKCSAgICAgICAgfQoJICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWlwRGlzcGxheVRhZyAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgcmVmcmVzaFRhZygnZm9vdGJhbGxicm9zLWlvXzMwMHgyNTBfMicpOwoJICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9iYW5uZXJfcmVxdWVzdGVkJyk7CgkgICAgICAgIGlmICh0eXBlb2YgYWlwdGFnICE9PSAndW5kZWZpbmVkJyAmJiBhaXB0YWcuc2V0dGluZ3MgPT0gIiIpIHsKCSAgICAgICAgICBpZiAoZG9UYWdPbmNlKSBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9wcm9zcGVyJyk7CgkgICAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdyZXF1ZXN0X3Byb3NwZXInKTsKCSAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWlwdGFnICE9PSAndW5kZWZpbmVkJyAmJiBhaXB0YWcuc2V0dGluZ3MuaVByb3NwZXJUZXN0ICE9PSAidW5kZWZpbmVkIikgewoJICAgICAgICAgIGlmIChkb1RhZ09uY2UpIFNlbmRFdmVudCgnZXZlbnQnLCAnYWlwX2xlZ2FjeScpOwoJICAgICAgICAgIFNlbmRFdmVudCgnZXZlbnQnLCAncmVxdWVzdF9sZWdhY3knKTsKCSAgICAgICAgfQoJICAgICAgfSBlbHNlCgkgICAgICAgIFNlbmRFdmVudCgnZXZlbnQnLCAnYmFubmVyX2FkYmxvY2tlZCcpOwoJICAgIH0KCgkgICAgZnVuY3Rpb24gU2hvd0FkMygpIHsKCSAgICAgIGlmICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7CgkgICAgICAgIHJldHVybjsKCSAgICAgIH0KCSAgICAgIHZhciBsID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290YmFsbGJyb3MtaW9fNzI4eDkwJyk7CgkgICAgICBpZiAobCA9PSBudWxsKSByZXR1cm47CgkgICAgICBsLnN0eWxlLmRpc3BsYXkgPSAnJzsKCSAgICAgIGwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJzsKCSAgICAgIGlmICh0eXBlb2YgZ0NyYXp5U0RLICE9PSAndW5kZWZpbmVkJykgewoJICAgICAgICBnQ3JhenlTREsucmVxdWVzdFJlc3BvbnNpdmVCYW5uZXIoWyJmb290YmFsbGJyb3MtaW9fNzI4eDkwIl0pOwoJICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWlwRGlzcGxheVRhZyAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgcmVmcmVzaFRhZygnZm9vdGJhbGxicm9zLWlvXzcyOHg5MCcpOwoJICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9iYW5uZXJfcmVxdWVzdGVkJyk7CgkgICAgICB9IGVsc2UKCSAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdiYW5uZXJfYWRibG9ja2VkJyk7CgoJICAgIH0KCgkgICAgZnVuY3Rpb24gU2hvd0FkNCgpIHsKCSAgICAgIGlmICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7CgkgICAgICAgIHJldHVybjsKCSAgICAgIH0KCSAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA8IDEyMDApIHJldHVybjsKCSAgICAgIHZhciBsID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290YmFsbGJyb3MtaW9fMzM2eDI4MCcpOwoJICAgICAgaWYgKGwgPT0gbnVsbCkgcmV0dXJuOwoJICAgICAgbC5zdHlsZS5kaXNwbGF5ID0gJyc7CgkgICAgICBsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7CgkgICAgICBpZiAodHlwZW9mIGdDcmF6eVNESyAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgZ0NyYXp5U0RLLnJlcXVlc3RSZXNwb25zaXZlQmFubmVyKFsiZm9vdGJhbGxicm9zLWlvXzMzNngyODAiXSk7CgkgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhaXBEaXNwbGF5VGFnICE9PSAndW5kZWZpbmVkJykgewoJICAgICAgICByZWZyZXNoVGFnKCdmb290YmFsbGJyb3MtaW9fMzM2eDI4MCcpOwoJICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9iYW5uZXJfcmVxdWVzdGVkJyk7CgkgICAgICAgIGlmICh0eXBlb2YgYWlwdGFnICE9PSAndW5kZWZpbmVkJyAmJiBhaXB0YWcuc2V0dGluZ3MgPT0gIiIpIHsKCSAgICAgICAgICBpZiAoZG9UYWdPbmNlKSBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9wcm9zcGVyJyk7CgkgICAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdyZXF1ZXN0X3Byb3NwZXInKTsKCSAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWlwdGFnICE9PSAndW5kZWZpbmVkJyAmJiBhaXB0YWcuc2V0dGluZ3MuaVByb3NwZXJUZXN0ICE9PSAidW5kZWZpbmVkIikgewoJICAgICAgICAgIGlmIChkb1RhZ09uY2UpIFNlbmRFdmVudCgnZXZlbnQnLCAnYWlwX2xlZ2FjeScpOwoJICAgICAgICAgIFNlbmRFdmVudCgnZXZlbnQnLCAncmVxdWVzdF9sZWdhY3knKTsKCSAgICAgICAgfQoJICAgICAgfSBlbHNlCgkgICAgICAgIFNlbmRFdmVudCgnZXZlbnQnLCAnYmFubmVyX2FkYmxvY2tlZCcpOwoKCSAgICB9CgoJICAgIGZ1bmN0aW9uIFNob3dBZDcoKSB7CgkgICAgICBpZiAoL0FuZHJvaWR8d2ViT1N8aVBob25lfGlQYWR8aVBvZHxPcGVyYSBNaW5pL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkgewoJICAgICAgICByZXR1cm47CgkgICAgICB9CgkgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCAxMjAwKSByZXR1cm47CgkgICAgICB2YXIgbCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGJhbGxicm9zLWlvXzMzNngyODBfMicpOwoJICAgICAgaWYgKGwgPT0gbnVsbCkgcmV0dXJuOwoJICAgICAgbC5zdHlsZS5kaXNwbGF5ID0gJyc7CgkgICAgICBsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7CgkgICAgICBpZiAodHlwZW9mIGdDcmF6eVNESyAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgZ0NyYXp5U0RLLnJlcXVlc3RSZXNwb25zaXZlQmFubmVyKFsiZm9vdGJhbGxicm9zLWlvXzMzNngyODBfMiJdKTsKCSAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFpcERpc3BsYXlUYWcgIT09ICd1bmRlZmluZWQnKSB7CgkgICAgICAgIHJlZnJlc2hUYWcoJ2Zvb3RiYWxsYnJvcy1pb18zMzZ4MjgwXzInKTsKCSAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdhaXBfYmFubmVyX3JlcXVlc3RlZCcpOwoJICAgICAgICBpZiAodHlwZW9mIGFpcHRhZyAhPT0gJ3VuZGVmaW5lZCcgJiYgYWlwdGFnLnNldHRpbmdzID09ICIiKSB7CgkgICAgICAgICAgaWYgKGRvVGFnT25jZSkgU2VuZEV2ZW50KCdldmVudCcsICdhaXBfcHJvc3BlcicpOwoJICAgICAgICAgIFNlbmRFdmVudCgnZXZlbnQnLCAncmVxdWVzdF9wcm9zcGVyJyk7CgkgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFpcHRhZyAhPT0gJ3VuZGVmaW5lZCcgJiYgYWlwdGFnLnNldHRpbmdzLmlQcm9zcGVyVGVzdCAhPT0gInVuZGVmaW5lZCIpIHsKCSAgICAgICAgICBpZiAoZG9UYWdPbmNlKSBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9sZWdhY3knKTsKCSAgICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ3JlcXVlc3RfbGVnYWN5Jyk7CgkgICAgICAgIH0KCSAgICAgIH0gZWxzZQoJICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ2Jhbm5lcl9hZGJsb2NrZWQnKTsKCgkgICAgfQoKCSAgICBmdW5jdGlvbiBTaG93QWQ4KCkgewoJICAgICAgaWYgKC9BbmRyb2lkfHdlYk9TfGlQaG9uZXxpUGFkfGlQb2R8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHsKCSAgICAgICAgcmV0dXJuOwoJICAgICAgfQoJICAgICAgdmFyIGwgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3RiYWxsYnJvcy1pb183Mjh4OTBfbScpOwoJICAgICAgaWYgKGwgPT0gbnVsbCkgcmV0dXJuOwoJICAgICAgbC5zdHlsZS5kaXNwbGF5ID0gJyc7CgkgICAgICBsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7CgkgICAgICBpZiAodHlwZW9mIGdDcmF6eVNESyAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgZ0NyYXp5U0RLLnJlcXVlc3RSZXNwb25zaXZlQmFubmVyKFsiZm9vdGJhbGxicm9zLWlvXzcyOHg5MCJdKTsKCSAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFpcERpc3BsYXlUYWcgIT09ICd1bmRlZmluZWQnKSB7CgkgICAgICAgIHJlZnJlc2hUYWcoJ2Zvb3RiYWxsYnJvcy1pb183Mjh4OTBfbScpOwoJICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9iYW5uZXJfcmVxdWVzdGVkJyk7CgkgICAgICB9IGVsc2UKCSAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdiYW5uZXJfYWRibG9ja2VkJyk7CgoJICAgIH0KCgkgICAgZnVuY3Rpb24gU2hvd0FkOSgpIHsKCSAgICAgIGlmICgvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7CgkgICAgICAgIHJldHVybjsKCSAgICAgIH0KCSAgICAgIHZhciBsID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290YmFsbGJyb3MtaW9fOTcweDI1MCcpOwoJICAgICAgaWYgKGwgPT0gbnVsbCkgcmV0dXJuOwoJICAgICAgbC5zdHlsZS5kaXNwbGF5ID0gJyc7CgkgICAgICBsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7CgkgICAgICBpZiAodHlwZW9mIGdDcmF6eVNESyAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgZ0NyYXp5U0RLLnJlcXVlc3RSZXNwb25zaXZlQmFubmVyKFsiZm9vdGJhbGxicm9zLWlvXzk3MHgyNTAiXSk7CgkgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBhaXBEaXNwbGF5VGFnICE9PSAndW5kZWZpbmVkJykgewoJICAgICAgICByZWZyZXNoVGFnKCdmb290YmFsbGJyb3MtaW9fOTcweDI1MCcpOwoJICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9iYW5uZXJfcmVxdWVzdGVkJyk7CgkgICAgICAgIGlmICh0eXBlb2YgYWlwdGFnICE9PSAndW5kZWZpbmVkJyAmJiBhaXB0YWcuc2V0dGluZ3MgPT0gIiIpIHsKCSAgICAgICAgICBpZiAoZG9UYWdPbmNlKSBTZW5kRXZlbnQoJ2V2ZW50JywgJ2FpcF9wcm9zcGVyJyk7CgkgICAgICAgICAgU2VuZEV2ZW50KCdldmVudCcsICdyZXF1ZXN0X3Byb3NwZXInKTsKCSAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWlwdGFnICE9PSAndW5kZWZpbmVkJyAmJiBhaXB0YWcuc2V0dGluZ3MuaVByb3NwZXJUZXN0ICE9PSAidW5kZWZpbmVkIikgewoJICAgICAgICAgIGlmIChkb1RhZ09uY2UpIFNlbmRFdmVudCgnZXZlbnQnLCAnYWlwX2xlZ2FjeScpOwoJICAgICAgICAgIFNlbmRFdmVudCgnZXZlbnQnLCAncmVxdWVzdF9sZWdhY3knKTsKCSAgICAgICAgfQoKCgkgICAgICAgIGRvVGFnT25jZSA9IGZhbHNlOwoJICAgICAgfSBlbHNlIHsKCSAgICAgICAgbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAidXJsKGFzc2V0cy90dXJub2ZmLmpwZykiOwoJICAgICAgICBTZW5kRXZlbnQoJ2V2ZW50JywgJ2Jhbm5lcl9hZGJsb2NrZWRfbWVzc2FnZV9zaG93bicpOwoJICAgICAgfQoKCSAgICB9CgoKCgoKCSAgICBmdW5jdGlvbiByaWdodChzdHIsIGNocikgewoJICAgICAgcmV0dXJuIHN0ci5zbGljZShzdHIubGVuZ3RoIC0gY2hyLCBzdHIubGVuZ3RoKTsKCSAgICB9CgoJICAgIGZ1bmN0aW9uIFNldENHSW52aXRlTGluaygpIHsKCSAgICAgIGlmICh0eXBlb2YgZ0NyYXp5U0RLICE9PSAndW5kZWZpbmVkJykgewoJICAgICAgICB2YXIgbWV0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJjZ2xpbmsiKTsKCSAgICAgICAgdmFyIGFTdHIgPSBtZXRhLnZhbHVlOwoJICAgICAgICBhU3RyID0gcmlnaHQoYVN0ciwgOCk7CgkgICAgICAgIHZhciBhQ0dMaW5rID0gZ0NyYXp5U0RLLmludml0ZUxpbmsoewoJICAgICAgICAgIHJvb21JZDogYVN0cgoJICAgICAgICB9KTsKCSAgICAgICAgbWV0YS52YWx1ZSA9IGFDR0xpbms7CgkgICAgICAgIG1ldGEuc2VsZWN0CgkgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKCdDb3B5JykKCSAgICAgICAgY29uc29sZS5sb2coIkNPUElFRCBDRyBVUkwiKTsKCSAgICAgIH0KCSAgICB9CgoJICAgIGZ1bmN0aW9uIFNob3dBZEJyZWFrKCkgewoJICAgICAgLy9jaGVjayBpZiB0aGUgYWRzbGliIGlzIGxvYWRlZCBjb3JyZWN0bHkgb3IgYmxvY2tlZCBieSBhZGJsb2NrZXJzIGV0Yy4KCSAgICAgIGlmICh0eXBlb2YgZ0NyYXp5U0RLICE9PSAndW5kZWZpbmVkJykgewoJICAgICAgICBNYWluLkRvbmVJbnRlcnN0aXRpYWxBZChmYWxzZSk7CgkgICAgICAgIHJldHVybjsKCSAgICAgIH0KCgkgICAgICBpZiAodHlwZW9mIGFkcGxheWVyID09PSAndW5kZWZpbmVkJykgewoJICAgICAgICBNYWluLkRvbmVJbnRlcnN0aXRpYWxBZCh0cnVlKTsKCSAgICAgICAgcmV0dXJuOwoJICAgICAgfQoJICAgICAgYWlwdGFnLmNtZC5wbGF5ZXIucHVzaChmdW5jdGlvbigpIHsKCSAgICAgICAgYWRwbGF5ZXIuc3RhcnRBZEJyZWFrKCk7CgkgICAgICB9KTsKCSAgICB9CgoKCSAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgib3BlbmZsLWNvbnRlbnQiKS5hZGRFdmVudExpc3RlbmVyKCJ3aGVlbCIsIGRvU2Nyb2xsKTsKCSAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgibW9yZSIpLmFkZEV2ZW50TGlzdGVuZXIoIndoZWVsIiwgZG9TY3JvbGwpOwoKCSAgICBmdW5jdGlvbiBkb1Njcm9sbChldmVudCkgewoJICAgICAgd2luZG93LnNjcm9sbCgwLCB3aW5kb3cuc2Nyb2xsWSArIGV2ZW50LmRlbHRhWSk7CgkgICAgfQoKCSAgICBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHsKCSAgICAgIC8vY29uc29sZS5sb2coImFjdGl2ZSBlbGVtZW50OiIgKyBkb2N1bWVudC5hY3RpdmVFbGVtZW50KTsKCSAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50LnRhZ05hbWUgPT0gIklGUkFNRSIpIHsKCSAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7CgkgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuZmwtY29udGVudCcpLmZvY3VzKCk7CgkgICAgICAgIC8vY29uc29sZS5sb2coJ3JlZm9jdXNpbmcnKTsKCSAgICAgIH0KCSAgICB9LCAzMCk7CgoKCSAgICAvKnNldEludGVydmFsKGZ1bmN0aW9uICgpIHsgCgkgICAgCXZhciBsID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVyb2xsJyk7CgkgICAgCWlmKGwgIT0gbnVsbCAmJiB0eXBlb2YgbC5zdHlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbC5zdHlsZS52aXNpYmlsaXR5ICE9PSAndmlzaWJsZScpIHsKCSAgICAJCWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuZmwtY29udGVudCcpLmZvY3VzKCk7CgkgICAgCQlpZihkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTElGcmFtZUVsZW1lbnQpCgkgICAgCQl7CgkgICAgCQkJLy9kb2N1bWVudC5hY3RpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAibm9uZSI7CgkgICAgCQkJd2luZG93LmZvY3VzKCk7CgkgICAgCQkJd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuZmwtY29udGVudCcpLmZvY3VzKCk7CgkgICAgCQl9CgkgICAgCX0KCSAgICB9LCAxMDAwKTsqLwoKCgkgICAgLyoJCXNldEludGVydmFsKGZ1bmN0aW9uICgpIHsgCgkgICAgCQkJdmFyIGwgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3RiYWxsYnJvcy1pb18xNjB4NjAwJyk7CgkgICAgCQkJaWYobCAhPSBudWxsICYmIHR5cGVvZiBsLnN0eWxlICE9PSAndW5kZWZpbmVkJyAmJiBsLnN0eWxlLnZpc2liaWxpdHkgPT0gJ3Zpc2libGUnKSB7CgkgICAgCQkJCVNob3dBZDUoKTsKCSAgICAJCQl9CgkgICAgCQl9LCAzMDAwMCk7CgoJICAgIAkJc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkgeyAKCSAgICAJCQl2YXIgbCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGJhbGxicm9zLWlvXzE2MHg2MDBfMicpOwoJICAgIAkJCWlmKGwgIT0gbnVsbCAmJiB0eXBlb2YgbC5zdHlsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbC5zdHlsZS52aXNpYmlsaXR5ID09ICd2aXNpYmxlJykgewoJICAgIAkJCQlTaG93QWQxKCk7CgkgICAgCQkJfQoJICAgIAkJfSwgMzIwMDApOyovCgoJICAgIHZhciBzaWQgPSAnZG5xM2hpbjVnNjdpZ2sycmI2dml2NzhwZDEnCgoJICAgIGZ1bmN0aW9uIHVwZGF0ZVN0YXR1cyhmcm9tRXZlbnQgPSBmYWxzZSkgewoJICAgICAgY29uc3QgcmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7CgkgICAgICB2YXIgYVN0ciA9ICJyZWNvcmRzZXNzaW9uLnBocD9zPSIgKyBzaWQ7CgkgICAgICBpZiAoZnJvbUV2ZW50ID09IHRydWUpIGFTdHIgPSBhU3RyICsgIiZlPTEiCgkgICAgICByZXEub3BlbigiR0VUIiwgYVN0cik7CgkgICAgICByZXEuc2VuZCgpOwoJICAgIH0KCgkgICAgZnVuY3Rpb24gU2VuZEV2ZW50KHRoZUV2ZW50LCB0aGVBY3Rpb24sIHRoZVBhcm1zID0gJycpIHsKCSAgICAgIGlmICh0aGVQYXJtcyA9PSAnJykgewoJICAgICAgICBndGFnKHRoZUV2ZW50LCB0aGVBY3Rpb24pOwoJICAgICAgfSBlbHNlIHsKCSAgICAgICAgZ3RhZyh0aGVFdmVudCwgdGhlQWN0aW9uLCB0aGVQYXJtcyk7CgkgICAgICB9CgkgICAgICB1cGRhdGVTdGF0dXModHJ1ZSk7CgkgICAgICAvL2NvbnNvbGUubG9nKCJTZW5kaW5nIGV2ZW50OiAiICsgdGhlRXZlbnQgKyAiLyIgKyB0aGVBY3Rpb24gKyAiLyIgKyB0aGVQYXJtcyk7CgkgICAgfQoJICAgIC8vc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7IHVwZGF0ZVN0YXR1cywgNCo2MCoxMDAwKTsJCQkKCSAgICAvL3NldEludGVydmFsKCBmdW5jdGlvbigpIHsgCgkgICAgLy8Jd2luZG93LnNjcm9sbFRvKDAsIDApOyAKCSAgICAvL30sIDIwMDAgKTsJCQkJCQoJICAgIHVwZGF0ZVN0YXR1cyh0cnVlKTsKCgkgICAgLy9zZXRJbnRlcnZhbChDbGVhckFkcywgMjAwMCk7CQkKCgkgICAgZnVuY3Rpb24gRW1haWxTaWdudXAoKSB7CgkgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoInNpZ251cCIpIHx8IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJkZWxldGVtZSIpKSByZXR1cm47CgkgICAgICBjb25zdCBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJpZnJhbWUiKTsKCSAgICAgIGlmcmFtZS5zcmMgPSAiIjsKCgkgICAgICAvLwkJCWlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gImJsb2NrIjsKCSAgICAgIGlmcmFtZS5zdHlsZS53aWR0aCA9ICI1NTBweCI7CgkgICAgICBpZnJhbWUuc3R5bGUuaGVpZ2h0ID0gIiIgKyB3aW5kb3cuaW5uZXJIZWlnaHQgLSAxMDAgKyAicHgiOwoJICAgICAgaWZyYW1lLnN0eWxlLnBvc2l0aW9uID0gImFic29sdXRlIjsKCSAgICAgIGlmcmFtZS5zdHlsZS50b3AgPSAiNTBweCI7CgkgICAgICBpZnJhbWUuc3R5bGUubGVmdCA9ICI1MCUiOwoJICAgICAgaWZyYW1lLnN0eWxlWyJtYXJnaW4tbGVmdCJdID0gIi0yMjVweCI7CgkgICAgICAvL2lmcmFtZS5zdHlsZVsibWFyZ2luLXJpZ2h0Il0gPSAiLTI3NXB4IjsKCSAgICAgIGlmcmFtZS5zdHlsZVsibWF4LXdpZHRoIl0gPSAiMTAwJSI7CgkgICAgICBpZnJhbWUuc2V0QXR0cmlidXRlKCJpZCIsICJzaWdudXAiKTsKCgkgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7CgkgICAgfQoKCSAgICBmdW5jdGlvbiBHYW1lUGxheVN0YXJ0KCkgewoJICAgICAgaWYgKHR5cGVvZiBnQ3JhenlTREsgIT09ICd1bmRlZmluZWQnKSB7CgkgICAgICAgIGNvbnNvbGUubG9nKCJHYW1lUGxheVN0YXJ0Iik7CgkgICAgICAgIGdDcmF6eVNESy5nYW1lcGxheVN0YXJ0KCk7CgkgICAgICB9CgkgICAgfQoKCSAgICBmdW5jdGlvbiBHYW1lUGxheVN0b3AoKSB7CgkgICAgICBpZiAodHlwZW9mIGdDcmF6eVNESyAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgY29uc29sZS5sb2coIkdhbWVQbGF5U3RvcCIpOwoJICAgICAgICBnQ3JhenlTREsuZ2FtZXBsYXlTdG9wKCk7CgkgICAgICB9CgkgICAgfQoKCSAgICBmdW5jdGlvbiBIYXBweVRpbWUoKSB7CgkgICAgICBpZiAodHlwZW9mIGdDcmF6eVNESyAhPT0gJ3VuZGVmaW5lZCcpIHsKCSAgICAgICAgY29uc29sZS5sb2coImhhcHB5dGltZSIpOwoJICAgICAgICBnQ3JhenlTREsuaGFwcHl0aW1lKCk7CgkgICAgICB9CgkgICAgfQoKCSAgICB2YXIgc2Nyb2xsZXJNZXNzYWdlID0gIiAgICI7CgoJICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbmZsLWNvbnRlbnQnKTsKCSAgICAvLyBGdW5jdGlvbiB0byBrZWVwIHRoZSBlbGVtZW50IGZvY3VzZWQKCSAgICBmdW5jdGlvbiBrZWVwRm9jdXMoKSB7CgkgICAgICBlbGVtZW50LmZvY3VzKCk7CgkgICAgfQoJICAgIC8vIEV2ZW50IGxpc3RlbmVycyB0byByZXN0b3JlIGZvY3VzIHdoZW4gbG9zdAoJICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGtlZXBGb2N1cyk7CgkgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsIGtlZXBGb2N1cyk7CgkgIDwvc2NyaXB0PgoJPC9ib2R5PgoKCTwvaHRtbD4='
  },
  {
    id: 'minecraft-online',
    name: 'Modern Client/Minecraft',
    cat: 'Sandbox',
    size: 780, rating: 4.8, reviews: 204100,
    desc: 'Explore infinite worlds, build anything you can imagine, and survive the night.',
    img: 'https://tse4.mm.bing.net/th/id/OIP.kK6xuEGDiJk3MYlkfq25ugHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    shots: [],
    url: 'data:text/html;base64,PCEtLSBVbHRpbWF0ZSBHYW1lIFN0YXNoIEZpbGUgLS0+CjwhLS0gRm9yIHRoZSByZWd1bGFybHkgdXBkYXRpbmcgZG9jIGdvIHRvIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMV9GbUgzQmxTQlFJN0ZHZ0FRTDU5LVpQZThlQ3hzMzV3ZWw2SlV5VmFHOFEvIC0tPgo8IS0tIHNoeHlkZXIgLS0+CjwhRE9DVFlQRSBodG1sPgo8aHRtbCBzdHlsZT0id2lkdGg6MTAwJTtoZWlnaHQ6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOmJsYWNrOyI+Cgk8aGVhZD4KICAgIDxiYXNlIGhyZWY9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9zaGF5ZGVycnIvZWFnbGVyY3JhZnRAbWFpbi9tb2Rlcm4vIj4KCQk8bWV0YSBjaGFyc2V0PSJVVEYtOCIgLz4KCQk8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgbWluaW11bS1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MS4wIiAvPgoJCTxtZXRhIG5hbWU9ImRlc2NyaXB0aW9uIiBjb250ZW50PSJQbGF5IG1pbmVjcmFmdCAxLjEyIGluIHlvdXIgYnJvd3NlciIgLz4KCQk8bWV0YSBuYW1lPSJrZXl3b3JkcyIgY29udGVudD0iZWFnbGVyY3JhZnQsIG1pbmVjcmFmdCwgMS4xMiwgMS4xMi4yIiAvPgoJCTx0aXRsZT5FYWdsZXJjcmFmdFggMS4xMiBXQVNNLUdDPC90aXRsZT4KCQk8bWV0YSBwcm9wZXJ0eT0ib2c6bG9jYWxlIiBjb250ZW50PSJlbi1VUyIgLz4KCQk8bWV0YSBwcm9wZXJ0eT0ib2c6dHlwZSIgY29udGVudD0id2Vic2l0ZSIgLz4KCQk8bWV0YSBwcm9wZXJ0eT0ib2c6dGl0bGUiIGNvbnRlbnQ9IkVhZ2xlcmNyYWZ0IDEuMTIgV0FTTSIgLz4KCQk8bWV0YSBwcm9wZXJ0eT0ib2c6ZGVzY3JpcHRpb24iIGNvbnRlbnQ9IlBsYXkgbWluZWNyYWZ0IDEuMTIgaW4geW91ciBicm93c2VyIiAvPgoJCTxtZXRhIHByb3BlcnR5PSJvZzppbWFnZSIgY29udGVudD0iZmF2aWNvbi5wbmciIC8+CgkJPGxpbmsgdHlwZT0iaW1hZ2UvcG5nIiByZWw9InNob3J0Y3V0IGljb24iIGhyZWY9ImZhdmljb24ucG5nIiAvPgoJCTxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9ImJvb3RzdHJhcC5qcyI+PC9zY3JpcHQ+CgkJPHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPgoJCQkidXNlIHN0cmljdCI7CgkJCXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCJsb2FkIiwgYXN5bmMgZnVuY3Rpb24oKSB7CgkJCQlpZih3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCJmaWxlOiIpID09PSAxKSB7CgkJCQkJYWxlcnQoInBhdGNoZWQgbG9sIik7CgkJCQl9ZWxzZSB7CgoJCQkJCS8vICUlJSUlJSUlJSBsYXVuY2ggb3B0aW9ucyAlJSUlJSUlJSUlJSUKCgkJCQkJdmFyIHJlbGF5SWQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKTsKCgkJCQkJdmFyIHBhcnRzID0gYXdhaXQgUHJvbWlzZS5hbGwoWwoJCQkJCQlmZXRjaCgiYXNzZXRzX3BhcnQxLmJpbiIpLnRoZW4oZnVuY3Rpb24ocikgeyByZXR1cm4gci5hcnJheUJ1ZmZlcigpOyB9KSwKCQkJCQkJZmV0Y2goImFzc2V0c19wYXJ0Mi5iaW4iKS50aGVuKGZ1bmN0aW9uKHIpIHsgcmV0dXJuIHIuYXJyYXlCdWZmZXIoKTsgfSkKCQkJCQldKTsKCQkJCQl2YXIgY29tYmluZWQgPSBuZXcgVWludDhBcnJheShwYXJ0c1swXS5ieXRlTGVuZ3RoICsgcGFydHNbMV0uYnl0ZUxlbmd0aCk7CgkJCQkJY29tYmluZWQuc2V0KG5ldyBVaW50OEFycmF5KHBhcnRzWzBdKSwgMCk7CgkJCQkJY29tYmluZWQuc2V0KG5ldyBVaW50OEFycmF5KHBhcnRzWzFdKSwgcGFydHNbMF0uYnl0ZUxlbmd0aCk7CgkJCQkJdmFyIGVwd1VSTCA9IFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW2NvbWJpbmVkXSwge3R5cGU6ICJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0ifSkpOwoKCQkJCQl3aW5kb3cuZWFnbGVyY3JhZnRYT3B0cyA9IHsKCQkJCQkJZGVtb01vZGU6IGZhbHNlLAoJCQkJCQljb250YWluZXI6ICJnYW1lX2ZyYW1lIiwKCQkJCQkJYXNzZXRzVVJJOiBlcHdVUkwsCgkJCQkJCXdvcmxkc0RCOiAid29ybGRzIiwKCQkJCQkJc2VydmVyczogWwoJCQkJCQkJLyogZXhhbXBsZTogeyBhZGRyOiAid3M6Ly9sb2NhbGhvc3Q6ODA4MS8iLCBuYW1lOiAiTG9jYWwgdGVzdCBzZXJ2ZXIiIH0gKi8KCQkJCQkJXSwKCQkJCQkJcmVsYXlzOiBbCgkJCQkJCQl7IGFkZHI6ICJ3c3M6Ly9yZWxheS5kZWV2LmlzLyIsIGNvbW1lbnQ6ICJsYXgxZHVkZSByZWxheSAjMSIsIHByaW1hcnk6IHJlbGF5SWQgPT0gMCB9LAoJCQkJCQkJeyBhZGRyOiAid3NzOi8vcmVsYXkubGF4MWR1ZGUubmV0LyIsIGNvbW1lbnQ6ICJsYXgxZHVkZSByZWxheSAjMiIsIHByaW1hcnk6IHJlbGF5SWQgPT0gMSB9LAoJCQkJCQkJeyBhZGRyOiAid3NzOi8vcmVsYXkuc2hobm93aXNub3R0aGV0aS5tZS8iLCBjb21tZW50OiAiYXl1bmFtaSByZWxheSAjMSIsIHByaW1hcnk6IHJlbGF5SWQgPT0gMiB9CgkJCQkJCV0KCQkJCQl9OwoKCQkJCQkvLyAlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlCgoJCQkJCXZhciBxID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDsKCQkJCQlpZigodHlwZW9mIHEgPT09ICJzdHJpbmciKSAmJiBxWzBdID09PSAiPyIgJiYgKHR5cGVvZiB3aW5kb3cuVVJMU2VhcmNoUGFyYW1zICE9PSAidW5kZWZpbmVkIikpIHsKCQkJCQkJcSA9IG5ldyB3aW5kb3cuVVJMU2VhcmNoUGFyYW1zKHEpOwoJCQkJCQl2YXIgcyA9IHEuZ2V0KCJzZXJ2ZXIiKTsKCQkJCQkJaWYocykgd2luZG93LmVhZ2xlcmNyYWZ0WE9wdHMuam9pblNlcnZlciA9IHM7CgkJCQkJfQoKCQkJCQltYWluKCk7CgoJCQkJfQoJCQl9KTsKCQk8L3NjcmlwdD4KCTwvaGVhZD4KCTxib2R5IHN0eWxlPSJtYXJnaW46MHB4O3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7b3ZlcmZsb3c6aGlkZGVuO2JhY2tncm91bmQtY29sb3I6YmxhY2s7IiBpZD0iZ2FtZV9mcmFtZSI+PHNjcmlwdCB0eXBlPSJtb2R1bGUiIHNyYz0iaHR0cHM6Ly9zdGF0aWMuY2xvdWRmbGFyZWluc2lnaHRzLmNvbS9iZWFjb24ubWluLmpzL3Y0NTEzMjI2Y2RhZTM0NzQ2YjRkZWRmMGI0ZGZhMDk5ZTE3ODE3OTE1MDk0OTYiIGludGVncml0eT0ic2hhNTEyLVpFOXBaYVVYTkQ2NnYzODBRVXRjaC81c0U5dFBGaDJ6ZzQ1cFIyUEIwQ1ZrQ3RPUkV2MkFKS2tTaWRJU1dreXNFdVEwRUg4ZmFVVTVkdTc4Yng4N1VRPT0iIGRhdGEtY2YtYmVhY29uPSd7InZlcnNpb24iOiIyMDI0LjExLjAiLCJ0b2tlbiI6IjUxNGFjNDBiYzI4OTRlOWY4NGM1MzIxNWM2MGUxOGQyIiwiciI6MX0nIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiPjwvc2NyaXB0Pgo8L2JvZHk+CjwvaHRtbD4=',
    newTab: true
  },
  {
    id: 'superhot',
    name: 'SUPERHOT',
    cat: 'Action',
    size: 890, rating: 4.6, reviews: 31200,
    desc: 'Just get a gun and shoot bro... Time moves only when you move. A first-person shooter where time is on your side.',
    img: 'https://tse3.mm.bing.net/th/id/OIP.wcbGcn7bMGaI9rjLELbCNAHaD4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    shots: [],
    url: 'data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuIj4KPGhlYWQ+CiAgICA8bWV0YSBjaGFyc2V0PSJVVEYtOCIgLz4KICAgIDxtZXRhIGh0dHAtZXF1aXY9IlgtVUEtQ29tcGF0aWJsZSIgY29udGVudD0iSUU9ZWRnZSIgLz4KICAgIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wIiAvPgogICAgPGxpbmsgcmVsPSJpY29uIiBocmVmPSJob3QuanBnIj4KICAgIDx0aXRsZT5TVVBFUkhPVDwvdGl0bGU+IAogICAgPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvM2toMC8za2gwLWxpdGVAZDVjZjZiYjc5YTY0MjdhZGE5OWU3ZjJlMzE0MjUzMjVmNDU0NTY1ZC9wcm9qZWN0cy9zdXBlcmhvdC9zdHlsZXMuY3NzIiAvPgo8L2hlYWQ+Cjxib2R5IHN0eWxlPSJtYXJnaW46IDA7Ij4KICAgIDxjYW52YXMgY2xhc3M9ImVtc2NyaXB0ZW4iIGlkPSJjYW52YXMiIG9uY29udGV4dG1lbnU9ImV2ZW50LnByZXZlbnREZWZhdWx0KCkiIHN0eWxlPSJ3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyI+PC9jYW52YXM+CiAgICA8c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI+CiAgICAgICAgdmFyIE1vZHVsZSA9IHsKICAgICAgICAgICAgVE9UQUxfTUVNT1JZOiAyNjg0MzU0NTYsCiAgICAgICAgICAgIGVycm9yaGFuZGxlcjogbnVsbCwKICAgICAgICAgICAgY29tcGF0aWJpbGl0eWNoZWNrOiBudWxsLAogICAgICAgICAgICBkYXRhVXJsOiAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doLzNraDAvM2toMC1saXRlQGQ1Y2Y2YmI3OWE2NDI3YWRhOTllN2YyZTMxNDI1MzI1ZjQ1NDU2NWQvcHJvamVjdHMvc3VwZXJob3Qvd2ViZ2wuZGF0YWd6IiwKICAgICAgICAgICAgY29kZVVybDogImh0dHBzOi8vcmF3Y2RuLmdpdGhhY2suY29tLzNraDAvM2toMC1saXRlL2Q1Y2Y2YmI3OWE2NDI3YWRhOTllN2YyZTMxNDI1MzI1ZjQ1NDU2NWQvcHJvamVjdHMvc3VwZXJob3Qvd2ViZ2wuanNneiIsCiAgICAgICAgICAgIG1lbVVybDogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC8za2gwLzNraDAtbGl0ZUBkNWNmNmJiNzlhNjQyN2FkYTk5ZTdmMmUzMTQyNTMyNWY0NTQ1NjVkL3Byb2plY3RzL3N1cGVyaG90L3dlYmdsLm1lbWd6IiwKICAgICAgICB9OwogICAgPC9zY3JpcHQ+CiAgICA8c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doLzNraDAvM2toMC1saXRlQGQ1Y2Y2YmI3OWE2NDI3YWRhOTllN2YyZTMxNDI1MzI1ZjQ1NDU2NWQvcHJvamVjdHMvc3VwZXJob3QvVW5pdHlMb2FkZXIuanMiPjwvc2NyaXB0Pgo8L2JvZHk+CjwvaHRtbD4=',
     newTab: true
  },
  {
    id: 'grow-garden',
    name: 'Grow A Garden',
    cat: 'Simulation',
    size: 340, rating: 4.2, reviews: 9800,
    desc: 'Grow a garden but a bit bad. Plant seeds, water them, and watch them grow into something beautiful.',
    img: 'https://tse2.mm.bing.net/th/id/OIP.DEM_7Fkcn9iJAbGBpzTZtAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    shots: [],
    url: 'data:text/html;base64,PCFET0NUWVBFIGh0bWw+CgoKPCEtLSBVbHRpbWF0ZSBHYW1lIFN0YXNoIGZpbGUtLT4gCjwhLS0gRm9yIHRoZSByZWd1bGFybHkgdXBkYXRpbmcgZG9jIGdvIHRvIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMV9GbUgzQmxTQlFJN0ZHZ0FRTDU5LVpQZThlQ3hzMzV3ZWw2SlV5VmFHOFEvIC0tPgoKCgoKCgogIDxtZXRhIGNoYXJzZXQ9InV0Zi04Ij4KICA8bWV0YSBuYW1lPSJ2aWV3cG9ydCIgY29udGVudD0id2lkdGg9ZGV2aWNlLXdpZHRoLCBpbml0aWFsLXNjYWxlPTEuMCwgdXNlci1zY2FsYWJsZT1ubyI+CiAgPHN0eWxlPgogICAgaHRtbCwgYm9keSB7CiAgICAgIG1hcmdpbjogMDsKICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICBvdmVyZmxvdzogaGlkZGVuOwogICAgICBiYWNrZ3JvdW5kOiAjMjMxRjIwOwogICAgfQoKICAgICN1bml0eS1jb250YWluZXIgewogICAgICB3aWR0aDogMTAwJTsKICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICBwb3NpdGlvbjogcmVsYXRpdmU7CiAgICB9CgogICAgI3VuaXR5LWNhbnZhcyB7CiAgICAgIHdpZHRoOiAxMDAlOwogICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgIGJhY2tncm91bmQ6ICMyMzFGMjA7CiAgICAgIGRpc3BsYXk6IGJsb2NrOwogICAgfQoKICAgICNsb2FkaW5nLWNvdmVyIHsKICAgICAgcG9zaXRpb246IGFic29sdXRlOwogICAgICB0b3A6IDA7IGxlZnQ6IDA7CiAgICAgIHdpZHRoOiAxMDAlOwogICAgICBoZWlnaHQ6IDEwMCU7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOwogICAgICBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOwogICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjMxRjIwOwogICAgICB6LWluZGV4OiA5OTk5OwogICAgfQoKICAgICNwcm9ncmVzcy1jb250YWluZXIgewogICAgICB3aWR0aDogNDAlOwogICAgICBoZWlnaHQ6IDI0cHg7CiAgICAgIGJhY2tncm91bmQ6ICM1NTU7CiAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNmZmY7CiAgICAgIHBhZGRpbmc6IDJweDsKICAgIH0KCiAgICAjcHJvZ3Jlc3MtZmlsbCB7CiAgICAgIHdpZHRoOiAwJTsKICAgICAgaGVpZ2h0OiAxMDAlOwogICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsKICAgICAgdHJhbnNpdGlvbjogd2lkdGggMC4yczsKICAgIH0KICA8L3N0eWxlPjxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4KICAgIHdpbmRvdy5TREtfT1BUSU9OUyA9IHsKICAgICAgICBnYW1lSWQ6ICJyMnR6cHk5Y2dybjJ1NHhnemM5ejB6YnR2eG0xNm1ieSIsCiAgICAgICAgb25FdmVudDogZnVuY3Rpb24gKGEpIHsKICAgICAgICAgICAgc3dpdGNoIChhLm5hbWUpIHsKICAgICAgICAgICAgICAgIGNhc2UgIlNES19HQU1FX1BBVVNFIjoKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgIlNES19HQU1FX1NUQVJUIjoKICAgICAgICAgICAgICAgICAgICBicmVhazsKICAgICAgICAgICAgICAgIGNhc2UgIlNES19SRUFEWSI6CiAgICAgICAgICAgICAgICAgICAgYnJlYWs7CiAgICAgICAgICAgIH0KICAgICAgICB9CiAgICB9OwogICAgKGZ1bmN0aW9uIChhLCBiLCBjKSB7CiAgICAgICAgdmFyIGQgPSBhLmdldEVsZW1lbnRzQnlUYWdOYW1lKGIpWzBdOwogICAgICAgIGlmICghYS5nZXRFbGVtZW50QnlJZChjKSkgewogICAgICAgICAgICB2YXIgZSA9IGEuY3JlYXRlRWxlbWVudChiKTsKICAgICAgICAgICAgZS5pZCA9IGM7CiAgICAgICAgICAgIGUuc3JjID0gImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9zdDM5L3Nka0BtYWluL3Nka2pzLmpzIjsKICAgICAgICAgICAgZC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlLCBkKTsKICAgICAgICB9CiAgICB9KShkb2N1bWVudCwgInNjcmlwdCIsICJnYW1lbW9uZXRpemUtc2RrIik7Cjwvc2NyaXB0PjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+I2J1dHRvbiB7CiAgZGlzcGxheTpub25lOwp9Ci5pbWdiX3ZpcyB7CiAgYW5pbWF0aW9uOiBpbWdiLWFuaW1hdGlvbiA3cyBsaW5lYXI7Cn0KQGtleWZyYW1lcyBpbWdiLWFuaW1hdGlvbiB7CiAgMTAlIHsKICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsKICB9CiAgMjAlIHsKICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDBweCk7CiAgfQogIDkwJSB7CiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwcHgpOwogIH0KICAxMDAlIHsKICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTsKICB9Cn08L3N0eWxlPjxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4KICAgICAgICAgICAgICB3aW5kb3cueWFuZGV4TWV0cmljYUNvdW50ZXJJZCA9IHBhcnNlSW50KDEwMjMwMDIwOSk7CiAgICAgICAgICA8L3NjcmlwdD48c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI+CiAgICAgICAgICAgICAgKGZ1bmN0aW9uIChtLCBlLCB0LCByLCBpLCBrLCBhKSB7CiAgICAgICAgICAgICAgICAgIG1baV0gPSBtW2ldIHx8IGZ1bmN0aW9uICgpIHsgKG1baV0uYSA9IG1baV0uYSB8fCBbXSkucHVzaChhcmd1bWVudHMpIH07CiAgICAgICAgICAgICAgICAgIG1baV0ubCA9IDEgKiBuZXcgRGF0ZSgpOwogICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGRvY3VtZW50LnNjcmlwdHMubGVuZ3RoOyBqKyspIHsgaWYgKGRvY3VtZW50LnNjcmlwdHNbal0uc3JjID09PSByKSB7IHJldHVybjsgfSB9CiAgICAgICAgICAgICAgICAgIGsgPSBlLmNyZWF0ZUVsZW1lbnQodCksIGEgPSBlLmdldEVsZW1lbnRzQnlUYWdOYW1lKHQpWzBdLCBrLmFzeW5jID0gMSwgay5zcmMgPSByLCBhLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGssIGEpCiAgICAgICAgICAgICAgfSkod2luZG93LCBkb2N1bWVudCwgInNjcmlwdCIsICIiLCAieW0iKTsKICAKICAgICAgICAgICAgICB5bSh3aW5kb3cueWFuZGV4TWV0cmljYUNvdW50ZXJJZCwgImluaXQiLCB7CiAgICAgICAgICAgICAgICAgIGNsaWNrbWFwOiBmYWxzZSwKICAgICAgICAgICAgICAgICAgdHJhY2tMaW5rczogdHJ1ZSwKICAgICAgICAgICAgICAgICAgYWNjdXJhdGVUcmFja0JvdW5jZTogdHJ1ZQogICAgICAgICAgICAgIH0pOwogICAgICAgICAgPC9zY3JpcHQ+PC9oZWFkPgoKCjxib2R5PgogIDxkaXYgaWQ9InVuaXR5LWNvbnRhaW5lciI+CiAgICA8Y2FudmFzIGlkPSJ1bml0eS1jYW52YXMiIHN0eWxlPSJjdXJzb3I6IGRlZmF1bHQ7IiB3aWR0aD0iNzg3IiBoZWlnaHQ9IjUxMSI+PC9jYW52YXM+CiAgPC9kaXY+CgogIDxkaXYgaWQ9ImxvYWRpbmctY292ZXIiIHN0eWxlPSJkaXNwbGF5OiBub25lOyI+CiAgICA8ZGl2IGlkPSJwcm9ncmVzcy1jb250YWluZXIiPgogICAgICA8ZGl2IGlkPSJwcm9ncmVzcy1maWxsIiBzdHlsZT0id2lkdGg6IDEwMCU7Ij48L2Rpdj4KICAgIDwvZGl2PgogIDwvZGl2PgoKPHNjcmlwdD4KCihmdW5jdGlvbigpe3dpbmRvdy5jb25zb2xlID0gewogICAgbG9nOiBmdW5jdGlvbiAoKSB7fSwKICAgIHdhcm46IGZ1bmN0aW9uICgpIHt9LAogICAgZXJyb3I6IGZ1bmN0aW9uICgpIHt9LAogICAgaW5mbzogZnVuY3Rpb24gKCkge30sCiAgICBkZWJ1ZzogZnVuY3Rpb24gKCkge30sCiAgICB0cmFjZTogZnVuY3Rpb24gKCkge30sCiAgICB0YWJsZTogZnVuY3Rpb24gKCkge30sCiAgICBhc3NlcnQ6IGZ1bmN0aW9uICgpIHt9LAp9fSkoKTsKY29uc3QgbXV0ZUNvbnNvbGUgPSB0cnVlOwppZiAobXV0ZUNvbnNvbGUpIHsgY29uc29sZS5sb2cgPSBjb25zb2xlLndhcm4gPSBjb25zb2xlLmVycm9yID0gY29uc29sZS5pbmZvID0gY29uc29sZS5kZWJ1ZyA9ICgpPT57fTsgfQoKdmFyIG15R2FtZUluc3RhbmNlID0gbnVsbDsKdmFyIGVudmlyb25tZW50RGF0YSA9ICdubyBkYXRhJzsKd2luZG93LmVudmlyb25tZW50RGF0YSA9IGVudmlyb25tZW50RGF0YTsKdmFyIHJldmlld0RhdGEgPSAnZmFsc2UnOwoKdmFyIGNsb3VkU2F2ZXMgICA9ICdubyBkYXRhJzsKdmFyIHBheW1lbnRzRGF0YSA9ICdubyBkYXRhJzsKdmFyIHBsYXllckRhdGEgICA9ICdubyBkYXRhJzsKbGV0IGZsYXNnc0RhdGEgPSAnbm8gZGF0YSc7CnZhciBnYW1lTGFiZWxEYXRhID0gJ2ZhbHNlJzsKbGV0IGFsbEdhbWVzRGF0YSA9ICdubyBkYXRhJzsKdmFyIHN0YXRzU2F2ZXMgPSAnbm8gZGF0YSc7CnZhciBwbGF5ZXIgPSBudWxsLCBwYXltZW50cyA9IG51bGwsIGluaXRHYW1lID0gZmFsc2UsIG5vd0Z1bGxBZE9wZW4gPSBmYWxzZTsKCnRyeSB7CiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5hdmlnYXRvciwgJ2xhbmd1YWdlJywgIHsgZ2V0OiAoKSA9PiAnZW4tVVMnLCBjb25maWd1cmFibGU6IHRydWUgfSk7CiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG5hdmlnYXRvciwgJ2xhbmd1YWdlcycsIHsgZ2V0OiAoKSA9PiBbJ2VuLVVTJywnZW4nXSwgY29uZmlndXJhYmxlOiB0cnVlIH0pOwp9IGNhdGNoKGUpewogIHRyeSB7IG5hdmlnYXRvci5fX2RlZmluZUdldHRlcl9fKCdsYW5ndWFnZScsICAoKT0+J2VuLVVTJyk7IH0gY2F0Y2h7fQogIHRyeSB7IG5hdmlnYXRvci5fX2RlZmluZUdldHRlcl9fKCdsYW5ndWFnZXMnLCAoKT0+Wydlbi1VUycsJ2VuJ10pOyB9IGNhdGNoe30KfQp0cnkgeyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubGFuZyA9ICdlbic7IH0gY2F0Y2h7fQoKKGZ1bmN0aW9uKCl7CiAgY29uc3QgRk9SQ0VEX0xBTkcgPSAnZW4nOwogIHdpbmRvdy5ZYUdhbWVzID0gewogICAgaW5pdDogKCkgPT4gUHJvbWlzZS5yZXNvbHZlKChmdW5jdGlvbigpewogICAgICBjb25zdCBpc00gPSAvQW5kcm9pZHxpUGhvbmV8aVBhZHxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTsKICAgICAgY29uc3Qgb2JqID0gewogICAgICAgIGVudmlyb25tZW50OiB7IGkxOG46eyBsYW5nOkZPUkNFRF9MQU5HLCB0bGQ6J2NvbScgfSwgYXBwOnsgaWQ6J3N0dWIuYXBwLmlkJyB9LCBicm93c2VyOnsgbGFuZzpGT1JDRURfTEFORyB9LCBwYXlsb2FkOm51bGwgfSwKICAgICAgICBkZXZpY2VJbmZvOiAgeyB0eXBlOmlzTT8nbW9iaWxlJzonZGVza3RvcCcsIGlzTW9iaWxlOigpPT5pc00sIGlzRGVza3RvcDooKT0+IWlzTSwgaXNUYWJsZXQ6KCk9Pi9pUGFkfFRhYmxldC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksIGlzVFY6KCk9PmZhbHNlIH0sCiAgICAgICAgc2NyZWVuOiAgICAgIHsgZnVsbHNjcmVlbjp7IHN0YXR1czonb2ZmJywgcmVxdWVzdCgpeyB0aGlzLnN0YXR1cz0nb24nOyB9IH0gfSwKICAgICAgICBhZHY6IHsKICAgICAgICAgIHNob3dGdWxsc2NyZWVuQWR2KHtjYWxsYmFja3N9PXt9KXsKICAgICAgICAgICAgdHJ5eyBjYWxsYmFja3M/Lm9uT3Blbj8uKCk7IH1jYXRjaHt9CiAgICAgICAgICAgIHRyeXsgSW50ZXJBZHZTaG93KCk7IH1jYXRjaHt9CiAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PnsgdHJ5eyBjYWxsYmFja3M/Lm9uQ2xvc2U/Lih0cnVlKTsgfWNhdGNoe30gfSwgMzAwKTsKICAgICAgICAgIH0sCiAgICAgICAgICBzaG93UmV3YXJkZWRWaWRlbyh7Y2FsbGJhY2tzfT17fSl7CiAgICAgICAgICAgIHRyeXsgY2FsbGJhY2tzPy5vbk9wZW4/LigpOyB9Y2F0Y2h7fQogICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57IHRyeXsgY2FsbGJhY2tzPy5vblJld2FyZGVkPy4oKTsgY2FsbGJhY2tzPy5vbkNsb3NlPy4oKTsgfWNhdGNoe30gfSwgMzAwKTsKICAgICAgICAgIH0KICAgICAgICB9LAogICAgICAgIGZlYXR1cmVzOiB7IExvYWRpbmdBUEk6IHsgcmVhZHkoKXsgICB9IH0gfSwKICAgICAgICBzZXJ2ZXJUaW1lOiAoKSA9PiBEYXRlLm5vdygpLCAKICAgICAgICBmZWVkYmFjazogewogICAgICAgICAgY2FuUmV2aWV3OiAgICAgKCkgPT4gUHJvbWlzZS5yZXNvbHZlKHsgdmFsdWU6ZmFsc2UgfSksCiAgICAgICAgICByZXF1ZXN0UmV2aWV3OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoeyBmZWVkYmFja1NlbnQ6ZmFsc2UgfSkKICAgICAgICB9LAogICAgICAgIGF1dGg6IHsgb3BlbkF1dGhEaWFsb2c6ICgpID0+IFByb21pc2UucmVzb2x2ZSgpIH0sCiAgICAgICAgZ2V0UGxheWVyOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoewogICAgICAgICAgZ2V0TW9kZTogKCk9PidsaXRlJywgZ2V0TmFtZTogKCk9PiAnR3Vlc3QnLCBnZXRQaG90bzogKCk9PiAnJywKICAgICAgICAgIGdldFVuaXF1ZUlEOiAoKT0+ICdndWVzdDEyMycsIGdldFBheWluZ1N0YXR1czogKCk9PiAndW5rbm93bicsCiAgICAgICAgICBzZXREYXRhOiAoKT0+e30sIGdldERhdGE6ICgpPT4gUHJvbWlzZS5yZXNvbHZlKHsgc2F2ZXM6IFtdIH0pCiAgICAgICAgfSksCiAgICAgICAgZ2V0UGF5bWVudHM6ICAgICAoKSA9PiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ3BheW1lbnRzLXVuYXZhaWxhYmxlJykpLAogICAgICAgIGdldExlYWRlcmJvYXJkczogKCkgPT4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdsZWFkZXJib2FyZHMtdW5hdmFpbGFibGUnKSksCiAgICAgIH07CiAgICAgIHdpbmRvdy55c2RrID0gb2JqOwogICAgICByZXR1cm4gb2JqOwogICAgfSkoKSkKICB9Owp9KSgpOwoKZnVuY3Rpb24gc2VuZFlHKG1ldGhvZCwgYXJnKXsKICB0cnl7IGFyZz09PXVuZGVmaW5lZCA/IG15R2FtZUluc3RhbmNlPy5TZW5kTWVzc2FnZSgnWUcySW5zdGFuY2UnLCBtZXRob2QpCiAgICAgICAgICAgICAgICAgICAgICAgOiBteUdhbWVJbnN0YW5jZT8uU2VuZE1lc3NhZ2UoJ1lHMkluc3RhbmNlJywgbWV0aG9kLCBTdHJpbmcoYXJnKSk7IH1jYXRjaHt9CiAgdHJ5eyBhcmc9PT11bmRlZmluZWQgPyBteUdhbWVJbnN0YW5jZT8uU2VuZE1lc3NhZ2UoJ1lhbmRleEdhbWUnLCBtZXRob2QpCiAgICAgICAgICAgICAgICAgICAgICAgOiBteUdhbWVJbnN0YW5jZT8uU2VuZE1lc3NhZ2UoJ1lhbmRleEdhbWUnLCBtZXRob2QsIFN0cmluZyhhcmcpKTsgfWNhdGNoe30KfQoKZnVuY3Rpb24gTG9nU3R5bGVkTWVzc2FnZShtc2csIHN0eWxlKXsgdHJ5eyBjb25zb2xlLmxvZygnJWMnKyhtc2c/PycnKSwgc3R5bGV8fCdjb2xvcjojRkZERjczO2JhY2tncm91bmQ6IzQ1NDU0NScpOyB9Y2F0Y2h7IGNvbnNvbGUubG9nKG1zZyk7IH0gfQpmdW5jdGlvbiBSZXF1ZXN0aW5nRW52aXJvbm1lbnREYXRhKCl7CiAgY29uc3QgaXNNID0gL0FuZHJvaWR8aVBob25lfGlQYWR8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7CiAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHsKICAgIGxhbmd1YWdlOiAnZW4nLCBkb21haW46J2NvbScsCiAgICBkZXZpY2VUeXBlOiBpc00/J21vYmlsZSc6J2Rlc2t0b3AnLAogICAgaXNNb2JpbGU6aXNNLCBpc0Rlc2t0b3A6IWlzTSwgaXNUYWJsZXQ6L2lQYWR8VGFibGV0L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSwgaXNUVjpmYWxzZSwKICAgIGFwcElEOidzdHViLmFwcC5pZCcsIGJyb3dzZXJMYW5nOidlbicsIHBheWxvYWQ6bnVsbCwgcGxhdGZvcm06bmF2aWdhdG9yLnBsYXRmb3JtLCBicm93c2VyOidPdGhlcicKICB9KTsKICBlbnZpcm9ubWVudERhdGEgPSBqc29uOyB3aW5kb3cuZW52aXJvbm1lbnREYXRhID0ganNvbjsKICBzZW5kWUcoJ1NldEVudmlyRGF0YScsIGpzb24pOwp9CmZ1bmN0aW9uIEluaXRQbGF5ZXIoKXsKICBjb25zdCBkYXRhID0gSlNPTi5zdHJpbmdpZnkoewogICAgcGxheWVyQXV0aDoncmVqZWN0ZWQnLCBwbGF5ZXJOYW1lOid1bmF1dGhvcml6ZWQnLAogICAgcGxheWVySWQ6J3VuYXV0aG9yaXplZCcsIHBsYXllclBob3RvOidudWxsJywgcGF5aW5nU3RhdHVzOid1bmtub3duJwogIH0pOwogIHBsYXllckRhdGEgPSBkYXRhOwogIHNlbmRZRygnU2V0QXV0aCcsIGRhdGEpOwp9CmZ1bmN0aW9uIExvYWRDbG91ZCgpeyBjbG91ZFNhdmVzID0gJ25vIGRhdGEnOyBzZW5kWUcoJ1NldExvYWRTYXZlcycsJ25vIGRhdGEnKTsgfQpmdW5jdGlvbiBJbml0UmV2aWV3KCl7IHJldmlld0RhdGEgPSAnZmFsc2UnOyB9CmZ1bmN0aW9uIFJldmlldygpe30KCndpbmRvdy5fSW5pdEVudmlyb25tZW50RGF0YV9qcyA9IGZ1bmN0aW9uKCl7IHRyeXsgUmVxdWVzdGluZ0Vudmlyb25tZW50RGF0YSgpOyB9Y2F0Y2h7fSB9Owp3aW5kb3cuX0luaXRQbGF5ZXJfanMgICAgICAgICAgPSBmdW5jdGlvbigpeyB0cnl7IEluaXRQbGF5ZXIoKTsgfWNhdGNoe30gfTsKd2luZG93Ll9Mb2FkQ2xvdWRfanMgICAgICAgICAgID0gZnVuY3Rpb24oKXsgdHJ5eyBMb2FkQ2xvdWQoKTsgfWNhdGNoe30gfTsKd2luZG93Ll9JbnRlckFkdlNob3dfanMgICAgICAgID0gZnVuY3Rpb24oKXsgdHJ5eyBJbnRlckFkdlNob3coKTsgfWNhdGNoe30gfTsKd2luZG93Ll9SZXdhcmRlZEFkdlNob3dfanMgICAgID0gZnVuY3Rpb24oaWQpeyB0cnl7IFJld2FyZGVkU2hvdyhpZCk7IH1jYXRjaHt9IH07CndpbmRvdy5fT3BlbkF1dGhEaWFsb2dfanMgICAgICA9IGZ1bmN0aW9uKCl7IHRyeXsgT3BlbkF1dGhEaWFsb2coKTsgfWNhdGNoe30gfTsKCmNvbnN0IHByb2dyZXNzRmlsbCAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgicHJvZ3Jlc3MtZmlsbCIpOwpjb25zdCBsb2FkaW5nQ292ZXIgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImxvYWRpbmctY292ZXIiKTsKZnVuY3Rpb24gc2V0UHJvZ3Jlc3ModmFsdWUpeyBwcm9ncmVzc0ZpbGwuc3R5bGUud2lkdGggPSBgJHtNYXRoLm1pbih2YWx1ZSoxMDAsIDEwMCl9JWA7IH0KCmFzeW5jIGZ1bmN0aW9uIG1lcmdlVW5pdHlXZWJGaWxlcyhiYXNlVXJsLCBmaWxlUHJlZml4LCB0b3RhbFBhcnRzLCBleHRlbnNpb24sIG9uUHJvZ3Jlc3MpIHsKICBjb25zdCBwYXJ0VXJscyA9IEFycmF5LmZyb20oeyBsZW5ndGg6IHRvdGFsUGFydHMgfSwgKF8sIGkpID0+IGAke2Jhc2VVcmx9LyR7ZmlsZVByZWZpeH0ke2kgKyAxfS4ke2V4dGVuc2lvbn1gKTsKICBsZXQgdG90YWxTaXplID0gMDsKCiAgZm9yIChjb25zdCB1cmwgb2YgcGFydFVybHMpIHsKICAgIGNvbnN0IGhlYWQgPSBhd2FpdCBmZXRjaCh1cmwsIHsgbWV0aG9kOiAiSEVBRCIgfSk7CiAgICBjb25zdCBsZW4gPSBoZWFkLmhlYWRlcnMuZ2V0KCJDb250ZW50LUxlbmd0aCIpOwogICAgaWYgKGxlbikgdG90YWxTaXplICs9IHBhcnNlSW50KGxlbiwgMTApOwogIH0KCiAgY29uc3QgYnVmZmVycyA9IFtdOwogIGxldCBkb3dubG9hZGVkID0gMDsKCiAgZm9yIChjb25zdCB1cmwgb2YgcGFydFVybHMpIHsKICAgIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCk7CiAgICBjb25zdCByZWFkZXIgPSByZXMuYm9keS5nZXRSZWFkZXIoKTsKICAgIGNvbnN0IGNodW5rcyA9IFtdOwoKICAgIHdoaWxlICh0cnVlKSB7CiAgICAgIGNvbnN0IHsgZG9uZSwgdmFsdWUgfSA9IGF3YWl0IHJlYWRlci5yZWFkKCk7CiAgICAgIGlmIChkb25lKSBicmVhazsKICAgICAgY2h1bmtzLnB1c2godmFsdWUpOwogICAgICBkb3dubG9hZGVkICs9IHZhbHVlLmxlbmd0aDsKICAgICAgb25Qcm9ncmVzcyAmJiBvblByb2dyZXNzKGRvd25sb2FkZWQgLyB0b3RhbFNpemUgKiAwLjUpOwogICAgfQoKICAgIGNvbnN0IGZ1bGwgPSBuZXcgVWludDhBcnJheShjaHVua3MucmVkdWNlKChhLCBiKSA9PiBhICsgYi5sZW5ndGgsIDApKTsKICAgIGxldCBvZmZzZXQgPSAwOwogICAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHsgZnVsbC5zZXQoY2h1bmssIG9mZnNldCk7IG9mZnNldCArPSBjaHVuay5sZW5ndGg7IH0KICAgIGJ1ZmZlcnMucHVzaChmdWxsKTsKICB9CgogIGNvbnN0IGZpbmFsID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVycy5yZWR1Y2UoKGEsIGIpID0+IGEgKyBiLmJ5dGVMZW5ndGgsIDApKTsKICBsZXQgb2Zmc2V0ID0gMDsKICBmb3IgKGNvbnN0IGIgb2YgYnVmZmVycykgeyBmaW5hbC5zZXQoYiwgb2Zmc2V0KTsgb2Zmc2V0ICs9IGIuYnl0ZUxlbmd0aDsgfQogIHJldHVybiBmaW5hbDsKfQoKYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZUdhbWUoKSB7CiAgY29uc3QgYmFzZVVybCAgPSAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2dvbGRpZS1jb2RlL3NwZWNpZmljYXRpb25AYzM1MWM5MzU4NDAwZWVlYjZhNDQ3ODk1YWUyYzY4NzdjNDRlNGNkMC91dGlsIjsKICBjb25zdCBsb2FkZXJVcmwgPSAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2dvbGRpZS1jb2RlL3RlY2hAZmNjZjlkNDI4NTAwMDA5OGUxMGE2NDQ4MTk4ZWY5MjU2MGE2Mjk0Yy9wbHVnL3NyYy9tYWluL2xvYWRlci5qcyI7CgogIHRyeSB7CiAgICBjb25zdCB3YXNtQnVmZmVyID0gYXdhaXQgbWVyZ2VVbml0eVdlYkZpbGVzKGJhc2VVcmwsICJzZXQiLCAyLCAianMiLCBzZXRQcm9ncmVzcyk7CiAgICBjb25zdCB3YXNtQmxvYiAgID0gbmV3IEJsb2IoW3dhc21CdWZmZXJdLCB7IHR5cGU6ICJhcHBsaWNhdGlvbi93YXNtIiB9KTsKICAgIGNvbnN0IHdhc21VcmwgICAgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHdhc21CbG9iKTsKCiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCJzY3JpcHQiKTsKICAgIHNjcmlwdC5zcmMgPSBsb2FkZXJVcmw7CiAgICBzY3JpcHQub25sb2FkID0gYXN5bmMgKCkgPT4gewogICAgICB0cnkgeyBhd2FpdCB3aW5kb3cuWWFHYW1lcy5pbml0KCk7IH0gY2F0Y2gge30KCiAgICAgIGNvbnN0IGNvbmZpZyA9IHsKICAgICAgICBkYXRhVXJsOiAgICAgICJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvZ29sZGllLWNvZGUvdGVjaEBmY2NmOWQ0Mjg1MDAwMDk4ZTEwYTY0NDgxOThlZjkyNTYwYTYyOTRjL3BsdWcvc3JjL21haW4vbGliZGF0YS5qcyIsCiAgICAgICAgZnJhbWV3b3JrVXJsOiAiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2dvbGRpZS1jb2RlL3RlY2hAY2FkNDY0ZjYyOGFjMzQ3ZThlNDc5NWM1NzdiNzEyMzU5M2FjMWIzNC9wbHVnL3NyYy9tYWluL2xpYi5qcyIsCiAgICAgICAgY29kZVVybDogICAgICB3YXNtVXJsLCAgICAgIAogICAgICAgIHN0cmVhbWluZ0Fzc2V0c1VybDogImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9nb2xkaWUtY29kZS90ZWNoQGRiN2E0NWZmY2U5NGYwNzIxMzU2NDY0NDljMTE1ZGNlYWQ1NGMzZmQvcGx1Zy9zcmMvbWFpbi9yZXNvdXJjZXMvTUVUQS1JTkYvZ3JhZGxlLXBsdWdpbnMiLAogICAgICB9OwogICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgidW5pdHktY2FudmFzIik7CgogICAgICBjcmVhdGVVbml0eUluc3RhbmNlKGNhbnZhcywgY29uZmlnLCAodW5pdHlQcm9ncmVzcykgPT4gewogICAgICAgIHNldFByb2dyZXNzKDAuNSArIHVuaXR5UHJvZ3Jlc3MgKiAwLjUpOwogICAgICB9KS50aGVuKChpbnN0YW5jZSkgPT4gewogICAgICAgIG15R2FtZUluc3RhbmNlID0gaW5zdGFuY2U7CiAgICAgICAgbG9hZGluZ0NvdmVyLnN0eWxlLmRpc3BsYXkgPSAibm9uZSI7CiAgICAgICAgdHJ5IHsgUmVxdWVzdGluZ0Vudmlyb25tZW50RGF0YSgpOyB9IGNhdGNoIHt9CiAgICAgIH0pLmNhdGNoKChlcnJvcikgPT4gewogICAgICAgIGNvbnNvbGUuZXJyb3IoIlVuaXR5IGNyZWF0ZSBmYWlsZWQiLCBlcnJvcik7CiAgICAgIH0pOwogICAgfTsKICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTsKICB9IGNhdGNoIChlKSB7CiAgICBjb25zb2xlLmVycm9yKCJXQVNNIG1lcmdlIGZhaWxlZCIsIGUpOwogIH0KfQoKbGV0IGxhc3RBZFRpbWUgPSAwOwpsZXQgYWRDb29sZG93biA9IDEwMDAwOwpmdW5jdGlvbiBjYW5TaG93QWQoKXsgcmV0dXJuIChEYXRlLm5vdygpIC0gbGFzdEFkVGltZSkgPj0gYWRDb29sZG93bjsgfQoKZnVuY3Rpb24gRm9jdXNHYW1lKCl7IGlmIChkb2N1bWVudC5oYXNGb2N1cyAmJiAhZG9jdW1lbnQuaGFzRm9jdXMoKSkgeyB3aW5kb3cuZm9jdXMoKTsgfSB9CgpmdW5jdGlvbiBGdWxsQWRTaG93KCkgewogIGlmICghY2FuU2hvd0FkKCkpIHsgc2VuZFlHKCdDbG9zZUludGVyQWR2JywgJ2ZhbHNlJyk7IHJldHVybjsgfQogIHRyeSB7CiAgICBpZiAobm93RnVsbEFkT3BlbikgcmV0dXJuOwogICAgbm93RnVsbEFkT3BlbiA9IHRydWU7IGxhc3RBZFRpbWUgPSBEYXRlLm5vdygpOwogICAgc2VuZFlHKCdPcGVuSW50ZXJBZHYnKTsgCgogICAgaWYgKHR5cGVvZiBzZGsgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBzZGsuc2hvd0Jhbm5lciA9PT0gJ2Z1bmN0aW9uJykgewogICAgICBzZGsuc2hvd0Jhbm5lcigpOwogICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsKICAgICAgICBub3dGdWxsQWRPcGVuID0gZmFsc2U7CiAgICAgICAgc2VuZFlHKCdDbG9zZUludGVyQWR2JywgJ3RydWUnKTsgCiAgICAgICAgRm9jdXNHYW1lKCk7CiAgICAgIH0sIDMwMDApOwogICAgfSBlbHNlIHsKICAgICAgbm93RnVsbEFkT3BlbiA9IGZhbHNlOwogICAgICBzZW5kWUcoJ0Nsb3NlSW50ZXJBZHYnLCAnZmFsc2UnKTsKICAgICAgRm9jdXNHYW1lKCk7CiAgICB9CiAgfSBjYXRjaCAoZSkgewogICAgbm93RnVsbEFkT3BlbiA9IGZhbHNlOwogICAgc2VuZFlHKCdFcnJvckludGVyQWR2Jyk7CiAgICBzZW5kWUcoJ0Nsb3NlSW50ZXJBZHYnLCAnZmFsc2UnKTsKICAgIEZvY3VzR2FtZSgpOwogIH0KfQoKZnVuY3Rpb24gSW50ZXJBZHZTaG93KCkgeyBGdWxsQWRTaG93KCk7IH0KCmZ1bmN0aW9uIFJld2FyZGVkU2hvdyhpZCkgewogIGlmICghY2FuU2hvd0FkKCkpIHsgc2VuZFlHKCdSZXdhcmRVbmF2YWlsYWJsZScpOyBzZW5kWUcoJ0Nsb3NlUmV3YXJkZWRBZHYnKTsgcmV0dXJuOyB9CiAgdHJ5IHsKICAgIGxhc3RBZFRpbWUgPSBEYXRlLm5vdygpOwogICAgc2VuZFlHKCdPcGVuUmV3YXJkZWRBZHYnKTsgCgogICAgaWYgKHR5cGVvZiBzZGsgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBzZGsuc2hvd0Jhbm5lciA9PT0gJ2Z1bmN0aW9uJykgewogICAgICBzZGsuc2hvd0Jhbm5lcigpOwogICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsKICAgICAgICBzZW5kWUcoJ1Jld2FyZEFkdicsIGlkKTsgICAgICAgICAKICAgICAgICBzZW5kWUcoJ0Nsb3NlUmV3YXJkZWRBZHYnLCAndHJ1ZScpOwogICAgICAgIEZvY3VzR2FtZSgpOwogICAgICB9LCAzMDAwKTsKICAgIH0gZWxzZSB7CiAgICAgIHNlbmRZRygnUmV3YXJkQWR2JywgaWQpOwogICAgICBzZW5kWUcoJ0Nsb3NlUmV3YXJkZWRBZHYnLCAndHJ1ZScpOwogICAgICBGb2N1c0dhbWUoKTsKICAgIH0KICB9IGNhdGNoIChlKSB7CiAgICBzZW5kWUcoJ0Vycm9yUmV3YXJkZWRBZHYnKTsKICAgIHNlbmRZRygnQ2xvc2VSZXdhcmRlZEFkdicsICdmYWxzZScpOwogICAgRm9jdXNHYW1lKCk7CiAgfQp9CgpmdW5jdGlvbiBSZXdhcmRlZEFkdlNob3coaWQpIHsgCiAgUmV3YXJkZWRTaG93KGlkKTsgCn0KCmZ1bmN0aW9uIFN0aWNreUFkQWN0aXZpdHkoc2hvdykgewogICAgdHJ5IHsKICAgICAgICB5c2RrLmFkdi5nZXRCYW5uZXJBZHZTdGF0dXMoKS50aGVuKCh7IHN0aWNreUFkdklzU2hvd2luZywgcmVhc29uIH0pID0+IHsKICAgICAgICAgICAgaWYgKHN0aWNreUFkdklzU2hvd2luZykgewogICAgICAgICAgICAgICAgaWYgKCFzaG93KSB7CiAgICAgICAgICAgICAgICAgICAgeXNkay5hZHYuaGlkZUJhbm5lckFkdigpOwogICAgICAgICAgICAgICAgfQogICAgICAgICAgICB9CiAgICAgICAgICAgIGVsc2UgaWYgKHJlYXNvbikgewogICAgICAgICAgICAgICAgTG9nU3R5bGVkTWVzc2FnZSgnU3RpY2t5QWR2IGFyZSBub3Qgc2hvd24uIFJlYXNvbjonLCByZWFzb24pOwogICAgICAgICAgICB9CiAgICAgICAgICAgIGVsc2UgaWYgKHNob3cpIHsKICAgICAgICAgICAgICAgIHlzZGsuYWR2LnNob3dCYW5uZXJBZHYoKTsKICAgICAgICAgICAgfQogICAgICAgIH0pCiAgICB9IGNhdGNoIChlKSB7CiAgICAgICAgY29uc29sZS5lcnJvcignQ1JBU0ggU3RpY2t5QWR2IGFjdGl2aXR5OiAnLCBlLm1lc3NhZ2UpOwogICAgfQp9CgpmdW5jdGlvbiBJbml0R2FtZSgpIHsgaW5pdEdhbWUgPSB0cnVlOyBpZiAobm93RnVsbEFkT3Blbikgc2VuZFlHKCdPcGVuSW50ZXJBZHYnKTsgfQpmdW5jdGlvbiBDb25zdW1lUHVyY2hhc2VzKCkge30KZnVuY3Rpb24gR2V0TGVhZGVyYm9hcmRTY29yZXMoKSB7fQpmdW5jdGlvbiBCdXlQYXltZW50cyhpZCkge30KZnVuY3Rpb24gU2F2ZUNsb3VkKGpzb25EYXRhLCBmbHVzaCl7IHRyeXsgcGxheWVyLnNldERhdGEoe3NhdmVzOltqc29uRGF0YV19LCBmbHVzaCk7IH1jYXRjaChlKXt9IH0KZnVuY3Rpb24gR2V0UGF5bWVudHMoc2VuZGJhY2spIHt9CmZ1bmN0aW9uIE9wZW5BdXRoRGlhbG9nKCl7IGlmKG15R2FtZUluc3RhbmNlKXsgbXlHYW1lSW5zdGFuY2UuU2VuZE1lc3NhZ2UoJ1lhbmRleEdhbWUnLCdHZXREYXRhSW52b2tlJyk7IH0gfQoKaW5pdGlhbGl6ZUdhbWUoKTsKPC9zY3JpcHQ+CjxzY3JpcHQgc3JjPSJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvZ2gvc3QzOS9zZGtAbWFpbi9hcGkuanMiPjwvc2NyaXB0PgoKCjxkaXYgaWQ9ImJ1dHRvbiIgY2xhc3M9ImltZ2IgaW1nYl92aXMiIHN0eWxlPSJwb3NpdGlvbjogZml4ZWQ7IHRvcDogMTAlOyBsZWZ0OiAtMTAwcHg7IHotaW5kZXg6IDEwOyBkaXNwbGF5OiBub25lOyI+PGEgdGFyZ2V0PSJfYmxhbmsiIGhyZWY9Imh0dHBzOi8vc2l0ZXMuZ29vZ2xlLmNvbS92aWV3L2NsYXNzcm9vbTZ4LyIgdGl0bGU9Ik1vcmUgVW5ibG9ja2VkIEdhbWVzIDZ4Ij48aW1nIHNyYz0iaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2xVRVdyWE1WRXI0QWRqS0lTeUphaERSSjYxYndmdkhkcGVZbTg2RGpuNVU4b0NtOWRJNjBOR1hTQnFhZDlIVXZ6VFhncWxrb3NBX2hXVi1WdVhQanpya0d2aDNfa05TZ1lrOHlTV3pYbkRwYkJDQmlvb3lCYlU4b0J5M1lCWk1Ea1c4UmNSVm1EdUMwcmFvZXFaQm04a0JscXM2YzVtZGZrSmVOMmFFNjhsWFNfbGNPWjVfRjdsSXVNNnFMVmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMzAiIHN0eWxlPSJjdXJzb3I6cG9pbnRlcjsiIGFsdD0iTW9yZSBvZiBiZXN0IENsYXNzcm9vbSA2eCBVbmJsb2NrZWQgR2FtZXMiPjwvYT48L2Rpdj48ZGl2IGlkPSJpbWFDb250YWluZXIiIHN0eWxlPSJwb3NpdGlvbjogYWJzb2x1dGU7IHotaW5kZXg6IDEwMDAwOyB0b3A6IDBweDsgbGVmdDogMHB4OyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMCwgMCwgMCk7IHZpc2liaWxpdHk6IGhpZGRlbjsgb3ZlcmZsb3c6IGhpZGRlbjsiPjx2aWRlbyBpZD0iaW1hVmlkZW8iPjwvdmlkZW8+PC9kaXY+PGRpdiBpZD0iaW1hQ29udGFpbmVyX25ldyIgc3R5bGU9InBvc2l0aW9uOiBhYnNvbHV0ZTsgei1pbmRleDogMTAwMDA7IHRvcDogMHB4OyBsZWZ0OiAwcHg7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAwLCAwKTsgdmlzaWJpbGl0eTogaGlkZGVuOyBvdmVyZmxvdzogaGlkZGVuOyI+PHZpZGVvMiBpZD0iaW1hVmlkZW8yIj48L3ZpZGVvMj48L2Rpdj48c2NyaXB0IHNyYz0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2dvbGRpZS1jb2RlL3RlY2hAZmNjZjlkNDI4NTAwMDA5OGUxMGE2NDQ4MTk4ZWY5MjU2MGE2Mjk0Yy9wbHVnL3NyYy9tYWluL2xvYWRlci5qcyI+PC9zY3JpcHQ+PHNjcmlwdCBzcmM9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9nb2xkaWUtY29kZS90ZWNoQGNhZDQ2NGY2MjhhYzM0N2U4ZTQ3OTVjNTc3YjcxMjM1OTNhYzFiMzQvcGx1Zy9zcmMvbWFpbi9saWIuanMiPjwvc2NyaXB0Pjxub3NjcmlwdD4KICAgICAgICAgICAgICA8ZGl2PgogICAgICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPC9ub3NjcmlwdD48L2JvZHk+PC9odG1sPg==',
    newTab: true
  },
  {
    id: 're-run',
    name: 'RE-RUN',
    cat: 'Platformer',
    size: 250, rating: 4.4, reviews: 7600,
    desc: 'A parkour game mixed with fighting. Can you handle it? Run, jump, and fight your way through.',
    img: 'https://tse4.mm.bing.net/th/id/OIP.h-W_srcwaLttTPVu87OmHwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    shots: [],
    url: 'data:text/html;base64,PHNjcmlwdCBhc3luYyBzcmM9Imh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanM/aWQ9Ry1MNzg1NlAzVk5UIj48L3NjcmlwdD4KPHNjcmlwdD53aW5kb3cuZGF0YUxheWVyPXdpbmRvdy5kYXRhTGF5ZXJ8fFtdO2Z1bmN0aW9uIGd0YWcoKXtkYXRhTGF5ZXIucHVzaChhcmd1bWVudHMpfWd0YWcoJ2pzJyxuZXcgRGF0ZSgpKTtndGFnKCdjb25maWcnLCdHLUw3ODU2UDNWTlQnKTs8L3NjcmlwdD4KPCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KPGJhc2UgaHJlZj0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2ZyZWVidWlzbmVzcy9hc3NldHNAbWFpbi8yNjAvIj4KPG1ldGEgY2hhcnNldD0idXRmLTgiPgo8dGl0bGU+UkVSVU48L3RpdGxlPgo8c2NyaXB0IHNyYz0iQnVpbGQvVW5pdHlMb2FkZXIuanMiPjwvc2NyaXB0Pgo8c2NyaXB0PlVuaXR5TG9hZGVyLmluc3RhbnRpYXRlKCJ1IiwiQnVpbGQvcmVydW5kb25lLmpzb24iKTs8L3NjcmlwdD4KPHN0eWxlPip7bWFyZ2luOjA7cGFkZGluZzowO292ZXJmbG93OmhpZGRlbn0jdXt3aWR0aDoxMDB2dztoZWlnaHQ6MTAwdmh9I2ExLCNhMntwb3NpdGlvbjpmaXhlZDt0b3A6NTAlO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MCUpO3dpZHRoOjE2MHB4O2hlaWdodDo2MDBweDt6LWluZGV4Ojk5OTk5OX0jYTF7bGVmdDowfSNhMntyaWdodDowfS5je3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO3JpZ2h0OjA7d2lkdGg6MjJweDtoZWlnaHQ6MjJweDtsaW5lLWhlaWdodDoyMnB4O3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjcpO2NvbG9yOiNmZmY7Zm9udC1zaXplOjE0cHg7Y3Vyc29yOnBvaW50ZXI7ei1pbmRleDoxMH08L3N0eWxlPgo8L2hlYWQ+Cjxib2R5Pgo8ZGl2IGlkPSJ1Ij48L2Rpdj4KPGRpdiBpZD0iYTEiPjxkaXYgY2xhc3M9ImMiIG9uY2xpY2s9InRoaXMucGFyZW50RWxlbWVudC5zdHlsZS5kaXNwbGF5PSdub25lJyI+4pyVPC9kaXY+PC9kaXY+CjxkaXYgaWQ9ImEyIj48ZGl2IGNsYXNzPSJjIiBvbmNsaWNrPSJ0aGlzLnBhcmVudEVsZW1lbnQuc3R5bGUuZGlzcGxheT0nbm9uZSciPuKclTwvZGl2PjwvZGl2Pgo8c2NyaXB0PiFmdW5jdGlvbigpe2Z1bmN0aW9uIGUoZSl7cmV0dXJuIGV9dmFyIHQ9ZTtmdW5jdGlvbiBuKGUpe3JldHVybiBlfXZhciByPW47ZnVuY3Rpb24gbyhlKXtyZXR1cm4gZX12YXIgaT1vO3ZhciBzPXQocihpKCJ0ZXN0IikpKTtjb25zb2xlLmxvZyhzKX0oKTs8L3NjcmlwdD4KPC9ib2R5Pgo8L2h0bWw+',
    newTab: true
  },
  {
    id: 'little-alchemy',
    name: 'Little Alchemy 2',
    cat: 'Puzzle',
    size: 95, rating: 4.6, reviews: 22400,
    desc: 'Mix items and create the world from scratch! Discover interesting items accompanied by funny descriptions.',
    img: 'https://tse4.mm.bing.net/th/id/OIP.1WFs6o0fF2Awy4LXct1ZlgHaD4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    shots: [],
    url: 'data:text/html;base64,PCFET0NUWVBFIGh0bWw+CgoKPCEtLSBVbHRpbWF0ZSBHYW1lIFN0YXNoIGZpbGUtLT4gCjwhLS0gRm9yIHRoZSByZWd1bGFybHkgdXBkYXRpbmcgZG9jIGdvIHRvIGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMV9GbUgzQmxTQlFJN0ZHZ0FRTDU5LVpQZThlQ3hzMzV3ZWw2SlV5VmFHOFEvIC0tPgoKCgoKICA8aGVhZD48bWV0YSBjaGFyc2V0PSJ1dGYtOCI+CiAgICA8bWV0YSBodHRwLWVxdWl2PSJYLVVBLUNvbXBhdGlibGUiIGNvbnRlbnQ9IklFPWVkZ2UsY2hyb21lPTEiPgogICAgPHRpdGxlPkxpdHRsZSBBbGNoZW15IDI8L3RpdGxlPgogICAgPGJhc2UgaHJlZj0iaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL011bHRpdmVyc2VHL2xpdHRsZWFsY2hlbXkyQG1haW4vIj4KICAgIDxsaW5rIHJlbD0ibWFuaWZlc3QiIGhyZWY9InN0YXRpYy9tYW5pZmVzdC5qc29uIj48bGluayByZWw9InNob3J0Y3V0IGljb24iIGhyZWY9ImZhdmljb24uaWNvIj48bWV0YSBuYW1lPSJkZXNjcmlwdGlvbiIgY29udGVudD0iTWl4IGl0ZW1zIGFuZCBjcmVhdGUgdGhlIHdvcmxkIGZyb20gc2NyYXRjaCEgRGlzY292ZXIgaW50ZXJlc3RpbmcgaXRlbXMgYWNjb21wYW5pZWQgYnkgZnVubnkgZGVzY3JpcHRpb25zIGFuZCBsb3NlIHlvdXJzZWxmIGV4cGxvcmluZyB0aGUgaHVnZSwgZXhjaXRpbmcgbGlicmFyeSEiPjxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsaW5pdGlhbC1zY2FsZT0xLG1pbmltYWwtdWkiPjxtZXRhIG5hbWU9InRoZW1lLWNvbG9yIiBjb250ZW50PSIjZmFhNjIwIj48bGluayByZWw9ImNhbm9uaWNhbCIgaHJlZj0iaHR0cHM6Ly9saXR0bGVhbGNoZW15Mi5jb20iPjxsaW5rIGhyZWY9Imh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20vIiByZWw9InByZWNvbm5lY3QiIGNyb3Nzb3JpZ2luPjxsaW5rIGhyZWY9InN0YXRpYy9pbWcvbG9nby5zdmciIHJlbD0icHJlbG9hZCIgYXM9ImltYWdlIj48c3R5bGU+QGZvbnQtZmFjZSB7CiAgICAgICAgICBmb250LWZhbWlseTogJ1NvdXJjZSBTYW5zIFBybyc7CiAgICAgICAgICBmb250LXN0eWxlOiBub3JtYWw7CiAgICAgICAgICBmb250LXdlaWdodDogNDAwOwogICAgICAgICAgZm9udC1kaXNwbGF5OiBzd2FwOwogICAgICAgICAgc3JjOiBsb2NhbCgnU291cmNlIFNhbnMgUHJvIFJlZ3VsYXInKSwgbG9jYWwoJ1NvdXJjZVNhbnNQcm8tUmVndWxhcicpLCB1cmwoaHR0cHM6Ly9mb250cy5nc3RhdGljLmNvbS9zL3NvdXJjZXNhbnNwcm8vdjEzLzZ4SzNkU0JZS2NTVi1MQ29lUXFmWDFSWU9vM3FPSzdsLndvZmYyKSBmb3JtYXQoJ3dvZmYyJyk7CiAgICAgICAgICB1bmljb2RlLXJhbmdlOiBVKzAwMDAtMDBGRiwgVSswMTMxLCBVKzAxNTItMDE1MywgVSswMkJCLTAyQkMsIFUrMDJDNiwgVSswMkRBLCBVKzAyREMsIFUrMjAwMC0yMDZGLCBVKzIwNzQsIFUrMjBBQywgVSsyMTIyLCBVKzIxOTEsIFUrMjE5MywgVSsyMjEyLCBVKzIyMTUsIFUrRkVGRiwgVStGRkZEOwogICAgICAgIH08L3N0eWxlPjxtZXRhIG5hbWU9ImFwcGxlLW1vYmlsZS13ZWItYXBwLXRpdGxlIiBjb250ZW50PSJBbGNoZW15IDIiPjxtZXRhIG5hbWU9ImFwcGxlLW1vYmlsZS13ZWItYXBwLWNhcGFibGUiIGNvbnRlbnQ9InllcyI+PGxpbmsgcmVsPSJpY29uIiB0eXBlPSJpbWFnZS9wbmciIGhyZWY9InN0YXRpYy9pbWcvaWNvbi0xNngxNi5wbmciIHNpemVzPSIxNngxNiI+PGxpbmsgcmVsPSJpY29uIiB0eXBlPSJpbWFnZS9wbmciIGhyZWY9InN0YXRpYy9pbWcvaWNvbi0zMngzMi5wbmciIHNpemVzPSIzMngzMiI+PGxpbmsgcmVsPSJpY29uIiB0eXBlPSJpbWFnZS9wbmciIGhyZWY9InN0YXRpYy9pbWcvaWNvbi05Nng5Ni5wbmciIHNpemVzPSI5Nng5NiI+PGxpbmsgcmVsPSJpY29uIiB0eXBlPSJpbWFnZS9wbmciIGhyZWY9InN0YXRpYy9pbWcvaWNvbi0xOTZ4MTk2LnBuZyIgc2l6ZXM9IjE5NngxOTYiPjxsaW5rIHJlbD0iaWNvbiIgdHlwZT0iaW1hZ2UvcG5nIiBocmVmPSJzdGF0aWMvaW1nL2ljb24tMjU2eDI1Ni5wbmciIHNpemVzPSIyNTZ4MjU2Ij48bGluayByZWw9ImFwcGxlLXRvdWNoLWljb24iIGhyZWY9InN0YXRpYy9pbWcvaWNvbi02MEAyeC5wbmciPjxsaW5rIHJlbD0iYXBwbGUtdG91Y2gtaWNvbiIgc2l6ZXM9IjE1MngxNTIiIGhyZWY9InN0YXRpYy9pbWcvaWNvbi03NkAyeC5wbmciPjxsaW5rIHJlbD0iYXBwbGUtdG91Y2gtaWNvbiIgc2l6ZXM9IjE2N3gxNjciIGhyZWY9InN0YXRpYy9pbWcvaWNvbi04My41QDJ4LnBuZyI+PGxpbmsgcmVsPSJhcHBsZS10b3VjaC1pY29uIiBzaXplcz0iMTgweDE4MCIgaHJlZj0ic3RhdGljL2ltZy9pY29uLTYwQDN4LnBuZyI+PG1ldGEgcHJvcGVydHk9Im9nOnRpdGxlIiBjb250ZW50PSJMaXR0bGUgQWxjaGVteSAyIj48bWV0YSBwcm9wZXJ0eT0ib2c6ZGVzY3JpcHRpb24iIGNvbnRlbnQ9Ik1peCBpdGVtcyBhbmQgY3JlYXRlIHRoZSB3b3JsZCBmcm9tIHNjcmF0Y2ghIERpc2NvdmVyIGludGVyZXN0aW5nIGl0ZW1zIGFjY29tcGFuaWVkIGJ5IGZ1bm55IGRlc2NyaXB0aW9ucyBhbmQgbG9zZSB5b3Vyc2VsZiBleHBsb3JpbmcgdGhlIGh1Z2UsIGV4Y2l0aW5nIGxpYnJhcnkhIj48bWV0YSBwcm9wZXJ0eT0ib2c6aW1hZ2UiIGNvbnRlbnQ9InN0YXRpYy9pbWcvbGl0dGxlLWFsY2hlbXktMi1mYi10aHVtYm5haWwuanBnIj48bWV0YSBwcm9wZXJ0eT0ib2c6dXJsIiBjb250ZW50PSJodHRwczovL3JlYWxiZW45LmdpdGh1Yi5pby9sYTJzYyI+PG1ldGEgcHJvcGVydHk9Im9nOnNpdGVfbmFtZSIgY29udGVudD0iTGl0dGxlIEFsY2hlbXkgMiI+PG1ldGEgcHJvcGVydHk9Im9nOnR5cGUiIGNvbnRlbnQ9IndlYnNpdGUiPjxtZXRhIHByb3BlcnR5PSJmYjphcHBfaWQiIGNvbnRlbnQ9IjE4NjQyMzg0NTA0OTMyMDciPjxtZXRhIG5hbWU9InR3aXR0ZXI6Y2FyZCIgY29udGVudD0iYXBwIj48bWV0YSBuYW1lPSJ0d2l0dGVyOnRpdGxlIiBjb250ZW50PSJMaXR0bGUgQWxjaGVteSAyIj48bWV0YSBuYW1lPSJ0d2l0dGVyOnRleHQ6dGl0bGUiIGNvbnRlbnQ9IkxpdHRsZSBBbGNoZW15IDIiPjxtZXRhIG5hbWU9InR3aXR0ZXI6aW1hZ2UiIGNvbnRlbnQ9InN0YXRpYy9pbWcvbGl0dGxlLWFsY2hlbXktMi10d2l0dGVyLXRodW1ibmFpbC5qcGciPjxtZXRhIG5hbWU9InR3aXR0ZXI6c2l0ZSIgY29udGVudD0iQGFsY2hlbXlnYW1lIj48bWV0YSBuYW1lPSJ0d2l0dGVyOmFwcDpuYW1lOmlwaG9uZSIgY29udGVudD0iTGl0dGxlIEFsY2hlbXkgMiI+PG1ldGEgbmFtZT0idHdpdHRlcjphcHA6aWQ6aXBob25lIiBjb250ZW50PSIxMjE0MTkwOTg5Ij48bWV0YSBuYW1lPSJ0d2l0dGVyOmFwcDpuYW1lOmlwYWQiIGNvbnRlbnQ9IkxpdHRsZSBBbGNoZW15IDIiPjxtZXRhIG5hbWU9InR3aXR0ZXI6YXBwOmlkOmlwYWQiIGNvbnRlbnQ9IjEyMTQxOTA5ODkiPjxtZXRhIG5hbWU9InR3aXR0ZXI6YXBwOm5hbWU6Z29vZ2xlcGxheSIgY29udGVudD0iTGl0dGxlIEFsY2hlbXkgMiI+PG1ldGEgbmFtZT0idHdpdHRlcjphcHA6aWQ6Z29vZ2xlcGxheSIgY29udGVudD0iY29tLnJlY2xvYWsubGl0dGxlYWxjaGVteTIiPjxtZXRhIG5hbWU9ImZvcm1hdC1kZXRlY3Rpb24iIGNvbnRlbnQ9InRlbGVwaG9uZT1ubyI+PG1ldGEgbmFtZT0iZm9ybWF0LWRldGVjdGlvbiIgY29udGVudD0iZGF0ZT1ubyI+PG1ldGEgbmFtZT0iZm9ybWF0LWRldGVjdGlvbiIgY29udGVudD0iYWRkcmVzcz1ubyI+PGxpbmsgaHJlZj0iY3NzL2xvYWRpbmctc2NyZWVuLjM0ZTVkYjZiLmNzcyIgcmVsPSJzdHlsZXNoZWV0Ij48bGluayBocmVmPSJjc3MvYXBwLjJiYjFlMTE4LmNzcyIgcmVsPSJzdHlsZXNoZWV0Ij48L2hlYWQ+PGJvZHk+PG1haW4gaWQ9ImxvYWRpbmctc2NyZWVuIiBjbGFzcz0ibG9hZGluZy1zY3JlZW4iPjxkaXYgY2xhc3M9ImxvYWRpbmctc2NyZWVuLWNvbnRhaW5lciI+PGRpdiBjbGFzcz0iYnRuIj48c3BhbiBjbGFzcz0ibGFiZWwiPnBsYXk8L3NwYW4+PGRpdiBjbGFzcz0ibG9hZGluZy1zY3JlZW4tYnV0dG9uLWFuaW1hdGlvbiI+PGRpdj48L2Rpdj48ZGl2PjwvZGl2PjxkaXY+PC9kaXY+PGRpdj48L2Rpdj48L2Rpdj48L2Rpdj48aW1nIGFsdD0ibG9nbyIgc3JjPSJzdGF0aWMvaW1nL2xvZ28uc3ZnIj48L2Rpdj48L21haW4+PGRpdiBpZD0iYXBwIj48L2Rpdj4KICAgICAgICAgIDxzY3JpcHQgdHlwZT0ibW9kdWxlIiBzcmM9ImpzL2NodW5rLXZlbmRvcnMuYTQwNmIxYTMuanMiPjwvc2NyaXB0PgogICAgICAgICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiIHNyYz0ianMvbG9hZGluZy1zY3JlZW4uMWEwYWU3NWUuanMiPjwvc2NyaXB0PgogICAgICAgICAgPHNjcmlwdCB0eXBlPSJtb2R1bGUiIHNyYz0ianMvYXBwLmYwZDViY2UyLmpzIj48L3NjcmlwdD4KICAgICAgICAgIDxzY3JpcHQ+IWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQsdD1lLmNyZWF0ZUVsZW1lbnQoInNjcmlwdCIpO2lmKCEoIm5vTW9kdWxlImluIHQpJiYib25iZWZvcmVsb2FkImluIHQpe3ZhciBuPSExO2UuYWRkRXZlbnRMaXN0ZW5lcigiYmVmb3JlbG9hZCIsZnVuY3Rpb24oZSl7aWYoZS50YXJnZXQ9PT10KW49ITA7ZWxzZSBpZighZS50YXJnZXQuaGFzQXR0cmlidXRlKCJub21vZHVsZSIpfHwhbilyZXR1cm47ZS5wcmV2ZW50RGVmYXVsdCgpfSwhMCksdC50eXBlPSJtb2R1bGUiLHQuc3JjPSIuIixlLmhlYWQuYXBwZW5kQ2hpbGQodCksdC5yZW1vdmUoKX19KCk7PC9zY3JpcHQ+CiAgICAgICAgICA8c2NyaXB0IHNyYz0ianMvY2h1bmstdmVuZG9ycy1sZWdhY3kuMjE2ZWFlODEuanMiIG5vbW9kdWxlPjwvc2NyaXB0PgogICAgICAgICAgPHNjcmlwdCBzcmM9ImpzL2xvYWRpbmctc2NyZWVuLWxlZ2FjeS44MmU2MWQ1NC5qcyIgbm9tb2R1bGU+PC9zY3JpcHQ+CiAgICAgICAgICA8c2NyaXB0IHNyYz0ianMvYXBwLWxlZ2FjeS5mNDdkMTA5ZS5qcyIgbm9tb2R1bGU+PC9zY3JpcHQ+PC9ib2R5PgogICAgICAgICAgPHNjcmlwdD4KICAgICAgICAgIChmdW5jdGlvbihpLCBzLCBvLCBnLCByLCBhLCBtKSB7CiAgaS5Hb29nbGVBbmFseXRpY3NPYmplY3Q9cjsgaVtyXT1pW3JdfHxmdW5jdGlvbigpIHsKICAgIChpW3JdLnE9aVtyXS5xfHxbXSkucHVzaChhcmd1bWVudHMpOwogIH0sIGlbcl0ubD0xKm5ldyBEYXRlKCk7IGE9cy5jcmVhdGVFbGVtZW50KG8pLAogIG09cy5nZXRFbGVtZW50c0J5VGFnTmFtZShvKVswXTsgYS5kZWZlcj0xOyBhLnNyYz1nOyBtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGEsIG0pOwogICAgfSh3aW5kb3csIGRvY3VtZW50LCAnc2NyaXB0JywgJ2h0dHBzOi8vd3d3Lmdvb2dsZS1hbmFseXRpY3MuY29tL2FuYWx5dGljcy5qcycsICdnYScpKTsKCiAgICBnYSgnY3JlYXRlJywgJ1VBLTEwMjcyNDUzNi0yJywgJ2F1dG8nKTsKICAgIC8vIGdvb2dsZSBvcHRpbWl6ZQogICAgLy8gZ2EoJ3JlcXVpcmUnLCAnR1RNLU01RkQ5VDMnKTsKCiAgICBnYSgnc2V0JywgJ2RpbWVuc2lvbjQnLCAnZW50ZXJlZCcpOwogICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnKTsKICAgIGdhKCdzZXQnLCAndHJhbnNwb3J0JywgJ2JlYWNvbicpOzwvc2NyaXB0PjxzY3JpcHQgdHlwZT0iYXBwbGljYXRpb24vbGQranNvbiI+ewogICAgICAiQGNvbnRleHQiOiAiaHR0cDovL3NjaGVtYS5vcmciLAogICAgICAiQHR5cGUiOiAiU29mdHdhcmVBcHBsaWNhdGlvbiIsCiAgICAgICJhcHBsaWNhdGlvbkNhdGVnb3J5IjogImh0dHA6Ly9zY2hlbWEub3JnL0dhbWVBcHBsaWNhdGlvbiIsCiAgICAgICJhcHBsaWNhdGlvblN1YkNhdGVnb3J5IjogIkVkdWNhdGlvbmFsIEdhbWUiLAogICAgICAibmFtZSI6ICJMaXR0bGUgQWxjaGVteSAyIiwKICAgICAgImltYWdlIjogInN0YXRpYy9pbWcvbG9nby5zdmciLAogICAgICAidXJsIjogImh0dHBzOi8vcmVhbGJlbjkuZ2l0aHViLmlvL2xhMnNjIiwKICAgICAgIm9wZXJhdGluZ1N5c3RlbSI6ICJXRUIsIEFORFJPSUQsIElPUyIsCiAgICAgICJkYXRlUHVibGlzaGVkIjogIjgvMjMvMjAxNyIsCiAgICAgICJvZmZlcnMiOiB7CiAgICAgICAgIkB0eXBlIjogIk9mZmVyIiwKICAgICAgICAicHJpY2UiOiAiMCIKICAgICAgfQogICAgfTwvc2NyaXB0PjwvaHRtbD4='   /* ← PASTE YOUR GAME CODE HERE */
  },
  {
    id: 'rocket-league-2d',
    name: '2D Rocket League',
    cat: 'Sports',
    size: 165, rating: 4.1, reviews: 3400,
    desc: 'Just 2D... Rocket-powered car soccer in a 2D side-scrolling arena.',
    img: 'https://th.bing.com/th/id/R.3629c17c5952e3e5ba572ad8325539e6?rik=yUuNaJER05wwgg&pid=ImgRaw&r=0',
    shots: [],
    url: 'data:text/html;base64,PGh0bWwgbGFuZz0iZW4iPiA8aGVhZD4gPG1ldGEgaHR0cC1lcXVpdj0iWC1VQS1Db21wYXRpYmxlIiBjb250ZW50PSJJRT1lZGdlIiAvPiA8bWV0YSBodHRwLWVxdWl2PSJwcmFnbWEiIGNvbnRlbnQ9Im5vLWNhY2hlIi8+IDxtZXRhIG5hbWU9ImFwcGxlLW1vYmlsZS13ZWItYXBwLWNhcGFibGUiIGNvbnRlbnQ9InllcyIgLz4gPG1ldGEgbmFtZSA9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MS4wLCBtYXhpbXVtLXNjYWxlPTEuMCwgdXNlci1zY2FsYWJsZT0wIiAvPiA8bWV0YSBuYW1lPSJhcHBsZS1tb2JpbGUtd2ViLWFwcC1zdGF0dXMtYmFyLXN0eWxlIiBjb250ZW50PSJibGFjay10cmFuc2x1Y2VudCIgLz4gPG1ldGEgY2hhcnNldD0idXRmLTgiLz4gPCEtLSBTZXQgdGhlIHRpdGxlIGJhciBvZiB0aGUgcGFnZSAtLT4gPHRpdGxlPkNyZWF0ZWQgd2l0aCBHYW1lTWFrZXI6IFN0dWRpbzwvdGl0bGU+IDwhLS0gU2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG91ciBvZiB0aGUgZG9jdW1lbnQgLS0+IDxzdHlsZT4gYm9keSB7IGJhY2tncm91bmQ6ICMwOyBjb2xvcjojY2NjY2NjOyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4OyBib3JkZXI6IDBweDsgfSBjYW52YXMgeyB3aWR0aDogMTAwdnc7IGRpc3BsYXk6IGJsb2NrOyB9IDotd2Via2l0LWZ1bGwtc2NyZWVuICNjYW52YXMgeyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB9IGRpdi5nbTRodG1sNV9kaXZfY2xhc3MgeyBtYXJnaW46IDBweDsgcGFkZGluZzogMHB4OyBib3JkZXI6IDBweDsgfSAvKiBTVEFSVCAtIExvZ2luIERpYWxvZyBCb3ggKi8gZGl2LmdtNGh0bWw1X2xvZ2luIHsgcGFkZGluZzogMjBweDsgcG9zaXRpb246IGFic29sdXRlOyBib3JkZXI6IHNvbGlkIDJweCAjMDAwMDAwOyBiYWNrZ3JvdW5kLWNvbG9yOiAjNDA0MDQwOyBjb2xvcjojMDBmZjAwOyBib3JkZXItcmFkaXVzOiAxNXB4OyBib3gtc2hhZG93OiAjMTAxMDEwIDIwcHggMjBweCA0MHB4OyB9IGRpdi5nbTRodG1sNV9jYW5jZWxfYnV0dG9uIHsgZmxvYXQ6IHJpZ2h0OyB9IGRpdi5nbTRodG1sNV9sb2dpbl9idXR0b24geyBmbG9hdDogbGVmdDsgfSBkaXYuZ200aHRtbDVfbG9naW5faGVhZGVyIHsgdGV4dC1hbGlnbjogY2VudGVyOyB9IC8qIEVORCAtIExvZ2luIERpYWxvZyBCb3ggKi8gOi13ZWJraXQtZnVsbC1zY3JlZW4geyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlOyB9IDwvc3R5bGU+IDwvaGVhZD4gPGJvZHk+IDxkaXYgY2xhc3M9ImdtNGh0bWw1X2Rpdl9jbGFzcyIgaWQ9ImdtNGh0bWw1X2Rpdl9pZCI+IDwhLS0gQ3JlYXRlIHRoZSBjYW52YXMgZWxlbWVudCB0aGUgZ2FtZSBkcmF3cyB0byAtLT4gPGNhbnZhcyBpZD0iY2FudmFzIiB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIzNzUiID4gPHA+WW91ciBicm93c2VyIGRvZXNuJ3Qgc3VwcG9ydCBIVE1MNSBjYW52YXMuPC9wPiA8L2NhbnZhcz4gPC9kaXY+IDwhLS0gUnVuIHRoZSBnYW1lIGNvZGUgLS0+IDxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0IiBzcmM9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9naC9iZXNzaWVnYXNiYXJyby9Sb2NrZWRAOGQ5ZjQxMjdlNzcwZjhkMjJkYjMxNTNjMzA1OTE2Y2NmM2NlYjlmOC9SbDJELmpzIj48L3NjcmlwdD4gPHNjcmlwdD53aW5kb3cub25sb2FkID0gR2FtZU1ha2VyX0luaXQ7PC9zY3JpcHQ+IDwvYm9keT4gPC9odG1sPiA8ZGl2IHN0eWxlPSJ0ZXh0LWFsaWduOiBjZW50ZXI7Ij48c3BhbiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7Ij48YiBzdHlsZT0iIj48Zm9udCBzaXplPSIzIiBjb2xvcj0iIzAwMCI+SWYgdGhlIGtleXMgZG8gbm90IHdvcmssIHRoZW4gY2xpY2sgb24gdGhpcyB0ZXh0IGFuZCBjb250aW51ZSBwbGF5aW5nLiA8L2ZvbnQ+PC9iPjwvc3Bhbj48L2Rpdj4='
  }
];

/* =========================================================
   STATE
   ========================================================= */
var installedApps = {};
var currentView = 'home';
var currentDetailId = null;
var searchQuery = '';
var installTimers = {};

try {
  var saved = localStorage.getItem('syni_appstore_installed');
  if(saved) installedApps = JSON.parse(saved) || {};
} catch(e){ installedApps = {}; }

function saveInstalled(){
  try { localStorage.setItem('syni_appstore_installed', JSON.stringify(installedApps)); } catch(e){}
}
function isInstalled(id){ return !!installedApps[id]; }
function getApp(id){
  for(var i=0;i<APPS_DB.length;i++) if(APPS_DB[i].id===id) return APPS_DB[i];
  return null;
}

/* =========================================================
   RENDER
   ========================================================= */
var contentEl = document.getElementById('content');

function render(){
  contentEl.scrollTop = 0;
  if(currentView === 'detail' && currentDetailId){
    renderDetail(currentDetailId);
  } else if(currentView === 'library'){
    renderLibrary();
  } else if(currentView === 'allgames'){
    renderAllGames();
  } else {
    renderHome();
  }
  updateTabs();
}

function updateTabs(){
  document.querySelectorAll('.tab').forEach(function(t){
    var on = (currentView === 'library' && t.dataset.view === 'library')
          || (currentView !== 'library' && t.dataset.view === 'home');
    t.classList.toggle('active', on);
  });
}

/* ---------- HOME ---------- */
function renderHome(){
  var apps = filterApps(APPS_DB, searchQuery);

  if(searchQuery){
    contentEl.innerHTML = ''
      + '<div class="search-header"><h2>Results</h2><span>'+apps.length+' app'+(apps.length===1?'':'s')+' for "'+escapeHtml(searchQuery)+'"</span></div>'
      + '<div class="big-list">' + apps.map(bigRowHTML).join('') + '</div>';
    attachHandlers();
    return;
  }

  if(!apps.length){
    contentEl.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><h3>No apps yet</h3><p>Add apps to APPS_DB in the code.</p></div>';
    return;
  }

  // Featured hero
  var featured = apps.find(function(a){ return !isInstalled(a.id); }) || apps[0];

  // Sections
  var topApps = apps.slice().sort(function(a,b){ return b.reviews - a.reviews; }).slice(0, 8);
  var newApps = apps.slice().reverse().slice(0, 8);
  var editors = apps.slice(0, 8);

  contentEl.innerHTML = ''
    + todayHeroHTML(featured)
    + hSection('Top Charts', 'See All', topApps)
    + bigSection('Apps We Love', 'See All', apps.slice(0, 4))
    + hSection('New & Noteworthy', 'See All', newApps)
    + bigSection('Editors Choice', 'See All', apps.slice(4, 8));
  attachHandlers();
}

function todayHeroHTML(app){
  return ''
    + '<div class="today-card" data-app-id="'+app.id+'">'
    +   '<div class="bg" style="background-image:url('+app.img+')"></div>'
    +   '<div class="gradient"></div>'
    +   '<div class="body">'
    +     '<div class="today-tag">Featured Today</div>'
    +     '<div class="today-title">'+escapeHtml(app.name)+'</div>'
    +     '<div class="today-desc">'+escapeHtml(app.desc)+'</div>'
    +   '</div>'
    + '</div>';
}

function hSection(title, seeAll, apps){
  if(!apps.length) return '';
  return ''
    + '<div class="ios-section">'
    +   '<div class="ios-header">'
    +     '<div><div class="ios-title">'+title+'</div></div>'
    +     (seeAll ? '<div class="see-all">'+seeAll+'</div>' : '')
    +   '</div>'
    +   '<div class="h-scroll">' + apps.map(miniCardHTML).join('') + '</div>'
    + '</div>';
}

function bigSection(title, seeAll, apps){
  if(!apps.length) return '';
  return ''
    + '<div class="ios-section">'
    +   '<div class="ios-header">'
    +     '<div><div class="ios-title">'+title+'</div></div>'
    +     (seeAll ? '<div class="see-all">'+seeAll+'</div>' : '')
    +   '</div>'
    +   '<div class="big-list">' + apps.map(bigRowHTML).join('') + '</div>'
    + '</div>';
}

function miniCardHTML(app){
  return ''
    + '<div class="mini-card" data-app-id="'+app.id+'">'
    +   '<div class="mini-icon"><img src="'+app.img+'" alt=""></div>'
    +   '<div class="mini-meta">'
    +     '<div class="mini-name">'+escapeHtml(app.name)+'</div>'
    +     '<div class="mini-cat">'+escapeHtml(app.cat)+'</div>'
    +   '</div>'
    + '</div>';
}

function bigRowHTML(app){
  var installed = isInstalled(app.id);
  return ''
    + '<div class="big-row" data-app-id="'+app.id+'">'
    +   '<div class="big-icon"><img src="'+app.img+'" alt=""></div>'
    +   '<div class="big-info">'
    +     '<div class="big-name">'+escapeHtml(app.name)+'</div>'
    +     '<div class="big-cat">'+escapeHtml(app.cat)+'</div>'
    +     '<div class="big-stats">'
    +       '<span class="stars">★</span><span>'+app.rating+'</span>'
    +       '<span>·</span><span>'+formatNum(app.reviews)+'</span>'
    +     '</div>'
    +   '</div>'
    +   '<button class="get-pill '+(installed?'installed':'')+'" data-get-id="'+app.id+'">'+(installed?'OPEN':'GET')+'</button>'
    + '</div>';
}

function attachHandlers(){
  // Whole card / row → detail
  document.querySelectorAll('.mini-card, .big-row, .today-card').forEach(function(el){
    el.addEventListener('click', function(e){
      if(e.target.closest('[data-get-id]')) return;
      var id = el.dataset.appId;
      if(!id) return;
      currentView = 'detail';
      currentDetailId = id;
      render();
    });
  });

  // GET / OPEN button
  document.querySelectorAll('[data-get-id]').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.stopPropagation();
      handleGetClick(btn.dataset.getId, btn);
    });
  });
}

/* ---------- LIBRARY ---------- */
function renderLibrary(){
  var list = APPS_DB.filter(function(a){ return isInstalled(a.id); });

  if(!list.length){
    contentEl.innerHTML = '<div class="empty-state"><i class="fas fa-box-open"></i><h3>Your library is empty</h3><p>Apps you install will appear here.</p></div>';
    return;
  }

  contentEl.innerHTML = ''
    + '<div class="ios-header" style="margin-bottom:18px;">'
    +   '<div><div class="ios-title">Your Library</div><div class="ios-sub">'+list.length+' app'+(list.length===1?'':'s')+' installed</div></div>'
    + '</div>'
    + '<div class="big-list">' + list.map(bigRowHTML).join('') + '</div>';
  attachHandlers();
}

/* ---------- ALL GAMES ---------- */
function renderAllGames(){
  var games = filterApps(APPS_DB, searchQuery);

  if(!games.length){
    contentEl.innerHTML = '<div class="empty-state"><i class="fas fa-inbox"></i><h3>No games found</h3><p>'+(searchQuery ? 'Try a different search.' : 'Add games to APPS_DB in the code.')+'</p></div>';
    return;
  }

  contentEl.innerHTML = ''
    + '<div class="ios-header" style="margin-bottom:18px;">'
    +   '<div><div class="ios-title">All Games</div><div class="ios-sub">'+games.length+' title'+(games.length===1?'':'s')+' available</div></div>'
    + '</div>'
    + '<div class="big-list">' + games.map(bigRowHTML).join('') + '</div>';
  attachHandlers();
}

/* ---------- DETAIL ---------- */
function renderDetail(id){
  var app = getApp(id);
  if(!app){ currentView = 'home'; render(); return; }

  var installed = isInstalled(app.id);
  var shotsHTML = '';
  if(app.shots && app.shots.length){
    shotsHTML = '<div class="shots-row">'
      + app.shots.map(function(s){ return '<div class="shot-item"><img src="'+s+'"></div>'; }).join('')
      + '</div>';
  }

  var actionBtn = installed
    ? '<button class="detail-get installed" id="detailAction">OPEN</button>'
    : '<button class="detail-get" id="detailAction">GET</button>';

  var uninstallBtn = installed
    ? '<button class="detail-uninstall" id="detailUninstall"><i class="fas fa-trash-alt"></i> Uninstall</button>'
    : '';

  contentEl.innerHTML = ''
    + '<div class="detail active">'
    +   '<button class="detail-back" id="backBtn"><i class="fas fa-chevron-left"></i> App Store</button>'
    +   '<div class="detail-hero">'
    +     '<div class="detail-icon"><img src="'+app.img+'"></div>'
    +     '<div class="detail-info">'
    +       '<div class="detail-name">'+escapeHtml(app.name)+'</div>'
    +       '<div class="detail-cat">'+escapeHtml(app.cat)+'</div>'
    +       '<div class="detail-actions">' + actionBtn + uninstallBtn + '</div>'
    +     '</div>'
    +   '</div>'
    +   '<div class="stats-row">'
    +     '<div class="stat-cell"><div class="stat-l">Rating</div><div class="stat-v rating">'+app.rating+'★</div></div>'
    +     '<div class="stat-cell"><div class="stat-l">Reviews</div><div class="stat-v">'+formatNum(app.reviews)+'</div></div>'
    +     '<div class="stat-cell"><div class="stat-l">Size</div><div class="stat-v">'+app.size+'<span style="font-size:12px;font-weight:500;color:var(--muted);margin-left:2px;">MB</span></div></div>'
    +   '</div>'
    +   shotsHTML
    +   '<div class="desc-section">'
    +     '<h3>About</h3>'
    +     '<p>'+escapeHtml(app.desc)+'</p>'
    +   '</div>'
    +   '<div class="reviews-section">'
    +     '<div class="reviews-header"><h3>Ratings & Reviews</h3><span class="see-all">See All</span></div>'
    +     reviewHTML('Alex_GG', 5, 'Works great, no lag at all. Best app on Syni-OS.')
    +     reviewHTML('ChromeUser99', 4, 'Pretty solid. Would be 5 stars if it loaded faster.')
    +     reviewHTML('SyniFan2026', 5, 'Love it. Been using this every day.')
    +   '</div>'
    + '</div>';

  document.getElementById('backBtn').addEventListener('click', function(){
    currentView = 'home';
    currentDetailId = null;
    render();
  });

  document.getElementById('detailAction').addEventListener('click', function(){
    handleGetClick(app.id, this);
  });

  var uBtn = document.getElementById('detailUninstall');
  if(uBtn){
    uBtn.addEventListener('click', function(){
      uninstallApp(app.id);
    });
  }
}

function reviewHTML(user, stars, text){
  var s = '';
  for(var i=0;i<5;i++) s += (i<stars ? '★' : '☆');
  return ''
    + '<div class="review-card">'
    +   '<div class="review-top">'
    +     '<div class="review-user">'+escapeHtml(user)+'</div>'
    +     '<div class="review-stars">'+s+'</div>'
    +   '</div>'
    +   '<div class="review-body">'+escapeHtml(text)+'</div>'
    + '</div>';
}

/* =========================================================
   GET / OPEN
   ========================================================= */
function handleGetClick(appId, btn){
  var app = getApp(appId);
  if(!app) return;

  if(isInstalled(appId)){
    launchApp(app);
    return;
  }
  startFakeInstall(app);
}

function dataUrlToBlobUrl(dataUrl){
  try {
    if(dataUrl.indexOf('data:') !== 0) return dataUrl;
    var parts = dataUrl.split(',');
    var meta = parts[0];
    var body = parts.slice(1).join(',');
    var mimeMatch = meta.match(/data:([^;]+)/);
    var mime = mimeMatch ? mimeMatch[1] : 'text/html';
    var isBase64 = meta.indexOf('base64') > -1;
    var content;
    if(isBase64){ content = atob(body); }
    else { content = decodeURIComponent(body); }
    var bytes = new Uint8Array(content.length);
    for(var i = 0; i < content.length; i++){ bytes[i] = content.charCodeAt(i); }
    var blob = new Blob([bytes], { type: mime });
    return URL.createObjectURL(blob);
  } catch(e){
    console.warn('Blob conversion failed, using original:', e);
    return dataUrl;
  }
}

function launchApp(app){
  if(!app.url){
    alert('No URL set for "' + app.name + '".');
    return;
  }

  var target = dataUrlToBlobUrl(app.url);

  var wantNewTab = (app.newTab === true);

  if(wantNewTab){
    try {
      if(window.parent && window.parent.launchGame){
        window.parent.launchGame({ name: app.name, url: app.url, newTab: true });
        return;
      }
    } catch(e){}
    var w = window.open('about:blank', '_blank');
    if(w){
      w.document.write('<!DOCTYPE html><html><head><title>'+app.name+'</title><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;height:100%;background:#000;overflow:hidden}iframe{border:0;width:100vw;height:100vh;display:block}</style></head><body><iframe src="'+target+'" allow="fullscreen; pointer-lock; autoplay; gamepad"></iframe></body></html>');
      w.document.close();
    }
    return;
  }

  openInOverlay({ name: app.name, url: target });
}

function openInOverlay(game){
  var overlay = document.getElementById('game-overlay');
  var frame   = document.getElementById('game-frame');
  var title   = document.getElementById('game-title');
  if(!overlay || !frame) return;
  if(title) title.textContent = game.name;
  frame.src = game.url;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGame(){
  var overlay = document.getElementById('game-overlay');
  var frame   = document.getElementById('game-frame');
  if(overlay) overlay.classList.remove('active');
  if(frame)   frame.src = 'about:blank';
  document.body.style.overflow = '';
  if(document.exitPointerLock) document.exitPointerLock();
}

function fullscreenGame(){
  var frame = document.getElementById('game-frame');
  if(!frame) return;
  if(frame.requestFullscreen) frame.requestFullscreen();
  else if(frame.webkitRequestFullscreen) frame.webkitRequestFullscreen();
}

/* =========================================================
   UNINSTALL
   ========================================================= */
function uninstallApp(appId){
  var app = getApp(appId);
  if(!app) return;

  if(!isInstalled(appId)) return;

  // Simple confirm — since this is a fake OS, we keep it lightweight
  if(!confirm('Uninstall "' + app.name + '"? This will remove it from your library.')) return;

  delete installedApps[appId];
  saveInstalled();

  // Notify the parent OS so the desktop icon can be removed too
  try {
    if(window.parent && window.parent.onAppUninstalled){
      window.parent.onAppUninstalled(app);
    }
  } catch(e){}

  // Re-render whatever view we're on
  render();
}

/* =========================================================
   FAKE INSTALL
   ========================================================= */
function startFakeInstall(app){
  var overlay   = document.getElementById('installOverlay');
  var ring      = document.getElementById('installRing');
  var phaseIcon = document.getElementById('installPhaseIcon');
  var title     = document.getElementById('installTitle');
  var sub       = document.getElementById('installSub');
  var iconImg   = document.querySelector('#installIcon img');
  var nameEl    = document.getElementById('installName');

  iconImg.src = app.img;
  nameEl.textContent = app.name;
  title.textContent = 'Downloading…';
  sub.textContent   = '0%';
  phaseIcon.className = 'fas fa-download';

  var R = 58;
  var CIRC = 2 * Math.PI * R;
  ring.style.strokeDasharray  = CIRC;
  ring.style.strokeDashoffset = CIRC;

  overlay.classList.add('active');

  var totalMs = 2600;
  var startTime = performance.now();
  var lastPct = -1;

  if(installTimers[app.id]) cancelAnimationFrame(installTimers[app.id]);

  function tick(){
    var elapsed = performance.now() - startTime;
    var progress = Math.min(elapsed / totalMs, 1);
    var eased = 1 - Math.pow(1 - progress, 1.6);

    ring.style.strokeDashoffset = CIRC * (1 - eased);

    var pct = Math.round(eased * 100);
    if(pct !== lastPct){
      lastPct = pct;
      sub.textContent = pct + '%  ·  ' + app.size + ' MB';
    }

    if(progress < 0.33){
      title.textContent = 'Downloading…';
      phaseIcon.className = 'fas fa-download';
    } else if(progress < 0.7){
      title.textContent = 'Installing…';
      phaseIcon.className = 'fas fa-box-open';
    } else if(progress < 0.98){
      title.textContent = 'Almost done…';
      phaseIcon.className = 'fas fa-cog fa-spin';
    } else {
      title.textContent = 'Installed';
      phaseIcon.className = 'fas fa-check';
    }

    if(progress < 1){
      installTimers[app.id] = requestAnimationFrame(tick);
    } else {
      installedApps[app.id] = true;
      saveInstalled();
      setTimeout(function(){
        overlay.classList.remove('active');
        render();
        try {
          if(window.parent && window.parent.onAppInstalled){
            window.parent.onAppInstalled(app);
          }
        } catch(e){}
      }, 600);
    }
  }

  installTimers[app.id] = requestAnimationFrame(tick);
}

/* =========================================================
   SEARCH
   ========================================================= */
function filterApps(list, q){
  if(!q) return list;
  q = q.toLowerCase();
  return list.filter(function(a){
    return a.name.toLowerCase().indexOf(q) > -1 ||
           a.cat.toLowerCase().indexOf(q) > -1;
  });
}

document.getElementById('searchInput').addEventListener('input', function(){
  searchQuery = this.value.trim();
  if(searchQuery && currentView !== 'home'){
    currentView = 'home';
    currentDetailId = null;
  }
  render();
});

/* =========================================================
   TABS
   ========================================================= */
document.querySelectorAll('.tab').forEach(function(t){
  t.addEventListener('click', function(){
    currentView = t.dataset.view;
    currentDetailId = null;
    searchQuery = '';
    document.getElementById('searchInput').value = '';
    render();
  });
});

/* =========================================================
   UTILS
   ========================================================= */
function escapeHtml(s){
  return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
  });
}
function formatNum(n){
  if(n >= 1000000) return (n/1000000).toFixed(1)+'M';
  if(n >= 1000)    return (n/1000).toFixed(1)+'K';
  return String(n);
}

/* =========================================================
   BOOT
   ========================================================= */

render();
<\/script>

<div id="game-overlay" class="game-overlay">
  <div class="game-header">
    <h3 id="game-title">Playing</h3>
    <div style="display:flex;gap:8px;">
      <button class="close-game" onclick="fullscreenGame()" title="Fullscreen">&#9974;</button>
      <button class="close-game" onclick="closeGame()">&#10005;</button>
    </div>
  </div>
  <iframe id="game-frame" class="game-frame"
    allow="fullscreen; pointer-lock; autoplay; gamepad"
    sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-pointer-lock allow-top-navigation allow-downloads">
  </iframe>
</div>

</body></html>`;
}
