import ReactDOM from 'react-dom/client';
import Router from './Router.tsx';
import { Provider } from 'react-redux';
import { store } from '@/app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router />
  </Provider>,
);
