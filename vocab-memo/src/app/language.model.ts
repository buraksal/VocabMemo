export class Language {
  public name: string;
  public natWords: string[];
  public forWords: string[][];


  constructor(name: string, natWords: string[], forWords: string[][]) {
    this.name = name;
    this.natWords = natWords;
    this.forWords = forWords;
  }
}
