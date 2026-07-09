import type { Map as MapType } from '@backend-types/types';

type Props = {
	data: MapType.Map_Plain;
};

export default function MapSect({ data }: Props) {
	const { title, location } = data;
	const { lat, lng } = location;

	return (
		<section id="map" className="sect-txt bg-color-1">
			<div className="sect-inner">
				{title && (
					<div className="container">
						<div className="title-sect">
							<h2 className="h1-title">
								<a
									href={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
									target="_blank">
									{title}
								</a>
							</h2>
						</div>
					</div>
				)}
				<div className="container-fluid">
					<div className="map-wrap">
						<iframe
							style={{ width: '100%', aspectRatio: '2 / 1' }}
							src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
							loading="lazy"
							allowFullScreen
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
