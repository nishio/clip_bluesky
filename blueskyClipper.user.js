// ==UserScript==
// @name         Bluesky Clipper
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Clip posts from Bluesky into clipboard with a single click
// @author       You
// @match        *://*blueskyweb.xyz/*
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
  "use strict";

  // Function to add a clip button to each post
  const addClipButton = () => {
    // Select all posts
    const posts = document.querySelectorAll("article");
    posts.forEach((post) => {
      // Check if the clip button is already added
      if (post.querySelector(".clip-btn")) return;

      // Create a new button
      const clipBtn = document.createElement("button");
      clipBtn.innerText = "Clip";
      clipBtn.className = "clip-btn";
      clipBtn.style.marginLeft = "10px";

      // Add click event to the button
      clipBtn.addEventListener("click", () => {
        const postContent = post.innerText;
        GM_setClipboard(postContent, "text");
        alert("Post clipped to clipboard!");
      });

      // Append the button to the post
      post.appendChild(clipBtn);
    });
  };

  // Observe for changes in the DOM and add clip button to new posts
  const observer = new MutationObserver(addClipButton);
  observer.observe(document.body, { childList: true, subtree: true });

  // Initial call to add clip button to existing posts
  addClipButton();
})();
