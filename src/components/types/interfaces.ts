/* eslint-disable no-unused-vars */
import { Options, RespCallback, ISourceNews } from './types';

export interface ISourceData {
  category: string;
  country: string;
  description: string;
  id: string;
  language: string;
  name: string;
  url: string;
}
export interface IResponseNews {
  length: number;
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: ISourceNews;
  title: string;
  url: string;
  urlToImage: string;
}

export interface IApp {
  start(): void;
}

export interface IAppController {
  getSources({ callback }: { callback: RespCallback }): void;
  getNews({ e, callback }: { e: Event; callback: RespCallback }): void;
  getMobileNews({ e, callback }: { e: Event; callback: RespCallback }): void;
}

export interface ILoader {
  getResp: (
    { endpoint, options }: { endpoint?: string | undefined; options?: { apiKey: string; sources: string } | undefined },
    callback?: RespCallback
  ) => void;
  errorHandler(res: Response): Response;
  makeUrl(options: Options<string>, endpoint: string): string;
  load(method: string, endpoint: string, callback: RespCallback, options: Options<string>): void;
}

export interface IAppView {
  drawNews(data: IData): void;
  drawSources(data: IData): void;
}
export interface INews {
  draw(data: IResponseNews[]): void;
}
export interface ISource {
  draw(data: ISourceData[]): void;
  drawSelect(data: ISourceData[]): void;
}
export interface IData {
  status: string;
  totalResults: number;
  articles: IResponseNews[];
  sources: ISourceData[];
}

export interface IFilterloader {
  addCheckArea(data: IData): void;
  addCategory(category: string, info: object): void;
}
export interface INewsFilter {
  filter(): string[];
  filterCategory(category: HTMLSelectElement, position: number): void;
  filterData(values: ISourceData[]): ISourceData[];
}
