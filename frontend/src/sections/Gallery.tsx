import { useEffect, useRef, useState } from 'react';

import type { GalleryComponent } from '@backend-types/types';
import { BACKEND_URL } from '../../CONSTANTS';

import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import Lightbox from 'yet-another-react-lightbox';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/counter.css';

type Props = {
	data: GalleryComponent.GalleryComponent_Plain;
};

export default function Gallery({ data }: Props) {
	const { title, gallery } = data;
	console.log(gallery);

	const [index, setIndex] = useState(-1);

	const masonryRef = useRef<HTMLDivElement>(null);
	const masonryInstance = useRef<Masonry | null>(null);

	const images = gallery?.images;

	const slidesLightbox = images?.map((img, i) => {
		return { src: BACKEND_URL + img.url };
	});

	// Создание
	useEffect(() => {
		if (!masonryRef.current) return;

		masonryInstance.current = new Masonry(masonryRef.current, {
			itemSelector: '.gallery-itm',
			percentPosition: true,
		});

		return () => {
			masonryInstance.current?.destroy?.();
			masonryInstance.current = null;
		};
	}, []);

	// Когда изображения изменились:
	useEffect(() => {
		if (!masonryRef.current || !masonryInstance.current) return;

		imagesLoaded(masonryRef.current, () => {
			masonryInstance.current?.reloadItems?.();
			masonryInstance.current?.layout?.();
		});
	}, [images]);

	// При изменении размера окна
	useEffect(() => {
		const resize = () => masonryInstance.current?.layout?.();

		window.addEventListener('resize', resize);

		return () => window.removeEventListener('resize', resize);
	}, []);

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
						<div ref={masonryRef} className="gallery-lst masonry-lst">
							{images?.map((image, i) => {
								const formatsArray = image?.formats
									? Object.entries(image.formats)
											.map(([key, value]) => ({
												type: key, // 'large', 'medium', 'small', 'thumbnail'
												...value, // copy url, width, height...
											}))
											.sort((a, b) => b.width - a.width)
									: [];

								// console.log(formatsArray);

								return (
									<div key={i} className="gallery-itm masonry-itm">
										<span className="gallery-itm-lnk">
											<picture>
												{formatsArray.length > 0 && (
													<source
														srcSet={formatsArray
															.map(
																(format) =>
																	`${BACKEND_URL}${format.url} ${format.width}w`,
															)
															.join(', ')}
														sizes="
															(min-width: 992px) 33vw,
															50vw
														"
													/>
												)}

												<img
													src={BACKEND_URL + image.url}
													className="main-img"
													onClick={() => setIndex(i)}
													alt={
														image.alternativeText
															? image.alternativeText
															: ''
													}
													width={image.width}
													height={image.height}
													loading="lazy"
												/>
											</picture>
										</span>
									</div>
								);
							})}
						</div>

						{slidesLightbox && (
							<Lightbox
								index={index}
								slides={slidesLightbox}
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
