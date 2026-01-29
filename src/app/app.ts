import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important pour *ngIf et AsyncPipe
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/navbar/navbar';
import { AuthService } from './core/services/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './core/services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent], // On importe tout ce qu'on utilise
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private authService = inject(AuthService);
  
  // Observable qui retourne true si un user est présent, false sinon
  isLoggedIn$: Observable<boolean> = this.authService.currentUser$.pipe(
    map((user: User | null) => !!user)
  );
}