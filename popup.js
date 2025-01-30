document.addEventListener('DOMContentLoaded', function() {
  const goToTodayButton = document.getElementById('goToToday');

  goToTodayButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'goToToday' });
  });
});