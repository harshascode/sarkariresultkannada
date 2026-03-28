export interface Post {
	content: string;
	slug?: string;
	tag: string | null;
	tags: string[];
	date: number;
	type?: string;
	draft?: boolean;
	title?: string;
	summary?: string;
	image?: string;
	keywords?: string;
	author?: string;
}