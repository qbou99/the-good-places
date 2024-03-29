import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Spinner } from "@ui-kitten/components";
import { connect, useSelector } from "react-redux";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Location from "expo-location";

import { getUserPlaces } from "../../config/firebase";
import DisplayError from "./DisplayError";

const Map = ({ navigation, visiblePlaces, dispatch }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const center = useSelector((state) =>state.centerCoords);
  const places = useSelector((state) =>state.places.places);

  const navigateToRestaurantDetails = (restaurantID) => {
    navigation.navigate("ViewRestaurant", { restaurantID });
  };

  const addVisiblePlace = async (place) => {
    const found = visiblePlaces?.find((p) => p.id === place.id);
    if (!found) {
      const action = { type: "ADD_VISIBLE_PLACE", value: place };
      dispatch(action);
    }
  };

  const removeVisiblePlace = async (place) => {
    const found = visiblePlaces?.find((p) => p.id === place.id);
    if (found) {
      const action = { type: "REMOVE_VISIBLE_PLACE", value: place };
      dispatch(action);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let l = await Location.getCurrentPositionAsync({});
      l.coords.longitudeDelta = 0.0421;
      l.coords.latitudeDelta = 0.0922;
      setLocation(l.coords);

      const res = await getUserPlaces()
      const action = { type: "SET_PLACES", value: res };
      dispatch(action);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      onRegionChange(location);
    })();
  }, [places]);

  useEffect(() => {
    (async () => {
    if (mapRef.current) {
      let camera = await mapRef.current.getCamera()
      camera = {...camera, center: center.coords}
      await mapRef.current.animateCamera(camera, { duration: 1000 });
    }
  })();
  }, [center]);

  const onRegionChange = (region) => {
    if(!region)
      return;
    const coordsVisible = getBoundByRegion(region);
    places.forEach((p) => {
      if (
        coordsVisible.minLng <= p.coordinates.longitude &&
        coordsVisible.maxLng >= p.coordinates.longitude &&
        coordsVisible.minLat <= p.coordinates.latitude &&
        coordsVisible.maxLat >= p.coordinates.latitude
      ) {
        if (!p.visible) {
          p.visible = true;
          addVisiblePlace(p);
        }
      } else {
        if (p.visible) {
          p.visible = false;
          removeVisiblePlace(p);
        }
      }
    });
  };

  return (
    <>
      {location === null ? (
        <View style={[styles.map, styles.loader]}>
          <Spinner size="giant" />
        </View>
      ) : (
        <MapView
          ref={mapRef}
          showsPointsOfInterest={false}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: location.latitudeDelta,
            longitudeDelta: location.longitudeDelta,
          }}
          style={styles.map}
          customMapStyle={customMapStyle}
          onRegionChange={onRegionChange}
          showsUserLocation={true}
        >
          {places?.map((element, i) => {
            return <Marker coordinate={element.coordinates} key={element.id} />;
          })}
        </MapView>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    visiblePlaces: state.visiblePlaces.visiblePlaces,
    centerCoords: state.centerCoords.centerCoords,
    places: state.places.places,
  };
};

export default connect(mapStateToProps)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    marginTop: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  inputRestaurantName: {
    marginBottom: 8,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 450,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    justifyContent: "center",
    alignItems: "center",
  },
});

const getBoundByRegion = (region, scale = 1) => {
  /*
   * Latitude : max/min +90 to -90
   * Longitude : max/min +180 to -180
   */
  // Of course we can do it mo compact but it wait is more obvious
  const calcMinLatByOffset = (lng, offset) => {
    const factValue = lng - offset;
    if (factValue < -90) {
      return (90 + offset) * -1;
    }
    return factValue;
  };

  const calcMaxLatByOffset = (lng, offset) => {
    const factValue = lng + offset;
    if (90 < factValue) {
      return (90 - offset) * -1;
    }
    return factValue;
  };

  const calcMinLngByOffset = (lng, offset) => {
    const factValue = lng - offset;
    if (factValue < -180) {
      return (180 + offset) * -1;
    }
    return factValue;
  };

  const calcMaxLngByOffset = (lng, offset) => {
    const factValue = lng + offset;
    if (180 < factValue) {
      return (180 - offset) * -1;
    }
    return factValue;
  };

  const latOffset = (region.latitudeDelta / 2) * scale;
  const lngD =
    region.longitudeDelta < -180
      ? 360 + region.longitudeDelta
      : region.longitudeDelta;
  const lngOffset = (lngD / 2) * scale;

  return {
    minLng: calcMinLngByOffset(region.longitude, lngOffset), // westLng - min lng
    minLat: calcMinLatByOffset(region.latitude, latOffset), // southLat - min lat
    maxLng: calcMaxLngByOffset(region.longitude, lngOffset), // eastLng - max lng
    maxLat: calcMaxLatByOffset(region.latitude, latOffset), // northLat - max lat
  };
};

const customMapStyle = [
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
];
