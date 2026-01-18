
let voices=[];
speechSynthesis.onvoiceschanged=()=>voices=speechSynthesis.getVoices();

function speak(text){
  const u=new SpeechSynthesisUtterance(text);
  const female=!document.getElementById("voiceToggle").checked;
  u.voice=voices.find(v=>female?v.name.toLowerCase().includes("female"):v.name.toLowerCase().includes("male"))||voices[0];
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}
