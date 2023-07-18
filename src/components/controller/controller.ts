import { IAppController } from 'components/types/interfaces';
import AppLoader from './appLoader';
import { RespCallback } from 'components/types/types';

class AppController extends AppLoader implements IAppController {
  getSources({ callback }: { callback: RespCallback }): void {
    super.getResp(
      {
        endpoint: 'sources',
        options: {
          apiKey: `${this.options.apiKey}`,
          sources: '',
        },
      },
      callback
    );
  }

  public getNews({ e, callback }: { e: Event; callback: RespCallback }) {
    if (e.target && e.currentTarget) {
      let target: EventTarget = e.target;
      const newsContainer = e.currentTarget as HTMLInputElement;
      while (target !== newsContainer) {
        const inputElement = target as HTMLInputElement;
        const inputElementContainer = newsContainer as HTMLInputElement;
        if (inputElement.classList.contains('source__item') && inputElement.getAttribute('data-source-id')) {
          const sourceId = inputElement.getAttribute('data-source-id');
          if (inputElementContainer.getAttribute('data-source') != sourceId && sourceId) {
            inputElementContainer.setAttribute('data-source', sourceId);
            super.getResp(
              {
                endpoint: 'everything',
                options: {
                  apiKey: `${this.options.apiKey}`,
                  sources: sourceId,
                },
              },
              callback
            );
          }
          return;
        }
        if (target) {
          // eslint-disable-next-line no-undef
          target = inputElement.parentNode as ParentNode;
        }
      }
    }
  }

  public getMobileNews({ e, callback }: { e: Event; callback: RespCallback }): void {
    const datalist: HTMLInputElement | null = document.querySelector('#sources__select_input');
    if (datalist?.value) {
      const newsContainerSelect: EventTarget | null = e.currentTarget;
      (newsContainerSelect as HTMLInputElement).setAttribute('data-source', datalist?.value);
      super.getResp(
        {
          endpoint: 'everything',
          options: {
            apiKey: `${this.options.apiKey}`,
            sources: datalist?.value,
          },
        },
        callback
      );
    }
  }
}

export default AppController;
