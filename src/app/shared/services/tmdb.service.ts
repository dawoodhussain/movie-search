import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Apikeys } from "../apiconfig";

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private API_KEY: string = Apikeys.TMDB_API_KEY;
  upComingMovieIdList: any[];

  constructor(private http: HttpClient) {}

  getNowPlayingMoviesList() {
    return this.http
      .get('https://api.themoviedb.org/3/movie/now_playing?', {
        params: new HttpParams()
          .set('api_key', this.API_KEY)
          .set('language', 'en-US')
          .set('page', '1')
      })
      .pipe(
        map((respData) => {
          return respData['results'];
        })
      );
  }

  getTopRatedMoviesList() {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated?', {
      params: new HttpParams()
          .set('api_key', this.API_KEY)
          .set('language', 'en-US')
          .set('page', '2')
    })
    .pipe(
      map((respData) => {
        return respData['results'];
      })
    );
  }

  getPopularMoviesList() {
    return this.http.get('https://api.themoviedb.org/3/movie/popular?', {
      params: new HttpParams()
          .set('api_key', this.API_KEY)
          .set('language', 'en-US')
          .set('page', '1')
    })
    .pipe(
      map((respData) => {
        return respData['results'];
      })
    );
  }

  // getSimilarMovies(id: string) {
  //   return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/similar?', {
  //     params: new HttpParams()
  //         .set('api_key', this.API_KEY)
  //         .set('language', 'en-US')
  //         .set('page', '1')
  //   })
  //   .pipe(
  //     map((respData) => {
  //       return respData['results'];
  //     })
  //   );
  // }

  getMovieImages(id: string) {
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/images?', {
      params: new HttpParams()
          .set('api_key', this.API_KEY)
          .set('language', 'en-US')
          .set('include_image_language', 'en,null')
    })
    .pipe(
      map((respData) => {
        return respData['posters'];
      })
    );
  }

  getMovieVideoClips(id: string) {
    return this.http.get('https://api.themoviedb.org/3/movie/'+id+'/videos?', {
      params: new HttpParams()
          .set('api_key', this.API_KEY)
          .set('language', 'en-US')
    })
    .pipe(
      map((respData) => {
        return respData['results'];
      })
    );
  }

  gettmdbMovieId(imdb_id: string) {
    return this.http.get('https://api.themoviedb.org/3/find/' + imdb_id + '?', {
      params: new HttpParams()
        .set('api_key', this.API_KEY)
        .set('language', 'en-US')
        .set('external_source', 'imdb_id'),
    })
    .pipe(map(respdata => {
      console.log(respdata['movie_results'][0]['id']);

      return respdata['movie_results'][0]['id'];
    }));
  }

  getTmdbMoviebyId(id: string) {
    return this.http.get('https://api.themoviedb.org/3/movie/' + id + '?', {
      params: new HttpParams()
        .set('api_key', this.API_KEY)
        .set('language', 'en-US'),
    });
  }

  searchCelebrity(searchTerm: string) {
    return this.http.get('https://api.themoviedb.org/3/search/person?', {
      params: new HttpParams()
        .set('api_key', this.API_KEY)
        .set('language', 'en-US')
        .set('query', searchTerm)
    });
  }

  getCelebrityById(id: string) {
    return this.http.get('https://api.themoviedb.org/3/person/' + id + '?', {
      params: new HttpParams()
        .set('api_key', this.API_KEY)
        .set('language', 'en-US'),
    });
  }

  searchMovie(searchTerm: string) {
    return this.http.get('https://api.themoviedb.org/3/search/movie?', {
      params: new HttpParams()
        .set('api_key', this.API_KEY)
        .set('language', 'en-US')
        .set('query', searchTerm)
    })
    .pipe(map(respData => {
      return respData['results'];
    }));
  }
}
