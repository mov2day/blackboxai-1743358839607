document.addEventListener('DOMContentLoaded', () => {
  const xpathOutput = document.getElementById('xpath-output');
  const downloadBtn = document.getElementById('download-btn');
  const errorMsg = document.getElementById('error-msg');

  // Fetch stored XPath from background script
  chrome.storage.local.get(['xpath'], (result) => {
    if (result.xpath && result.xpath.trim() !== '') {
      xpathOutput.value = result.xpath;
    } else {
      errorMsg.classList.remove('hidden');
      downloadBtn.disabled = true;
    }
  });

  // Download functionality
  downloadBtn.addEventListener('click', () => {
    const blob = new Blob([xpathOutput.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'xpath_code.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});