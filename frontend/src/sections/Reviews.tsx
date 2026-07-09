// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { review as reviewType, Reviews as ReviewsType } from '@backend-types/types';
import { useEffect, useState } from 'react';
import request from '../api/request';

type Props = {
	data: ReviewsType.Reviews_Plain;
};

export default function Reviews({ data }: Props) {
	const { title } = data;
	const [reviews, setReviews] = useState<reviewType.Review_Plain[]>();

	useEffect(() => {
		async function fetchReviews() {
			try {
				const { data } = await request<{ data: reviewType.Review_Plain[] }>(
					'/reviews?populate=*',
				);
				// console.log(data);
				setReviews(data);
			} catch (error) {
				console.log(error instanceof Error ? error.message : 'Unknown error');
			}
		}

		fetchReviews();
	}, []);

	return (
		<section className="sect-reviews">
			<div className="container">
				{title && (
					<div className="title-sect">
						<h2 className="h1-title">
							<span>{title}</span>
						</h2>
					</div>
				)}
			</div>

			<div className="reviews__slider swiper__slider">
				<Swiper
					className="reviews__slider-list"
					modules={[Navigation, Pagination, Scrollbar, Mousewheel]}
					spaceBetween={0}
					slidesPerView={1}
					loop={true}
					scrollbar={{ draggable: true }}
					navigation={{
						prevEl: '.swiper-button-prev',
						nextEl: '.swiper-button-next',
					}}
					// pagination={{
					// 	el: '.swiper-pagination',
					// 	clickable: true,
					// }}
					pagination={false}
					breakpoints={{
						576: {
							slidesPerView: 1,
							spaceBetween: 0,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 0,
						},
						992: {
							slidesPerView: 3,
							spaceBetween: 0,
						},
					}}
					mousewheel={{
						enabled: true,
						forceToAxis: true,
						sensitivity: 1,
					}}>
					{reviews?.map((review, i) => {
						const date = new Date(review.createdAt).toLocaleDateString('uk-UA');
						// console.log(date);
						return (
							<SwiperSlide key={i}>
								<div className="review-slide-itm">
									<div className="review-slide-inner">
										<div className="review-slide-top-line">
											<div className="review-slide-author">
												{review?.user?.username}
											</div>
											<div className="review-slide-date">{date}</div>
										</div>
										<div className="review-slide-txt">
											Оценка <strong>{review.rating}</strong>{' '}
											{review.rating === 5 ? 'звезд!!!' : 'звезды'} <br />
											{review.text}
										</div>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>

				<div className="slide-controls">
					<div className="slider-pagination">
						<div className="swiper-pagination" />
					</div>
					<div className="slider-navigation">
						<button type="button" className="swiper-button swiper-button-prev"></button>
						<button type="button" className="swiper-button swiper-button-next"></button>
					</div>
				</div>
			</div>
		</section>
	);
}
