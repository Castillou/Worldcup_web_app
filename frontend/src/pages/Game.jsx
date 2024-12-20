import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import OptionBox from '../compnents/Game/OptionBox';
import LoadingSpinner from '../UI/LoadingSpinner';
import ErrorBlock from '../UI/ErrorBlock';
import { loader as eventLoader } from '../util/loader/eventsLoader';

const Wrapper = styled.section`
	width: 100%;
	padding: 0 5rem;
`;

export default function GamePage() {
	const gameId = useParams().gameId;

	const { data, isPending, isError, error } = useQuery({
		queryKey: ['events', gameId],
		queryFn: eventLoader,
	});

	let content;

	if (isPending) {
		content = <LoadingSpinner />;
	}

	if (isError) {
		content = (
			<ErrorBlock
				title="An error occurred"
				message={error.info?.message || 'Failed to fetch events'}
			/>
		);
	}

	if (data) {
		content = <OptionBox events={data} />;
	}

	return <Wrapper>{content}</Wrapper>;
}
