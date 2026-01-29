import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Tender } from '../models/tender.model'; // Assure-toi que le chemin est bon

@Injectable({
  providedIn: 'root'
})
export class TenderService {
  
  private apiUrl = 'http://localhost:8080/api/tenders';

  // --- DONNÉES MOCKÉES (Base de données volatile) ---
  private mockTenders: Tender[] = [
    {
      id: 101,
      title: 'Rénovation Façade Siège Social',
      description: 'Refection complète de la peinture et nettoyage des vitres du bâtiment A.',
      budget: 150000,
      deadline: new Date('2026-04-15'),
      status: 'OPEN'
    },
    {
      id: 102,
      title: 'Installation Fibre Optique',
      description: 'Câblage structuré pour les 3 étages des bureaux administratifs.',
      budget: 45000,
      deadline: new Date('2026-03-01'),
      status: 'CLOSED'
    },
    {
      id: 103,
      title: 'Fourniture Matériel Informatique',
      description: 'Achat de 50 laptops Dell Latitude et 50 écrans 27 pouces.',
      budget: 80000,
      deadline: new Date('2026-05-20'),
      status: 'DRAFT'
    }
  ];

  constructor(private http: HttpClient) {}

  // =========================================================
  // 1. RÉCUPÉRER LES OFFRES (GET)
  // =========================================================
  getOwnerTenders(): Observable<Tender[]> {
    
    // 🔴 VRAI CODE (À DÉCOMMENTER)
    // return this.http.get<Tender[]>(this.apiUrl);

    // 🟢 MOCK (ACTIF)
    console.log('📡 Mock API: Fetching Tenders...');
    return of(this.mockTenders).pipe(delay(800));
  }

  // =========================================================
  // 2. CRÉER UNE OFFRE (POST)
  // =========================================================
  // Note: On utilise Omit pour dire "Je te donne tout sauf l'ID et le Status qui sont gérés par le back"
  createTender(tenderData: Omit<Tender, 'id' | 'status'>): Observable<Tender> {
    
    // 🔴 VRAI CODE (À DÉCOMMENTER)
    // return this.http.post<Tender>(this.apiUrl, tenderData);

    // 🟢 MOCK (ACTIF)
    console.log('📡 Mock API: Creating Tender...', tenderData);
    
    // Simulation de la création côté serveur
    const newTender: Tender = {
      ...tenderData,
      id: Math.floor(Math.random() * 10000) + 1000, // Faux ID aléatoire
      status: 'OPEN' // Statut par défaut
    };

    return of(newTender).pipe(
      delay(1000), // Latence réseau
      tap((createdTender) => {
        // Effet de bord : On l'ajoute vraiment à notre liste locale
        this.mockTenders.unshift(createdTender); // Ajout en haut de liste
      })
    );
  }
}