"use client";

import { GeoCord, GeoPath } from '@prisma/client';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import Content from './Content';

type PathMap = {
  path:GeoPath,
  cords:GeoCord[]
};


const MyMap = dynamic(() => import('./Content'), { ssr: false});

const position: LatLngTuple = [51.800766, 19.998566];

export default function PathMap({cords,path}:PathMap) {
  return (
    <div>
      <MyMap cords={cords} path={path} />
    </div>
  );
}
