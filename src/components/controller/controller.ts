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

  getNews({ e, callback }: { e: Event; callback: RespCallback }) {
    if (e.target && e.currentTarget) {
      let target: EventTarget = e.target;
      const newsContainer = e.currentTarget as HTMLInputElement;
      while (target !== newsContainer) {
        const inputElement = target as HTMLInputElement;
        const inputElementContainer = newsContainer as HTMLInputElement;
        if (inputElement.classList.contains('source__item') && inputElement.getAttribute('data-source-id')) {
          const sourceId = inputElement.getAttribute('data-source-id');
          console.log(sourceId)
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
}

export default AppController;
