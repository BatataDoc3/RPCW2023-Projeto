import { persisted } from 'svelte-local-storage-store';

export const session = persisted('session', {
	token: '',
	user: '',
	role: ''
});
