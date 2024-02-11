import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {store, persistor} from './redux/store.js';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/ThemeProvider.jsx';
import ReactGA from "react-ga4";



ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_KEY);

ReactGA.send({ 
  hitType: "pageview", 
  page: window.location.pathname, 
  // title: "Custom Title" 
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
)
