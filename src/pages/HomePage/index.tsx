import { IonButton, IonContent, IonPage } from '@ionic/react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import properties from '../../utills/properties';
import './index.css';

const HomePage: React.FC = () => {
  return (
    <IonPage className='container'>
      <h1>Welcome to the Property Portal!</h1>
      
      <IonContent>
      <IonButton routerLink="/agent-listing" className='btnShowList'>Agent Listings</IonButton>

        <div className="icon-content-container">
          {properties.map((property) => (
            <Card key={property.id}>
              <CardMedia
                className='card-container'
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
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
