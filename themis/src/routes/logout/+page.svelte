<script>
	import '../../app.css';
	import { session } from '../../stores';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	session.set({user: '', role: '', token: ''});
	// clear data
	if(browser) {
		goto('/');
	}
</script>
