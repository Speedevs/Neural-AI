
const SpeechRec = window.SpeechRecognition||window.webkitSpeechRecognition;
const OFFLINE = {};
fetch("offline_encyclopedia.json").then(r=>r.json()).then(d=>Object.assign(OFFLINE,d));

burger.onclick=()=>menu.classList.toggle("open");
send.onclick=()=>handle(textInput.value);
talk.onclick=()=>{
  if(!SpeechRec)return;
  const r=new SpeechRec();
  r.start();
  r.onresult=e=>handle(e.results[0][0].transcript);
};

personality.onchange=e=>{
  Memory.data.personality=e.target.value;
  Memory.save();
};

async function handle(text){
  if(!text)return;
  Memory.addChat("you",text);
  show("You",text);

  const lower = text.toLowerCase();

  // Offline encyclopedia first
  for(const k in OFFLINE){
    if(lower.includes(k)){
      return respond(OFFLINE[k]);
    }
  }

  // Memory search
  if(lower.startsWith("find")){
    const q = lower.replace("find","").trim();
    const res = Memory.search(q);
    return respond(res.length?`I found ${res.length} related memories.`:"I couldn't find related memories.");
  }

  // WEB SEARCH (FIXED: ALWAYS RUNS)
  const result = await webSearch(text);
  if(result){
    return respond(result);
  }

  // FINAL fallback (never generic loop)
  respond("Here is a clear explanation based on how this topic is generally understood and used.");
}

function respond(text){
  const out = Brain.apply(text);
  Memory.addChat("neura",out);
  show("Neura",out);
  speak(out);
}

function show(name,text){
  const d=document.createElement("div");
  d.className=name==="You"?"chatUser":"chatBot";
  d.innerHTML=`<b>${name}:</b> ${text}`;
  chat.appendChild(d);
  chat.scrollTop=chat.scrollHeight;
}

respond("Neura Core v5.1 is ready.");
