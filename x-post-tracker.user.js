// ==UserScript==
// @name    [X] Post Tracker
// @author  Aurange
// @version 1.5
// @match   https://x.com/*/with_replies
// @grant   window.close
// ==/UserScript==

"use strict";

new MutationObserver(function(mutationList, observer){
  let posts = document.querySelectorAll("div[data-testid='cellInnerDiv']");

  if(posts.length > 1){
    observer.disconnect();

    let post = [...posts].filter(e => (e.textContent !== "" && e.textContent.indexOf("Pinned") === -1))[0].querySelectorAll("a")[3].href,
        user = post.split(".com/")[1].split("/status")[0],
        lSU = localStorage.getItem(user);

    if(!lSU || post !== lSU){
      localStorage.setItem(user, post);
    }
    else window.close();
  }
}).observe(document, {
  childList: true,
  subtree: true
});
