import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
interface Post {
  id: number;
  image: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-homepage',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
posts: Post[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=400&fit=crop",
      title: "Mountain Landscape",
      description: "Beautiful mountain view with clear blue sky"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=600&fit=crop",
      title: "Forest Path",
      description: "Peaceful forest trail in autumn"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=350&fit=crop",
      title: "Lake Sunset",
      description: "Stunning sunset over a calm lake"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=500&fit=crop",
      title: "Desert Landscape",
      description: "Golden desert dunes at sunset"
    },
 
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=300&h=380&fit=crop",
      title: "City Skyline",
      description: "Modern city skyline at night"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=550&fit=crop",
      title: "Mountain Peak",
      description: "Snow-capped mountain peak"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=400&fit=crop",
      title: "Flower Field",
      description: "Colorful wildflower meadow"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=300&h=500&fit=crop",
      title: "Lake Reflection",
      description: "Perfect mountain reflection in still water"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=300&h=420&fit=crop",
      title: "Tropical Beach",
      description: "Crystal clear tropical waters"
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&h=480&fit=crop",
      title: "Starry Night",
      description: "Beautiful night sky with stars"
    },
  
  ];

  filteredPosts: Post[] = [];
  searchTerm: string = '';

  ngOnInit() {
    this.filteredPosts = this.posts;
  }

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    
    if (this.searchTerm) {
      this.filteredPosts = this.posts.filter(post => 
        post.title.toLowerCase().includes(this.searchTerm) || 
        post.description.toLowerCase().includes(this.searchTerm)
      );
    } else {
      this.filteredPosts = this.posts;
    }
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'assets/placeholder-image.jpg'; // Add your placeholder image
  }
}

  

