import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
} from '@ionic/react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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

const AgentListingPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [formData, setFormData] = useState({
    location: '',
    price: '',
    image: '',
    description: '',
    city: '',
    state: '',
    type: '',
    rooms: 0,
    bathrooms: 0,
  });
  const [editId, setEditId] = useState<number | null>(null);
  const history = useHistory();

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
    const newProperty: Property = {
      id: editId != null ? editId : Date.now(),
      location: formData.location,
      price: formData.price,
      image: formData.image,
      city: formData.city,
      state: formData.state,
      type: formData.type,
      rooms: formData.rooms,
      bathrooms: formData.bathrooms,
      description: formData.description,
    };

    if (editId != null) {
      const updatedProperties = properties.map((property) =>
        property.id === editId ? newProperty : property
      );
      setProperties(updatedProperties);
      setEditId(null);
    } else {
      setProperties([...properties, newProperty]);
    }

    setFormData({
      location: '',
      price: '',
      image: '',
      description: '',
      city: '',
      state: '',
      type: '',
      rooms: 0,
      bathrooms: 0,
    });
    localStorage.setItem(
      'properties',
      JSON.stringify([...properties, newProperty])
    );
  };

  const handleEditProperty = (property: Property) => {
    setFormData({
      location: property.location,
      price: property.price,
      image: property.image,
      description: property.description || '',
      city: property.city,
      state: property.state,
      type: property.type,
      rooms: property.rooms,
      bathrooms: property.bathrooms,
    });
    setEditId(property.id);
  };

  const handleDeleteProperty = (id: number) => {
    const filteredProperties = properties.filter(
      (property) => property.id !== id
    );
    setProperties(filteredProperties);
    localStorage.setItem('properties', JSON.stringify(filteredProperties));
  };

  const handleViewList = () => {
    history.push({
      pathname: '/customer-view',
      state: { properties: properties },
    });
  };

  return (
    <IonPage>
      <IonContent>
        <h2 className="heading-add">Add your Agent Details here</h2>
        <div className="input-container">
          <IonItem>
            <IonLabel className="icon-label">Location</IonLabel>
            <IonInput
              name="location"
              placeholder="Enter location"
              value={formData.location}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel className="icon-label">Price</IonLabel>
            <IonInput
              name="price"
              value={formData.price}
              placeholder="Enter Price"
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel className="icon-label">Image URL</IonLabel>
            <IonInput
              name="image"
              placeholder="Enter image URL"
              value={formData.image}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel className="icon-label">Description</IonLabel>
            <IonInput
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel className="icon-label">City</IonLabel>
            <IonInput
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel className="icon-label">State</IonLabel>
            <IonInput
              name="state"
              placeholder="Enter state"
              value={formData.state}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel className="icon-label">Type</IonLabel>
            <IonInput
              name="type"
              placeholder="Enter property type"
              value={formData.type}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel className="icon-label">Rooms</IonLabel>
            <IonInput
              type="number"
              name="rooms"
              placeholder="Enter number of rooms"
              value={formData.rooms}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonItem>
            <IonLabel className="icon-label">Bathrooms</IonLabel>
            <IonInput
              type="number"
              name="bathrooms"
              placeholder="Enter number of bathrooms"
              value={formData.bathrooms}
              onIonChange={handleInputChange}
            />
          </IonItem>
          <IonButton className="btnAddUpdate" onClick={handleAddEditProperty}>
            {editId ? 'Update Property' : 'Submit'}
          </IonButton>
          <IonButton onClick={handleViewList} className="btnShowCustomerView">
            View List
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentListingPage;
