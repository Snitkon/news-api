import { IAppView, IData, IResponseNews, ISourceData } from 'components/types/interfaces';
import News from './news/news';
import Sources from './sources/sources';

export class AppView implements IAppView {
  protected news: News;
  protected sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IData): void {
    if (data?.articles) {
      const values: IResponseNews[] = data.articles;
      this.news.draw(values);
    }
  }

  drawSources(data: IData): void {
    const values: ISourceData[] = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
