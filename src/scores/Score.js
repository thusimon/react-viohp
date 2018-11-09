/**
 * Created by Lu on 11/9/2018.
 */
class Score {
  /**
   * @param signature
   * @param scale
   * @param title
   * @param author
   * @param notes, would be a 2D array [[staffline1],[staffline2]];
   */
  constructor(signature, scale, title, author, notes=[]){
    this.signature = signature;
    this.scale = scale;
    this.title = title;
    this.author = author;
    this.notes=notes;
  }
}
