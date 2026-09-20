/* ============================================================
   Calculator
   ============================================================ */

var calcExpr = '', calcDisplay = '0';

window.openCalculator = function(){
  var w = document.getElementById('win-calculator');
  if(!w) return;
  w.style.display = 'flex'; w.classList.remove('minimized'); w.classList.add('active');
  w.style.zIndex = ++highestZ; activeWindowId = 'calculator';
};
window.closeCalculator = function(){
  var w = document.getElementById('win-calculator');
  if(w){ w.classList.remove('active'); w.classList.add('minimized'); setTimeout(function(){ w.style.display='none'; }, 300); }
  if(activeWindowId === 'calculator'){ activeWindowId = null; endImmersiveMode(); }
};
function updateDisplay(){
  var d = document.getElementById('calc-display');
  if(d){ d.textContent = calcDisplay; d.style.fontSize = calcDisplay.length > 15 ? '24px' : '32px'; }
}
function calcPress(value){
  if(value === 'clear'){ calcExpr = ''; calcDisplay = '0'; updateDisplay(); return; }
  if(value === 'equals'){
    try {
      var expr = calcExpr.replace(/×/g,'*').replace(/÷/g,'/');
      var result = Function('"use strict"; return (' + expr + ')')();
      calcDisplay = String(result); calcExpr = String(result); updateDisplay();
    } catch(e){
      calcDisplay = 'Error'; updateDisplay();
      setTimeout(function(){ calcExpr=''; calcDisplay='0'; updateDisplay(); }, 1500);
    }
    return;
  }
  calcExpr += value; calcDisplay = calcExpr; updateDisplay();
}
document.addEventListener('click', function(e){
  var btn = e.target.closest('.calc-btn');
  if(!btn) return;
  var calc = document.getElementById('win-calculator');
  if(!calc || !calc.classList.contains('active')) return;
  var action = btn.dataset.action;
  if(!action) return;
  var map = {'0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','decimal':'.','add':'+','subtract':'-','multiply':'×','divide':'÷','percent':'%','negate':'(-','clear':'clear','equals':'equals'};
  if(map[action]) calcPress(map[action]);
});
document.addEventListener('keydown', function(e){
  var calc = document.getElementById('win-calculator');
  if(!calc || !calc.classList.contains('active')) return;
  if(e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  var map = {'0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9','+':'+','-':'-','*':'×','/':'÷','.':'.','%':'%'};
  if(map[e.key]){ e.preventDefault(); calcPress(map[e.key]); return; }
  if(e.key === 'Enter' || e.key === '='){ e.preventDefault(); calcPress('equals'); return; }
  if(e.key === 'Backspace'){ e.preventDefault(); calcExpr = calcExpr.slice(0,-1); calcDisplay = calcExpr || '0'; updateDisplay(); return; }
  if(e.key === 'Escape'){ e.preventDefault(); calcPress('clear'); return; }
});
