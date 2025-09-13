import { Component, input, signal, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Beat } from '../../models/beat.interface';

@Component({
  selector: 'app-beat-card',
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isGridView()) {
    <!-- Grid View -->
    <div class="beat-card grid-card">
      <div class="cover-container">
        <img [src]="beat().cover_picture" [alt]="beat().title" class="cover-image" />
        <button class="play-btn" (click)="togglePlay()">
          @if (isPlaying()) {
          <span class="material-icons">pause</span>
          } @else {
          <span class="material-icons">play_arrow</span>
          }
        </button>
      </div>

      <div class="beat-info-row">
        <div class="tempo-indicator">
          <span class="tempo-bars">||||</span>
          <span class="tempo-text">{{ beat().tempo }} B...</span>
        </div>
        <button class="price-btn">
          <span class="material-icons">shopping_cart</span>
          ₹{{
            beat().prices && beat().prices.length > 0
              ? (beat().prices[0].final_price | number : '1.0-0')
              : '1,349'
          }}
        </button>
      </div>

      <div class="card-footer">
        <div class="beat-info">
          <h3 class="beat-title">{{ beat().title }}</h3>
          <p class="producer-name">
            {{ beat().producer.store.general.name || 'RABBIT RB BEATS' }}
            @if (beat().producer.is_verfied) {
            <span class="verified-icon material-icons">verified</span>
            }
          </p>
        </div>
        <button class="more-btn">
          <span class="material-icons">more_vert</span>
        </button>
      </div>
    </div>
    } @else {
    <!-- List View -->
    <div class="beat-card list-card">
      <button class="play-btn-list" (click)="togglePlay()">
        @if (isPlaying()) {
        <span class="material-icons">pause</span>
        } @else {
        <span class="material-icons">play_arrow</span>
        }
      </button>

      <div class="beat-cover">
        <img [src]="beat().cover_picture" [alt]="beat().title" class="cover-image-list" />
      </div>

      <div class="beat-details-list">
        <h3 class="beat-title-list">{{ beat().title }}</h3>
        <p class="producer-name-list">
          {{ beat().producer.store.general.name || 'Unknown Producer' }}
        </p>
      </div>

      <div class="beat-specs">
        <span class="spec">{{ beat().tempo }} BPM</span>
        <span class="spec">{{ beat().key }}</span>
      </div>

      <div class="beat-tags">
        @if (beat().tag && beat().tag.length > 0) { @for (tag of beat().tag.slice(0, 3); track tag)
        {
        <span class="tag">{{ tag }}</span>
        } }
      </div>

      <div class="beat-actions">
        <button class="price-btn-list">
          <span class="material-icons">shopping_cart</span>
          @if (beat().prices && beat().prices.length > 0) { ₹{{ beat().prices[0].final_price }}
          } @else { Contact }
        </button>
        <button class="more-btn">
          <span class="material-icons">more_vert</span>
        </button>
      </div>
    </div>
    }

    <audio #audioPlayer [src]="beat().preview" (ended)="onAudioEnded()"></audio>
  `,
  styles: `
    /* Grid Card Styles */
    .grid-card {
      background: transparent;
      border-radius: 12px;
      transition: all 0.3s ease;
      width: 100%;
      padding: 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      // border: 1px solid rgba(255, 255, 255, 0.1);
    }

    // .grid-card:hover {
    //   transform: translateY(-4px);
    // }

    .grid-card:hover .cover-container {
      box-shadow: 0 0 20px #2b2b2b, 0 0 40px #2b2b2b, 0 0 60px #2b2b2b;
    }

    .cover-container {
      position: relative;
      width: 200px;
      height: 200px;
      overflow: hidden;
      border-radius: 12px;
      background: #1a1a1a;
      flex-shrink: 0;
      box-shadow: 0 0 15px #2b2b2b, 0 0 30px #2b2b2b, 0 0 45px #2b2b2b;
    }

    .cover-image {
      width: 200px;
      height: 200px;
      object-fit: cover;
      object-position: center;
      transition: transform 0.3s ease;
      display: block;
    }

    // .grid-card:hover .cover-image {
    //   transform: scale(1.05);
    // }

    .play-btn {
      position: absolute;
      bottom: 12px;
      left: 12px;
      background: rgba(255, 255, 255, 0.9);
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #333;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .play-btn:hover {
      background: #7000FF;
      color: white;
      transform: scale(1.1);
    }

    .play-btn .material-icons {
      font-size: 18px;
      margin-left: 1px;
    }

    .beat-info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 12px 0 8px 0;
      width: 200px;
    }

    .tempo-indicator {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .tempo-bars {
      color: #7A5FFF;
      font-size: 0.8rem;
      font-weight: bold;
      letter-spacing: 1px;
    }

    .tempo-text {
      color: #fff;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .price-btn {
      background: #7A5FFF;
      color: white;
      border: 1px solid rgba(122, 95, 255, 0.3);
      padding: 0.35rem 0.6rem;
      border-radius: 6px;
      font-size: 0.7rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .price-btn:hover {
      background: #6B4FE8;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(122, 95, 255, 0.3);
    }

    .price-btn .material-icons {
      font-size: 12px;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 0;
      min-height: 50px;
      width: 200px;
    }

    .beat-info {
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    .beat-title {
      color: #fff;
      font-size: 1rem;
      font-weight: 700;
      margin: 0 0 0.25rem 0;
      line-height: 1.2;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .producer-name {
      color: #bbb;
      font-size: 0.75rem;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.2rem;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 100%;
    }

    .verified-icon {
      color: #1DA1F2;
      font-size: 12px;
    }

    .more-btn {
      background: transparent;
      border: none;
      color: #666;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: color 0.2s;
      margin-top: -0.25rem;
    }

    .more-btn:hover {
      color: #bbb;
    }

    .more-btn .material-icons {
      font-size: 16px;
    }

    /* List Card Styles */
    .list-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #1a1a1a;
      border-radius: 8px;
      transition: background 0.2s;
    }

    .list-card:hover {
      background: #222;
    }

    .play-btn-list {
      background: transparent;
      border: none;
      color: #bbb;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .play-btn-list:hover {
      color: #7A5FFF;
      background: rgba(122, 95, 255, 0.1);
    }

    .beat-cover {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .cover-image-list {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .beat-details-list {
      flex: 1;
      min-width: 0;
    }

    .beat-title-list {
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.25rem 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .producer-name-list {
      color: #bbb;
      font-size: 0.85rem;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .beat-specs {
      display: flex;
      gap: 1rem;
      flex-shrink: 0;
    }

    .spec {
      color: #bbb;
      font-size: 0.85rem;
    }

    .beat-tags {
      display: flex;
      gap: 0.5rem;
      flex-shrink: 0;
      min-width: 150px;
    }

    .tag {
      background: rgba(122, 95, 255, 0.2);
      color: #7A5FFF;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      white-space: nowrap;
    }

    .beat-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }

    .price-btn-list {
      background: #7A5FFF;
      color: #fff;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      transition: background 0.2s;
    }

    .price-btn-list:hover {
      background: #6B4FE8;
    }

    .price-btn-list .material-icons {
      font-size: 14px;
    }

    .more-btn {
      background: transparent;
      border: none;
      color: #666;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: color 0.2s;
    }

    .more-btn:hover {
      color: #bbb;
    }

    @media (max-width: 768px) {
      .list-card {
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      
      .beat-specs,
      .beat-tags {
        min-width: auto;
      }
      
      .beat-actions {
        width: 100%;
        justify-content: space-between;
      }
    }
  `,
})
export class BeatCardComponent {
  beat = input.required<Beat>();
  isGridView = input<boolean>(true);

  protected isPlaying = signal(false);

  togglePlay() {
    const audio = document.querySelector('audio') as HTMLAudioElement;
    if (!audio) return;

    if (this.isPlaying()) {
      audio.pause();
      this.isPlaying.set(false);
    } else {
      audio.play();
      this.isPlaying.set(true);
    }
  }

  onAudioEnded() {
    this.isPlaying.set(false);
  }
}
