'use client'

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ data, setdata, disabeld, t }) => {
    const [position, setPosition] = useState([35.6895, 51.3890]); // موقعیت پیش‌فرض تهران
    const [loading, setLoading] = useState(true);
    const [positionSetByData, setPositionSetByData] = useState(false); // تا فقط یک بار از data گرفته شه

    // اولویت با data هر وقت بیاد
    useEffect(() => {
        if (data.lat && data.lng && !positionSetByData) {
            setPosition([data.lat, data.lng]);
            setPositionSetByData(true);
            setLoading(false);
        }
    }, [data.lat, data.lng, positionSetByData]);

    useEffect(() => {
        if (disabeld) return
        setdata(prev => ({
            ...prev,
            lat: position[0],
            lng: position[1]
        }));
    }, [position]);

    const customIcon = new L.Icon({
        iconUrl: '/marker.png',
        iconSize: [35, 35],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    const ClickHandler = () => {
        if (disabeld) return

        useMapEvent("click", (e) => {
            const { lat, lng } = e.latlng;
            setPosition([lat, lng]);
            setPositionSetByData(true); // از این به بعد نذار دوباره data موقعیت رو تغییر بده
        });
        return null;
    };
    const ChangeMapView = ({ position }) => {
        const map = useMapEvent('click', () => { }); // یه راه برای گرفتن map
        useEffect(() => {
            if (position) {
                map.setView(position, map.getZoom());
            }
        }, [position]);
        return null;
    };



    return (
        <div className='h-full'>
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customIcon}>
                    <Popup>
                        {t?.current_position || "موقعیت فعلی شما"}
                    </Popup>
                </Marker>
                <ClickHandler />
                <ChangeMapView position={position} />
            </MapContainer>
        </div>
    );
};

export default MapComponent;
