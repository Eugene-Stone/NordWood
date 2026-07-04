import { useState } from 'react';
import type { GalleryComponent } from '@backend-types/types';
import { BACKEND_URL } from '../../CONSTANTS';

import { MasonryPhotoAlbum } from 'react-photo-album';
import 'react-photo-album/masonry.css';

import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

type GalleryProps = {
	data: GalleryComponent.GalleryComponent_Plain;
};

export default function Gallery({ data }: GalleryProps) {
	const [index, setIndex] = useState(-1);

	const { title, gallery } = data;
	const images = gallery?.images;

	const slides = images?.map((img, i) => {
		// console.log(img.url);
		return { src: BACKEND_URL + img.url };
	});

	const photos =
		images?.map((image) => ({
			src: BACKEND_URL + image.url,
			width: image.width,
			height: image.height,
			alt: image.alternativeText ?? '',
		})) ?? [];

	return (
		<section id="gallery" className="sect-gallery bg-color-1">
			<div className="sect-inner">
				{title && (
					<div className="container">
						<div className="title-sect">
							<h2 className="h1-title">{title}</h2>
						</div>
					</div>
				)}

				<div className="container-fluid">
					<div className="gallery-box masonry-box">
						{/* Old code */}
						<div className="gallery-lst masonry-lst hidden">
							{images?.map((image, i) => {
								return (
									<div key={i} className="gallery-itm masonry-itm">
										<span className="gallery-itm-lnk">
											<img
												src={BACKEND_URL + image.url}
												className="main-img"
												onClick={() => setIndex(i)}
												alt={
													image.alternativeText
														? image.alternativeText
														: ''
												}
											/>
										</span>
									</div>
								);
							})}
						</div>

						<MasonryPhotoAlbum
							photos={photos}
							columns={(containerWidth) => {
								if (containerWidth < 768) return 1;
								if (containerWidth < 992) return 2;
								return 3;
							}}
							// spacing={30}
							spacing={(containerWidth) => {
								if (containerWidth < 768) return 10;
								if (containerWidth < 992) return 20;
								return 30;
							}}
							onClick={({ index }) => setIndex(index)}
						/>

						{slides && (
							<Lightbox
								index={index}
								slides={slides}
								open={index >= 0}
								close={() => setIndex(-1)}
								plugins={[Counter]}
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
