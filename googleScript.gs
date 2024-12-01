function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.firstName,
    data.lastName,
    data.email,
    data.phone
  ]);
  
  return ContentService.createTextOutput(JSON.stringify({
    'result': 'success'
  })).setMimeType(ContentService.MimeType.JSON);
} 