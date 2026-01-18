
async function webSearch(query){
  try{
    const r = await fetch("https://api.duckduckgo.com/?q="+encodeURIComponent(query)+"&format=json&no_redirect=1&no_html=1");
    const d = await r.json();
    return d.AbstractText || (d.RelatedTopics && d.RelatedTopics[0] && d.RelatedTopics[0].Text) || null;
  }catch{
    return null;
  }
}
