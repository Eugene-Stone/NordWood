import type { Request as RequestType } from '@backend-types/types';

type RequestProps = {
	data: RequestType.Request_Plain;
};

export default function Request({ data }: RequestProps) {
	return <div>{data.title}</div>;
}
