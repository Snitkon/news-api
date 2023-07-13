import { IApp, IData } from 'components/types/interfaces';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App implements IApp {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start() {
    const element = document.querySelector('.sources') as HTMLElement;
    element.addEventListener('click', (e: Event) =>
      this.controller.getNews({
        e,
        callback: (data) => {
          if (data) {
            this.view.drawNews(data);
          }
        },
      })
    );
    this.controller.getSources({
      callback: (data) => {
        if (data) {
          this.view.drawSources(data);
        }
      },
    });
  }
}

export default App;
