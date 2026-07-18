import ReactMarkdown from 'react-markdown';
import type { Hero as HeroType } from '@backend-types/types';
import { BACKEND_URL } from '@/lib/constants';

type Props = {
	data: HeroType.Hero_Plain;
};

export default function Hero({ data }: Props) {
	const { title, text, image } = data;
	const srcSetOn = image?.formats;

	return (
		<section className="top-screen bg-color-1">
			<div className="sect-inner">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							{title && (
								<div className="title-sect">
									<h2 className="h1-title">{title}</h2>
								</div>
							)}
							{text && (
								<div className="txt-box">
									<ReactMarkdown>{text}</ReactMarkdown>
								</div>
							)}
						</div>
						<div className="col-lg-6">
							{image && (
								<div className="top-screen-image-box">
									<div className="top-screen-image">
										<picture>
											{srcSetOn && (
												<source
													srcSet={`
														${BACKEND_URL + image.formats.large.url} ${image.formats.large.width}w,
														${BACKEND_URL + image.formats.medium.url} ${image.formats.medium.width}w,
														${BACKEND_URL + image.formats.small.url} ${image.formats.small.width}w,
														${BACKEND_URL + image.formats.thumbnail.url} ${image.formats.thumbnail.width}w,
													`}
													sizes="
														(min-width: 1200px) 625px,
														(min-width: 992px) 476px,
														(min-width: 576px) 400px,
														100vw
													"
												/>
											)}

											<img
												src={BACKEND_URL + image.url}
												alt={title}
												width={image.width}
												height={image.height}
												// loading="lazy"
												fetchPriority="high"
											/>
										</picture>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
