export type Post = {
	title: string
	description?: string
	date: Date  // ISO format
	tags?: string[]
	published: boolean
	slug: string  // Parsed automatically
}
