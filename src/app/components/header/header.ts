import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule],

  template: `
    <header class="header ">
      <div class="top-row">
        <div class="top-row-left">
          <div class="logo">
            <img
              src="https://beat22.com/assets/imgs/beat22-logo/main-logo-beat22.svg"
              alt="Beat22"
              class="logo-img"
            />
          </div>
          <div class="search-container">
            <input
              type="text"
              placeholder="Search top beats"
              class="search-input"
              [(ngModel)]="searchTerm"
            />
            <div class="search-dropdown custom-dropdown">
              <button class="filter-button" (click)="toggleSearchDropdown()">
                {{ getCurrentCategoryLabel() }}
                <span class="material-icons dropdown-icon">keyboard_arrow_down</span>
              </button>
              <div class="dropdown-menu" [class.show]="showSearchDropdown">
                <div class="dropdown-options">
                  <div
                    class="dropdown-option"
                    [class.selected]="selectedCategory === 'general'"
                    (click)="selectCategory('general')"
                  >
                    General
                  </div>
                  <div
                    class="dropdown-option"
                    [class.selected]="selectedCategory === 'beats'"
                    (click)="selectCategory('beats')"
                  >
                    Beat
                  </div>
                  <div
                    class="dropdown-option"
                    [class.selected]="selectedCategory === 'producers'"
                    (click)="selectCategory('producers')"
                  >
                    Producers
                  </div>
                  <div
                    class="dropdown-option"
                    [class.selected]="selectedCategory === 'tags'"
                    (click)="selectCategory('tags')"
                  >
                    Tag
                  </div>
                  <div
                    class="dropdown-option"
                    [class.selected]="selectedCategory === 'moods'"
                    (click)="selectCategory('moods')"
                  >
                    Mood
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="auth">
          <button class="btn-secondary">Sign In</button>
          <button class="btn-primary">Start Selling</button>
        </div>
      </div>

      <div class="bottom-row">
        <div class="beats-section">
          <div class="separator-top"></div>
          <div class="nav-dropdown">
            <button class="beats-nav-btn">BEATS</button>
            <div class="dropdown-menu beats-dropdown">
              <div class="dropdown-content beats-grid">
                <a href="#" class="dropdown-item">
                  <span class="material-icons">music_note</span>
                  All Beats
                </a>
                <a href="#" class="dropdown-item">
                  <span class="material-icons">new_releases</span>
                  New Finds
                </a>
                <a href="#" class="dropdown-item trending">
                  <span class="material-icons">trending_up</span>
                  Trending Beats
                </a>
                <a href="#" class="dropdown-item">
                  <span class="material-icons">playlist_play</span>
                  All Playlists
                </a>
                <a href="#" class="dropdown-item">
                  <span class="material-icons">audiotrack</span>
                  Beat
                </a>
                <a href="#" class="dropdown-item">
                  <span class="material-icons">person</span>
                  For Hip-Hop Artists
                </a>
                <a href="#" class="dropdown-item">
                  <span class="material-icons">playlist_play</span>
                  Beats With Hook
                </a>
                <a href="#" class="dropdown-item">
                  <span class="material-icons">person</span>
                  For Pop Artists
                </a>
                <a href="#" class="dropdown-item">
                  <span class="material-icons">shuffle</span>
                  Switch Beats
                </a>
                <a href="#" class="dropdown-item">
                  <span class="material-icons">person</span>
                  For RnB Artists
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="separator-bottom"></div>
    </header>
  `,
  styles: `
    .header {
      background: #1e1e1e;
      border-bottom: 1px solid #333;
      position: relative;
      z-index: 1000;
    }

    .top-row {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width : 95vw ; 
    }
    .top-row-left{
      display :flex ;
      gap : 4rem   ;
    }
    
    .bottom-row {
      width : 95vw ; 
      display: flex;
      justify-content: flex-start;
      padding: 0 2rem 1rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .logo {
      display: flex;
      align-items: center;
    }

    .logo-img {
      height: 32px;
      width: auto;
    }

    .beats-section {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: left; 
      gap: 0.5rem;
      width : 95vw;  
    }

    .beats-section .nav-dropdown {
      position: relative;
    }

    .separator-top,
    .separator-bottom {
      width: 95vw;
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 20%, rgba(255, 255, 255, 0.6) 50%, rgba(255, 255, 255, 0.3) 80%, transparent 100%);
    }

    .nav-dropdown {
      position: static;
    }

    .beats-nav-btn {
      background: transparent;
      border: none;
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 1px;
      cursor: pointer;
      padding: 0.25rem 0;
      transition: color 0.2s;
      white-space: nowrap;
    }

    .beats-nav-btn:hover {
      color: #7A5FFF;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 0;
      background: #1e1e1e;
      border: none;
      border-radius: 0;
      min-width: 280px;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      box-shadow: none;
      margin-top: 0;
    }

    .beats-dropdown {
      background: #1e1e1e;
      border: none;
      border-radius: 0;
      width: 100vw;
      // left: -2.5vw;
    }

    .nav-dropdown:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .dropdown-header {
      padding: 1rem 0 0.5rem;
      border-bottom: 1px solid #333;
      max-width: 1400px;
      margin: 0 auto;
      width: 95vw;
    }

    .dropdown-header h3 {
      color: #fff;
      font-size: 0.85rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: 1px;
      padding-left: 2rem;
    }

    .dropdown-content {
      padding: 1rem 0;
      max-width: 1400px;
      margin: 0 auto;
      width: 100vw;
    }

    .beats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      padding: 0 2rem;
    }

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.6rem 1rem;
      color: #fff;
      text-decoration: none;
      transition: background 0.15s ease;
      font-size: 0.8rem;
      border-radius: 4px;
      margin: 0.1rem;
    }

    // .dropdown-item:hover {
    //   background: #3a3a3a;
    // }

    .dropdown-item.active {
      background: #3a3a3a;
    }

    // .dropdown-item.trending {
    //   background: #3a3a3a;
    // }

    .dropdown-item .material-icons {
      font-size: 16px;
      color: #f44336;
    }

    .center-section {

      flex: 1;
      max-width: 500px;
      margin: 0 2rem;
    }

    .search-container {
      position: relative;
      display: flex;
      background: #2a2a2a;
      border: 1px solid #444;
      border-radius: 8px;
      overflow: hidden;
      transition: border-color 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .search-container:hover {
      border-color: #555;
    }

    .search-container:focus-within {
      border-color: #555;
    }

    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      color: #fff;
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      outline: none;
      color: #fff;
    }

    .search-input::placeholder {
      color: #888;
      transition: color 0.2s ease;
    }

    .search-input:focus::placeholder {
      color: #aaa;
    }

    .search-dropdown {
      position: relative;
      display: flex;
      margin: 2px;
      align-items: center;
      background: #333;
      border-radius: 0 6px 6px 0;
    }

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
      padding: 0.75rem 2rem 0.75rem 1rem;
      min-width: 80px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .filter-button:hover {
      color: #fff;
    }

    .dropdown-icon {
      color: #666;
      font-size: 0.9rem;
      pointer-events: none;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: #2a2a2a;
      border: 1px solid #444;
      border-radius: 8px;
      min-width: 180px;
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

    .dropdown-options {
      padding: 0.5rem 0;
    }

    .dropdown-option {
      padding: 0.75rem 1rem;
      color: #fff;
      cursor: pointer;
      transition: background 0.2s;
      font-size: 0.9rem;
    }

    .dropdown-option:hover {
      background: #333;
    }

    .dropdown-option.selected {
      background: #333;
      font-weight: 500;
    }

    .auth {
      display: flex;
      gap: 1rem;
    }

    .btn-secondary {
      background: transparent;
      color: #fff;
      border: none ;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.9rem;
    }

    .btn-secondary:hover {
      border-color: #7A5FFF;
      color: #7A5FFF;
    }

    .btn-primary {
      background:#7000FF;
      color: #fff;
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s;
      font-size: 0.9rem;
      font-weight: 600;
    }

    .btn-primary:hover {
      background: #6B4FE8;
    }

    @media (max-width: 1024px) {
      .center-section {
        max-width: 300px;
        margin: 0 1rem;
      }
    }

    @media (max-width: 768px) {
      .top-row {
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
      }
      
      .top-row-left {
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      }
      
      .search-container {
        width: 100%;
        max-width: 400px;
      }
      
      .search-dropdown {
        min-width: 80px;
      }
      
      .search-category {
        padding: 0.75rem 2rem 0.75rem 0.75rem;
        font-size: 0.85rem;
      }
      
      .dropdown-arrow {
        right: 0.5rem;
        font-size: 14px;
      }
      
      .bottom-row {
        padding: 0 1rem 1rem;
        justify-content: center;
      }
      
      .center-section {
        width: 100%;
        max-width: none;
        margin: 0;
      }
      
      .auth {
        width: 100%;
        justify-content: center;
      }
      
      .dropdown-menu {
        left: 50%;
        transform: translateX(-50%) translateY(-10px);
      }
      
      .nav-dropdown:hover .dropdown-menu {
        transform: translateX(-50%) translateY(0);
      }
      

      
      .logo-img {
        height: 28px;
      }
    }
  `,
})
export class HeaderComponent {
  searchTerm = '';
  selectedCategory = 'general';
  showSearchDropdown = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;

    // Check if click is inside any dropdown
    const isInsideDropdown = target.closest('.custom-dropdown');
    const isDropdownButton = target.closest('.filter-button');
    const isDropdownContent = target.closest('.dropdown-menu');

    // If click is outside all dropdowns, close them all
    if (!isInsideDropdown) {
      this.showSearchDropdown = false;
      return;
    }

    // If clicking on a dropdown button, close other dropdowns
    if (isDropdownButton && !isDropdownContent) {
      // Don't close the current dropdown here, let the toggle method handle it
      return;
    }
  }

  toggleSearchDropdown() {
    const wasOpen = this.showSearchDropdown;
    this.showSearchDropdown = !wasOpen;
  }

  selectCategory(value: string) {
    this.selectedCategory = value;
    this.showSearchDropdown = false;
  }

  getCurrentCategoryLabel(): string {
    const labels: { [key: string]: string } = {
      general: 'General',
      beats: 'Beat',
      producers: 'Producers',
      tags: 'Tag',
      moods: 'Mood',
    };
    return labels[this.selectedCategory] || 'General';
  }
}
