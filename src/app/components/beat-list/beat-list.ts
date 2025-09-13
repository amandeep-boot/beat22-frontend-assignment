import { Component, signal, computed, effect, inject, input, ChangeDetectionStrategy } from '@angular/core';
import { Beats } from '../../services/beats';
import { Beat } from '../../models/beat.interface';
import { BeatCardComponent } from '../beat-card/beat-card';
import { FilterOptions } from '../filter-bar/filter-bar';

@Component({
  selector: 'app-beat-list',
  imports: [BeatCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="beat-list-container">
      <div class="list-header">
        <h2 class="section-title">Trending Beats</h2>
        <div class="results-count">
          {{ filteredBeats().length }} beats found
        </div>
      </div>

      @if (isLoading()) {
        <div class="loading-state">
          <div class="loading-spinner"></div>
          <p>Loading beats...</p>
        </div>
      } @else if (filteredBeats().length === 0) {
        <div class="empty-state">
          <span class="material-icons empty-icon">music_off</span>
          <h3>No beats found</h3>
          <p>Try adjusting your filters or search terms</p>
        </div>
      } @else {
        <div class="beats-grid" [class.list-view]="!isGridView()">
          @for (beat of filteredBeats(); track beat.id) {
            <app-beat-card 
              [beat]="beat" 
              [isGridView]="isGridView()"
            />
          }
        </div>
      }
    </div>
  `,
  styles: `
    .beat-list-container {
      padding: 0 2rem;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .section-title {
      color: #fff;
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
    }

    .results-count {
      color: #bbb;
      font-size: 0.9rem;
    }

    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      color: #bbb;
    }

    .loading-spinner {
      width: 40px;
      height: 40px;
      border: 3px solid #333;
      border-top: 3px solid #7A5FFF;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 1rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 2rem;
      color: #bbb;
      text-align: center;
    }

    .empty-icon {
      font-size: 4rem;
      color: #444;
      margin-bottom: 1rem;
    }

    .empty-state h3 {
      color: #fff;
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
    }

    .empty-state p {
      margin: 0;
      font-size: 1rem;
    }

    .beats-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1.5rem;
      padding-bottom: 2rem;
    }

    .beats-grid.list-view {
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    @media (max-width: 1024px) {
      .beats-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
      }
    }

    @media (max-width: 768px) {
      .beat-list-container {
        padding: 0 1rem;
      }

      .list-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .section-title {
        font-size: 1.5rem;
      }

      .beats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .beats-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
    }
  `
})
export class BeatListComponent {
  private beatsService = inject(Beats);
  
  filters = input<FilterOptions>();
  
  private beats = signal<Beat[]>([]);
  protected isLoading = signal(true);
  
  filteredBeats = computed(() => {
    const allBeats = this.beats();
    const currentFilters = this.filters();
    
    if (!currentFilters) return allBeats;

    return allBeats.filter(beat => {
      // Search filter
      if (currentFilters.searchTerm) {
        const searchTerm = currentFilters.searchTerm.toLowerCase();
        const matchesSearch = 
          beat.title.toLowerCase().includes(searchTerm) ||
          beat.producer?.store?.general?.name?.toLowerCase().includes(searchTerm) ||
          beat.tag?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
          beat.genre.toLowerCase().includes(searchTerm);
        
        if (!matchesSearch) return false;
      }

      // Genre filter
      if (currentFilters.genre && beat.genre !== currentFilters.genre) {
        return false;
      }

      // Mood filter
      if (currentFilters.mood && !beat.mood?.includes(currentFilters.mood)) {
        return false;
      }

      // Tempo filter
      if (currentFilters.tempo) {
        const tempo = beat.tempo;
        switch (currentFilters.tempo) {
          case 'slow':
            if (tempo < 60 || tempo >= 90) return false;
            break;
          case 'medium':
            if (tempo < 90 || tempo >= 120) return false;
            break;
          case 'fast':
            if (tempo < 120 || tempo >= 150) return false;
            break;
          case 'very-fast':
            if (tempo < 150) return false;
            break;
        }
      }

      // Key filter
      if (currentFilters.key && beat.key !== currentFilters.key) {
        return false;
      }

      return true;
    });
  });

  isGridView = computed(() => this.filters()?.isGridView ?? true);

  constructor() {
    effect(() => {
      this.beatsService.getTrendingBeats().subscribe({
        next: (data: Beat[]) => {
          this.beats.set(data);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading beats:', error);
          this.isLoading.set(false);
        }
      });
    });
  }
}
