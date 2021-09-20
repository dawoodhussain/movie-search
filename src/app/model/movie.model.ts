export class Movie {
  public Poster: string;
  public Title: string;
  public Type: string;
  public Year: string;
  public imdbID: string;

  constructor(Poster: string, Title: string, Type: string, Year: string, imdbID: string) {
    this.Poster = Poster;
    this.Title = Title;
    this.Type = Type;
    this.Year = Year;
    this.imdbID = imdbID;
  }
}
