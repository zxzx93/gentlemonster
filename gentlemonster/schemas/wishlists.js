import { RiMacbookLine } from 'react-icons/ri';

export default {
	name: 'wishlists',
	title: 'Wishlists',
	type: 'document',
	icon: RiMacbookLine,
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
		},
		{
			name: 'image',
			title: 'Image',
			type: 'array',
			of: [{ type: 'image' }],
			options: {
				hotspot: true,
			},
		},
		{
			name: 'category',
			title: 'Category',
			type: 'reference',
			to: [{ type: 'category' }],
		},
		{
			name: 'price',
			title: 'Price',
			type: 'number',
		},
		{
			name: 'quantity',
			title: 'Quantity',
			type: 'number',
		},
		{
			name: 'instock',
			title: 'Instock',
			type: 'number',
		},
		{
			name: 'like',
			title: 'Like',
			type: 'boolean',
			initialValue: false,
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
		},
	],
};
