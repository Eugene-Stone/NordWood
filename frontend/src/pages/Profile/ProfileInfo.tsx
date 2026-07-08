import React, { useEffect, useState } from 'react';
import qs from 'qs';
import useAuthContext from '../../context/AuthContext/useAuthContext';

import type { review } from '@backend-types/types';
import { AuthUser } from '../../types';
import request from '../../api/request';

export default function ProfileInfo() {
	const { jwt, user } = useAuthContext();
	const [dataUser, setDataUser] = useState<AuthUser | null>(null);

	return (
		<form className="nw-auth-form" action="#" method="POST">
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-firstname">
					Никнейм
				</label>
				<input
					className="nw-auth-input"
					type="text"
					id="profile-firstname"
					required
					readOnly
					defaultValue={user?.username}
				/>
			</div>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-email">
					Электронная почта
				</label>
				<input
					className="nw-auth-input"
					type="email"
					id="profile-email"
					required
					readOnly
					defaultValue={user?.email}
					autoComplete="email"
				/>
			</div>
			<div className="nw-auth-group">
				<label className="nw-auth-label" htmlFor="profile-phone">
					Телефон
				</label>
				<input
					className="nw-auth-input"
					type="tel"
					id="profile-phone"
					defaultValue="+7 (999) 000-00-00"
				/>
			</div>
			<button className="nw-auth-button" type="submit" style={{ maxWidth: 200 }}>
				Сохранить данные
			</button>
		</form>
	);
}
