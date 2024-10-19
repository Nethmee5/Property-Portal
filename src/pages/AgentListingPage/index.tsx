import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './index.css';

interface Property {
  id: number;
  location: string;
  price: string;
  image: string;
}

const AgentListingPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [formData, setFormData] = useState({
    location: '',
    price: '',
    image: '',
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const storedProperties = localStorage.getItem('properties');
    if (storedProperties) {
      setProperties(JSON.parse(storedProperties));
    }
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEditProperty = () => {
    if (editId != null) {
      const updatedProperties = properties.map((property) =>
        property.id === editId ? { ...property, ...formData } : property
      );
      setProperties(updatedProperties);

      setEditId(null);
    } else {
      const newProperty = {
        id: Date.now(),
        ...formData,
      };
      setProperties([...properties, newProperty]);
    }
    setFormData({ location: '', price: '', image: '' });
    localStorage.setItem('properties', JSON.stringify(properties));
  };

  const handleEditProperty = (property: Property) => {
    setFormData(property);
    setEditId(property.id);
  };

  const handleDeleteProperty = (id: number) => {
    const filteredProperties = properties.filter(
      (property) => property.id !== id
    );
    setProperties(filteredProperties);
    localStorage.setItem('properties', JSON.stringify(filteredProperties));
  };

  return (
    <IonPage>
      <IonContent>
        <IonItem>
          <IonLabel>Location</IonLabel>
          <IonInput
            name="location"
            value={formData.location}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Price</IonLabel>
          <IonInput
            name="price"
            value={formData.price}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonItem>
          <IonLabel>Image URL</IonLabel>
          <IonInput
            name="image"
            value={formData.image}
            onIonChange={handleInputChange}
          />
        </IonItem>
        <IonButton onClick={handleAddEditProperty}>
          {editId ? 'Update Property' : 'Add Property'}
        </IonButton>
        <IonList className="IonList">
          {properties.map((property) => (
            <Card key={property.id} className="propertyCard">
              <CardMedia
                component="img"
                alt={property.location}
                height="140"
                image={property.image}
              />
              <CardContent>
                <Typography variant="h6">{property.location}</Typography>
                <Typography variant="body2" color="textSecondary">
                  price: {property.price}
                </Typography>
                <IonButton onClick={() => handleEditProperty(property)}>
                  Edit
                </IonButton>
                <IonButton
                  onClick={() => handleDeleteProperty(property.id)}
                  color="danger"
                >
                  Delete
                </IonButton>
              </CardContent>
            </Card>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AgentListingPage;
