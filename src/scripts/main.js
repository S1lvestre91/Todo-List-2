const taf = document.getElementById("tarefa")
const dataIni = document.getElementById("dt-ini")
const dataFi = document.getElementById("dt-fim")
const btn = document.getElementById("btn")
const tbody = document.getElementById("t-body")

const hdId = document.getElementById("HdId")


let tarefas =[];
 window.onload = function (){
   carregarTarefa()
 }


btn.addEventListener("click",(e)=>{
  e.preventDefault();
  
  if(taf.value =="" || dataIni.value =="" || dataFi.value=="")
  {
    alert("campos vazios")
  }
  else{
    
     if(hdId.value == ""){
    tarefas.push(
    {
    id: tarefas.length + 1,
    tarefa: taf.value,
    dataInicio: dataIni.value,
    dataFim: dataFi.value
    })
  //
    alert("salvo com sucesso")
      }
  else{
    //edita os dados
    tarefas.forEach((item)=>{
      if(item.id == hdId.value){
        item.tarefa = taf.value
        item.dataInicio = dataIni.value
        item.dataFim = dataFi.value
      }
    })
    //
   }
    setLocalStorage()
    carregarTarefa()
    hdId.value = ""
    taf.value = ""
    dataIni.value =""
    dataFi.value = ""
  
  }
  


})
//funcao que os item no html
const criarTarefa =(item,index)=>{
   let tr = document.createElement("tr")
   tr.innerHTML +=`
     
      <td class="descri">${item.tarefa}</td>
      <td class="">${item.dataInicio}</td>
      <td class="">${item.dataFim}</td>
      <td><input class="finalizarTaref" type="checkbox" onclick="check()"></td>
      <td class="">
        <button onclick="edit(${item.id})" >
          <img src="./src/img/edit.png" alt="">
        </button>
        <button onclick="deletar(${index})">
          <img src="./src/img/excluir.png" alt="">
        </button>
      </td>
   `
   tbody.appendChild(tr);
}


//carrega os dados no formulario para editcao
function edit(Id){
  tarefas.forEach((item)=>{
    if(item.id == Id){
      hdId.value = item.id
      taf.value = item.tarefa
      dataIni.value= item.dataInicio
      dataFi.value = item.dataFim
    }
  })
}
//editar a funcao excluir
function deletar(index){
  tarefas.splice(index,1)
  setLocalStorage()
  carregarTarefa();
}
// carregar tarefa
function carregarTarefa(){
  tarefas = getLocalStorage()
  tbody.innerHTML = ""
  
  tarefas.forEach((item,index)=>{
    criarTarefa(item, index)
  })
  
}
//Evento de chacar
document.addEventListener("click", (e)=>{
  const targetAlvi = e.target
  const parentAll = targetAlvi.closest("tr")
  if(targetAlvi.classList.contains("finalizarTaref")){
    parentAll.classList.toggle("checar")
    
  }

})

//obtem os itens no localStorage
const getLocalStorage =()=>JSON.parse(localStorage.getItem("Tarefa"))??[];
//Criar os itens no LocalStorage.
const setLocalStorage =()=>{
  localStorage.setItem("Tarefa", JSON.stringify(tarefas))
}


