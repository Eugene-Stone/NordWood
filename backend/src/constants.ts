export const GLOBAL_POPULATE = {
	// sub_1: {
	// 	populate: '*',
	// },
	// sub_2: {
	// 	populate: {
	// 		sub: {
	// 			populate: '*',
	// 		},
	// 	},
	// },

	Header: {
		populate: {
			Logo: {
				populate: '*',
			},
			Menu: {
				populate: {
					MenuLink: {
						populate: '*',
					},
				},
			},
			LangList: {
				populate: {
					Link: {
						populate: '*',
					},
				},
			},
		},
	},
	Footer: {
		populate: {
			Menu: {
				populate: {
					MenuLink: {
						populate: '*',
					},
				},
			},
		},
	},
} as const;

export const SECTIONS_POPULATE = {
	on: {
		'sections.hero': {
			populate: {
				image: true,
				// image: {
				// 	fields: ["alternativeText", "url"] //  Можно перечислить конкретные
				// }
			},
		},
		'sections.services': {
			populate: {
				link: true,
			},
		},
	},
} as const;
