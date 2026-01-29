import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Imports de tes services et composants UI
import { TenderService } from '../../../core/services/tender';
import { UiButtonComponent } from '../../../shared/ui/ui-button/ui-button';
import { UiCardComponent } from '../../../shared/ui/ui-card/ui-card';

@Component({
  selector: 'app-create-tender',
  standalone: true,
  // 👇 INDISPENSABLE : On importe nos composants UI ici pour pouvoir les utiliser dans le HTML
  imports: [CommonModule, ReactiveFormsModule, UiButtonComponent, UiCardComponent],
  templateUrl: './create-tender.html',
  styles: []
})
export class CreateTenderComponent {
  private fb = inject(FormBuilder);
  private tenderService = inject(TenderService);
  private router = inject(Router);

  tenderForm: FormGroup;
  isSubmitting = false;

  constructor() {
    this.tenderForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      budget: [null, [Validators.required, Validators.min(1)]],
      deadline: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.tenderForm.invalid) return;

    // 1. UX : On active l'état de chargement
    this.isSubmitting = true;

    // 2. Appel au service (Mock ou Réel)
    this.tenderService.createTender(this.tenderForm.value).subscribe({
      next: () => {
        // 3. Succès : Redirection
        console.log('✅ Offre créée avec succès');
        this.router.navigate(['/owner/dashboard']);
      },
      error: (err) => {
        console.error('Erreur création', err);
        this.isSubmitting = false; // On réactive le bouton en cas d'erreur
      }
    });
  }
}