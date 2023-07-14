import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
  }

  incrementQuantity(item: any) {
    item.quantity++;
    this.saveCartItems();
  }

  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.saveCartItems();
    }
  }

  removeItem(item: any) {
    const itemIndex = this.cartItems.indexOf(item);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.saveCartItems();
    }
  }

  calculateTotalPrice() {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice += item.price * item.quantity;
    }
    return totalPrice;
  }

  saveCartItems() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your Cart is empty!');
    } else {
      alert('Order Placed Successfully');
    }
  }

  constructor(private location: Location) {}

  cancel(): void {
    this.location.back();
  }
}
