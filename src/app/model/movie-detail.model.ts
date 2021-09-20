export class MovieDetail {
  public Poster: string;
  public Title: string;
  public Type: string;
  public Year: string;
  public imdbID: string;
  public Actors: string;
  public Director: string;
  public Genre: string;
  public Plot: string;
  public imdbRating: string;
  public Released: string;
  public Runtime: string;

  constructor(Poster: string, Title: string, Type: string, Year: string, imdbID: string, Released: string,
    Actors: string, Director: string, Genre: string, Plot: string, imdbRating: string, Runtime: string) {
    this.Poster = Poster;
    this.Title = Title;
    this.Type = Type;
    this.Year = Year;
    this.imdbID = imdbID;
    this.Released = Released;
    this.Actors = Actors;
    this.Director = Director;
    this.Genre = Genre;
    this.Plot = Plot;
    this.imdbRating = imdbRating;
    this.Runtime = Runtime;
  }
}
