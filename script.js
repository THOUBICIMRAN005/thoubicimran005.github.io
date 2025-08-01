
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('toggleDark');
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
});
