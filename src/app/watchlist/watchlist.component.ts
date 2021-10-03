import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MovieFullDetails } from '../model/movie-details.model';
import { MovieDetailService } from '../shared/services/movie-details.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  movieSelected: boolean = false;
  wlMovies: any = [];

  constructor(private mdService: MovieDetailService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const watchlistedMovies = JSON.parse(sessionStorage.getItem('watchlisted'));
    console.log(watchlistedMovies);

    for(const key in watchlistedMovies) {
      this.wlMovies.push(watchlistedMovies[key]);
    }

    if(this.wlMovies.length != 0) {
      this.movieSelected = true;
    }
  }

  onClick(movie: any) {
    this.mdService.setMovieDetails(movie);
    this.router.navigate(['../movietrailer', movie.details.imdbID], {relativeTo: this.route});
  }

  onDelete(idx: any) {
    this.wlMovies.splice(+idx, 1);
    sessionStorage.setItem('watchlisted', JSON.stringify(this.wlMovies));
  }
}
