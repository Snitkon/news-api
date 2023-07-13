import { IApp } from 'components/types/interfaces';
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
    const element: Element | null = document.querySelector('.sources');
    const receiveNews = (e: Event) =>
      this.controller.getNews({
        e,
        callback: (data) => {
          if (data) {
            this.view.drawNews(data);
          }
        },
      });
    if (window.innerWidth >= 1000) {
      if (element) {
        element.addEventListener('click', receiveNews);
      }
    }

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
