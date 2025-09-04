import './index.css'

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('app');
  if (!container) return;

  container.innerHTML = `
    <div class="p-4 text-center" style="min-width: 300px; min-height: 150px;">
      <h1 class="text-lg font-bold mb-2" style="font-size: 18px; margin-bottom: 8px;">Image Converter</h1>
      <p class="text-sm text-gray-600 mb-4" style="color: #666; margin-bottom: 16px;">Right-click on any image to convert it</p>
      <a 
        href="https://ko-fi.com/mundanesunrise" 
        target="_blank"
        class="inline-block bg-[#FFDD00] text-black px-4 py-2 rounded-lg hover:bg-[#FFDD00]/90 transition-colors"
        style="background-color: #FFDD00; color: black; padding: 8px 16px; border-radius: 8px; text-decoration: none;"
      >
        ☕ Buy me a coffee
      </a>
    </div>
  `;
});