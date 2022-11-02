import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import App from './App';
import PageNotFound from './views/pagenotfound';
import Authentication from './views/authentication';
import Application from './views/application';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/app" element={<Application />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    </Router>
);
