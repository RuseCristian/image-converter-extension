import './index.css';

async function convertImage(imageUrl: string, format: string): Promise<void> {
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    
    ctx.drawImage(img, 0, 0);
    
    const mimeType = format === 'PNG' ? 'image/png' : 'image/jpeg';
    const quality = format === 'JPG' ? 0.9 : 1.0;
    const dataUrl = canvas.toDataURL(mimeType, quality);

    const filename = imageUrl.split('/').pop()?.split('?')[0] || 'image';
    const name = filename.substring(0, filename.lastIndexOf('.')) || filename;
    
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${name}.${format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Conversion failed:', error.message);
    } else {
      console.error('Conversion failed:', error);
    }
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CONTEXT_MENU_CLICKED') {
    const imageUrl = request.imageUrl;
    const format = request.format;
    convertImage(imageUrl, format);
    sendResponse({ success: true });
  }
  return true;
});