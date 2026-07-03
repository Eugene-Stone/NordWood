import React from 'react';

export default function Home() {
	return (
		<>
			<section className="top-screen bg-color-1">
				<div className="sect-inner">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-6">
								<div className="title-sect">
									<h2 className="h1-title">
										<span>
											Мебель из дерева
											<br />
											для дома
											<br />и бизнеса
										</span>
									</h2>
								</div>
								<div className="txt-box">
									<h2>Добро пожаловать в NordWood</h2>
									<p>
										Мы создаем мебель и интерьерные решения из натурального
										дерева, сочетая современные технологии производства с
										мастерством опытных специалистов. Каждое изделие
										разрабатывается индивидуально, чтобы идеально
										соответствовать размерам помещения, стилю интерьера и
										пожеланиям заказчика. Используем качественные материалы,
										надежную фурнитуру и уделяем внимание каждой детали,
										обеспечивая долговечность, комфорт и привлекательный внешний
										вид готовой продукции.
									</p>
								</div>
								{/* txt-box */}
							</div>
							<div className="col-lg-6">
								<div className="top-screen-image-box">
									<div className="top-screen-image">
										<img src="assets/img/inner/1.png" alt="NordWood" />
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* container END */}
				</div>
				{/* sect-inner */}
			</section>
			{/* section */}
			<section id="service" className="sect-txt bg-color-2">
				<div className="sect-inner">
					<div className="container">
						<div className="title-sect">
							<h2 className="h1-title">
								<span>Наши услуги</span>
							</h2>
						</div>
						<div className="txt-box color-light">
							<div className="row justify-content-center">
								<div className="col-lg-12">
									<h2>Проектирование, изготовление и монтаж мебели</h2>
									<p>
										NordWood предлагает изготовление кухонь, шкафов,
										гардеробных, лестниц, столов, тумб и других изделий из
										массива дерева и качественных древесных материалов. Каждый
										проект начинается с консультации и разработки дизайна, после
										чего мы выполняем производство и профессиональный монтаж.
										Благодаря индивидуальному подходу и вниманию к деталям
										готовая мебель гармонично дополняет интерьер и служит долгие
										годы.
									</p>
								</div>
							</div>
						</div>
						<div className="btn-more-wrap">
							<a href="/" className="btn">
								<span>Смотреть каталог</span>
							</a>
						</div>
					</div>
					{/* container END */}
				</div>
				{/* sect-inner */}
			</section>
			{/* section */}
			<section id="gallery" className="sect-gallery bg-color-1">
				<div className="sect-inner">
					<div className="container">
						<div className="title-sect">
							<h2 className="h1-title">Наши работы</h2>
						</div>
					</div>
					{/* container END */}
					<div className="container-fluid">
						<div className="gallery-box masonry-box">
							<div className="gallery-lst masonry-lst">
								<div className="gallery-itm masonry-itm">
									<a
										href="assets/img/inner/1.png"
										className="gallery-itm-lnk"
										data-fancybox="gallery-3">
										<img
											src="assets/img/inner/1.png"
											className="main-img"
											alt="Проект мебели"
										/>
									</a>
								</div>
								{/* gallery-itm */}
								<div className="gallery-itm masonry-itm">
									<a
										href="assets/img/inner/1.png"
										className="gallery-itm-lnk"
										data-fancybox="gallery-3">
										<img
											src="assets/img/inner/1.png"
											className="main-img"
											alt="Изделия из дерева"
										/>
									</a>
								</div>
								{/* gallery-itm */}
								<div className="gallery-itm masonry-itm">
									<a
										href="assets/img/inner/1.png"
										className="gallery-itm-lnk"
										data-fancybox="gallery-3">
										<img src="assets/img/inner/1.png" alt="Деревянная мебель" />
									</a>
								</div>
								{/* gallery-itm */}
								<div className="gallery-itm masonry-itm">
									<a
										href="assets/img/inner/1.png"
										className="gallery-itm-lnk"
										data-fancybox="gallery-3">
										<img
											src="assets/img/inner/1.png"
											className="main-img"
											alt="Мебель на заказ"
										/>
									</a>
								</div>
								{/* gallery-itm */}
								<div className="gallery-itm masonry-itm">
									<a
										href="assets/img/inner/1.png"
										className="gallery-itm-lnk"
										data-fancybox="gallery-3">
										<img
											src="assets/img/inner/1.png"
											className="main-img"
											alt="Интерьерные решения"
										/>
									</a>
								</div>
								{/* gallery-itm */}
							</div>
							{/* gallery-lst */}
						</div>
						{/* gallery-box */}
					</div>
					{/* container-fluid END */}
				</div>
				{/* sect-inner */}
			</section>
			{/* section */}
			<section id="opening-hours" className="sect-txt bg-color-3">
				<div className="sect-inner">
					<div className="container">
						<div className="title-sect">
							<h2 className="h1-title">
								<span>Время работы</span>
							</h2>
						</div>
						<div className="txt-box color-dark">
							<div className="row justify-content-center">
								<div className="col-lg-6">
									<h2>Мы работаем в удобное для клиентов время</h2>
								</div>
								<div className="col-lg-6">
									<p>
										Понедельник – Пятница: 09:00 – 18:00
										<br />
										Суббота: 10:00 – 15:00
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* container END */}
				</div>
				{/* sect-inner */}
			</section>
			{/* section */}
			<section id="about" className="sect-txt bg-color-1">
				<div className="sect-inner">
					<div className="container">
						<div className="title-sect">
							<h2 className="h1-title">
								<span>О компании</span>
							</h2>
						</div>
						<div className="txt-box color-dark">
							<div className="row justify-content-center">
								<div className="col-lg-6">
									<p>
										<img
											decoding="async"
											className="alignnone wp-image-71 size-full"
											src="assets/img/inner/1.png"
											alt="Мастерская NordWood"
											width={1257}
											height={917}
										/>
									</p>
								</div>
								<div className="col-lg-6">
									<p>
										NordWood — мастерская, специализирующаяся на изготовлении
										мебели и интерьерных изделий из натурального дерева. Мы
										работаем с индивидуальными проектами любой сложности,
										помогая создать функциональное и эстетичное пространство для
										дома, квартиры, офиса или коммерческого помещения. Каждый
										заказ проходит несколько этапов контроля качества — от
										разработки проекта до финальной установки.
									</p>
									<p>
										Мы используем современное оборудование, проверенные
										материалы и надежную фурнитуру, чтобы готовые изделия
										сохраняли внешний вид и функциональность на протяжении
										многих лет. Наши специалисты сопровождают клиента на всех
										этапах сотрудничества, предлагая оптимальные решения,
										учитывающие особенности помещения, бюджет и пожелания к
										будущему интерьеру.
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* container END */}
				</div>
				{/* sect-inner */}
			</section>
			{/* section */}
			<section id="map" className="sect-txt bg-color-1">
				<div className="sect-inner">
					<div className="container">
						<div className="title-sect">
							<h2
								className="h1-title"
								data-href="https://maps.app.goo.gl/U2ZhYnsoLQiTe97G6">
								Наше расположение
							</h2>
						</div>
						<div className="map-wrap">
							<iframe
								style={{ width: '100%', aspectRatio: '2/1' }}
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2136679.231455264!2d-103.58531241933014!3d39.06985229601624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2z0KHQvtC10LTQuNC90LXQvdC90YvQtSDQqNGC0LDRgtGLINCQ0LzQtdGA0LjQutC4!5e0!3m2!1sru!2sua!4v1782716046825!5m2!1sru!2sua"
								allowFullScreen
								loading="lazy"
								referrerPolicy="strict-origin-when-cross-origin"
							/>
						</div>
					</div>
					{/* container END */}
				</div>
				{/* sect-inner */}
			</section>
			{/* section */}
			<section id="request" className="sect-request bg-color-2">
				<div className="sect-inner">
					<div className="container">
						<div className="title-sect">
							<h2 className="h1-title">
								<span>Оставить заявку</span>
							</h2>
						</div>
						<div className="txt-box color-light">
							<div className="row justify-content-center">
								<div className="col-lg-12">
									<h2>Расскажите о своем проекте</h2>
									<p>
										Заполните форму, чтобы получить предварительную консультацию
										и расчет стоимости изготовления мебели. Наш специалист
										свяжется с вами, уточнит детали проекта и поможет подобрать
										оптимальное решение.
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
														<input type="checkbox" required />Я согласен
														на обработку персональных данных.
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
					{/* container END */}
				</div>
				{/* sect-inner */}
			</section>
			{/* section */}
			<section className="sect-txt">
				<div className="sect-inner">
					<div className="container">
						<div className="title-sect">
							<h1 className="h1-title">
								<span>Title section</span>
							</h1>
						</div>
						<div className="txt-box">
							<div className="row justify-content-center">
								<div className="col-lg-12">
									<h1>h1 - Title styles</h1>
									<h2>h2 - Title styles</h2>
									<h3>h3 - Title styles</h3>
									<h4>h4 - Title styles</h4>
									<h5>h5 - Title styles</h5>
									<h6>h6 - Title styles</h6>
									<p>
										Lorem ipsum dolor sit amet, <a href="#">Link styles</a>{' '}
										consectetur adipisicing elit. Laboriosam obcaecati magni
										quasi quod nam nesciunt.
									</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing
										elitLorem ipsum dolor sit amet, consectetur adipisicing elit
										. Laboriosam obcaecati magni quasi quod nam nesciunt.
									</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing elit.
										Laboriosam obcaecati magni quasi quod nam nesciunt.
									</p>
									<p>
										Lorem ipsum dolor sit amet, consectetur adipisicing
										elitLorem ipsum dolor sit amet, consectetur adipisicing elit
										. Laboriosam obcaecati magni quasi quod nam nesciunt.
									</p>
									<ol>
										<li>
											Füllen Sie die Stimm/-Wahlzettel aus und verschliessen
											Sie diese im Stimmkuvert oder in einem privaten,
											neutralen Kuvert.
										</li>
										<li>
											Unterschreiben Sie die untenstehende Erklärung. Ohne
											Unterschrift ist die Stimmabgabe ungültig.
										</li>
										<li>
											Legen Sie das Stimmkuvert oder das private neutrale
											Kuvert mit den Stimmzetteln und dem Stimmausweis mit der
											unterzeichneten Erklärung in das Zustellkuvert, mit dem
											Sie das Abstimmungsmaterial erhalten haben (oder in ein
											mit dem Vermerk «briefliche Stimmabgabe» versehenes
											privates Rücksendekuvert.)
										</li>
										<li>
											Das Zustellkuvert ist in der Folge entweder frankiert
											der Post zu übergeben oder in den von der Gemeinde
											bezeichneten Briefkasten der Gemeindeverwaltung
											einzuwerfen.
										</li>
									</ol>
									<ul>
										<li>
											Füllen Sie die Stimm/-Wahlzettel aus und verschliessen
											Sie diese im Stimmkuvert oder in einem privaten,
											neutralen Kuvert.
										</li>
										<li>
											Unterschreiben Sie die untenstehende Erklärung. Ohne
											Unterschrift ist die Stimmabgabe ungültig.
										</li>
										<li>
											Legen Sie das Stimmkuvert oder das private neutrale
											Kuvert mit den Stimmzetteln und dem Stimmausweis mit der
											unterzeichneten Erklärung in das Zustellkuvert, mit dem
											Sie das Abstimmungsmaterial erhalten haben (oder in ein
											mit dem Vermerk «briefliche Stimmabgabe» versehenes
											privates Rücksendekuvert.)
										</li>
										<li>
											Das Zustellkuvert ist in der Folge entweder frankiert
											der Post zu übergeben oder in den von der Gemeinde
											bezeichneten Briefkasten der Gemeindeverwaltung
											einzuwerfen.
										</li>
									</ul>
									<img src="assets/img/inner/3.jpg" alt="image" />
								</div>
							</div>
						</div>
						{/* txt-box */}
					</div>
				</div>
				{/* sect-inner */}
			</section>
			{/* section */}
		</>
	);
}
