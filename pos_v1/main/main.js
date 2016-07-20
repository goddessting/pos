'use strict';

function printReceipt (tags){

  const allItems = loadAllItems();
  const cartItems = buildCartItems(tags, allItems);

  const allPromotions = loadPromotions();
  const receiptItems = buildReceiptItems(cartItems, allPromotions);

  const receipt = buildReceipt(receiptItems);

  const receiptText = buildReceiptText(receipt);

  console.log(receiptText);
}

function buildCartItems(tags, allItems)  {
  const cartItems = [];

  for (const tag of tags) {
    const splittedTag = tag.split('-');
    const barcode = splittedTag[0];
    const count = parseFloat(splittedTag[1] || 1);

    const cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if (cartItem) {
      cartItem.count += count;
    } else {
      let item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item: item, count: count});
    }
  }

  return cartItems;
}

function buildReceiptItems(cartItems, promotions){
  return cartItems.map(cartItem => {

    const promotionType = findPromotionType(cartItem.item.barcode, promotions);
    const a = discount(cartItem, promotionType);
    return {cartItem, subtotal: a[0], saved: a[1]}
  })
}

function discount(cartItem, getPromotionType){

  let subtotal = cartItem.count * cartItem.item.price;
  let saved = 0;

  if (getPromotionType === 'BUY_TWO_GET_ONE_FREE') {
    saved = parseInt(cartItem.count / 3) * cartItem.item.price;
  }

  subtotal -= saved;

  return [subtotal, saved];
}

function findPromotionType(barcode, allPromotions){
  const promotion = allPromotions.find(promotion => promotion.barcodes.includes(barcode));

  return promotion ? promotion.type : undefined;
}

function buildReceipt(receiptItems){

  let total = 0;
  let totalSaved = 0;

  for (const receiptItem of receiptItems) {
    total += receiptItem.subtotal;
    totalSaved += receiptItem.saved;
  }

  return {receiptItems, total, totalSaved};
}

function buildReceiptText(receipt) {

  let receiptItemsText = receipt.receiptItems
    .map(receiptItem => {
      const cartItem = receiptItem.cartItem;
      return `名称：${cartItem.item.name}，\
数量：${cartItem.count}${cartItem.item.unit}，\
单价：${formatMoney(cartItem.item.price)}(元)，\
小计：${formatMoney(receiptItem.subtotal)}(元)`;
    })
    .join('\n');

  return `***<没钱赚商店>收据***
${receiptItemsText}
----------------------
总计：${formatMoney(receipt.total)}(元)
节省：${formatMoney(receipt.totalSaved)}(元)
**********************`;
}

function formatMoney(money) {
  return money.toFixed(2);
}
