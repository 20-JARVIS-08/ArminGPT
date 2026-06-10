const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// پوشه public رو استاتیک کنیم
app.use(express.static(path.join(__dirname, "public")));
app.use("/libs", express.static(path.join(__dirname, "libs")));
app.use("/data", express.static(path.join(__dirname, "data")));

// API برای گرفتن لیست فایل‌های PDF
app.get("/list-files/:term/:exam", (req, res) => {
    const { term, exam } = req.params;
    const folder = path.join(__dirname, "data", term, exam);
    fs.readdir(folder, (err, files) => {
        if (err) return res.status(500).json([]);
        const pdfFiles = files.filter(f => f.endsWith(".pdf"));
        res.json(pdfFiles);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
