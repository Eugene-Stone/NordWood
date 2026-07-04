import ReactMarkdown from 'react-markdown';
import type { Hero as HeroType } from '@backend-types/types';
import { BACKEND_URL } from '../../CONSTANTS';

type Props = {
	data: HeroType.Hero_Plain;
};

export default function Hero({ data }: Props) {
	const { title, text, image } = data;

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
										<img src={BACKEND_URL + image.url} alt="NordWood" />
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
