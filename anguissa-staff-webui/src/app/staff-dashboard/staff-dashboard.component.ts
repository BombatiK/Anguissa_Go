import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Client {
  id: number;
  username: string;
  fullName: string;
  phone: string;
  plan: string;
  expireDate: string;
  status: 'actif' | 'expiré';
}

@Component({
  selector: 'app-staff-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-dashboard.component.html',
  styleUrls: ['./staff-dashboard.component.scss']
})
export class StaffDashboardComponent implements OnInit {
  
  searchTerm: string = '';
  selectedFilter: string = 'all';

  // Données simulées (qui seront remplacées par votre API Spring Boot / Oracle)
  clients: Client[] = [
    { id: 1, username: 'client_jean', fullName: 'Jean Dupont', phone: '+237690000001', plan: 'Anguissa 30J', expireDate: '2026-11-15', status: 'actif' },
    { id: 2, username: 'client_marie', fullName: 'Marie Claire', phone: '+237670000002', plan: 'Anguissa 7J', expireDate: '2026-10-20', status: 'actif' },
    { id: 3, username: 'client_paul', fullName: 'Paul Biya Jr', phone: '+237650000003', plan: 'Anguissa 30J', expireDate: '2026-09-10', status: 'expiré' }
  ];

  ngOnInit(): void {
    // Ici, vous ferez l'appel HTTP vers votre backend Spring Boot pour récupérer les clients
  }

  get filteredClients() {
    return this.clients.filter(client => {
      const matchesSearch = client.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            client.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                            client.phone.includes(this.searchTerm);
      
      if (this.selectedFilter === 'actif') return matchesSearch && client.status === 'actif';
      if (this.selectedFilter === 'expire') return matchesSearch && client.status === 'expiré';
      return matchesSearch;
    });
  }

  renewClient(client: Client) {
    alert(`Renouvellement de l'abonnement pour : ${client.username}`);
    // Logique de recharge / appel API ici
  }

  generateInvoice(client: Client) {
    alert(`Génération de la facture PDF pour : ${client.fullName}`);
    // Logique de génération PDF ici
  }
}