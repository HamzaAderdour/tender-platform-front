import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSpinnerComponent } from '../ui-spinner/ui-spinner'; // Import du spinner

@Component({
  selector: 'app-ui-button',
  standalone: true,
  imports: [CommonModule, UiSpinnerComponent], // On déclare les dépendances ici
  template: `
    <button
      [type]="type"
      [disabled]="disabled || isLoading"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all items-center"
    >
      <app-ui-spinner *ngIf="isLoading"></app-ui-spinner>
      
      {{ label }}
    </button>
  `
})
export class UiButtonComponent {
  @Input() label: string = 'Valider';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() isLoading: boolean = false;
  @Input() disabled: boolean = false;
}