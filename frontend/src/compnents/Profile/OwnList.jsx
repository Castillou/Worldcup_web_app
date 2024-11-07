import styled from 'styled-components';
import ListItemComp from '../List/ListItemComp';

const ListSection = styled.section`
	width: 100%;
	padding: 5rem 0;
`;

const ListBox = styled.ul`
	list-style-type: none;
	width: 100%;
	gap: 2.3rem;
	display: flex;
	flex-wrap: wrap;
`;

/* eslint-disable react/prop-types */
export default function OwnList({ events }) {
	const username = localStorage.getItem('username');

	events = events.filter(
		(item) => item.radio === 'personal' && item.username === username
	);

	return (
		<ListSection>
			<ListBox>
				{events.map((item) => (
					<ListItemComp
						key={item.id}
						id={item.id}
						img={item.images}
						title={item.title}
						description={item.description}
						radio={item.radio}
					/>
				))}
			</ListBox>
		</ListSection>
	);
}