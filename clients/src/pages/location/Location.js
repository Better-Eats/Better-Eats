import './location.css'
import GoogleMapReact from 'google-map-react';
import {useEffect, useState} from 'react';
import Rest from '../../components/rest/Rest.js';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

export default function Location(){
  const [rest, setRest] = useState([]);

  const [bounds, setBounds] = useState(null);
  const [coordinates, setCoordinates] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      // console.log(data)
      setCoordinates({ lat: data.coords.latitude, lng: data.coords.longitude })
    })
  }, [])

  useEffect(() => {
    const getR = async() =>{
      try{
        const res = await axios.post('/yelp', coordinates);
        console.log(res.data.businesses,'rest list')
        setRest(res.data.businesses);
      }catch(err){
        console.log(err)
      }
    }
    getR();
  }, [coordinates, bounds]);


  return (
    <div className = 'location' >
      <div className = 'restlist'>
        {rest.length>0? rest.map((resta) => <Rest key={resta.id} resta={resta}/>) : (<></>)}
      </div>
      <div className = 'map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB2yYzf8EIgdVXBoenDe5o3OH2N40dOfGo' }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={''}
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat, lng: e.center.lng })
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
          }}
        >
        {rest?.map((place, i) => (
          <div
            lat={Number(place.coordinates.latitude)}
            lng={Number(place.coordinates.longitude)}
            key={i}
          >
            <LocationOnIcon color='primary' fontSize="large" />
          </div>
        ))}
        </GoogleMapReact>
      </div>
    </div>

  )
}
