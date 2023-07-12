import { IData } from './interfaces';
import { ISourceData } from './interfaces';
import { CheckCategoryName } from './enums';

export type Options<T> = Partial<{ apiKey?: T; sources?: T }>;
export type RespCallback = (data?: IData) => void;
export type UrlOptionsType<T> = Partial<{ apiKey: T | undefined; sources: T | undefined }>;
export type ISourceNews = Pick<ISourceData, 'id' | 'name'>;
export type INewsSourceObject<T> = Record<
  CheckCategoryName.category | CheckCategoryName.country | CheckCategoryName.language | CheckCategoryName.name,
  Set<T>
>;
