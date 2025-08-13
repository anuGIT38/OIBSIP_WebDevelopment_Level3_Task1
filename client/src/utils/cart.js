export function getCartItems() {
  try {
    const raw = localStorage.getItem("cartItems");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items) {
  try {
    localStorage.setItem("cartItems", JSON.stringify(items));
  } catch {}
}

export function addItemToCart(item) {
  const items = getCartItems();
  const idx = items.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    items[idx].count += 1;
  } else {
    items.push({ ...item, count: 1 });
  }
  saveCartItems(items);
  return items;
}

export function removeItemFromCart(itemId) {
  const items = getCartItems();
  const idx = items.findIndex((i) => i.id === itemId);
  if (idx >= 0) {
    if (items[idx].count > 1) {
      items[idx].count -= 1;
    } else {
      items.splice(idx, 1);
    }
  }
  saveCartItems(items);
  return items;
}

export function clearCart() {
  saveCartItems([]);
}

export function cartItemCount() {
  return getCartItems().reduce((sum, i) => sum + i.count, 0);
}

export function cartTotal() {
  return getCartItems().reduce((sum, i) => sum + i.price * i.count, 0);
}
