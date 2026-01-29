import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth'; // Ton chemin spécifique

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'dashboard.html',
  styleUrls: []
})
export class DashboardComponent {
  private authService = inject(AuthService);
  // On récupère l'observable de l'utilisateur directement
  currentUser$ = this.authService.currentUser$;
}