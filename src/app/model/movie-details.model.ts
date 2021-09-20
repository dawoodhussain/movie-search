import { MovieDetail } from "./movie-detail.model";

export class MovieFullDetails {
  public details: MovieDetail;
  public tmdb_id: string;
  public tagline: string;
  public description: string;

  constructor(_details: MovieDetail, _tdmdbId: string, _tagline:string, _desc: string) {
    this.details = _details;
    this.tmdb_id = _tdmdbId;
    this.tagline = _tagline;
    this.description = _desc;
  }
}
