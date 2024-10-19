import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './index.css';

interface Property {
  id: number;
  location: string;
  price: string;
  image: string;
  description?: string;
  city: string;
  state: string;
  type: string;
  rooms: number;
  bathrooms: number;
}

interface PropertyDetailLocationState {
  property: Property;
}

const PropertyDetailPage: React.FC = () => {
  const location = useLocation<PropertyDetailLocationState>();
  const history = useHistory();
  const property = location.state?.property;

  const handleViewStatistics = () => {
    history.push({
      pathname: '/statistics',
      state: { property },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Property Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {property ? (
          <Card className="propertyCard">
            <CardMedia
              className="image-container"
              component="img"
              alt={property.location}
              height="140"
              image={property.image}
            />
            <CardContent>
              <Typography variant="h6">{property.location}</Typography>
              <Typography variant="body2">City: {property.city}</Typography>
              <Typography variant="body2">State: {property.state}</Typography>
              <Typography variant="body2">Type: {property.type}</Typography>
              <Typography variant="body2">Rooms: {property.rooms}</Typography>
              <Typography variant="body2">
                Bathrooms: {property.bathrooms}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Asking Price: {property.price}
              </Typography>
              <Typography variant="body2">
                Description: {property.description}
              </Typography>
              <IonButton onClick={() => window.history.back()}>Back</IonButton>
              <IonButton onClick={handleViewStatistics}>
                View Statistics
              </IonButton>
            </CardContent>
          </Card>
        ) : (
          <Typography>No property details available.</Typography>
        )}
      </IonContent>
    </IonPage>
  );
};

export default PropertyDetailPage;
