import App from './components/app/app';
import { IApp } from 'components/types/interfaces';
import './global.css';

const app: IApp = new App();
app.start();
