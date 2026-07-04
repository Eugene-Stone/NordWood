import type { About as AboutType } from '@backend-types/types';
import RichText from '../utils/RichText';
import { BACKEND_URL } from '../../CONSTANTS';

type Props = {
	data: AboutType.About_Plain;
};
export default function About({ data }: Props) {
	const { title, text, image } = data;
	return (
		<section id="about" className="sect-txt bg-color-1">
			<div className="sect-inner">
				<div className="container">
					{title && (
						<div className="title-sect">
							<h2 className="h1-title">
								<span>{title}</span>
							</h2>
						</div>
					)}
					<div className="txt-box color-dark">
						<div className="row justify-content-center">
							<div className="col-lg-6">
								{image && (
									<img
										src={BACKEND_URL + image.url}
										alt={image.alternativeText}
										width={image.width}
										height={image.height}
									/>
								)}
							</div>
							<div className="col-lg-6">
								<RichText>{text}</RichText>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
