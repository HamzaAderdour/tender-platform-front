import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- INDISPENSABLE pour *ngIf et ngClass
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // <--- INDISPENSABLE pour les formulaires
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  // 👇 C'est cette ligne qui corrige 90% de vos erreurs en rouge
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.html',
  styleUrls: [] 
})
export class LoginComponent { // Assurez-vous que le nom est bien LoginComponent
  // 👇 Ces variables corrigent les erreurs "Property does not exist"
  loginForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // 👇 Cette méthode corrige l'erreur sur (ngSubmit)
  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Login succès:', response);
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Erreur Login:', err);
        this.errorMessage = 'Email ou mot de passe incorrect (Test: admin@test.com / 1234)';
      }
    });
  }
}