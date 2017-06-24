'use strict';
const loadAllItems = require('./loadAllItems.js');

module.exports = function printInventory(inputs) {
    var barcode_list=get_barcode_list(inputs);
    var shopping_cart=get_shopping_cart(barcode_list);
    var pos=get_shopping_lists(shopping_cart);
    return pos;    
};

function get_barcode_list(inputs){
    var barcodes={};
    inputs.forEach(function(input){
        if(barcodes[input]||input.indexOf('-')!=-1){
            barcodes[input]++;
            barcodes[input.substr(0,input.indexOf('-'))]=input.substr(input.indexOf('-')+1,input.length);
        } else {
            barcodes[input]=1;
        }
    });
    return barcodes;
}

function get_shopping_cart(barcode_list){
    var items=loadAllItems();
    var shopping_cart=[];
    items.forEach(function(item){
        if(barcode_list[item.barcode]){
            item.count=barcode_list[item.barcode];
            shopping_cart.push(item);
        }
    });
    return shopping_cart;
}

function get_shopping_lists(shopping_cart){
    var list='***<没钱赚商店>购物清单***\n';
    var sum=0;
    shopping_cart.forEach(function(lists){
        var subtotal=lists.count*lists.price;
        list = list+'名称：'+lists.name+'，数量：'+lists.count+lists.unit+'，单价:'+lists.price.toFixed(2)+'(元)，小计：'+subtotal.toFixed(2)+'(元)\n';
        sum+=subtotal;
    }
	);
    list=list+'\n'+'----------------------'+'\n'+'总计：'+sum.toFixed(2)+'(元)'+'\n'+'**********************';
        return list;
    }
