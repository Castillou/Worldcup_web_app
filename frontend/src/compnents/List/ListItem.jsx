import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate, useSubmit } from 'react-router-dom';
import styled from 'styled-components';
import PasswordModal from './PasswordModal';

const ListItemContainer = styled.li`
	width: 34rem;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
	border-radius: 2rem;
	overflow: hidden;

	h2 {
		font-weight: 600;
		padding: 2rem 2rem 1rem;
		font-size: 2rem;
		position: relative;

		&::after {
			position: absolute;
			right: 2rem;
			font-size: 1rem;
			text-align: center;
			line-height: 1rem;
			content: '';

			width: 2rem;
			height: 2rem;
			border-radius: 50%;
			border: 5px solid transparent;
			border-color: ${({ option }) => {
				if (option === 'personal') {
					return '#435dd8';
				} else if (option === 'friends') {
					return '#FC5185';
				}
			}};
		}
	}

	p {
		padding: 0.5rem 2rem 1.5rem;
		font-size: 1.5rem;
		font-weight: 300;
	}
`;

const ImgBox = styled.div`
	width: 100%;
	background-color: #efefef;
	display: flex;

	img {
		width: 50%;
		height: 23rem;
		object-fit: cover;
	}
`;

const ButtonContainer = styled.div`
	padding: 0 2rem 1.5rem;
	display: flex;
	gap: 1rem;
`;

const Button = styled.button`
	flex: 1;
	border: none;
	border-radius: 2rem;
	padding: 0;
	cursor: pointer;
	background-color: #efefef;

	overflow: hidden;

	&.start_btn {
		display: block;
		width: 100%;
		padding: 0.8rem 0;
		background-color: #ff3d3d;
		color: #fff;
		font-weight: 600;
	}

	&.start_btn:hover {
		background-color: #ff7a7a;
	}

	&:hover {
		background-color: #f9f9f9;
	}
`;

/* eslint-disable react/prop-types */
export default function ListItem({
	id,
	img,
	title,
	description,
	radio,
	name,
	password,
}) {
	const submit = useSubmit();
	const navigate = useNavigate();
	const username = localStorage.getItem('username');
	const [showModal, setShowModal] = useState(false);

	const deleteItemHandler = () => {
		const doubleCheck = window.confirm('정말 삭제하시겠습니까?');

		if (doubleCheck) {
			submit({ id }, { method: 'delete' });
		}
	};

	const handleShowModal = () => {
		if (radio === 'friends') {
			setShowModal(true);
		} else {
			navigate(`/list/${id}`);
		}
	};

	return (
		<ListItemContainer option={radio}>
			{showModal &&
				createPortal(
					<PasswordModal
						password={password}
						id={id}
						onClose={() => setShowModal(false)}
					/>,
					document.body
				)}
			<ImgBox>
				<img src={img[0]} />
				<img src={img[1]} />
			</ImgBox>
			<h2>{title}</h2>
			<p>{description}</p>
			<ButtonContainer>
				<Button className="start_btn" onClick={handleShowModal}>
					시작하기
				</Button>
				{username === name && (
					<>
						<Button>
							<Link to={`/${username}/edit/${id}`}>수정하기</Link>
						</Button>
						<Button onClick={deleteItemHandler}>삭제</Button>
					</>
				)}
			</ButtonContainer>
		</ListItemContainer>
	);
}

// const passwordInput = window.prompt('비밀번호를 입력해주세요.');

// if (passwordInput === null) {
// 	return;
// }
// if (passwordInput === password) {
// 	navigate(`/list/${id}`);
// 	return;
// }
// if (passwordInput.trim() === '') {
// 	window.alert('비밀번호를 입력해주세요.');
// 	return;
// }
// if (passwordInput !== password) {
// 	window.alert('비밀번호를 일치하지 않습니다.');
// }
