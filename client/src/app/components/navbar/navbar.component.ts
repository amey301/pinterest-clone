import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private http: HttpClient,  private router : Router){
   
  }


goToProfile() {
  this.router.navigate(['/profile']);
}

goToCreatePost(){
  this.router.navigate(['/create-post'])
}
 onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
   
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/placeholder-image.jpg'; // Add your placeholder image
  }

  logout() {
  this.http.get('http://localhost:5000/api/logout').subscribe({
    next: (res: any) => {
      console.log('Logout successful', res);
      this.router.navigate(['/login']);
      //  this.userData = null;
    },
    error: (err) => {
      console.error('Logout failed', err);
    }
  });
}


}

