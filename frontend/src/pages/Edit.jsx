import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../compnents/Interface/LoadingSpinner';
import TopButtons from '../compnents/Make/TopButtons';
import EditForm from '../compnents/Edit/EditForm';
import { useQuery } from '@tanstack/react-query';
import { loader as eventLoader } from '../util/loader/eventsLoader';

const Wrapper = styled.section`
	width: 100%;
	padding: 3rem 5rem;
`;

export default function EditPage() {
	const gameId = useParams().gameId;

	const { data, isPending } = useQuery({
		queryKey: ['events', gameId],
		queryFn: eventLoader,
	});

	let content;

	if (isPending) {
		content = <LoadingSpinner />;
	}

	if (data) {
		content = <EditForm method="patch" id={gameId} events={data} />;
	}

	return (
		<Wrapper>
			<TopButtons name="edit" />
			{content}
		</Wrapper>
	);
}
