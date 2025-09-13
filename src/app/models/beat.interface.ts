
export interface Beat {
	_id: string;
	serial_number: number;
	title: string;
	category: string;
	mood: string[];
	genre: string;
	key: string;
	tempo: number;
	instrument: string[];
	tag: string[];
	preview: string;
	cover_picture: string;
	is_used_sample: boolean;
	owner: string;
	play_count: number;
	disable_mp3_download: boolean;
	allow_negotiations: boolean;
	used_samples: UsedSample[];
	id: string;
	created_by: CreatedBy;
	producer: Producer;
	prices: Price[];
	available_coupons: string[];
}

export interface Playlist {
	title: string;
	beatSerialNumbers: number[];
	authorName: string;
	isOfficialPlaylist: boolean;
	isPublic: boolean;
	urlSlug: string;
	updatedAt: string;
	category: string;
	beats: Beat[];
}

export interface UsedSample {
	_id: string;
	beat: string;
	artist_name: string;
	is_royalty_free: boolean;
	artist_profile_link: string;
}

export interface CreatedBy {
	_id: string;
	handle: string;
	allow_negotiations: boolean;
}

export interface Producer {
	_id: string;
	user: string;
	is_verfied: boolean;
	tiers: string[];
	store: ProducerStore;
}

export interface ProducerStore {
	general: { name: string };
	brand: { picture: string };
}

export interface Price {
	discount: {
		value: number;
		quantifier: string;
	};
	royalty_in_percentage: {
		publishing_right: number;
		master_right: number;
	};
	_id: string;
	beat: string;
	licence: string;
	regular: number;
	final_price: number;
	number_of_recordings: number;
	licence_period_in_year: number;
}
