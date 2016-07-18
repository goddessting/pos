'use strict';

function  buildCartItems(tags, allItems){
  let cartItems = [];

  for(let tag of tags){
    let splittedTag = tag.split('-');
    let barcode = splittedTag[0];
    let count = parseFloat(splittedTag[1] || 1);

    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if(cartItem){
      cartItem.count += count;
    }else{
      let item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item:item, count: count});
    }
  }

  return cartItems;
}
