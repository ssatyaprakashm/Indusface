import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[] = [];
  cartItems: any[] = [];
  laptopList: any[] = [];
  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.loadAllProducts();
    this.loadCartItems();
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe((result: any) => {
      this.productList = result.items.books;
      this.laptopList = result.items.laptops;
    });
  }

  loadCartItems() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
  }

  saveCartItems() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = { ...product, quantity: 1 };
      this.cartItems.push(newItem);
    }
    this.saveCartItems();
    console.log(product);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

}
