const Customer = require("../models/Customer");
const fs = require('fs');
const excelToJson = require('convert-excel-to-json');

exports.uploadFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const excelData = excelToJson({
      sourceFile: file.path,
      sheets: [{
        name: 'Sheet1',
        header: {
          rows: 1
        },
        columnToKey: {
          A: 'Id',
          B: 'Name',
          C: 'Address',
          D: 'Age'
        }
      }]
    });

    if (!excelData.Sheet1 || !excelData.Sheet1.length) {
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: "No data found in Excel file" });
    }

    const formattedData = excelData.Sheet1.map(item => ({
      ...item,
      Age: Number(item.Age)
    }));

    await Customer.insertMany(formattedData);
    
    fs.unlinkSync(file.path);
    
    res.json({ 
      message: 'File uploaded and data inserted successfully',
      recordsInserted: formattedData.length 
    });

  } catch (err) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    console.error("Error processing upload:", err);
    res.status(500).json({ 
      error: "Failed to process file", 
      details: err.message 
    });
  }
}; 