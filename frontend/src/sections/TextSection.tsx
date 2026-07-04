import type { Hero as HeroType } from '@backend-types/types';

type HeroProps = {
	data: HeroType.Hero_Plain;
};

export default function Hero({ data }: HeroProps) {
	return <h1>{data.title}</h1>;
}
