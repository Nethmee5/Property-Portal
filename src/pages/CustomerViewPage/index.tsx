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
    setShowListings(false);
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

  return (
    <IonPage>
      <IonContent>
        {showListings ? (
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
          </>
        ) : (
          <>
            <h2 className="heading-add">Add or Edit Property</h2>
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
              <IonButton className="btnSubmit" onClick={handleAddEditProperty}>
                {editId ? 'Update Property' : 'Submit'}
              </IonButton>
              <IonButton
                className="btnViewListing"
                onClick={() => setShowListings(!showListings)}
              >
                {showListings ? 'Add New Property' : 'View Listings'}
              </IonButton>
            </div>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CustomerViewPage;
