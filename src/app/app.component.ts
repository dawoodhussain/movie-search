import {  NavigationEnd, Router } from '@angular/router';
import { OmdbService } from './shared/services/app-omdb.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TmdbService } from './shared/services/tmdb.service';
import { MovieFullDetails } from './model/movie-details.model';
import { MovieDetailService } from './shared/services/movie-details.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  keyword = 'Title';
  mySubscription;

  data: any;
  errorMsg: string;
  isLoadingResult: boolean;
  imdbId: string;
  movieDetail: MovieFullDetails;

  constructor(
    private http: HttpClient,
    private router: Router,
    private omdbService: OmdbService,
    private tmdbService: TmdbService,
    private mdService: MovieDetailService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
    // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        }
      });
  }

  ngOnInit() {
  }

  getServerResponse(event) {
    this.isLoadingResult = true;

    this.omdbService.getMovies(event, '1').subscribe((data) => {
      if (data == undefined) {
        this.data = [];
        this.errorMsg = data['Error'];
      } else {
        this.data = data;
      }
      this.isLoadingResult = false;
    });
  }


  searchCleared() {
    console.log('searchCleared');
    this.data = [];
  }

  selectEvent(item) {
   this.getimdbIdFromString(item);
   console.log(this.imdbId);
   this.fetchSelectedMovieData(this.imdbId);
  }

  getimdbIdFromString(item: string) {
    let mItem = JSON.stringify(item, this.replacer).split(',');
   //console.log(mItem);
    for(const k of mItem) {
      if(k.split(':')[0].replace(/"/g, '') == 'imdbID') {
        this.imdbId = k.split(':')[1].replace(/"/g, '');
      }
    }
  }

  fetchSelectedMovieData(imdbId: string) {
    this.tmdbService.gettmdbMovieId(imdbId).subscribe(respdata => {
      this.tmdbService.getTmdbMoviebyId(respdata)
        .subscribe(respData => {
          this.getMoviebyId(respData['imdb_id'], respData['id'], respData['tagline'], respData['overview']);
       })
    })
  }

  getMoviebyId(id: string, movieId: string, tagline: string, overview:string) {
    this.omdbService.getMovieById(id).subscribe((respData) => {
      let newRespData: MovieFullDetails = new MovieFullDetails(respData, movieId, tagline, overview);
      console.log(newRespData);

      this.movieDetail = newRespData;
      this.mdService.setMovieDetails(this.movieDetail);

      this.router.navigate(['movietrailer', this.movieDetail.details.imdbID]);
    });
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }

  replacer(key, value) {
    return value;
  }

  ngOnDestroy() {
    console.log('app ngOnDestroy')
    if (this.mySubscription) {
     this.mySubscription.unsubscribe();
    }
  }
}
