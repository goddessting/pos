'use strict';

function buildCartItems(inputs, allItems) {
  var cartItems = [];

  inputs.forEach((tags) => {
    var elementTags = tags.split('-');

    if(isNotExist(cartItems, elementTags)){
      converCartItems(elementTags, allItems, cartItems);
    }
    else{
      buildCount(cartItems, elementTags);
    }
  });

  return cartItems;
}
function buildCount(items, tags){
  items.forEach((item) => {
    if(item.barcode === tags[0]){
      item.count+=parseFloat(tag[1] || 1);
    }
  });
}

function converCartItems(tag, allItems, items) {
  allItems.forEach((allItem) => {
    if (tag[0] === allItem.barcode) {
      items.push({item: allItem, count: parseFloat(tag[1] || 1)});
    }
  });
}

function isNotExist(items, tags){
  for(let i = 0; i < items.length; i++){
    if(items[i].barcode === tags[0]){

      return false;
    }
  }

  return true;
}
