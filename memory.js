
const Memory = {
  data: JSON.parse(localStorage.getItem("neura-memory")) || {
    name:"Neura",
    chats:[],
    learned:{},
    personality:"calm"
  },

  save(){localStorage.setItem("neura-memory",JSON.stringify(this.data));},

  addChat(from,text){
    this.data.chats.push({from,text,time:Date.now()});
    this.save();
  },

  search(query){
    return this.data.chats.filter(c=>c.text.toLowerCase().includes(query.toLowerCase()));
  }
};
