/* FCG Loan tools — Meta Pixel + visit counter.
   Everything here is best-effort and non-blocking: if there's no internet,
   these calls simply fail silently and the calculators keep working normally. */
(function(){
  "use strict";

  // ====== EDIT THIS ONE LINE once you create a pixel in Meta Events Manager ======
  var PIXEL_ID = "REPLACE_WITH_PIXEL_ID";
  // =================================================================================

  if(PIXEL_ID && PIXEL_ID.indexOf("REPLACE_WITH") === -1){
    try{
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', PIXEL_ID);
      fbq('track', 'PageView');
    }catch(e){ /* offline, or blocked by an ad blocker — ignore */ }
  }

  // Call from either page to fire a named event (e.g. clicking "Ask Felix on WhatsApp").
  window.fcgTrack = function(eventName, params){
    try{ if(window.fbq) fbq('track', eventName, params || {}); }catch(e){}
  };

  // Lightweight shared visit counter (countapi.xyz — free, no signup).
  // Purely informational for Felix; if offline or blocked, the badge just stays hidden.
  document.addEventListener("DOMContentLoaded", function(){
    var el = document.getElementById("visitCount");
    if(!el) return;
    fetch("https://api.countapi.xyz/hit/fcg-loan-calculator/visits")
      .then(function(r){ return r.json(); })
      .then(function(d){
        el.textContent = d.value.toLocaleString("en-US") + " visits so far";
        if(el.parentElement) el.parentElement.hidden = false;
      })
      .catch(function(){ /* offline or blocked — badge stays hidden, rest of the page is unaffected */ });
  });
})();
