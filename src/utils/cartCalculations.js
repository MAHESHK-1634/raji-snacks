/**
 * Calculate totals and breakdown for items in the cart
 * @param {Array} items
 * @returns {Object}
 */
export const calculateCartTotals = (items = []) => {
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + itemPrice * qty;
  }, 0);

  const totalCount = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  // Demonstration shipping fee rule: Free above ₹499, else ₹50 mock rate
  const shippingThreshold = 499;
  const shippingFee = subtotal === 0 ? 0 : subtotal >= shippingThreshold ? 0 : 50;

  const totalSavings = items.reduce((sum, item) => {
    if (item.originalPrice && item.originalPrice > item.price) {
      return sum + (item.originalPrice - item.price) * (Number(item.quantity) || 0);
    }
    return sum;
  }, 0);

  const grandTotal = subtotal + shippingFee;

  return {
    subtotal,
    shippingFee,
    shippingThreshold,
    amountForFreeShipping: Math.max(0, shippingThreshold - subtotal),
    totalSavings,
    grandTotal,
    totalCount
  };
};
