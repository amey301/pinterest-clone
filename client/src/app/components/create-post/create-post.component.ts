import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
 selectedFile: File | null = null;
  title: string = '';
  // board: string[] =[]
  tags: string = '';
  // selectedFile: File | null = null;
  previewUrl: string | null = null;
  isImage: boolean = false;
  isVideo: boolean = false;

 constructor(private http : HttpClient, private router : Router){}

 board: string = '';
boards: string[] = ['Anushka', 'Gajwakra', 'none', 'Gajwakra', 'none'];
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // store selected file
    if (this.selectedFile) {
      this.showPreview(this.selectedFile);
    }
  }

  showPreview(file: File): void {
    const fileType = file.type;
    
    if (fileType.startsWith('image/')) {
      this.isImage = true;
      this.isVideo = false;
      this.previewUrl = URL.createObjectURL(file);
    } else if (fileType.startsWith('video/')) {
      this.isVideo = true;
      this.isImage = false;
      this.previewUrl = URL.createObjectURL(file);
    } else {
      this.isImage = false;
      this.isVideo = false;
      this.previewUrl = null;
    }
  }

   removePreview(): void {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
    this.selectedFile = null;
    this.previewUrl = null;
    this.isImage = false;
    this.isVideo = false;
    
    // Reset file input
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  uploadFile(event: Event) {
     event.preventDefault(); 
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('file', this.selectedFile); // 'image' must match multer's field name
    formData.append('title', this.title)
    formData.append('board', this.board);
    formData.append('tags', this.tags)
    console.log(FormData)
    this.http.post('http://localhost:5000/api/upload', formData, {
      withCredentials: true // only if using cookies/session auth
    }).subscribe({
      next: (res: any) => {
        console.log('Upload success:', res);
        
        this.router.navigate(['/profile'])
      },
      error: (err: any) => {
        console.error('Upload error:', err);
      }
    });
  }

   ngOnDestroy(): void {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl);
    }
  }
}
