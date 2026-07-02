import React from 'react';

export default function Header() {
	return (
		<>
			<header className="head-general">
				<div className="head-top ">
					<div className="container-fluid">
						<div className="head-line">
							<div className="head-cell">
								<div className="logo-wrap">
									<a href="/" className="logo">
										<img src="assets/img/logo.png" alt="NordWood" />
									</a>
								</div>
							</div>
							<div className="head-cell">
								<nav className="mnu-wrap">
									<div className="menu-header-menu-container">
										<ul className="main-mnu">
											<li>
												<a href="#service" aria-current="page">
													Наши услуги
												</a>
											</li>
											<li>
												<a href="#gallery" aria-current="page">
													Наши работы
												</a>
											</li>
											<li>
												<a href="#opening-hours" aria-current="page">
													Время работы
												</a>
											</li>
											<li>
												<a href="#about" aria-current="page">
													О компании
												</a>
											</li>
											<li>
												<a href="#map" aria-current="page">
													Как нас найти
												</a>
											</li>
											<li>
												<a href="page.html" aria-current="page">
													Страница
												</a>
											</li>
										</ul>
									</div>
								</nav>
								<div className="lang-choose hover-dropdown">
									<div className="hover-dropdown-btn">
										<span>Ru</span>
										<i className="hover-dropdown-ic">
											<svg
												width={24}
												height={25}
												viewBox="0 0 24 25"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M3.87039 6.66504L2.10039 8.43504L12.0004 18.335L21.9004 8.43504L20.1304 6.66504L12.0004 14.795L3.87039 6.66504V6.66504Z"
													fill="currentColor"
												/>
											</svg>
										</i>
									</div>
									<div className="lang-lst hover-dropdown-box">
										<div className="hover-dropdown-inner">
											<ul>
												<li>
													<a href="/ru/">Русский</a>
												</li>
												<li>
													<a href="/en/">English</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<button className="toggle-btn">
									<span />
								</button>
							</div>
						</div>
					</div>
				</div>
			</header>
			{/* header END */}
		</>
	);
}
