
const Brain = {
  personalities:{
    calm:t=>t,
    logical:t=>"Logically speaking, "+t,
    friendly:t=>"Hey! "+t,
    playful:t=>t+" 😄"
  },
  apply(text){
    return this.personalities[Memory.data.personality](text);
  }
};
