import type { About as AboutType } from '@backend-types/types';

type AboutProps = {
	data: AboutType.About_Plain;
};
export default function About({ data }: AboutProps) {
	return <div>About</div>;
}
