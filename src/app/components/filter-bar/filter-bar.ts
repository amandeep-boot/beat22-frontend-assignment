import { Component, signal, output, ChangeDetectionStrategy, computed, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FilterOptions {
  searchTerm: string;
  genre: string;
  mood: string;
  tempo: string;
  key: string;
  isGridView: boolean;
}

@Component({
  selector: 'app-filter-bar',
  imports: [FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filter-bar">
      <div class="top-row">
        <div class="search-container">
          <span class="material-icons search-icon">search</span>
          <input 
            type="text" 
            placeholder="Search top beats" 
            class="search-input"
            [(ngModel)]="searchTerm"
            (input)="onSearchChange()"
          />
        </div>

        <div class="view-toggle">
          <button 
            class="toggle-btn"
            [class.active]="!isGridView()"
            (click)="toggleView(false)"
            title="List View"
          >
            <span class="material-icons">view_list</span>
          </button>
          <button 
            class="toggle-btn"
            [class.active]="isGridView()"
            (click)="toggleView(true)"
            title="Grid View"
          >
            <span class="material-icons">grid_view</span>
          </button>
        </div>
      </div>

      <div class="filters-row">
        <div class="filters-left">
          <span class="filters-label">Filters:</span>
          
          <div class="filter-dropdown custom-dropdown">
            <button class="filter-button" (click)="toggleBeatTypeDropdown()">
              Beat Types
              <span class="material-icons dropdown-icon">keyboard_arrow_down</span>
            </button>
            <div class="dropdown-menu" [class.show]="showBeatTypeDropdown">
              <div class="dropdown-search">
                <span class="material-icons search-icon">search</span>
                <input 
                  type="text" 
                  placeholder="Search beat types..." 
                  class="dropdown-search-input"
                  [(ngModel)]="beatTypeSearchTerm"
                />
              </div>
              <div class="dropdown-options">
                @for (beatType of filteredBeatTypes(); track beatType.value) {
                  <label class="dropdown-option">
                    <input 
                      type="radio" 
                      name="beatType"
                      [value]="beatType.value"
                      [checked]="selectedBeatType === beatType.value"
                      (change)="onBeatTypeChange(beatType.value)"
                    />
                    <span class="radio-custom"></span>
                    <span class="option-label">{{ beatType.label }}</span>
                  </label>
                }
              </div>
            </div>
          </div>

          <div class="filter-dropdown custom-dropdown">
            <button class="filter-button" (click)="toggleMoodDropdown()">
              Moods
              <span class="material-icons dropdown-icon">keyboard_arrow_down</span>
            </button>
            <div class="dropdown-menu" [class.show]="showMoodDropdown">
              <div class="dropdown-search">
                <span class="material-icons search-icon">search</span>
                <input 
                  type="text" 
                  placeholder="Search moods..." 
                  class="dropdown-search-input"
                  [(ngModel)]="moodSearchTerm"
                />
              </div>
              <div class="dropdown-options">
                @for (mood of filteredMoods(); track mood.value) {
                  <label class="dropdown-option">
                    <input 
                      type="checkbox" 
                      [value]="mood.value"
                      [checked]="selectedMoods.includes(mood.value)"
                      (change)="onMoodChange($event, mood.value)"
                    />
                    <span class="checkbox-custom"></span>
                    <span class="option-label">{{ mood.label }}</span>
                  </label>
                }
              </div>
            </div>
          </div>

          <div class="filter-dropdown custom-dropdown">
            <button class="filter-button" (click)="toggleTempoDropdown()">
              Tempo
              <span class="material-icons dropdown-icon">keyboard_arrow_down</span>
            </button>
            <div class="dropdown-menu" [class.show]="showTempoDropdown">
              <div class="dropdown-search">
                <span class="material-icons search-icon">search</span>
                <input 
                  type="text" 
                  placeholder="Search tempo..." 
                  class="dropdown-search-input"
                  [(ngModel)]="tempoSearchTerm"
                />
              </div>
              <div class="dropdown-options">
                @for (tempo of filteredTempos(); track tempo.value) {
                  <label class="dropdown-option">
                    <input 
                      type="radio" 
                      name="tempo"
                      [value]="tempo.value"
                      [checked]="selectedTempo === tempo.value"
                      (change)="onTempoChange(tempo.value)"
                    />
                    <span class="radio-custom"></span>
                    <span class="option-label">{{ tempo.label }}</span>
                  </label>
                }
              </div>
            </div>
          </div>

          <div class="filter-dropdown custom-dropdown">
            <button class="filter-button" (click)="toggleGenreDropdown()">
              Genre
              <span class="material-icons dropdown-icon">keyboard_arrow_down</span>
            </button>
            <div class="dropdown-menu" [class.show]="showGenreDropdown">
              <div class="dropdown-search">
                <span class="material-icons search-icon">search</span>
                <input 
                  type="text" 
                  placeholder="Search genres..." 
                  class="dropdown-search-input"
                  [(ngModel)]="genreSearchTerm"
                />
              </div>
              <div class="dropdown-options">
                @for (genre of filteredGenres(); track genre.value) {
                  <label class="dropdown-option">
                    <input 
                      type="radio" 
                      name="genre"
                      [value]="genre.value"
                      [checked]="selectedGenre === genre.value"
                      (change)="onGenreChange(genre.value)"
                    />
                    <span class="radio-custom"></span>
                    <span class="option-label">{{ genre.label }}</span>
                  </label>
                }
              </div>
            </div>
          </div>

          <div class="filter-dropdown custom-dropdown">
            <button class="filter-button" (click)="toggleKeyDropdown()">
              Keys
              <span class="material-icons dropdown-icon">keyboard_arrow_down</span>
            </button>
            <div class="dropdown-menu" [class.show]="showKeyDropdown">
              <div class="dropdown-search">
                <span class="material-icons search-icon">search</span>
                <input 
                  type="text" 
                  placeholder="Search keys..." 
                  class="dropdown-search-input"
                  [(ngModel)]="keySearchTerm"
                />
              </div>
              <div class="dropdown-options">
                @for (key of filteredKeys(); track key.value) {
                  <label class="dropdown-option">
                    <input 
                      type="radio" 
                      name="key"
                      [value]="key.value"
                      [checked]="selectedKey === key.value"
                      (change)="onKeyChange(key.value)"
                    />
                    <span class="radio-custom"></span>
                    <span class="option-label">{{ key.label }}</span>
                  </label>
                }
              </div>
            </div>
          </div>

          <div class="filter-dropdown custom-dropdown">
            <button class="filter-button" (click)="toggleInstrumentDropdown()">
              Instruments
              <span class="material-icons dropdown-icon">keyboard_arrow_down</span>
            </button>
            <div class="dropdown-menu" [class.show]="showInstrumentDropdown">
              <div class="dropdown-search">
                <span class="material-icons search-icon">search</span>
                <input 
                  type="text" 
                  placeholder="Search instruments..." 
                  class="dropdown-search-input"
                  [(ngModel)]="instrumentSearchTerm"
                />
              </div>
              <div class="dropdown-options">
                @for (instrument of filteredInstruments(); track instrument.value) {
                  <label class="dropdown-option">
                    <input 
                      type="checkbox" 
                      [value]="instrument.value"
                      [checked]="selectedInstruments.includes(instrument.value)"
                      (change)="onInstrumentChange($event, instrument.value)"
                    />
                    <span class="checkbox-custom"></span>
                    <span class="option-label">{{ instrument.label }}</span>
                  </label>
                }
              </div>
            </div>
          </div>

          <div class="filter-dropdown custom-dropdown">
            <button class="filter-button" (click)="togglePriceDropdown()">
              Price
              <span class="material-icons dropdown-icon">keyboard_arrow_down</span>
            </button>
            <div class="dropdown-menu" [class.show]="showPriceDropdown">
              <div class="dropdown-search">
                <span class="material-icons search-icon">search</span>
                <input 
                  type="text" 
                  placeholder="Search price ranges..." 
                  class="dropdown-search-input"
                  [(ngModel)]="priceSearchTerm"
                />
              </div>
              <div class="dropdown-options">
                @for (price of filteredPrices(); track price.value) {
                  <label class="dropdown-option">
                    <input 
                      type="radio" 
                      name="price"
                      [value]="price.value"
                      [checked]="selectedPrice === price.value"
                      (change)="onPriceChange(price.value)"
                    />
                    <span class="radio-custom"></span>
                    <span class="option-label">{{ price.label }}</span>
                  </label>
                }
              </div>
            </div>
          </div>
        </div>

        <div class="filters-right">
          <div class="sort-section">
            <span class="sort-label">Sort by:</span>
            <div class="filter-dropdown custom-dropdown sort-dropdown">
              <button class="filter-button" (click)="toggleSortDropdown()">
                Sort
                <span class="material-icons dropdown-icon">keyboard_arrow_down</span>
              </button>
              <div class="dropdown-menu dropdown-menu-right" [class.show]="showSortDropdown">
                <div class="dropdown-search">
                  <span class="material-icons search-icon">search</span>
                  <input 
                    type="text" 
                    placeholder="Search sort options..." 
                    class="dropdown-search-input"
                    [(ngModel)]="sortSearchTerm"
                  />
                </div>
                <div class="dropdown-options">
                  @for (sort of filteredSorts(); track sort.value) {
                    <label class="dropdown-option">
                      <input 
                        type="radio" 
                        name="sort"
                        [value]="sort.value"
                        [checked]="selectedSort === sort.value"
                        (change)="onSortChange(sort.value)"
                      />
                      <span class="radio-custom"></span>
                      <span class="option-label">{{ sort.label }}</span>
                    </label>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .filter-bar {
      margin-bottom: 2rem;
    }

    .top-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .search-container {
      position: relative;
      max-width: 300px;
    }

    .search-icon {
      position: absolute;
      left: 0.75rem;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
      font-size: 1.1rem;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      background: #2a2a2a;
      border: 1px solid #444;
      border-radius: 8px;
      color: #fff;
      font-size: 0.9rem;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      outline: none;
      border-color: #7A5FFF;
    }

    .search-input::placeholder {
      color: #666;
    }

    .filters-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 2rem;
    }

    .filters-left {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .filters-label {
      color: #bbb;
      font-size: 0.8rem;
      white-space: nowrap;
    }

    .filter-dropdown {
      position: relative;
    }

    .filter-select {
      appearance: none;
      background: transparent;
      border: none;
      color: #bbb;
      font-size: 0.8rem;
      cursor: pointer;
      padding: 0.25rem 1rem 0.25rem 0;
      min-width: 80px;
      transition: all 0.2s;
    }

    .filter-select:focus {
      outline: none;
      color: #7A5FFF;
    }

    .filter-select:hover {
      color: #fff;
    }

    .filter-select option {
      background: #2a2a2a;
      color: #fff;
      border: none;
    }

    .dropdown-icon {
      position: absolute;
      right: -0.25rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.9rem;
      color: #666;
      pointer-events: none;
    }

    .filters-right {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .sort-section {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .sort-label {
      color: #bbb;
      font-size: 0.8rem;
      white-space: nowrap;
    }

    .view-toggle {
      display: flex;
      gap: 0;
      border: 1px solid #444;
      border-radius: 6px;
      overflow: hidden;
      background: #2a2a2a;
    }

    .toggle-btn {
      background: transparent;
      border: none;
      color: #666;
      padding: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-right: 1px solid #444;
    }

    .toggle-btn:last-child {
      border-right: none;
    }

    .toggle-btn:hover {
      color: #fff;
      background: #333;
    }

    .toggle-btn.active {
      background: #7A5FFF;
      color: #fff;
    }

    .toggle-btn .material-icons {
      font-size: 18px;
    }

    /* Custom Dropdown Styles */
    .custom-dropdown {
      position: relative;
    }

    .filter-button {
      appearance: none;
      background: transparent;
      border: none;
      color: #bbb;
      font-size: 0.8rem;
      cursor: pointer;
      padding: 0.25rem 1rem 0.25rem 0;
      min-width: 80px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .filter-button:hover {
      color: #fff;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background: #2a2a2a;
      border: 1px solid #444;
      border-radius: 8px;
      min-width: 280px;
      max-height: 300px;
      overflow: hidden;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .dropdown-menu.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-menu-right {
      left: auto;
      right: 0;
    }

    .sort-dropdown .dropdown-menu {
      min-width: 220px;
    }

    .dropdown-search {
      position: relative;
      padding: 1rem;
      border-bottom: 1px solid #444;
    }

    .dropdown-search .search-icon {
      position: absolute;
      right: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
      font-size: 1.1rem;
    }

    .dropdown-search-input {
      width: 100%;
      padding: 0.75rem;
      background: #333;
      border: 1px solid #555;
      border-radius: 6px;
      color: #fff;
      font-size: 0.9rem;
    }

    .dropdown-search-input:focus {
      outline: none;
      border-color: #7A5FFF;
    }

    .dropdown-search-input::placeholder {
      color: #666;
    }

    .dropdown-options {
      max-height: 200px;
      overflow-y: auto;
      padding: 0.5rem 0;
    }

    .dropdown-option {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }

    .dropdown-option:hover {
      background: #333;
    }

    .dropdown-option input[type="checkbox"] {
      display: none;
    }

    .checkbox-custom {
      width: 18px;
      height: 18px;
      border: 2px solid #666;
      border-radius: 3px;
      position: relative;
      transition: all 0.2s;
    }

    .dropdown-option input[type="checkbox"]:checked + .checkbox-custom {
      background: #7A5FFF;
      border-color: #7A5FFF;
    }

    .dropdown-option input[type="checkbox"]:checked + .checkbox-custom::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      font-weight: bold;
    }

    .dropdown-option input[type="radio"] {
      display: none;
    }

    .radio-custom {
      width: 18px;
      height: 18px;
      border: 2px solid #666;
      border-radius: 50%;
      position: relative;
      transition: all 0.2s;
    }

    .dropdown-option input[type="radio"]:checked + .radio-custom {
      background: #7A5FFF;
      border-color: #7A5FFF;
    }

    .dropdown-option input[type="radio"]:checked + .radio-custom::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
    }

    .option-label {
      color: #fff;
      font-size: 0.9rem;
    }

    @media (max-width: 1024px) {
      .filters-row {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
      
      .filters-right {
        width: 100%;
        justify-content: space-between;
      }
    }

    @media (max-width: 768px) {
      .filters-left {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }
      
      .filters-right {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }
    }
  `
})
export class FilterBarComponent {
  searchTerm = '';
  selectedBeatType = '';
  selectedGenre = '';
  selectedMood = '';
  selectedTempo = '';
  selectedKey = '';
  selectedInstruments: string[] = [];
  selectedPrice = '';
  selectedSort = 'for-you';
  
  // Beat Type dropdown properties
  showBeatTypeDropdown = false;
  beatTypeSearchTerm = '';
  
  beatTypes = [
    { value: '', label: 'All Beat Types' },
    { value: 'trap', label: 'Trap' },
    { value: 'drill', label: 'Drill' },
    { value: 'hip_hop', label: 'Hip Hop' },
    { value: 'rnb', label: 'R&B' },
    { value: 'pop', label: 'Pop' }
  ];
  
  // Tempo dropdown properties
  showTempoDropdown = false;
  tempoSearchTerm = '';
  
  tempos = [
    { value: '', label: 'All Tempos' },
    { value: 'slow', label: '60-90 BPM' },
    { value: 'medium', label: '90-120 BPM' },
    { value: 'fast', label: '120-150 BPM' },
    { value: 'very-fast', label: '150+ BPM' }
  ];
  
  // Genre dropdown properties
  showGenreDropdown = false;
  genreSearchTerm = '';
  
  genres = [
    { value: '', label: 'All Genres' },
    { value: 'hip_hop', label: 'Hip Hop' },
    { value: 'trap', label: 'Trap' },
    { value: 'drill', label: 'Drill' },
    { value: 'rnb', label: 'R&B' },
    { value: 'pop', label: 'Pop' }
  ];
  
  // Keys dropdown properties
  showKeyDropdown = false;
  keySearchTerm = '';
  
  keys = [
    { value: '', label: 'All Keys' },
    { value: 'C', label: 'C' },
    { value: 'C#', label: 'C#' },
    { value: 'D', label: 'D' },
    { value: 'D#', label: 'D#' },
    { value: 'E', label: 'E' },
    { value: 'F', label: 'F' },
    { value: 'F#', label: 'F#' },
    { value: 'G', label: 'G' },
    { value: 'G#', label: 'G#' },
    { value: 'A', label: 'A' },
    { value: 'A#', label: 'A#' },
    { value: 'B', label: 'B' }
  ];
  
  // Instruments dropdown properties
  showInstrumentDropdown = false;
  instrumentSearchTerm = '';
  
  instruments = [
    { value: 'piano', label: 'Piano' },
    { value: 'guitar', label: 'Guitar' },
    { value: 'drums', label: 'Drums' },
    { value: 'bass', label: 'Bass' },
    { value: 'synth', label: 'Synth' },
    { value: 'strings', label: 'Strings' },
    { value: 'brass', label: 'Brass' },
    { value: 'vocals', label: 'Vocals' }
  ];
  
  // Price dropdown properties
  showPriceDropdown = false;
  priceSearchTerm = '';
  
  prices = [
    { value: '', label: 'All Prices' },
    { value: 'under-500', label: 'Under ₹500' },
    { value: '500-1000', label: '₹500 - ₹1000' },
    { value: '1000-2000', label: '₹1000 - ₹2000' },
    { value: 'over-2000', label: 'Over ₹2000' }
  ];
  
  // Sort dropdown properties
  showSortDropdown = false;
  sortSearchTerm = '';
  
  sorts = [
    { value: 'for-you', label: 'For you' },
    { value: 'newest', label: 'Newest' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];
  
  // Mood dropdown properties
  showMoodDropdown = false;
  moodSearchTerm = '';
  selectedMoods: string[] = [];
  
  moods = [
    { value: 'aggressive', label: 'Aggressive' },
    { value: 'angry', label: 'Angry' },
    { value: 'bitter', label: 'Bitter' },
    { value: 'bouncy', label: 'Bouncy' },
    { value: 'bright', label: 'Bright' },
    { value: 'chill', label: 'Chill' },
    { value: 'dark', label: 'Dark' },
    { value: 'energetic', label: 'Energetic' },
    { value: 'happy', label: 'Happy' },
    { value: 'sad', label: 'Sad' }
  ];
  
  filteredBeatTypes = computed(() => {
    if (!this.beatTypeSearchTerm) return this.beatTypes;
    return this.beatTypes.filter(beatType => 
      beatType.label.toLowerCase().includes(this.beatTypeSearchTerm.toLowerCase())
    );
  });
  
  filteredTempos = computed(() => {
    if (!this.tempoSearchTerm) return this.tempos;
    return this.tempos.filter(tempo => 
      tempo.label.toLowerCase().includes(this.tempoSearchTerm.toLowerCase())
    );
  });
  
  filteredGenres = computed(() => {
    if (!this.genreSearchTerm) return this.genres;
    return this.genres.filter(genre => 
      genre.label.toLowerCase().includes(this.genreSearchTerm.toLowerCase())
    );
  });
  
  filteredKeys = computed(() => {
    if (!this.keySearchTerm) return this.keys;
    return this.keys.filter(key => 
      key.label.toLowerCase().includes(this.keySearchTerm.toLowerCase())
    );
  });
  
  filteredInstruments = computed(() => {
    if (!this.instrumentSearchTerm) return this.instruments;
    return this.instruments.filter(instrument => 
      instrument.label.toLowerCase().includes(this.instrumentSearchTerm.toLowerCase())
    );
  });
  
  filteredPrices = computed(() => {
    if (!this.priceSearchTerm) return this.prices;
    return this.prices.filter(price => 
      price.label.toLowerCase().includes(this.priceSearchTerm.toLowerCase())
    );
  });
  
  filteredSorts = computed(() => {
    if (!this.sortSearchTerm) return this.sorts;
    return this.sorts.filter(sort => 
      sort.label.toLowerCase().includes(this.sortSearchTerm.toLowerCase())
    );
  });
  
  filteredMoods = computed(() => {
    if (!this.moodSearchTerm) return this.moods;
    return this.moods.filter(mood => 
      mood.label.toLowerCase().includes(this.moodSearchTerm.toLowerCase())
    );
  });
  
  protected isGridView = signal(true);
  
  filtersChanged = output<FilterOptions>();
  viewToggled = output<boolean>();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    
    // Check if click is inside any dropdown
    const isInsideDropdown = target.closest('.custom-dropdown');
    const isDropdownButton = target.closest('.filter-button');
    const isDropdownContent = target.closest('.dropdown-menu');
    
    // If click is outside all dropdowns, close them all
    if (!isInsideDropdown) {
      this.closeAllDropdowns();
      return;
    }
    
    // If clicking on a dropdown button, close other dropdowns
    if (isDropdownButton && !isDropdownContent) {
      // Don't close the current dropdown here, let the toggle method handle it
      return;
    }
  }

  private closeAllDropdowns() {
    this.showBeatTypeDropdown = false;
    this.showTempoDropdown = false;
    this.showGenreDropdown = false;
    this.showKeyDropdown = false;
    this.showInstrumentDropdown = false;
    this.showPriceDropdown = false;
    this.showSortDropdown = false;
    this.showMoodDropdown = false;
  }

  onSearchChange() {
    this.emitFilters();
  }

  onFilterChange() {
    this.emitFilters();
  }

  toggleView(gridView: boolean) {
    this.isGridView.set(gridView);
    this.viewToggled.emit(gridView);
    this.emitFilters();
  }

  toggleBeatTypeDropdown() {
    const wasOpen = this.showBeatTypeDropdown;
    this.closeAllDropdowns();
    this.showBeatTypeDropdown = !wasOpen;
  }

  toggleTempoDropdown() {
    const wasOpen = this.showTempoDropdown;
    this.closeAllDropdowns();
    this.showTempoDropdown = !wasOpen;
  }

  toggleGenreDropdown() {
    const wasOpen = this.showGenreDropdown;
    this.closeAllDropdowns();
    this.showGenreDropdown = !wasOpen;
  }

  toggleKeyDropdown() {
    const wasOpen = this.showKeyDropdown;
    this.closeAllDropdowns();
    this.showKeyDropdown = !wasOpen;
  }

  toggleInstrumentDropdown() {
    const wasOpen = this.showInstrumentDropdown;
    this.closeAllDropdowns();
    this.showInstrumentDropdown = !wasOpen;
  }

  togglePriceDropdown() {
    const wasOpen = this.showPriceDropdown;
    this.closeAllDropdowns();
    this.showPriceDropdown = !wasOpen;
  }

  toggleSortDropdown() {
    const wasOpen = this.showSortDropdown;
    this.closeAllDropdowns();
    this.showSortDropdown = !wasOpen;
  }

  toggleMoodDropdown() {
    const wasOpen = this.showMoodDropdown;
    this.closeAllDropdowns();
    this.showMoodDropdown = !wasOpen;
  }

  onBeatTypeChange(beatTypeValue: string) {
    this.selectedBeatType = beatTypeValue;
    this.showBeatTypeDropdown = false;
    this.onFilterChange();
  }

  onTempoChange(tempoValue: string) {
    this.selectedTempo = tempoValue;
    this.showTempoDropdown = false;
    this.onFilterChange();
  }

  onGenreChange(genreValue: string) {
    this.selectedGenre = genreValue;
    this.showGenreDropdown = false;
    this.onFilterChange();
  }

  onKeyChange(keyValue: string) {
    this.selectedKey = keyValue;
    this.showKeyDropdown = false;
    this.onFilterChange();
  }

  onInstrumentChange(event: Event, instrumentValue: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedInstruments.push(instrumentValue);
    } else {
      this.selectedInstruments = this.selectedInstruments.filter(instrument => instrument !== instrumentValue);
    }
    this.onFilterChange();
  }

  onPriceChange(priceValue: string) {
    this.selectedPrice = priceValue;
    this.showPriceDropdown = false;
    this.onFilterChange();
  }

  onSortChange(sortValue: string) {
    this.selectedSort = sortValue;
    this.showSortDropdown = false;
    this.onFilterChange();
  }

  onMoodChange(event: Event, moodValue: string) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedMoods.push(moodValue);
    } else {
      this.selectedMoods = this.selectedMoods.filter(mood => mood !== moodValue);
    }
    this.onFilterChange();
  }

  private emitFilters() {
    this.filtersChanged.emit({
      searchTerm: this.searchTerm,
      genre: this.selectedGenre || this.selectedBeatType,
      mood: this.selectedMoods.join(','),
      tempo: this.selectedTempo,
      key: this.selectedKey,
      isGridView: this.isGridView()
    });
  }
}
