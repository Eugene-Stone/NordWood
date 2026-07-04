import type { Map as MapType } from '@backend-types/types';

type MapProps = {
	data: MapType.Map_Plain;
};

export default function MapSect({ data }: MapProps) {
	return <h1>{data.title}</h1>;
}
