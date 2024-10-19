import { IonButton, IonContent, IonPage } from '@ionic/react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import properties from './properties';
import './index.css';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="container">
          {properties.map((property) => (
            <Card key={property.id}>
              <CardMedia
                height={150}
                component="img"
                alt={property.location}
                image={property.image}
              />
              <CardContent>
                <Typography variant="h6">{property.location}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: {property.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
        <IonButton routerLink="/agent-listing">Agent Listings</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
