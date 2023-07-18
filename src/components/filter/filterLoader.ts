import { CheckCategoryName } from '../types/enums';
import { IData, IFilterloader, ISourceData } from '../types/interfaces';
import { INewsSourceObject } from '../types/types';

class FilterLoader implements IFilterloader {
  addCheckArea(data: IData): void {
    if (data.sources) {
      const sourcesArray: Required<ISourceData[]> = data.sources;
      const checkCategory: HTMLElement | null = document.querySelector('.check__type');
      const newsSourceObject: INewsSourceObject<string> = {
        name: new Set(),
        category: new Set(),
        country: new Set(),
        language: new Set(),
      };
      // eslint-disable-next-line prefer-const
      for (let key in newsSourceObject) {
        const newsCategoryName: HTMLElement = document.createElement('p3');
        const newsCategory: HTMLElement = document.createElement('select');
        if (checkCategory) {
          checkCategory.append(newsCategoryName);
          checkCategory.append(newsCategory);
          newsCategory.classList.add('news__category_select');
          newsCategory.id = key as string;
          newsCategoryName.classList.add('news__category_name');
          newsCategoryName.innerHTML = ('News ' + key) as string;
        }
      }
      newsSourceObject.category.add('all');
      newsSourceObject.country.add('all');
      newsSourceObject.language.add('all');
      newsSourceObject.name.add('all');
      sourcesArray.forEach((element) => {
        newsSourceObject.category.add(element[CheckCategoryName.category]);
        newsSourceObject.country.add(element[CheckCategoryName.country]);
        newsSourceObject.language.add(element[CheckCategoryName.language]);
        newsSourceObject.name.add(element[CheckCategoryName.name]);
      });
      this.addCategory(CheckCategoryName.category, newsSourceObject[CheckCategoryName.category]);
      this.addCategory(CheckCategoryName.country, newsSourceObject[CheckCategoryName.country]);
      this.addCategory(CheckCategoryName.language, newsSourceObject[CheckCategoryName.language]);
      this.addCategory(CheckCategoryName.name, newsSourceObject[CheckCategoryName.name]);
    }
  }
  addCategory(category: string, info: object): void {
    (info as string[]).forEach((element) => {
      const catalogName: HTMLElement | null = document.querySelector(`#${category}`);
      const elemOfSourceArray: HTMLElement = document.createElement('option');
      elemOfSourceArray.classList.add('.option');
      catalogName?.append(elemOfSourceArray);
      elemOfSourceArray.innerHTML = element;
    });
  }
}

export default FilterLoader;
