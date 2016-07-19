'use strict';

function buildCartItems(tags, allItems) {
  let cartItems = [];

  for (let tag of tags) {
    let splittedTag = tag.split('-');
    let barcode = splittedTag[0];
    let count = parseFloat(splittedTag[1] || 1);

    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if (cartItem) {
      cartItem.count += count;
    } else {
      let item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item: item, count: count});
    }
  }

  return cartItems;
}

function buildReceiptItems(cartItems, promotions) {
  let receiptItems = [];
  let barcodes = promotions[0].barcodes;

  for (let cartItem of cartItems) {
      let barcode = barcodes.find(barcode => cartItem.item.barcode === barcode);

      if (barcode && cartItem.count >= 2) {
        let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

        receiptItems.push({
          cartItem: cartItem,
          subtotal: cartItem.count * cartItem.item.price,
          saved: cartItem.count / 2 * cartItem.item.price
        });
      }else{
        receiptItems.push({cartItem: cartItem, subtotal: cartItem.count * cartItem.item.price, saved: 0.00});
      }
  }

  return receiptItems;
}
