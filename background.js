const dateToCellMap = {
'Tuesday, January 14, 2025': 'A5',
    'Wednesday, January 15, 2025': 'A11',
    'Thursday, January 16, 2025': 'A17',
    'Friday, January 17, 2025': 'A23',
    'Saturday, January 18, 2025': 'A24',
    'Sunday, January 19, 2025': 'A25',
    'Monday, January 20, 2025': 'A26',
    'Tuesday, January 21, 2025': 'A31',
    'Wednesday, January 22, 2025': 'A36',
    'Thursday, January 23, 2025': 'A42',
    'Friday, January 24, 2025': 'A49',
    'Saturday, January 25, 2025': 'A56',
    'Sunday, January 26, 2025': 'A63',
    'Monday, January 27, 2025': 'A65',
    'Tuesday, January 28, 2025': 'A72',
    'Wednesday, January 29, 2025': 'A79',
    'Thursday, January 30, 2025': 'A84',
    'Friday, January 31, 2025': 'A90',
    'Saturday, February 1, 2025': 'A96',
    'Sunday, February 2, 2025': 'A102',
    'Monday, February 3, 2025': 'A108',
    'Tuesday, February 4, 2025': 'A114',
    'Wednesday, February 5, 2025': 'A119',
    'Thursday, February 6, 2025': 'A125',
    'Friday, February 7, 2025': 'A131',
    'Saturday, February 8, 2025': 'A132',
    'Sunday, February 9, 2025': 'A133',
    'Monday, February 10, 2025': 'A134',
    'Tuesday, February 11, 2025': 'A139',
    'Wednesday, February 12, 2025': 'A145',
    'Thursday, February 13, 2025': 'A151',
    'Friday, February 14, 2025': 'A158',
    'Saturday, February 15, 2025': 'A163',
    'Sunday, February 16, 2025': 'A169',
    'Monday, February 17, 2025': 'A175',
    'Tuesday, February 18, 2025': 'A176',
    'Wednesday, February 19, 2025': 'A177',
    'Thursday, February 20, 2025': 'A178',
    'Friday, February 21, 2025': 'A179',
    'Saturday, February 22, 2025': 'A185',
    'Sunday, February 23, 2025': 'A191',
    'Monday, February 24, 2025': 'A193',
    'Tuesday, February 25, 2025': 'A198',
    'Wednesday, February 26, 2025': 'A203',
    'Thursday, February 27, 2025': 'A209',
    'Friday, February 28, 2025': 'A215',
    'Saturday, March 1, 2025': 'A222',
    'Sunday, March 2, 2025': 'A228',
    'Monday, March 3, 2025': 'A234',
    'Tuesday, March 4, 2025': 'A239',
    'Wednesday, March 5, 2025': 'A245',
    'Thursday, March 6, 2025': 'A251',
    'Friday, March 7, 2025': 'A258',
    'Saturday, March 8, 2025': 'A263',
    'Sunday, March 9, 2025': 'A268',
    'Monday, March 10, 2025': 'A273',
    'Tuesday, March 11, 2025': 'A279',
    'Wednesday, March 12, 2025': 'A285',
    'Thursday, March 13, 2025': 'A292',
    'Friday, March 14, 2025': 'A297',
    'Saturday, March 15, 2025': 'A302',
    'Sunday, March 16, 2025': 'A307',
    'Monday, March 17, 2025': 'A313',
    'Tuesday, March 18, 2025': 'A320',
    'Wednesday, March 19, 2025': 'A327',
    'Thursday, March 20, 2025': 'A332',
    'Friday, March 21, 2025': 'A337',
    'Saturday, March 22, 2025': 'A342',
    'Sunday, March 23, 2025': 'A348',
    'Monday, March 24, 2025': 'A354',
    'Tuesday, March 25, 2025': 'A361',
    'Wednesday, March 26, 2025': 'A366',
    'Thursday, March 27, 2025': 'A371',
    'Friday, March 28, 2025': 'A372',
    'Saturday, March 29, 2025': 'A373',
    'Sunday, March 30, 2025': 'A374',
    'Monday, March 31, 2025': 'A375',

};

function normalizeDateFormat(date) {
  // Convert "Saturday, August 3, 2024" to "Saturday, 3 August, 2024"
  const [weekday, month, day, year] = date.split(' ');
  const dayNumber = parseInt(day.replace(',', '')); // Remove comma from day
  const newDate = `${weekday}, ${dayNumber} ${month}, ${year}`;
  return newDate;
}

function getCellForToday() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  
  // First try with the default format
  let cell = dateToCellMap[today];
  
  // If not found, try the normalized format
  if (!cell) {
    const normalizedToday = normalizeDateFormat(today);
    cell = dateToCellMap[normalizedToday];
  }

  return cell;
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message); // Verify message is received
  if (message.action === 'goToToday') {
    console.log('Go to today\'s schedule button clicked'); // Verify button click
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    let cell = dateToCellMap[today];
    
    // If not found, try the normalized format
    if (!cell) {
      const normalizedToday = normalizeDateFormat(today);
      cell = dateToCellMap[normalizedToday];
    }
    
    console.log('Cell value:', cell); // Verify cell value
    if (cell) {
      const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/10vXJRdLfP2WQwUidacy6o8NZH2ZFP5CzIZBAly5XvXE/edit?gid=0#gid=0';
      const targetUrl = `${spreadsheetUrl}&range=${cell}`;
      console.log('Target URL:', targetUrl); // Verify target URL
      
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].url === spreadsheetUrl) {
          chrome.tabs.update(tabs[0].id, { url: targetUrl });
        } else {
          chrome.tabs.create({ url: targetUrl });
        }
      });
    } else {
      console.log('No cell value found'); // Indicate no cell value
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log('Active tab:', tabs[0].url); // Verify active tab URL
        if (tabs[0].url === "https://docs.google.com/spreadsheets/d/10vXJRdLfP2WQwUidacy6o8NZH2ZFP5CzIZBAly5XvXE/edit?gid=0#gid=0") {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ['contentScript.js']
          }, () => {
            if (chrome.runtime.lastError) {
              console.error('Script injection failed:', chrome.runtime.lastError);
            } else {
              chrome.tabs.sendMessage(tabs[0].id, { action: 'showAlert', message: 'Date not found in the schedule.' });
            }
          });
        }
      });
    }
  }
});

