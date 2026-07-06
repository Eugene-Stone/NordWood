import {
	form as FormType,
	FormInput,
	FormCheckboxes,
	FormRadio,
	FormSelect,
	FormSubmit,
	FormTextarea,
} from '@backend-types/types';

type Props = {
	data: FormType.Form_Plain;
};

type WithComponent<T, C extends string> = T & {
	__component: C;
};

type FormField =
	| WithComponent<FormInput.FormInput_Plain, 'forms.form-input'>
	| WithComponent<FormCheckboxes.FormCheckboxes_Plain, 'forms.form-checkboxes'>
	| WithComponent<FormRadio.FormRadio_Plain, 'forms.form-radio'>
	| WithComponent<FormSelect.FormSelect_Plain, 'forms.form-select'>
	| WithComponent<FormTextarea.FormTextarea_Plain, 'forms.form-textarea'>
	| WithComponent<FormSubmit.FormSubmit_Plain, 'forms.form-submit'>;

export default function Form({ data }: Props) {
	const { title, description, submitUrl, successMessage, errorMessage, fields } = data;

	console.log(fields);

	return (
		<div className="form-box color-light">
			<div className="row justify-content-center">
				<div className="col-lg-12">
					{title && <h2>{title}</h2>}
					{description && <p>{description}</p>}
					<br />
					<br />
					<form action="#" method="post" className="form__request">
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
														type={field.type}
														name={field.name}
														placeholder={field.placeholder}
														required={field.isRequired}
													/>
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
														name={field.name}
														placeholder={field.placeholder}
														rows={6}
														required={field.isRequired}
													/>
												</p>
											</div>
										);

									case 'forms.form-select':
										return (
											<div key={i} className="col-md-6">
												<p>
													<label>{field.label}</label>
													<br />
													<select name="product">
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
																	type={field.type}
																	name={field.name}
																	defaultValue={item.value}
																	checked={item.isChecked}
																/>
																{item.title}
															</label>
														);
													})}
												</p>
											</div>
										);
									case 'forms.form-submit':
										return (
											<div key={i} className="col-md-12">
												<div className="btn-more-wrap">
													<button type="submit" className="btn">
														<span>{field.label}</span>
													</button>
												</div>
											</div>
										);
								}
							})}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
