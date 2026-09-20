function getSettingsHTML(){
  return `<!DOCTYPE html>
<html><head><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Rajdhani:wght@400;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
body{background:#000;color:#fff;font-family:'Rajdhani',sans-serif;padding:25px;margin:0;outline:none;}
*{outline:none;-webkit-tap-highlight-color:transparent;}
h2{border-bottom:2px solid #333;padding-bottom:10px;font-weight:700;letter-spacing:1px;}
.setting-card{background:#111;border:1px solid #333;padding:15px;border-radius:10px;margin-bottom:12px;display:flex;justify-content:space-between;align-items:center;cursor:pointer;transition:all .2s;}
.setting-card:hover{background:#1a1a1a;border-color:#555;transform:translateX(5px);}
.setting-text{display:flex;flex-direction:column;}
.setting-text b{color:#fff;font-size:15px;}
.setting-text small{color:#888;font-size:13px;}
.switch{position:relative;display:inline-block;width:40px;height:20px;}
.switch input{opacity:0;width:0;height:0;}
.slider{position:absolute;cursor:pointer;inset:0;background:#444;transition:.3s;border-radius:34px;}
.slider:before{position:absolute;content:"";height:14px;width:14px;left:3px;bottom:3px;background:#fff;transition:.3s;border-radius:50%;}
input:checked + .slider{background:#fff;}
input:checked + .slider:before{transform:translateX(20px);background:#000;}
input[type=text],select{background:#222;color:#fff;border:1px solid #444;padding:6px;border-radius:6px;}
.btn-go{background:#ff4444;color:#fff;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-weight:bold;transition:.2s;}
.btn-go:hover{background:#fff;color:#000;transform:scale(1.05);}
.warning-text{color:#ff8888;font-size:11px;margin-top:5px;}
</style></head><body>
<h2>SYSTEM CONFIGURATION</h2>
<div class="setting-card" onclick="window.parent.aboutBlankCloak&&window.parent.aboutBlankCloak()">
<div class="setting-text"><b><i class="fas fa-eye-slash" style="color:#ff4444;"></i> ABOUT:BLANK CLOAK</b><small>Opens Syni in a new about:blank tab</small><div class="warning-text">⚠️ Opens a new window with about:blank URL</div></div>
<button class="btn-go">About:blank</button></div>
<div class="setting-card"><div class="setting-text"><b>Optimized Background</b><small>Disables video background</small></div>
<label class="switch"><input type="checkbox" id="chk-bg" onchange="window.parent.updateSysSetting('optBg',this.checked)"><span class="slider"></span></label></div>
<div class="setting-card"><div class="setting-text"><b>Fast Boot</b><small>Skips the startup sequence</small></div>
<label class="switch"><input type="checkbox" id="chk-boot" onchange="window.parent.updateSysSetting('shortBoot',this.checked)"><span class="slider"></span></label></div>
<div class="setting-card"><div class="setting-text"><b>Idle Lock Screen</b><small>Locks system when away for 3 minutes</small></div>
<label class="switch"><input type="checkbox" id="chk-idle" onchange="window.parent.updateSysSetting('idleLock',this.checked)"><span class="slider"></span></label></div>
<div class="setting-card"><div class="setting-text"><b>Redirect Confirmation</b><small>Helps Protect Against GoGuardian</small></div>
<label class="switch"><input type="checkbox" id="chk-redir" onchange="window.parent.updateSysSetting('redirectConfirm',this.checked)"><span class="slider"></span></label></div>
<div class="setting-card"><div class="setting-text"><b>Panic Key</b><small>Instant site redirection shortcut</small></div>
<input type="text" id="panic-input" maxlength="1" style="width:40px;text-align:center;font-weight:bold;font-size:16px;" onkeyup="window.parent.updateSysSetting('panicKey',this.value)"></div>
<div class="setting-card"><div class="setting-text"><b>Mute message noise</b><small>Silence the chat "ding" for new messages</small></div>
<label class="switch"><input type="checkbox" id="chk-mute" onchange="window.parent.updateSysSetting('muteChatSound',this.checked)"><span class="slider"></span></label></div>
<script>
var prefs = window.parent.sysConfig || {};
document.getElementById('chk-bg').checked = !!prefs.optBg;
document.getElementById('chk-boot').checked = !!prefs.shortBoot;
document.getElementById('chk-idle').checked = !!prefs.idleLock;
document.getElementById('chk-redir').checked = !!prefs.redirectConfirm;
document.getElementById('chk-mute').checked = !!prefs.muteChatSound;
document.getElementById('panic-input').value = prefs.panicKey || '\`';
<\/script>
</body></html>`;
}
