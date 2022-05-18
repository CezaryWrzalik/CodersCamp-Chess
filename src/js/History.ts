import { Translation } from './Types/Types';

export class History {
  history: [];
  dom: HTMLDivElement;

  constructor() {
    this.dom = document.querySelector('.history-container__moves');
  }

  newRecord = (color: string, pieceName: Translation[keyof Translation], positions: string[] | string): void => {
    if (typeof positions === 'string') {
      this.dom.insertAdjacentHTML(
        'afterbegin',
        `<p><b>9:24 ${color} ${pieceName}</b> ${positions}`,
      );
    }else{
      this.dom.insertAdjacentHTML(
        'afterbegin',
        `<p><b>9:24 ${color} ${pieceName}</b> ${positions[0]} => ${positions[1]}`,
      );
    }
  };
}
