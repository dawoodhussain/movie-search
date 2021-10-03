import { MovieDetail } from './../model/movie-detail.model';
import { YoutubeApiService } from '../shared/services/youtube-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { MovieFullDetails } from '../model/movie-details.model';
import { MovieDetailService } from '../shared/services/movie-details.service';
import { TmdbService } from '../shared/services/tmdb.service';

interface trailerDetails {
  videoId: string;
  title: string;
}

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {
  movieName: MovieFullDetails;
  celebs: any[] = [];
  movieId: string;
  routeState: any;
  movieTrailer: trailerDetails = {
    videoId: "",
    title: ""
  };

  error: string = '';
  isLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private youtubeService: YoutubeApiService,
    private tmdbService: TmdbService,
    private mdService: MovieDetailService,
    private router: Router) {
      // if(this.router.getCurrentNavigation().extras.state) {
      //   this.routeState = this.router.getCurrentNavigation().extras.state;
      //   if(this.routeState) {
      //     console.log("Trailer Component Invoked!!");
      //     //console.log(this.routeState.movieDetails);
      //     this.movieName = JSON.parse(this.routeState.movieDetails);
      //     console.log(this.movieName);

      //   }
      // }
     }

  ngOnInit(): void {
    this.route.params
      .subscribe((
          params: Params) => {
          this.movieId = params['movieId'];
        });

        this.isLoading = true;

        this.movieName = this.mdService.getMovieDetails();

        if(!this.movieName) {
          console.log("movie details is empty. trying to fetch from local storage");
          this.movieName = JSON.parse(sessionStorage.getItem('movieData'));
        }

        for(const name of this.movieName.details.Actors.split(',')) {
          this.LoadCelebDetails(name.trim());
        }

        for(const name of this.movieName.details.Director.split(',')) {
          this.LoadCelebDetails(name.trim());
        }

        console.log(this.celebs);


    // this.youtubeService.getMovieTrailer(this.movieName)
    //  .pipe(map(respData => {
    //    for(const key in respData) {
    //     this.movieTrailer.videoId = respData[key].id.videoId;
    //     this.movieTrailer.title = respData[key].snippet.title;
    //    }
    //  })
    //  )
    //  .subscribe(
    //    resp => {},
    //    err => {
    //     if(err.error.error.errors[0].reason == "quotaExceeded") {
    //       this.error = "Youtube Data API quota exceeded for today.. :("
    //     }
    //    }
    //  );

    this.isLoading = false;
  }

  onVideoBtnClick() {
    this.router.navigate(['/videogallery', this.movieName.tmdb_id]);
  }

  onPhotoBtnClick() {
    this.router.navigate(['/photogallery', this.movieName.tmdb_id]);
  }

  LoadCelebDetails(name: string) {
    this.tmdbService.searchCelebrity(name)
    .pipe(map(respData => {
      return respData['results'];
    }))
    .subscribe(respData => {
      //console.log(respData['0']['id']);

      this.tmdbService.getCelebrityById(respData['0']['id'])
      .subscribe(res => {
        this.celebs.push(res);
      })
    })
  }
}
