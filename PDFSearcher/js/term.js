const fileList = document.getElementById("fileList");
const pdfFrame = document.getElementById("pdfFrame");
const searchInput = document.getElementById("searchInput");

const TERM = "term1";

// آرایه فایل‌ها داخل هر امتحان
const files = {
    midterm: ["midterm.pdf"],        // پوشه data/term1/midterm/
    final: ["final1.pdf", "final2.pdf", "final3.pdf"] // پوشه data/term1/final/
};

// بارگذاری لیست فایل‌ها
function loadFiles(exam) {
    fileList.innerHTML = "<b>Files</b><br>";
    const examFiles = files[exam];
    if (!examFiles || examFiles.length === 0) {
        fileList.innerHTML += "<i>No files found</i>";
        return;
    }

    examFiles.forEach(file => {
        const div = document.createElement("div");
        div.textContent = file;
        div.style.cursor = "pointer";

        // وقتی روی فایل کلیک شد، PDF داخل iframe باز بشه
        div.onclick = () => openPDF(exam, file);
        fileList.appendChild(div);
    });
}

// باز کردن PDF داخل iframe (مسیر اصلاح شد)
function openPDF(exam, file) {
    // مسیر **نسبی به viewer.html**
    const path = `../../data/${TERM}/${exam}/${file}`;
    const viewer = `libs/web/viewer.html?file=${encodeURIComponent(path)}`;
    console.log("Opening PDF:", viewer);
    pdfFrame.src = viewer;
}

// باز کردن کادر سرچ PDF.js
function openPdfSearch() {
    if (!pdfFrame || !pdfFrame.contentWindow) return;
    pdfFrame.contentWindow.postMessage({ type: "OPEN_FIND_BAR" }, "*");
}
let findBarOpened = false;

// باز کردن کادر Find و سرچ
function searchInPDF() {
    const text = searchInput.value.trim();
    if (!text) return alert("Please enter text to search.");

    if (!pdfFrame || !pdfFrame.contentWindow) return;

    // باز کردن کادر Find
    pdfFrame.contentWindow.postMessage({ type: "OPEN_FIND_BAR" }, "*");

    // بعد از 300ms متن رو سرچ کن
    setTimeout(() => {
        pdfFrame.contentWindow.postMessage({ type: "SEARCH_TEXT", text }, "*");
        findBarOpened = true; // آماده برای Next Result
    }, 300);
}

// رفتن به نتیجه بعدی
function nextResultPDF() {
    if (!findBarOpened) return alert("Please search first!");
    pdfFrame.contentWindow.postMessage({ type: "FIND_NEXT" }, "*");
}
