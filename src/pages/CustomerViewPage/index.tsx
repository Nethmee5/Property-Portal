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
import { Dialog, DialogActions, DialogContent, DialogTitle, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useEffect, useState } from 'react';
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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CustomerViewPage: React.FC = () => {
  const location = useLocation();
  const history = useHistory();
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
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
  const [showListings, setShowListings] = useState<boolean>(false);
  const [filterData, setFilterData] = useState({
    location: '',
    type: '',
    minPrice: '',
    maxPrice: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const storedProperties = localStorage.getItem('properties');
    if (storedProperties) {
      const propertiesFromStorage = JSON.parse(storedProperties);
      setProperties(propertiesFromStorage);
      setFilteredProperties(propertiesFromStorage);
    }
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };

  const handleAddEditProperty = () => {
    if (editId != null) {
      const updatedProperties = properties.map((property) =>
        property.id === editId ? { ...property, ...formData } : property
      );
      setProperties(updatedProperties);
      setFilteredProperties(updatedProperties);
      setEditId(null);
      localStorage.setItem('properties', JSON.stringify(updatedProperties));
      setSnackbarOpen(true); 
    } else {
      const newProperty = {
        id: Date.now(),
        ...formData,
      };
      const newPropertiesList = [...properties, newProperty];
      setProperties(newPropertiesList);
      setFilteredProperties(newPropertiesList);
      localStorage.setItem('properties', JSON.stringify(newPropertiesList));
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

    setOpenDialog(false); 
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
    setOpenDialog(true); 
  };

  const handleDeleteProperty = (id: number) => {
    const filteredProperties = properties.filter(
      (property) => property.id !== id
    );
    setProperties(filteredProperties);
    setFilteredProperties(filteredProperties);
    localStorage.setItem('properties', JSON.stringify(filteredProperties));
  };

  const filterProperties = () => {
    const { location, type, minPrice, maxPrice } = filterData;

    const filtered = properties.filter((property) => {
      const matchesLocation = location
        ? property.location.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesType = type
        ? property.type.toLowerCase().includes(type.toLowerCase())
        : true;
      const matchesPrice =
        (minPrice
          ? parseFloat(property.price) >= parseFloat(minPrice)
          : true) &&
        (maxPrice ? parseFloat(property.price) <= parseFloat(maxPrice) : true);

      return matchesLocation && matchesType && matchesPrice;
    });

    setFilteredProperties(filtered);
  };

  const handleViewProperty = (property: Property) => {
    history.push({
      pathname: '/property-detail',
      state: { property },
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <IonPage>
      <IonContent>
        <>
          <h2 className="heading-list">Manage Property Listings</h2>
          <div className="input-container">
            <IonItem>
              <IonLabel className="icon-label">Location</IonLabel>
              <IonInput
                name="location"
                placeholder="Filter by location"
                value={filterData.location}
                onIonChange={handleFilterChange}
              />
            </IonItem>
            <IonItem>
              <IonLabel className="icon-label">Type</IonLabel>
              <IonInput
                name="type"
                placeholder="Filter by property type"
                value={filterData.type}
                onIonChange={handleFilterChange}
              />
            </IonItem>
            <IonItem>
              <IonLabel className="icon-label">Min Price</IonLabel>
              <IonInput
                type="number"
                name="minPrice"
                placeholder="Min price"
                value={filterData.minPrice}
                onIonChange={handleFilterChange}
              />
            </IonItem>
            <IonItem>
              <IonLabel className="icon-label">Max Price</IonLabel>
              <IonInput
                type="number"
                name="maxPrice"
                placeholder="Max price"
                value={filterData.maxPrice}
                onIonChange={handleFilterChange}
              />
            </IonItem>
            <IonButton className="btnFilter" onClick={filterProperties}>
              Apply Filters
            </IonButton>
          </div>

          <IonList className="IonList">
            {filteredProperties.map((property) => (
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
                    Price: {property.price}
                  </Typography>
                  <IonButton onClick={() => handleEditProperty(property)}>
                    Edit
                  </IonButton>
                  <IonButton onClick={() => handleViewProperty(property)}>
                    View
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

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Edit Property Details</DialogTitle>
            <DialogContent>
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
              <IonItem>
                <IonLabel>Description</IonLabel>
                <IonInput
                  name="description"
                  value={formData.description}
                  onIonChange={handleInputChange}
                />
              </IonItem>
              <IonItem>
                <IonLabel>City</IonLabel>
                <IonInput
                  name="city"
                  value={formData.city}
                  onIonChange={handleInputChange}
                />
              </IonItem>
              <IonItem>
                <IonLabel>State</IonLabel>
                <IonInput
                  name="state"
                  value={formData.state}
                  onIonChange={handleInputChange}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Type</IonLabel>
                <IonInput
                  name="type"
                  value={formData.type}
                  onIonChange={handleInputChange}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Rooms</IonLabel>
                <IonInput
                  name="rooms"
                  type="number"
                  value={formData.rooms}
                  onIonChange={handleInputChange}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Bathrooms</IonLabel>
                <IonInput
                  name="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onIonChange={handleInputChange}
                />
              </IonItem>
            </DialogContent>
            <DialogActions>
              <IonButton onClick={() => setOpenDialog(false)}>Cancel</IonButton>
              <IonButton onClick={handleAddEditProperty}>Save</IonButton>
            </DialogActions>
          </Dialog>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
          >
            <Alert onClose={handleSnackbarClose} severity="success">
              Property updated successfully!
            </Alert>
          </Snackbar>
        </>
      </IonContent>
    </IonPage>
  );
};

export default CustomerViewPage;
