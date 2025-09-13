import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Beat } from '../models/beat.interface';

@Injectable({
  providedIn: 'root'
})
export class Beats {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api-server.illpeoplemusic.com/api/v2/playlist/trending';

  getTrendingBeats(): Observable<Beat[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((res) => {
        // Extract beats from the first playlist
        return res?.playlists?.[0]?.beats || [];
      }),
      catchError((error) => {
        console.error('Error fetching trending beats:', error);
        return of([]);
      })
    );
  }
}
