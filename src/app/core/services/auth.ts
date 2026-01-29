import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
// 👇 AJOUT : switchMap est nécessaire pour la logique conditionnelle du mock
import { tap, delay, switchMap } from 'rxjs/operators';

// Interfaces locales
export interface User {
  id: number;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Gestion de l'état utilisateur
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // URL API (pour plus tard)
  private API_URL = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
    // Restauration au démarrage si un user est stocké
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(email: string, pass: string): Observable<AuthResponse> {
    
    // ---------------------------------------------------------
    // OPTION 1 : LE VRAI CODE (À DÉCOMMENTER QUAND LE BACK EST PRÊT)
    // ---------------------------------------------------------
    /*
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, { email, password: pass }).pipe(
      tap(response => {
        this.saveSession(response);
      })
    );
    */

    // ---------------------------------------------------------
    // OPTION 2 : LE MOCK (ACTIF MAINTENANT)
    // ---------------------------------------------------------
    console.warn('⚠️ AUTH SERVICE : Mode Mock Activé');
    
    // Simulation d'appel réseau (500ms)
    return of(true).pipe(
      delay(500),
      // 👇 C'est ici la correction : switchMap permet de décider si on renvoie un SUCCÈS ou une ERREUR
      switchMap(() => {
        if (email === 'admin@test.com' && pass === '1234') {
          // SUCCÈS : On construit la réponse
          const mockResponse: AuthResponse = {
            token: 'fake-jwt-token-xyz-123',
            user: { id: 1, email: email, role: 'ADMIN' }
          };

          // On sauvegarde la session (Effet de bord)
          this.saveSession(mockResponse);

          // IMPORTANT : On retourne l'objet mocké au composant
          return of(mockResponse);
        } else {
          // ÉCHEC : On retourne une erreur Observable
          return throwError(() => new Error('Identifiants incorrects'));
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private saveSession(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('currentUser', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }
}