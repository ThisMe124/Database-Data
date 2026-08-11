const axios = require('axios');

async function getRedirectUrlSamehadaku() {
    const PP = await axios.get("https://samehadaku.care/")
    const html = PP.data
    const scriptMatch = html.match(/window\.location\.href\s*=\s*['"]([^'"]+)['"]/);
    if (scriptMatch) return scriptMatch[1];
    
    const descMatch = html.match(/class=["']description["'][^>]*>[\s\S]*?<a\s+[^>]*href=["']([^"']+)["']/);
    if (descMatch) return descMatch[1];    
    const hrefMatch = html.match(/href=["'](https?:\/\/[^"']+)["']/);
    return hrefMatch ? hrefMatch[1] : null;
}

(async () => {
  return await getRedirectUrlSamehadaku()
})();
