import { MovieDetail } from '../../model/movie-detail.model';
import { Movie } from '../../model/movie.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";

export interface moviesArray {
  Search: Movie[];
}


@Injectable({ providedIn: 'root' })
export class OmdbService {
  private API_KEY: string = 'd9835cc5';

  constructor(private http: HttpClient) {}

  getMovies(searchTerm: string, page: string) {
    return this.http.get<moviesArray>('http://www.omdbapi.com/?', {
      params: new HttpParams().set('apikey', this.API_KEY).set('s', searchTerm).set('page', page)
    })
    .pipe(map(responseData  => {
      return responseData.Search.map(movie => {
        return movie;
      })
    }))
    ;
  }

  getMovieById(id: string) {
    return this.http.get<MovieDetail>('http://www.omdbapi.com/?', {
      params: new HttpParams().set('apikey', this.API_KEY).set('i', id)
    });
  }
}
