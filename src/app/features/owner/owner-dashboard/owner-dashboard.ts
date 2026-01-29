import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Pour le lien vers Create
import { Observable } from 'rxjs';

import { TenderService } from '../../../core/services/tender';
import { Tender } from '../../../core/models/tender.model';

// Imports UI
import { UiButtonComponent } from '../../../shared/ui/ui-button/ui-button';
import { UiCardComponent } from '../../../shared/ui/ui-card/ui-card';
import { UiSpinnerComponent } from '../../../shared/ui/ui-spinner/ui-spinner';

@Component({
  selector: 'app-owner-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, UiCardComponent, UiButtonComponent, UiSpinnerComponent],
  templateUrl: './owner-dashboard.html',
  styles: []
})
export class OwnerDashboardComponent {
  private tenderService = inject(TenderService);
  
  // On ne stocke pas les données dans un tableau, on garde l'observable
  tenders$: Observable<Tender[]> = this.tenderService.getOwnerTenders();
}