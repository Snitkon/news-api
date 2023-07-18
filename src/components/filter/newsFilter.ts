import { CheckID } from '../types/enums';
import { INewsFilter, ISourceData } from '../types/interfaces';

class NewsFilter implements INewsFilter {
  private category: HTMLSelectElement | null;
  private country: HTMLSelectElement | null;
  private language: HTMLSelectElement | null;
  private name: HTMLSelectElement | null;
  private filterArray: string[];
  constructor() {
    this.category = null;
    this.country = null;
    this.language = null;
    this.name = null;
    this.filterArray = [];
  }
  filter(): string[] {
    this.category = document.querySelector(CheckID.category);
    this.country = document.querySelector(CheckID.country);
    this.language = document.querySelector(CheckID.language);
    this.name = document.querySelector(CheckID.name);
    if (this.name) {
      this.filterCategory(this.name, 0);
    }
    if (this.category) {
      this.filterCategory(this.category, 1);
    }
    if (this.country) {
      this.filterCategory(this.country, 2);
    }
    if (this.language) {
      this.filterCategory(this.language, 3);
    }

    return this.filterArray;
  }
  filterCategory(category: HTMLSelectElement, position: number): void {
    this.filterArray[position] = category.value;
    category?.addEventListener('change', () => {
      if (category) {
        this.filterArray[position] = category.value;
      }
    });
  }

  isInclude(arr: string[], item: ISourceData, i: number) {
    return Object.values(item).includes(arr[i]) || arr[i] === 'all' ? true : false;
  }

  filterData(values: Required<ISourceData[]>): Required<ISourceData[]> {
    const filterDataArray: string[] = this.filter();
    const filterValues: Required<ISourceData[]> = [];

    values.forEach((item) => {
      const isIncludeName: boolean = this.isInclude(filterDataArray, item, 0);
      const isIncludeCategory: boolean = this.isInclude(filterDataArray, item, 1);
      const isIncludeCountry: boolean = this.isInclude(filterDataArray, item, 2);
      const isIncludeLanguage: boolean = this.isInclude(filterDataArray, item, 3);
      if (isIncludeName && isIncludeCategory && isIncludeCountry && isIncludeLanguage) filterValues.push(item);
    });
    return filterValues;
  }
}

export default NewsFilter;
