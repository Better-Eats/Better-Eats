import './location.css'
import GoogleMapReact from 'google-map-react';
import {useEffect, useState} from 'react';
import Rest from '../../components/rest/Rest.js';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { HiLocationMarker } from 'react-icons/hi';
import axios from 'axios';
import Restdetail from '../../components/restdetail/Restdetail.js';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Grodetail from '../../components/grodetail/Grodetail.js'

import CircularProgress from '@mui/material/CircularProgress';

export default function Location(){
  const [rest, setRest] = useState([]);
  const [view, setView] = useState('map');
  const [clicked, setClicked] = useState();
  const [ordertype, setOrdertype] = useState('res');
  const [bounds, setBounds] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [loadingMap, setLoadingMap] = useState(true);
  const [loadingRest, setLoadingRest] = useState(true);

  useEffect(() => {
    setLoadingRest(true)
    setLoadingMap(true)
    navigator.geolocation.getCurrentPosition((data) => {
      setCoordinates({ lat: data.coords.latitude, lng: data.coords.longitude })
    })
  }, [])

  useEffect(() => {
    const getR = async() =>{
      try{
        const res = await axios.post('/yelp', {coordinates: coordinates , ordertype: ordertype});
        setLoadingMap(false)
        setLoadingRest(false)
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
    .then((res) => {
      setRest(res.data.businesses)
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className = 'location' >
    <div className = 'restlist'>
      <div className="locationBtn">
        <ToggleButtonGroup
          value={ordertype}
          exclusive
          color="primary"
        >
          <ToggleButton value="res" className={ordertype === "res" ? 'resSelected' : "restaurants"} onClick={changeType} name="res">
            Restaurants
          </ToggleButton>
          <ToggleButton value="gro" className={ordertype === "gro" ? 'groSelected': "groceries" }  onClick={changeType} name="gro">
            Grocery Stores
          </ToggleButton>
        </ToggleButtonGroup>

      </div>
        {loadingMap ?
        (<div className='loadingRest'>
          <CircularProgress size="10rem" />
          <p style={{ marginTop: '10px' }}>loading restaurants...</p>
        </div>):
        (<div className = 'yelps'>
          {rest.length>0? rest.map((resta) => <Rest key={resta.id} ordertype={ordertype} resta={resta} setView={setView} setClicked={setClicked}/>) : (<></>)}
        </div>)
        }
    </div>
    {view ==='map'? <div className = 'map'>
        <div className="LogoSearch">
          <div className="Search">
            <div className='s-icon'>
              <HiLocationMarker
                style={{
                  marginLeft: '10px',
                  marginRight: '5px',
                  fontSize: '20px'
                }}
              />
            </div>
            <input type='text' placeholder='412 S Wilton Pl.' />
          </div>
        </div>
        <div className='Googlemap'>
          {loadingMap ?
          <div className='loadingMap'>
            <CircularProgress size="13rem"/>
            <p style={{marginTop:'10px'}}>loading map...</p>
          </div>
          :
          (<GoogleMapReact
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
              <LocationOnIcon style={{ color: '#DA2C38'}} fontSize="large" />
            </div>
          ))}
          </GoogleMapReact>)
          }
        </div>
      </div> : view=== 'res' ? <Restdetail resta={clicked} setView={setView}/> : <Grodetail resta={clicked} setView={setView}/>}

    </div>
  )
}
