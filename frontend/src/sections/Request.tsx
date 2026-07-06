import type { Request as RequestType } from '@backend-types/types';
import Form from '../components/Form';

type Props = {
	data: RequestType.Request_Plain;
};

export default function Request({ data }: Props) {
	const { title, form } = data;

	return (
		<section id="request" className="sect-request bg-color-2">
			<div className="sect-inner">
				<div className="container">
					{title && (
						<div className="title-sect">
							<h2 className="h1-title">
								<span>{title}</span>
							</h2>
						</div>
					)}

					{form && <Form data={form} />}
				</div>
			</div>
		</section>
	);
}
