import { IApp } from 'components/types/interfaces';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import FilterLoader from 'components/filter/filterLoader';

class App implements IApp {
  private controller: AppController;
  private view: AppView;
  private filter: FilterLoader;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.filter = new FilterLoader();
  }

  start() {
    const buttonList: Element | null = document.querySelector('.sources');
    const dataListInput: HTMLInputElement | null = document.querySelector('#sources__select_input');
    const datalistList: HTMLInputElement | null = document.querySelector('#sources__select');
    const newsList: HTMLInputElement | null = document.querySelector('.news');

    const receiveNews = (e: Event) =>
      this.controller.getNews({
        e,
        callback: (data) => {
          if (data) {
            this.view.drawNews(data);
          }
        },
      });

    const receiveMobileNews = (e: Event) => {
      this.controller.
    }
    if (window.innerWidth >= 1000) {
      if (buttonList) {
        buttonList.addEventListener('click', receiveNews);
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
