import type { TextSection as TextSectionType } from '@backend-types/types';
import RichText from '../utils/RichText';

type Props = {
	data: TextSectionType.TextSection_Plain;
};

export default function TextSection({ data }: Props) {
	const { title, text } = data;

	return (
		<section className="sect-txt">
			<div className="sect-inner">
				<div className="container">
					{title && (
						<div className="title-sect">
							<h1 className="h1-title">
								<span>{title}</span>
							</h1>
						</div>
					)}
					<div className="txt-box">
						<div className="row justify-content-center">
							<RichText className="col-lg-12">{text}</RichText>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
