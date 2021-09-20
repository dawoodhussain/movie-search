import { TrailerModel } from "./trailer-detail.model";

export class YoutubeVideoModel {
  public items:TrailerModel[];

  constructor(items: TrailerModel[]) {
    this.items = items;
  }
}
