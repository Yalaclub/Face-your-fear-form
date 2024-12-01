function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success', 'data': 'Get request received' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.parameter.data);
    
    // Get timestamp
    const timestamp = new Date();
    
    // Prepare row data
    const rowData = [
      timestamp,
      data.firstName,
      data.lastName,
      data.phone,
      data.major,
      data.address,
      data.birthdate,
      data.phobiaType,
      data.severity,
      data.phobiaStart,
      data.dailyEffect,
      data.lunch,
      data.timesuit
    ];
    
    // Append row to sheet
    sheet.appendRow(rowData);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'data': rowData }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
} 