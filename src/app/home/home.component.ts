import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProducts:any = []

  constructor(private api:ApiService, private toastr:ToastrService){}

  ngOnInit(): void {
    this.api.getAllProductsAPI().subscribe((result:any)=>{
      this.allProducts = result
      console.log(this.allProducts);
      
    })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      // add to wishlist api
      this.api.addToWishlistAPI(product).subscribe({
        next:(result:any)=>{
          this.toastr.success(`Product ${result.title} added to your wishlist`)
        },
        error:(reason:any)=>{
          console.log(reason)
          this.toastr.warning(reason.error)
        }
      })
    }else{
      this.toastr.info("Please login!!")
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      product.quantity = 1
      this.api.addToCartAPI(product).subscribe({
        next:(result:any)=>{
          this.toastr.success(result)
          this.api.getCartCount()
        },
        error:(reason:any)=>{
          this.toastr.warning(reason.error)
        }
      })
    }else{
      this.toastr.info("Please login!!")
    }
  }


  
}
