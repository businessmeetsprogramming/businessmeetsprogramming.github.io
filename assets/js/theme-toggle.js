(function() {
	var btn = document.getElementById('theme-toggle');
	if (!btn) return;
	btn.addEventListener('click', function(e) {
		e.preventDefault();
		var html = document.documentElement;
		var nowDark = html.classList.toggle('theme-dark');
		try {
			localStorage.setItem('theme', nowDark ? 'dark' : 'light');
		} catch (err) {}
	});
})();
