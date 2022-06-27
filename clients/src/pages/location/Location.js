import './location.css'
import GoogleMapReact from 'google-map-react';
import {useEffect, useState} from 'react';
import Rest from '../../components/rest/Rest.js';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';

export default function Location(){
  const [rest, setRest] = useState([]);
  const [ordertype, setOrdertype] = useState('res');
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
        const res = await axios.post('/yelp', {coordinates: coordinates , ordertype: ordertype});
        console.log(res.data.businesses,'rest list')
        setRest(res.data.businesses);
      }catch(err){
        console.log(err)
      }
    }
    getR();
  }, [coordinates, ordertype, bounds]);

  const changeType = (e) => {
    e.preventDefault();
    setOrdertype(e.target.name);
    axios.post('/yelp', {coordinates, ordertype: e.target.name})
    .then((res) => setRest(res.data.businesses))
    .catch((err) => console.log(err));
  }

  return (
    <div className = 'location' >
      <div className = 'restlist'>
        <div className="locationBtn">
          <button className= {ordertype === 'res' ? 'resSelected' : "restuarants"} name="res" onClick={changeType}>Restuarants</button>
          <button  className= {ordertype === 'gro' ? 'groSelected' : "groceries"} name="gro" onClick={changeType}>Grocery Stores</button>
        </div>
        <div className = 'yelps'>
        {rest.length>0? rest.map((resta) => <Rest key={resta.id} resta={resta}/>) : (<></>)}
        </div>
        </div>
      <div className = 'map'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_TOKEN }}
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
            <LocationOnIcon styles={{color: "#DA2C38" }} fontSize="large" />
          </div>
        ))}
        </GoogleMapReact>
      </div>
    </div>

  )
}
