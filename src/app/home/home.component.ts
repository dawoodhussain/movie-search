import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { OmdbService } from '../shared/services/app-omdb.service';
import { MovieDetail } from '../model/movie-detail.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { TmdbService } from '../shared/services/tmdb.service';
import { MovieDetailService } from '../shared/services/movie-details.service';
import { MovieFullDetails } from '../model/movie-details.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('galleryOne') galleryOne: SlickCarouselComponent;

  // movieDetail: MovieDetail[] = [];
  movieDetail: MovieFullDetails[] = [];
  topRatedmovieDetail: MovieFullDetails[] = [];
  popularmovieDetail: MovieFullDetails[] = [];
  sortedmovieDetail: MovieDetail[] = [];
  movieSelected: MovieFullDetails;
  //upComingMoviesImdbId: any[];
  wlMovies: any = [];

  isLoading: boolean;

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 5,
    dots: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  constructor(
    private omdbService: OmdbService,
    private tmdbService: TmdbService,
    private mdService: MovieDetailService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // this.omdbService
    //   .getMovies('war', '1')
    //   .pipe(
    //     map((respData) => {
    //       for (let movie of respData) {
    //         //this.getMoviebyId(movie.imdbID);
    //       }
    //     })
    //   )
    //   .subscribe();

    // this.omdbService
    //   .getMovies('war', '2')
    //   .pipe(
    //     map((respData) => {
    //       for (let movie of respData) {
    //         //console.log(movie);

    //         //this.getMoviebyId(movie.imdbID);
    //       }
    //     })
    //   )
    //   .subscribe();

    //this.sortMoviesbyImdbRating();

    this.InitiateDataRequest();

  }

  InitiateDataRequest() {
    this.isLoading = true;

    this.tmdbService.getNowPlayingMoviesList()
    .subscribe(respData => {
      for(const key in respData) {
        this.tmdbService.getTmdbMoviebyId(respData[key]['id'])
        .subscribe(respData => {
          this.getMoviebyId(respData['imdb_id'], respData['id'], respData['tagline'], respData['overview'], 'now-playing');
       })
      }
    });

    this.tmdbService.getTopRatedMoviesList()
    .subscribe(respData => {
      for(const key in respData) {
        this.tmdbService.getTmdbMoviebyId(respData[key]['id'])
        .subscribe(respData => {
          this.getMoviebyId(respData['imdb_id'], respData['id'], respData['tagline'], respData['overview'], 'top-rated');
       })
      }
    });

    this.tmdbService.getPopularMoviesList()
    .subscribe(respData => {
      for(const key in respData) {
        this.tmdbService.getTmdbMoviebyId(respData[key]['id'])
        .subscribe(respData => {
          this.getMoviebyId(respData['imdb_id'], respData['id'], respData['tagline'], respData['overview'], 'popular');
       })
      }
      this.isLoading = false;
    });
  }

  slickInit(e) {
    console.log('slick initialized');
    //this.galleryOne.initSlick();
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  getMoviebyId(id: string, movieId: string, tagline: string, overview:string, searchType: string) {
    this.omdbService.getMovieById(id).subscribe((respData) => {
      let newRespData: MovieFullDetails = new MovieFullDetails(respData, movieId, tagline, overview);
      if(searchType == 'now-playing') {
        this.movieDetail.push(newRespData);
      } else if(searchType == 'top-rated') {
        this.topRatedmovieDetail.push(newRespData);
      } else if(searchType == 'popular') {
        this.popularmovieDetail.push(newRespData);
      }
    });
  }

  // sortMoviesbyImdbRating() {
  //   // console.log(this.movieDetail);
  //   this.movieDetail.sort((a, b) => {
  //     const imdb1 = +a.imdbRating;
  //     const imdb2 = +b.imdbRating;

  //     if (imdb1 > imdb2) {
  //       return 1;
  //     }
  //     if (imdb1 < imdb2) {
  //       return -1;
  //     }
  //     return 0;
  //   });
  //   // console.log(this.movieDetail);
  // }

  onTrailerClick(movieName: any) {
    this.mdService.setMovieDetails(movieName);
      //this.movieSelected = this.mdService.getMovieDetails();

    //   this.router.navigate(['../movietrailer', movieName.details.imdbID], {
    //   relativeTo: this.route,
    //   state: { movieDetails: JSON.stringify(movieName) },
    // });

    this.router.navigate(['../movietrailer', movieName.details.imdbID], {relativeTo: this.route});
  }

  onWatchlistClick(movieName: any) {
    //console.log(movieName);
    if(sessionStorage.getItem('watchlisted') != null) {
      this.wlMovies = JSON.parse(sessionStorage.getItem('watchlisted'));

      for(const key in this.wlMovies) {
        if(this.wlMovies[key].tmdb_id == movieName.tmdb_id) {
          return;
        }
      }
    }
    this.wlMovies.push(movieName);
    sessionStorage.setItem('watchlisted', JSON.stringify(this.wlMovies));
  }
}
