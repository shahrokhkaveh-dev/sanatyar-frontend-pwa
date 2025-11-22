'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ShowMessage } from '@/util/ShowMessage';

export default function MapRoute({ lat, lng, t }) {
    const [userPos, setUserPos] = useState(null);
    const [distance, setDistance] = useState(null);
    const [message, setMessage] = useState("")

    console.log(lat, lng)

    const userIcon = new L.Icon({
        iconUrl: '/location.svg',
        iconSize: [30, 30], // سایز آیکون
        iconAnchor: [20, 40], // نقطه‌ای که به مکان اشاره کند
    });

    const targetIcon = new L.Icon({
        iconUrl: '/building.svg',
        iconSize: [30, 30],
        iconAnchor: [20, 40],
    });

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                const userLocation = [latitude, longitude];
                const targetLocation = [lat, lng];

                const d =
                    L.latLng(userLocation).distanceTo(L.latLng(targetLocation)) / 1000; // km
                setDistance(d.toFixed(2));
                setUserPos(userLocation);
            },
            () => {
                ShowMessage(t?.location_not_available || "موقعیت مکانی شما در دسترس نیست", setMessage)
            }
        );
    }, [lat, lng]);

    return (
        <div className="w-full h-full relative">
            {message && <p className='errortag'>{message}</p>}
            <MapContainer
                center={userPos || [lat, lng]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {userPos && <Marker position={userPos} icon={userIcon} />}
                <Marker position={[lat, lng]} icon={targetIcon} />

                {userPos && (
                    <Polyline positions={[userPos, [lat, lng]]} color="blue" />
                )}
            </MapContainer>

            {distance && (
                <div className="absolute bottom-2 left-2 bg-white/80 p-2 rounded text-sm">
                    {t?.distance || "مسافت"}: {distance} {t?.kilometers || "کیلومتر"}
                </div>
            )}
        </div>
    );
}
