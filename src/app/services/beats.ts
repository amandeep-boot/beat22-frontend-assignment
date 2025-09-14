import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Beat } from '../models/beat.interface';

@Injectable({
  providedIn: 'root'
})
export class Beats {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = this.getApiUrl();

  private getApiUrl(): string {
    // Use direct API in development, proxy in production
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      return 'https://api-server.illpeoplemusic.com/api/v2/playlist/trending';
    }
    return '/api/beats';
  }

  getTrendingBeats(): Observable<Beat[]> {
    console.log('Fetching beats from proxy:', this.apiUrl);
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => {
        console.log('Proxy response received:', res);
        // Extract beats from the first playlist
        const beats = res?.playlists?.[0]?.beats || [];
        console.log('Extracted beats count:', beats.length);
        return beats;
      }),
      catchError((error) => {
        console.error('Error fetching trending beats:', error);
        return of([]);
      })
    );
  }
}
