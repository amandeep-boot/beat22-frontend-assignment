import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../header/header';
import { FilterBarComponent, FilterOptions } from '../filter-bar/filter-bar';
import { BeatListComponent } from '../beat-list/beat-list';

@Component({
  selector: 'app-beats-page',
  imports: [HeaderComponent, FilterBarComponent, BeatListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="beats-page">
      <app-header />
      
      <main class="main-content">
        <div class="content-header">
          <h1 class="page-title">Explore <span class="highlight">Beats</span></h1>
          <button class="refresh-btn">Refresh</button>
        </div>
        
        <div class="category-pills">
          <button class="pill active">Trending Beats</button>
          <button class="pill">WAV under ₹999</button>
          <button class="pill">Wav + Stems under ₹1,999</button>
          <button class="pill">Beats with Exclusive</button>
        </div>
        
        <app-filter-bar 
          (filtersChanged)="onFiltersChanged($event)"
          (viewToggled)="onViewToggled($event)"
        />
        
        <app-beat-list [filters]="currentFilters()" />
      </main>
    </div>
  `,
  styles: `
    .beats-page {
      min-height: 100vh;
      background: #151515;
      color: #fff;
    }

    .main-content {
      width : 95vw;
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
    }

    .content-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 700;
      margin: 0;
      color: #fff;
    }

    .highlight {
      color: #7A5FFF;
    }

    .refresh-btn {
      background: transparent;
      border: 1px solid #444;
      color: #bbb;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.9rem;
    }

    .refresh-btn:hover {
      border-color: #7A5FFF;
      color: #7A5FFF;
    }

    .category-pills {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .pill {
      background: #2a2a2a;
      border: none;
      color: #bbb;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.9rem;
      white-space: nowrap;
    }

    .pill:hover {
      background: #333;
      color: #fff;
    }

    .pill.active {
      background: #7A5FFF;
      color: #fff;
    }

    @media (max-width: 768px) {
      .main-content {
        padding: 1rem;
      }
      
      .content-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      
      .category-pills {
        overflow-x: auto;
        padding-bottom: 0.5rem;
      }
    }
  `
})
export class BeatsPageComponent {
  selectedCategory = signal('trending');
  
  currentFilters = signal<FilterOptions>({
    searchTerm: '',
    genre: '',
    mood: '',
    tempo: '',
    key: '',
    isGridView: true
  });

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  onFiltersChanged(filters: FilterOptions) {
    this.currentFilters.set(filters);
  }

  onViewToggled(isGridView: boolean) {
    this.currentFilters.update(filters => ({
      ...filters,
      isGridView
    }));
  }
}
