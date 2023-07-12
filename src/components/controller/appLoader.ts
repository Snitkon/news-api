import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '93d5fc0490724111bea31715894332d3',
    });
  }
}

export default AppLoader;
