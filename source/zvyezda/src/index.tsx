import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App';
import PageNotFound from './views/pagenotfound';
import VerifyEmail from './views/verifyemail';
import Authentication from './views/authentication';
import Messaging from './views/messaging';
import Globe from './views/globe';
import {Provider} from 'react-redux';
import {store} from './store';
import {RouterContainer} from './styled';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <RouterContainer>
    <Router>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/messaging" element={<Messaging />} />
          <Route path="/globe" element={<Globe />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Provider>
    </Router>
  </RouterContainer>,
);
