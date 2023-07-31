const getLocal =()=>JSON.parse(localStorage.getItem("Tarefa"))??[];



 

let data = new Date()
let month = data.getMonth() +1
let day = data.getDate()
let year = data.getFullYear()


if (day < 10) {
   day = `0${day}`
}
if (month < 10) {
   month = `0${month}`
}
let currentDate = [
   year,month,day
  ]
let dataAtual = currentDate.join("-")
console.log(dataAtual)



function verificarDate(){
  let date = getLocal()
  date.forEach((item)=>{
     if (dataAtual === item.dataFim) {
       console.log("tetsg")
       enviarNotificacao(item.tarefa)
     }
  })
  
}

setTimeout(verificarDate,5000)

self.addEventListener("install", event=>{
  event.waitUntil(
    caches.open('cache-name').then(cache=>{
      cache.addAll([])
      })
    )
})

self.addEventListener("fetch", event=>{
  event.respondWith(
     caches.match(event.request).then(response =>{
       if (response) {
        return response
       }
       return fetch(event.request)
     })
    )
})

if ('Notification' in window) {
  Notification.permission !== "granted" &&
  Notification.permission !== "denied"
  
  Notification.requestPermission().then(permission =>{
    if (permission === "granted") {
      console.log("Permissão para notificação concedida")
    }
  })
}

function enviarNotificacao(item){
  if (Notification.permission === "granted") {
    const option ={
      body: `A tarefa ${item} não foi realizada!`,
      icon: `./src/img/icon.png`,
      vibrate: [200, 100, 200],
    }
    navigator.serviceWorker.ready.then(registro =>{
      registro.showNotification('Todo List', option)
    })
    
  }
}

