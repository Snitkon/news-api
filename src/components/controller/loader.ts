import { IData, ILoader } from 'components/types/interfaces';
import { Options, RespCallback, UrlOptionsType } from 'components/types/types';

class Loader implements ILoader {
  protected baseLink: string;
  protected options: Options<string>;

  constructor(baseLink: string, options: Options<string>) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint = '', options = { apiKey: '', sources: '' } },
    callback: RespCallback = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: UrlOptionsType<string>, endpoint: string): string {
    const urlOptions: UrlOptionsType<string> = { ...this.options, ...options };
    let url: string = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key: string): void => {
      url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
    });

    return url.slice(0, -1);
  }

  load(
    method: string,
    endpoint: string,
    callback: RespCallback,
    options: UrlOptionsType<string> = { apiKey: '', sources: '' }
  ): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res: Response) => res.json())
      .then((data: IData) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
