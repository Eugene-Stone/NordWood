import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type {
	form as FormType,
	FormInput,
	FormCheckboxes,
	FormSelect,
	FormSubmit,
	FormTextarea,
	FormAgree,
} from '@backend-types/types';
import request from '../api/request';

type Props = {
	data: FormType.Form_Plain;
};

type WithComponent<T, C extends string> = T & {
	__component: C;
};

type FormField =
	| WithComponent<FormInput.FormInput_Plain, 'forms.form-input'>
	| WithComponent<FormCheckboxes.FormCheckboxes_Plain, 'forms.form-checkboxes'>
	| WithComponent<FormSelect.FormSelect_Plain, 'forms.form-select'>
	| WithComponent<FormTextarea.FormTextarea_Plain, 'forms.form-textarea'>
	| WithComponent<FormSubmit.FormSubmit_Plain, 'forms.form-submit'>
	| WithComponent<FormAgree.FormAgree_Plain, 'forms.form-agree'>;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type FormValues = Record<string, string | string[] | boolean>;

export default function Form({ data }: Props) {
	const { title, description, submitUrl, successMessage, errorMessage, fields } = data;
	const [status, setStatus] = useState<FormStatus>('idle');

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormValues>({
		mode: 'onChange',
	});

	async function sendForm(values: FormValues) {
		setStatus('loading');

		try {
			await request<FormValues>(submitUrl, {
				method: 'POST',
				body: JSON.stringify({
					data: {
						formTitle: title,
						formData: values,
					},
				}),
			});

			setStatus('success');
			reset();

			setTimeout(() => {
				setStatus('idle');
			}, 2000);
		} catch (error) {
			setStatus('error');
		}
	}

	function onSubmit(data: FormValues) {
		sendForm(data);
	}

	return (
		<div className="form-box color-light">
			<div className="row justify-content-center">
				<div className="col-lg-12">
					{title && <h2>{title}</h2>}
					{description && <p>{description}</p>}
					<br />
					<br />
					<form
						className={status === 'loading' ? 'form__request sending' : 'form__request'}
						onSubmit={handleSubmit(onSubmit)}>
						<div className="row">
							{fields?.map((field: FormField, i: number) => {
								switch (field.__component) {
									case 'forms.form-input':
										return (
											<div key={i} className="col-md-6">
												<p>
													<label>{field.label}</label>
													<br />
													<input
														{...register(field.name, {
															required: field.isRequired
																? 'This field is required'
																: false,
														})}
														type={field.type}
														placeholder={field.placeholder}
													/>

													{errors[field.name] && (
														<span className="error-field">
															{errors[field.name]?.message ||
																`${field.name} field error message.`}
														</span>
													)}
												</p>
											</div>
										);

									case 'forms.form-textarea':
										return (
											<div key={i} className="col-md-12">
												<p>
													<label>{field.label}</label>
													<br />
													<textarea
														{...register(field.name, {
															required: field.isRequired
																? 'This field is required'
																: false,
														})}
														placeholder={field.placeholder}
														rows={6}
													/>
													{errors[field.name] && (
														<span className="error-field">
															{errors[field.name]?.message ||
																`${field.name} field error message.`}
														</span>
													)}
												</p>
											</div>
										);

									case 'forms.form-select':
										return (
											<div key={i} className="col-md-6">
												<p>
													<label>{field.label}</label>
													<br />
													<select
														{...register(field.name, {
															required: field.isRequired
																? 'This field is required'
																: false,
														})}
														aria-label="Выберите вариант мебели">
														{field.options.map((option, i) => {
															return (
																<option
																	key={i}
																	value={option.value}>
																	{option.label}
																</option>
															);
														})}
													</select>
													{errors[field.name] && (
														<span className="error-field">
															{errors[field.name]?.message ||
																`${field.name} field error message.`}
														</span>
													)}
												</p>
											</div>
										);

									case 'forms.form-checkboxes':
										return (
											<div key={i} className="col-md-12">
												<p>
													<label>{field.label}</label>
													<br />
													{field.items.map((item, i) => {
														return (
															<label key={i}>
																<input
																	{...register(field.name)}
																	type={field.type}
																	value={
																		item.value
																			? item.value
																			: field.name
																	}
																	defaultChecked={item.isChecked}
																/>
																{item.title}
															</label>
														);
													})}
												</p>
											</div>
										);

									case 'forms.form-agree':
										return (
											<div key={i} className="col-md-12">
												<p>
													<label>
														<input
															{...register(field.name, {
																required: 'This field is required',
															})}
															type="checkbox"
														/>
														{field.label}
													</label>
												</p>
											</div>
										);
									case 'forms.form-submit':
										return (
											<div key={i} className="col-md-12">
												<div className="btn-more-wrap">
													<button
														type="submit"
														className={`btn ${isValid ? '' : 'disabled'} ${status === 'loading' ? 'disabled' : ''}`}>
														<span>{field.label}</span>
													</button>
												</div>
											</div>
										);
								}
							})}
						</div>

						{status === 'success' && <p className="success-field">{successMessage}</p>}
						{status === 'error' && <p className="error-field">{errorMessage}</p>}
					</form>
				</div>
			</div>
		</div>
	);
}
