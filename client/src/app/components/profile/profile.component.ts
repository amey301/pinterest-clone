import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [NavbarComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  userData: any = {};
  activeTab: 'created' | 'saved' = 'created';

  createdPosts: any[] = []; // assuming future API
  savedPosts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserProfile();
    // this.fetchSavedPosts(); 
    this.fetchCreatedPosts()
  }

  fetchUserProfile() {
    this.http.get('http://localhost:5000/api/profile', { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          this.userData = res;
        },
        error: (err) => console.error('Error loading profile:', err)
      });

    this.http.get('http://localhost:5000/api/check-auth', { withCredentials: true })
      .subscribe(res => console.log('Check Auth:', res));
  }

  fetchSavedPosts() {
    this.http.get('http://localhost:5000/api/saved-posts', { withCredentials: true })
      .subscribe({
        next: (res: any) => this.savedPosts = res.posts || [],
        error: (err) => console.error('Error loading saved posts:', err)
      });
  }

  fetchCreatedPosts() {
    this.http.get('http://localhost:5000/api/created-posts', { withCredentials: true })
      .subscribe({
        next: 
        (res: any) =>{ 
          this.createdPosts = res.posts || [] ,
          console.log( `created posts`, this.createdPosts)
        },
        
        error: (err) => console.error('Error loading created posts:', err)
      });
  }

  switchTab(tab: 'created' | 'saved') {
    this.activeTab = tab;
    if (tab === 'created') {
      this.fetchCreatedPosts();
    } else {
      this.fetchSavedPosts();
    }
  }
}
