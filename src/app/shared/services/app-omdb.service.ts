import { MovieDetail } from '../../model/movie-detail.model';
import { Movie } from '../../model/movie.model';
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Apikeys } from "../apiconfig";

export interface moviesArray {
  Search: Movie[];
}


@Injectable({ providedIn: 'root' })
export class OmdbService {
  private API_KEY: string = Apikeys.OMDB_API_KEY;


  constructor(private http: HttpClient) {}

  getMovies(searchTerm: string, page: string) {
    return this.http.get<moviesArray>('https://www.omdbapi.com/?', {
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
    return this.http.get<MovieDetail>('https://www.omdbapi.com/?', {
      params: new HttpParams().set('apikey', this.API_KEY).set('i', id)
    });
  }
}
