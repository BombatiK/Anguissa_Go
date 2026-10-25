import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserProfile } from '../models/user.model';

interface DashboardStat {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  currentUser: UserProfile | null = null;
  currentDate = new Date();

  // Données de démonstration pour les statistiques
  stats: DashboardStat[] = [
    { label: 'Abonnés Actifs', value: '342', change: '+12% ce mois', isPositive: true, icon: 'users' },
    { label: 'Sessions Hotspot', value: '128', change: '+5% aujourd\'hui', isPositive: true, icon: 'wifi' },
    { label: 'Bande Passante (Starlink)', value: '185 Mbps', change: 'Stable', isPositive: true, icon: 'activity' },
    { label: 'Revenus du Jour', value: '85 500 FCFA', change: '+8% / hier', isPositive: true, icon: 'wallet' }
  ];

  // Liste des requêtes/activités récentes
  recentActivities = [
    { id: 'ACT-001', user: 'Paul Nguema', type: 'Recharge Coupon 24h', amount: '1 000 FCFA', status: 'Succès', time: 'Il y a 5 min' },
    { id: 'ACT-002', user: 'Marcelle Tchakounte', type: 'Abonnement Mensuel 10M', amount: '15 000 FCFA', status: 'Succès', time: 'Il y a 18 min' },
    { id: 'ACT-003', user: 'Client_Hotspot_89', type: 'Session Expirée', amount: '-', status: 'Terminé', time: 'Il y a 42 min' },
    { id: 'ACT-004', user: 'Jean-Baptiste', type: 'Ticket Support MikroTik', amount: '-', status: 'En cours', time: 'Il y a 1h' }
  ];

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToDashboard(): void {
    if (this.currentUser?.role === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.router.navigate(['/staff/dashboard']);
    }
  }
}