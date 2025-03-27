const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const generatePDF = async (complaint) => {
  const pdfPath = path.join(
    __dirname,
    `../reports/${complaint.complaintId}.pdf`
  );

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // 📝 Updated HTML Template with Signatures
  const htmlContent = `
  <html>
  <head>
    <style>
      body { 
        font-family: Arial, sans-serif; 
        padding: 50px; 
        position: relative;
      }
      h1 { 
        text-align: center; 
        font-size: 22px;
        font-weight: bold;
        text-decoration: underline;
      }
      .sub-header {
        font-weight: bold;
        font-size: 18px;
        color: black;
      }
      .content { margin-top: 20px; }
      .details { font-size: 16px; line-height: 1.6; }
      .details p { margin: 5px 0; }
      .photo img { width: 200px; margin-top: 10px; }
      
      /* Watermark */
      .watermark {
        position: fixed;
        top: 30%;
        left: 10%;
        width: 80%;
        text-align: center;
        font-size: 50px;
        font-weight: bold;
        color: rgba(200, 200, 200, 0.2);
        transform: rotate(-30deg);
        z-index: -1;
      }

      /* Signature Styling */
      .signature-container {
        display: flex;
        justify-content: space-between;
        margin-top: 80px;
      }
      .signature {
        width: 45%;
        text-align: center;
        font-weight: bold;
      }
      .signature-line {
        margin-top: 40px;
        border-top: 1px solid black;
        width: 100%;
      }
    </style>
  </head>
  <body>
    <div class="watermark">Be Among Us</div>

    <h1>Complaint Letter</h1>

    <p class="sub-header">Subject: Complaint Regarding ${
      complaint.subject || "Issue"
    }</p>
    <p class="details"><strong>Complaint ID:</strong> ${
      complaint.complaintId
    }</p>
    
    <p><strong>Date Filed:</strong> ${new Date().toDateString()}</p>

    <div class="content">
      <p class="details"><strong>Name:</strong> ${complaint.name}</p>
      <p class="details"><strong>Address:</strong> ${complaint.address}</p>
      <p class="details"><strong>Mobile Number:</strong> ${
        complaint.mobileNumber
      }</p>
      <p class="details"><strong>Description:</strong> ${
        complaint.description
      }</p>
      <p class="details"><strong>Days to Resolve:</strong> ${
        complaint.daysToResolve
      } days</p>
    </div>

    ${
      complaint.photo
        ? `<div class="photo">
            <h3>Uploaded Photo:</h3>
            <img src="file://${path.join(
              __dirname,
              "../uploads",
              complaint.photo
            )}" />
          </div>`
        : ""
    }

    <br>
    <p>For further questions, please contact our office.</p>
    <p><strong>${new Date().toDateString()}</strong></p>
    <p>Director of Complaints Department</p>

  </body>
  </html>
  `;

  await page.setContent(htmlContent);
  await page.pdf({ path: pdfPath, format: "A4" });

  await browser.close();
  return pdfPath;
};

module.exports = { generatePDF };
