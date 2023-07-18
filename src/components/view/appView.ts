import { IAppView, IData, IResponseNews, ISourceData } from '../types/interfaces';
import News from './news/news';
import Sources from './sources/sources';
import NewsFilter from '../filter/newsFilter';

export class AppView implements IAppView {
  protected news: News;
  protected sources: Sources;
  protected filter: NewsFilter;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
    this.filter = new NewsFilter();
  }

  drawNews(data: IData): void {
    if (data?.articles) {
      const values: IResponseNews[] = data.articles;
      this.news.draw(values);
    }
  }

  drawSources(data: IData): void {
    const values: ISourceData[] = data?.sources ? data?.sources : [];
    window.innerWidth >= 1000
      ? this.sources.draw(this.filter.filterData(values))
      : this.sources.drawSelect(this.filter.filterData(values));
    // this.sources.draw(values);
  }
}

export default AppView;
