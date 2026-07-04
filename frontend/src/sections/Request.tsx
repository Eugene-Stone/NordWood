import type { Request as RequestType } from '@backend-types/types';

type Props = {
	data: RequestType.Request_Plain;
};

export default function Request({ data }: Props) {
	const { title, form } = data;
	// console.log(form);

	return (
		<section id="request" className="sect-request bg-color-2">
			<div className="sect-inner">
				<div className="container">
					{title && (
						<div className="title-sect">
							<h2 className="h1-title">
								<span>{title}</span>
							</h2>
						</div>
					)}
					<div className="txt-box color-light">
						<div className="row justify-content-center">
							<div className="col-lg-12">
								<h2>Расскажите о своем проекте</h2>
								<p>
									Заполните форму, чтобы получить предварительную консультацию и
									расчет стоимости изготовления мебели. Наш специалист свяжется с
									вами, уточнит детали проекта и поможет подобрать оптимальное
									решение.
								</p>
								<form action="#" method="post" className="form__request">
									<div className="row">
										<div className="col-md-6">
											<p>
												<label>Ваше имя</label>
												<br />
												<input
													type="text"
													name="name"
													placeholder="Введите имя"
												/>
											</p>
										</div>
										<div className="col-md-6">
											<p>
												<label>Телефон</label>
												<br />
												<input
													type="tel"
													name="phone"
													placeholder="+7 (___) ___-__-__"
												/>
											</p>
										</div>
										<div className="col-md-6">
											<p>
												<label>E-mail</label>
												<br />
												<input
													type="email"
													name="email"
													placeholder="example@mail.com"
												/>
											</p>
										</div>
										<div className="col-md-6">
											<p>
												<label>Тип изделия</label>
												<br />
												<select name="product">
													<option>Выберите вариант</option>
													<option>Кухня</option>
													<option>Шкаф</option>
													<option>Гардеробная</option>
													<option>Лестница</option>
													<option>Стол</option>
													<option>Другое</option>
												</select>
											</p>
										</div>
										<div className="col-md-12">
											<p>
												<label>Предпочитаемый материал</label>
												<br />
												<label>
													<input
														type="radio"
														name="material"
														defaultValue="oak"
													/>
													Массив дуба
												</label>
												<label>
													<input
														type="radio"
														name="material"
														defaultValue="ash"
													/>
													Ясень
												</label>
												<label>
													<input
														type="radio"
														name="material"
														defaultValue="pine"
													/>
													Сосна
												</label>
											</p>
										</div>
										<div className="col-md-12">
											<p>
												<label>Дополнительные услуги</label>
												<br />
												<label>
													<input
														type="checkbox"
														name="services[]"
														defaultValue="design"
													/>
													Разработка проекта
												</label>
												<label>
													<input
														type="checkbox"
														name="services[]"
														defaultValue="delivery"
													/>
													Доставка
												</label>
												<label>
													<input
														type="checkbox"
														name="services[]"
														defaultValue="installation"
													/>
													Монтаж
												</label>
											</p>
										</div>
										<div className="col-md-12">
											<p>
												<label>Описание проекта</label>
												<br />
												<textarea
													name="message"
													rows={6}
													placeholder="Опишите размеры, пожелания, стиль или особенности будущего изделия..."
													defaultValue={''}
												/>
											</p>
										</div>
										<div className="col-md-12">
											<p>
												<label>
													<input type="checkbox" required />Я согласен на
													обработку персональных данных.
												</label>
											</p>
										</div>
										<div className="col-md-12">
											<div className="btn-more-wrap">
												<button type="submit" className="btn">
													<span>Отправить заявку</span>
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
