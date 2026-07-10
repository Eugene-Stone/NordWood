import { useEffect, useState } from 'react';
import useAuthContext from '../../context/AuthContext/useAuthContext';

import { BACKEND_URL } from '../../../CONSTANTS';
import useProtectRoute from '../../utils/useProtectRoute';
import { useForm } from 'react-hook-form';
import { updateProfile } from '../../api/apiAuth';
import FormDataChange from './components/FormDataChange';
import FormPasswordChange from './components/FormPasswordChange';

export default function ProfileInfo() {
	const { jwt, user } = useAuthContext();

	const [edit, setEdit] = useState(false);
	const [editPass, setEditPass] = useState(false);

	useProtectRoute('/login');

	console.log(user);

	if (edit) {
		return <FormDataChange user={user!} jwt={jwt!} edit={edit} setEdit={setEdit} />;
	} else if (editPass) {
		return <FormPasswordChange jwt={jwt!} editPass={editPass} setEditPass={setEditPass} />;
	} else {
		return (
			<div className="nw-auth-form">
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="profile-firstname">
						Аватар
					</label>
					<img
						className="nw-auth-image"
						src={BACKEND_URL + user?.avatar?.url}
						alt={user?.username}
					/>
				</div>
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="profile-firstname">
						Никнейм
					</label>
					<strong>{user?.username}</strong>
				</div>
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="profile-email">
						Электронная почта
					</label>
					<strong>{user?.email}</strong>
				</div>
				<div className="nw-auth-group">
					<label className="nw-auth-label" htmlFor="profile-password">
						<button onClick={() => setEditPass(true)}>Сменить пароль</button>
					</label>
				</div>
				<button className="nw-auth-button" type="button" onClick={() => setEdit(true)}>
					Редактировать данные
				</button>
			</div>
		);
	}
}
