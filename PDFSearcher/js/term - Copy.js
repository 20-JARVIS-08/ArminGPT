const fileList = document.getElementById("fileList");
const pdfFrame = document.getElementById("pdfFrame");
const searchInput = document.getElementById("searchInput");

const TERM = "term1";

const files = {
    midterm: ["midterm.pdf"],
    final: ["final.pdf"]
};

function loadFiles(type) {
    fileList.innerHTML = "<b>Files</b>";
    files[type].forEach(file => {
        const div = document.createElement("div");
        div.textContent = file;
        div.onclick = () => openPDF(type, file);
        fileList.appendChild(div);
    });
}

function openPDF(type, file) {
    const path = `/PDFSearcher/data/${TERM}/${type}/${file}`;
    const viewer = `/PDFSearcher/libs/web/viewer.html?file=${encodeURIComponent(path)}`;
    console.log("Opening PDF:", viewer);
    pdfFrame.src = viewer;
}

function openPdfSearch() {
    const iframe = document.getElementById("pdfFrame");
    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage(
        { type: "OPEN_FIND_BAR" },
        "*"
    );
}
function searchInPDF() {
    const text = document.getElementById("searchInput").value.trim();
    if (!text) return;

    const iframe = document.getElementById("pdfFrame");
    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage(
        { type: "SEARCH_TEXT", text },
        "*"
    );
}
