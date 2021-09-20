export interface snippet {
  title: string;
  description: string;
}

export interface id {
  kind: string;
  videoId: string;
}

export class TrailerModel {
  public id: id;
  public snippet: snippet;

  constructor(id: id, snippet: snippet) {
    this.id = id;
    this.snippet = snippet;
  }
}
