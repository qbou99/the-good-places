import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import Toast from 'react-native-root-toast';

import DisplayError from '../components/DisplayError';

const Restaurant = ({ route, favRestaurants, dispatch }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurant, setRestaurant] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    requestRestaurant();
  }, []); // Uniquement à l'initialisation

  // Pourrait être directement déclarée dans useEffect
  const requestRestaurant = async () => {
    try {

      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  }

  // On pourrait définir les actions dans un fichier à part
  const saveRestaurant = async () => {
    const action = { type: 'SAVE_RESTAURANT', value: route.params.restaurantID };
    dispatch(action);
    let toast = Toast.show('Restaurant ajouté aux favoris', {
      duration: Toast.durations.LONG,
    });
  }

  const unsaveRestaurant = async () => {
    const action = { type: 'UNSAVE_RESTAURANT', value: route.params.restaurantID };
    dispatch(action);
    let toast = Toast.show('Restaurant retiré des favoris', {
      duration: Toast.durations.LONG,
    });
  }

  const displayRestaurantImage = () => {
    if (restaurant.featured_image) {
      return (
        <Image style={styles.restaurantImage}
          source={{ uri: restaurant.featured_image }} />
      );
    };
    return (
      <View style={styles.containerNoRestaurantImage}>
      </View>
    );
  };

  const displayTimings = () => {
    let timingsList = restaurant.timings?.split(",");
    let timingsJSX = [];
    timingsList?.forEach((timing, index) => {
      timingsJSX.push(<Text key={index} style={styles.textContent}>{timing}</Text>)
    });
    return (
      <View style={{ marginBottom: 16, }}>
        {timingsJSX}
      </View>
    );
  }

  const displaySaveRestaurant = () => {
    if (favRestaurants.findIndex(i => i === route.params.restaurantID) !== -1) {
      // Le restaurant est sauvegardé
      return (
        <Button
          title='Retirer des favoris'
          onPress={unsaveRestaurant}
        />
      );
    }
    // Le restaurant n'est pas sauvegardé
    return (
      <Button
        title='Ajouter aux favoris'
        onPress={saveRestaurant}
      />
    );
  }

  return (
    <View style={styles.container}>
      {isError ?
        (<DisplayError message='Impossible de récupérer les données du restaurants' />) :
        (isLoading ?
          (<View style={styles.containerLoading}>
            <ActivityIndicator size="large" />
          </View>) :

          (<ScrollView style={styles.containerScroll}>
            {displayRestaurantImage()}
            <View style={styles.containerCardTop}>
              <View style={styles.containerEstab}>
                <Text style={styles.textName}>
                  {restaurant.name}
                </Text>
                <Text style={styles.textContent}
                  numberOfLines={1}>
                  {restaurant.establishment?.join()}
                </Text>
              </View>
              <View style={styles.containerNoteAndVotes}>
                <View style={[styles.containerNote, { backgroundColor: ('#' + restaurant.user_rating?.rating_color) }]}>
                  <Text style={styles.textNote}>
                    {restaurant.user_rating?.aggregate_rating}
                  </Text>
                  <Text style={styles.textMaxNote}>
                    /5
                  </Text>
                </View>
                <Text style={styles.textVotes}>
                  {restaurant.user_rating?.votes} votes
                </Text>
              </View>
            </View>
            <View style={styles.containerCardBottom}>
              <Text style={[styles.textTitle, { marginTop: 0 }]}>
                Cuisines
              </Text>
              <Text style={styles.textContent}>
                {restaurant.cuisines}
              </Text>
              <Text style={styles.textTitle}>
                Numéro(s) de téléphone
              </Text>
              <Text style={styles.textContent}>
                {restaurant.phone_numbers}
              </Text>
              <Text style={styles.textTitle}>
                Adresse
              </Text>
              <Text style={styles.textContent}>
                {restaurant.location?.address}
              </Text>
              <Text style={styles.textTitle}>
                Horaires d'ouverture
              </Text>
              {displayTimings()}
              {displaySaveRestaurant()}
            </View>
          </ScrollView>)
        )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    favRestaurants: state.favRestaurantsID
  }
}

export default connect(mapStateToProps)(Restaurant);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLoading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerScroll: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  containerCardTop: {
    elevation: 1,
    borderRadius: 3,
    padding: 12,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  containerCardBottom: {
    elevation: 1,
    marginTop: 16,
    borderRadius: 3,
    padding: 12,
    backgroundColor: 'white',
  },
  containerNoRestaurantImage: {
    height: 128,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    backgroundColor: 'white',
  },
  restaurantImage: {
    height: 180,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  containerEstab: {
    flex: 4,
  },
  containerNoteAndVotes: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerNote: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textNote: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 16,
  },
  textMaxNote: {
    fontSize: 12,
    marginLeft: 3,
    color: 'white',
  },
  textVotes: {
    fontStyle: "italic",
    fontSize: 12,
  },
  textName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 16,
  },
  textContent: {
    fontSize: 16,
  },
});