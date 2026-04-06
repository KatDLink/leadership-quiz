function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "alive" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const raw = e && e.postData && e.postData.contents ? e.postData.contents : "{}";
    const data = JSON.parse(raw);

    sheet.appendRow([
      new Date(),
      data.primary || "",
      data.secondary || "",
      data.severity || "",
      data.helpPriority || "",
      data.language || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(
        JSON.stringify({
          status: "error",
          message: String(err),
        })
      )
      .setMimeType(ContentService.MimeType.JSON);
  }
}
