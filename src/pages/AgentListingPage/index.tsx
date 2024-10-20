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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const [openSnackbar, setOpenSnackbar] = useState(false); 

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

    setOpenSnackbar(true);
  };

  const handleViewList = () => {
    history.push({
      pathname: '/customer-view',
      state: { properties: properties },
    });
  };
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
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
          <IonButton className="btnAdd" onClick={handleAddEditProperty}>
            Submit
          </IonButton>
          <IonButton onClick={handleViewList} className="btnShowCustomerView">
            View List
          </IonButton>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity="success">
           Property added successfully!
          </Alert>
        </Snackbar>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentListingPage;
