import { IAppView, IData } from 'components/types/interfaces';
import News from './news/news';
import Sources from './sources/sources';

export class AppView implements IAppView {
  protected news: News;
  protected sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IData) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: IData) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
