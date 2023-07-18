import { IApp } from 'components/types/interfaces';
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import FilterLoader from 'components/filter/filterLoader';
import { CheckID } from 'components/types/enums';

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
      this.controller.getMobileNews({
        e,
        callback: (data) => {
          if (data) {
            this.view.drawNews(data);
          }
        },
      });
    };

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const receiveNewsMobile_2 = (_e: Event) => {
      dataListInput!.value = '';
    };

    if (window.innerWidth >= 1000) {
      if (buttonList) {
        buttonList.addEventListener('click', receiveNews);
      }
    }
    if (dataListInput) {
      dataListInput.addEventListener('change', receiveMobileNews);
      dataListInput.addEventListener('click', receiveNewsMobile_2);
    }

    this.controller.getSources({
      callback: (data) => {
        if (data) {
          this.filter.addCheckArea(data);
          this.view.drawSources(data);
          const category: HTMLElement | null = document.querySelector(CheckID.category);
          const country: HTMLElement | null = document.querySelector(CheckID.country);
          const language: HTMLElement | null = document.querySelector(CheckID.language);
          const name: HTMLElement | null = document.querySelector(CheckID.name);
          [category, country, language, name].forEach((element) => {
            element?.addEventListener('change', () => {
              if (buttonList) buttonList.innerHTML = '';
              if (dataListInput) dataListInput.value = '';
              if (datalistList) datalistList.innerHTML = '';
              if (newsList) newsList.innerHTML = '';
              this.view.drawSources(data);
            });
          });
        }
      },
    });
  }
}

export default App;
