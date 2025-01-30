document.addEventListener('DOMContentLoaded', function() {
  const goToTodayButton = document.getElementById('goToToday');

  goToTodayButton.addEventListener('click', function() {
    chrome.runtime.sendMessage({ action: 'goToToday' });
  });
});
// Auto-launch when URL has ?autolaunch=true
const urlParams = new URLSearchParams(window.location.search);
if(urlParams.has('autolaunch')) {
    goToToday();
}
