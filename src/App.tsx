import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';
import HomePage from './pages/HomePage';
import AgentListingPage from './pages/AgentListingPage';
import CustomerViewPage from './pages/CustomerViewPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import StatisticsPage from './pages/StatisticsPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/agent-listing" component={AgentListingPage} />
        <Route exact path="/customer-view" component={CustomerViewPage} />
        <Route exact path="/property-detail" component={PropertyDetailPage} />
        <Route exact path="/statistics" component={StatisticsPage} />
        <Redirect to="/" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
