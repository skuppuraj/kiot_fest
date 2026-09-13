// ==========================================================================
// KIOT FEST 2026 - Native Vanilla JavaScript (DOM Manipulation)
// Demonstrates how Native JS attaches behavior to the existing HTML+CSS,
// and reveals the "DOM Spaghetti & State Desynchronization" problem!
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. In-memory Data State
  const selectedEventIds = new Set();
  let totalAmount = 0;

  // 2. DOM Elements Selection (Imperative DOM queries)
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');
  const eventArticles = document.querySelectorAll('#events article');
  const regForm = document.querySelector('#register form');

  // 3. Attach click listeners to each Event Card button
  eventArticles.forEach((article, index) => {
    const btn = article.querySelector('button');
    // Using standard HTML5 data-attributes (e.g. data-fee="200") instead of regex string parsing!
    // dataset.fee directly reads the 'data-fee' attribute from the HTML article or button.
    const fee = parseInt(article.dataset.fee || btn?.dataset.fee || '0', 10);
    const eventId = parseInt(article.dataset.id || btn?.dataset.id || (index + 1), 10);

    if (!btn) return;

    btn.addEventListener('click', () => {
      // Check if already selected
      if (selectedEventIds.has(eventId)) {
        selectedEventIds.delete(eventId);
        totalAmount -= fee;
        btn.textContent = 'Select Event for Registration';
        btn.classList.remove('selected');
      } else {
        selectedEventIds.add(eventId);
        totalAmount += fee;
        btn.textContent = 'Selected ✓';
        btn.classList.add('selected');
      }

      // Manual DOM Updates: Must remember to mutate every single display element!
      if (cartCountEl) {
        cartCountEl.textContent = selectedEventIds.size;
      }
      if (cartTotalEl) {
        cartTotalEl.textContent = '₹' + totalAmount;
      }

      console.log(`[Native JS] Event ${eventId} toggled. Selected count: ${selectedEventIds.size}, Total: ₹${totalAmount}`);
    });
  });

  // 4. Form Submit Interception
  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const studentName = document.getElementById('fullName')?.value || document.getElementById('studentName')?.value || 'Student';
      alert(`🎉 Registration Submitted Successfully for ${studentName}!\nSelected Events: ${selectedEventIds.size}\nTotal Fee: ₹${totalAmount}`);
    });
  }

  // 5. Expose State Desync Simulator for Educational Demo
  window.simulateDesyncBug = function() {
    // In Vanilla JS: what happens when a developer modifies in-memory state
    // but forgets to write document.getElementById('cart-count').textContent = ...?
    selectedEventIds.add(999);
    totalAmount += 500;
    alert(
      `⚠️ STATE DESYNC BUG SIMULATED!\n\n` +
      `Actual Data State: ${selectedEventIds.size} events, Total: ₹${totalAmount}\n` +
      `Visual UI Display: ${cartCountEl ? cartCountEl.textContent : '0'} events, Total: ${cartTotalEl ? cartTotalEl.textContent : '₹0'}\n\n` +
      `Because Vanilla JS requires manual DOM mutations for EVERY element, missing ONE line causes the UI to go out of sync with data!\n` +
      `👉 This is why Declarative UI (React.js) where UI = f(state) was invented.`
    );
  };
});
