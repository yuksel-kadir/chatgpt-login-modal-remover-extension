console.log("ChatGPT Modal Remover: Content script loaded and running in persistent mode.");

const observer = new MutationObserver(() => {
  // Check for the main modal container on any page change.
  const modalContainer = document.querySelector('[data-testid="modal-no-auth-rate-limit"]');

  // If the modal container is ever found, execute our complete, multi-step fix.
  if (modalContainer) {
    console.log("ChatGPT Modal Remover: Found modal. Starting full cleanup process.");

    // Action 1: Unlock the body tag for scrolling and clicking.
    const body = document.body;
    body.removeAttribute('data-scroll-locked');
    body.removeAttribute('style');
    console.log("ChatGPT Modal Remover: -> Step 1: Body attributes reset.");

    // --- NEW Action 2: Clean up aria-hidden attributes from all elements ---
    const hiddenElements = document.querySelectorAll('[data-aria-hidden="true"], [aria-hidden="true"]');
    hiddenElements.forEach(el => {
      el.removeAttribute('data-aria-hidden');
      el.removeAttribute('aria-hidden');
    });
    console.log(`ChatGPT Modal Remover: -> Step 2: Cleaned aria attributes from ${hiddenElements.length} elements.`);
    // --- End of new logic ---

    // Action 3: Remove the modal component itself.
    modalContainer.remove();
    console.log("ChatGPT Modal Remover: -> Step 3: Modal container removed.");

    console.log("ChatGPT Modal Remover: Cleanup cycle complete. Continuing to watch.");
    // We do NOT disconnect the observer, allowing it to catch the modal again.
  }
});

console.log("ChatGPT Modal Remover: Starting persistent observation of the document body.");
observer.observe(document.body, { childList: true, subtree: true });