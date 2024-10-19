import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';
import MedianPriceChart from '../../components/MedianPriceChart';
import PropertiesCountChart from '../../components/PropertiesCountChart';

interface StatisticsLocationState {
  property: {
    city: string;
  };
}

const StatisticsPage: React.FC = () => {
  const location = useLocation<StatisticsLocationState>();
  const { city } = location.state?.property;

  const medianPriceData = {
    labels: ['Location A', 'Location B', 'Location C'],
    values: [300000, 450000, 250000],
  };

  const propertiesCountData = {
    labels: ['Location A', 'Location B', 'Location C'],
    values: [50, 30, 20],
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Statistics for {city}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <h2>Median Property Prices</h2>
        <MedianPriceChart data={medianPriceData} />
        <h2>Properties Count by Location</h2>
        <PropertiesCountChart data={propertiesCountData} />
      </IonContent>
    </IonPage>
  );
};

export default StatisticsPage;
