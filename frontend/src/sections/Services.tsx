import ReactMarkdown from 'react-markdown';

import type { Hero as HeroType } from '@backend-types/types';

type Props = {
	data: HeroType.Hero_Plain;
};

export default function Services({ data }: Props) {
	const { title, text, image } = data;

	// console.log(data);

	return (
		<section id="service" className="sect-txt bg-color-2">
			<div className="sect-inner">
				<div className="container">
					<div className="title-sect">
						{title && (
							<h2 className="h1-title">
								<span>{title}</span>
							</h2>
						)}
					</div>
					{text && (
						<div className="txt-box color-light">
							<div className="row justify-content-center">
								<div className="col-lg-12">
									<ReactMarkdown>{text}</ReactMarkdown>
								</div>
							</div>
						</div>
					)}

					{/* <div className="btn-more-wrap">
						<a href="/" className="btn">
							<span>Смотреть каталог</span>
						</a>
					</div> */}
				</div>
			</div>
		</section>
	);
}
