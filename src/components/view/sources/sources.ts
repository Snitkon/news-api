import { ISource, ISourceData } from 'components/types/interfaces';
import './sources.css';

class Sources implements ISource {
  draw(data: ISourceData[]): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
    if (sourceItemTemp) {
      data.forEach((item: ISourceData) => {
        const sourceClone: HTMLTemplateElement = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

        (sourceClone.querySelector('.source__item-name') as HTMLTemplateElement).textContent = item.name;
        (sourceClone.querySelector('.source__item') as HTMLTemplateElement).setAttribute('data-source-id', item.id);
        fragment.append(sourceClone);
      });
    }

    (document.querySelector('.sources') as HTMLTemplateElement).append(fragment);
  }
}

export default Sources;
