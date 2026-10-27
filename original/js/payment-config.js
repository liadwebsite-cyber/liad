/* LIAD checkout payment settings.
   Leave a value empty until the business has an active account; empty methods are shown as "coming soon"
   and the checkout falls back to an emailed order request. Nothing in this file charges a customer by itself. */
window.LIAD_PAYMENT = {
  // Card payments through a hosted, PCI-compliant payment page (Grow/Meshulam, Cardcom, Tranzila, PayPlus...).
  // The checkout POSTs {orderId, items, shipping, total, customer} as JSON to this URL. Your server creates the
  // payment page with the provider's API (keys stay on the server) and replies {"url": "https://..."}.
  cardEndpoint: '',
  // Bit Business payment link ("קישור לתשלום" from the Bit business app/portal).
  bitLink: ''
};
