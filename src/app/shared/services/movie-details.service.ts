import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MovieFullDetails } from "src/app/model/movie-details.model";

@Injectable({providedIn: 'root'})
export class MovieDetailService {
  private movieDetail: MovieFullDetails;

  movieChanged = new BehaviorSubject<MovieFullDetails>(null);

  constructor() {

  }

  setMovieDetails(value: MovieFullDetails) {
    this.movieDetail = value;
    this.movieChanged.next(value);
    sessionStorage.setItem('movieData', JSON.stringify(this.movieDetail));
  }

  getMovieDetails(): MovieFullDetails {
    return this.movieDetail;
  }
 }
