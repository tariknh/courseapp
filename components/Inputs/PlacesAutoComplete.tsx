"use client";
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
  value?: google.maps.places.PlaceResult | string;
  className?: string;
  defaultValue?: string;
}

interface MapHandlerProps {
  place: google.maps.places.PlaceResult | null;
  marker: google.maps.marker.AdvancedMarkerElement | null;
}

export const PlaceAutocomplete = ({
  onPlaceSelect,
  value,
  className,
  defaultValue,
}: PlaceAutocompleteProps) => {
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places, value]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [onPlaceSelect, placeAutocomplete]);

  return (
    <div className="font-normal autocomplete-container">
      <Input className={className} defaultValue={defaultValue} ref={inputRef} />
    </div>
  );
};
const MapHandler = ({ place, marker }: MapHandlerProps) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !place || !marker) return;

    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
    marker.position = place.geometry?.location;
  }, [map, place, marker]);

  return null;
};

export const GMap = ({ setCustomValue, value, onChange, ...props }: any) => {
  const position = { lat: 53.54992, lng: 10.00678 };

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markerRef, marker] = useAdvancedMarkerRef();

  useEffect(() => {
    if (selectedPlace) {
      onChange(selectedPlace);
    }

    return;
  }, [selectedPlace]);

  return (
    <APIProvider apiKey={`${process.env.NEXT_PUBLIC_MAPS}`}>
      <div className="h-[30vh] gap-6 flex flex-col">
        <PlaceAutocomplete value={value} onPlaceSelect={setSelectedPlace} />
        <Map
          mapId={`739af084373f96fe`}
          defaultCenter={position}
          defaultZoom={10}
        >
          <AdvancedMarker ref={markerRef} position={null}>
            <Pin
              background={"grey"}
              borderColor={"white"}
              glyphColor={"rebeccapurple"}
            />
          </AdvancedMarker>
        </Map>
      </div>

      <MapHandler place={value ? value : selectedPlace} marker={marker} />
    </APIProvider>
  );
};
