// ==UserScript==
// @name    [X] Post Tracker
// @author  Aurange
// @version 1.1
// @match   https://twitter.com/*/with_replies
// @grant   window.close
// ==/UserScript==

"use strict";

new MutationObserver(function(mutationList, observer){
  let posts = document.querySelectorAll("div[data-testid='cellInnerDiv']");

  if(posts.length > 0){
    observer.disconnect();

    let post = posts[0],
        user;

    if(post.querySelector("span").textContent === "Pinned") post = posts[1];
    if(post.textContent === "") post = posts[2];

    post = post.querySelectorAll("a")[3].href;

    user = post.split(".com/")[1].split("/status")[0];

    if(localStorage.getItem(user) === null || post !== localStorage.getItem(user)){
      localStorage.setItem(user, post);
    }
    else window.close();
  }
}).observe(document, {
  childList: true,
  subtree: true
});
