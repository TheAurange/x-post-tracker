// ==UserScript==
// @name    [X] Post Tracker
// @author  Aurange
// @version 1.0
// @match   https://twitter.com/*/with_replies
// @match   https://x.com/*/with_replies
// @grant   window.close
// ==/UserScript==

"use strict";

new MutationObserver(function(mutationList, observer){
  let posts = document.querySelectorAll("div[data-testid='cellInnerDiv']");

  if(posts.length > 0){
    observer.disconnect();

    let user = document.title.split("@")[1].split(")")[0],
        post = posts[0];

    if(post.querySelector("span").textContent === "Pinned") post = posts[1];
    if(post.textContent === "") post = posts[2];

    post = post.querySelectorAll("a")[3].href;

    if(localStorage.getItem(user) === null || post !== localStorage.getItem(user)){
      localStorage.setItem(user, post);
    }
    else window.close();
  }
}).observe(document, {
  childList: true,
  subtree: true
});
