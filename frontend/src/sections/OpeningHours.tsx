import type { OpeningHours as OpeningHoursType } from '@backend-types/types';
import RichText from '../utils/RichText';

type Props = {
	data: OpeningHoursType.OpeningHours_Plain;
};

export default function OpeningHours({ data }: Props) {
	const { title, left_column, right_column } = data;

	return (
		<section id="opening-hours" className="sect-txt bg-color-3">
			<div className="sect-inner">
				<div className="container">
					<div className="title-sect">
						<h2 className="h1-title">
							<span>{title}</span>
						</h2>
					</div>
					<div className="txt-box color-dark">
						<div className="row justify-content-center">
							<RichText className="col-lg-6">{left_column}</RichText>
							<RichText className="col-lg-6">{right_column}</RichText>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
