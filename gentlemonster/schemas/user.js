import { RiMacbookLine } from 'react-icons/ri';

export default {
	name: 'user',
	title: 'User',
	type: 'document',
	icon: RiMacbookLine,
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
		{
			name: 'email',
			title: 'Email',
			type: 'string',
		},
		{
			name: 'image',
			title: 'Image',
			type: 'url',
		},
		{
			name: 'password',
			type: 'string',
			hidden: true,
		},
	],
};
