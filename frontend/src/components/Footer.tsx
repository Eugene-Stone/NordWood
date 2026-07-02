import React from 'react';

export default function Footer() {
	return (
		<>
			<footer className="foot-general">
				<div className="container-fluid">
					<div className="foot-line">
						<div className="foot-cell">
							<div className="logo-wrap">
								<a href="/" className="logo">
									<img src="assets/img/logo.png" alt="NordWood" />
								</a>
							</div>
						</div>
						<div className="foot-cell">
							<div className="f-itm">
								<ul>
									<li>
										Изготовление мебели и изделий из натурального дерева по
										индивидуальным проектам.
									</li>
								</ul>
							</div>
							<div className="flex-line">
								<div className="copyright">
									2026 © NordWood. Все права защищены.
								</div>
								<nav className="foot-nav">
									<ul>
										<li>
											<a href="/privacy-policy">
												Политика конфиденциальности
											</a>
										</li>
										<li>
											<a href="/terms">Пользовательское соглашение</a>
										</li>
									</ul>
								</nav>
							</div>
							<div className="f-itm">
								Мастерская мебели и изделий из массива дерева.
								<ul>
									<li>
										<a href="/">NordWood</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</footer>
			{/* footer END */}
		</>
	);
}
