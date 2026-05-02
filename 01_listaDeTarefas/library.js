
export class listaDeTarefas{
    constructor(){
        this.doc = document;
        this.titulo = '';
        this.descricao = '';
        this.bigBoxTarefa = this.doc.querySelector('.tarefas');
        this.dataList = [];
        this.delete = [];
        this.intervalo = null;
        this.tmeInterval = 5;
        this.intervaloOpacidade = null;

        this.posX =  0;
        this.posY =  0;
        this.radiusX = 100;
        this.radiusY = 100;
        this.t = 0;
        this.InfOpacidade = 100;
        this.elemento = null;
        
    }

    listeners(){
        this.loadTarefa();
        let b = ['add','delete','key'];
        
        this.doc.addEventListener('click', (e)=>{
            let btn = e.target;

            if(btn.classList.contains(b[0])) this.tarefa();
            if(btn.classList.contains(b[1])) this.apagarTarefa();
            if(btn.classList.contains(b[2])) this.checkTarefa(btn.className);

        });      
    }

    tarefa(){

        this.titulo = document.querySelector('.text');
        this.descricao = document.querySelector('.descricao');

        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);;
        

        const boxTarefa = this.doc.createElement('div');
        const tituloTarefa = this.doc.createElement('div');
        const descricaoTarefa = this.doc.createElement('div');
        const boxMarcador = this.doc.createElement('div');
        const marcador = this.doc.createElement('input');
        let retorno = null;

        if(this.titulo.value === '' || this.descricao.value === ''){

            console.log('campos vazios!');

        }else{


        boxTarefa.className = `tarefa ${id}` ;
        tituloTarefa.className = 'titulo';
        tituloTarefa.innerText = this.titulo.value;
        descricaoTarefa.className = 'texto';
        descricaoTarefa.innerText = this.descricao.value;
        boxMarcador.className = `marcado` ;
        marcador.className = `key ${id}`;
        marcador.type = 'radio';
        marcador.name = 'check';

        boxTarefa.appendChild(tituloTarefa);
        boxTarefa.appendChild(descricaoTarefa);
        boxTarefa.appendChild(boxMarcador);
        boxMarcador.appendChild(marcador);
        this.bigBoxTarefa.appendChild(boxTarefa);
        

        this.titulo.value = '';
        this.descricao.value = '';
        
        this.salvarTarefa();
           
        }

        return retorno;


    }

    checkTarefa(id){
        let idt = id.replace('key ', '');
        this.delete.push(idt);
        
        for(let i = 0; i< this.delete.length; i++){
            // console.log(this.delete[i]);
        }
    }
    apagarTarefa(){
        
        for(let i = -1; i<this.delete.length; i++){
            let element = this.doc.querySelector(`.${this.delete[i]}`);
            if(element){
                this.animRemoveTarefa(element);
            }
        }
        
    }
    salvarTarefa(){
        this.dataList = [];

        const tarefas = this.doc.querySelectorAll('.tarefas');
        
        // tarefas.forEach((item, index, array)=>{
        //     console.log(array[0]);
        // });
        
        // for(let key in tarefas){
        //     console.log(tarefas);
        // }

        for(let text of tarefas){

            this.dataList.push(text.innerHTML);
        }

         const jsonSave = JSON.stringify();
         localStorage.setItem('Tarefas', this.dataList);
    }

    loadTarefa(){
        const jsonLoad = JSON.stringify();
        this.dataList = localStorage.getItem('Tarefas');
        
        this.bigBoxTarefa.innerHTML = this.dataList;
        return this.dataList;
    }

    animRemoveTarefa(idTarefa){
        this.elemento = idTarefa;
        const tmnBox = this.bigBoxTarefa.getBoundingClientRect();
        const tarefas = idTarefa.getBoundingClientRect();
        const posicao = Math.floor(tarefas.y);

      let decremento = 0;
           clearInterval(this.intervalo);
           clearInterval(this.intervaloOpacidade);

           this.intervalo = setInterval(()=>{
               decremento--;
               this.InfOpacidade--;
             
                this.t += 0.05;
                this.posY = Math.sin(this.t) * this.radiusY;
    
                this.elemento.style = `
                    position: fixed;
                    box-shadow: rgb(255, 89, 67) 0px 0px 15px !important;
                    z-index:999;
                    transform: translateY(${this.posY}px);
                    opacity:${this.InfOpacidade}%;
                `;
               
               if(decremento === -posicao){
                clearInterval(this.intervalo);
                  idTarefa.remove();
                  this.salvarTarefa();
                  
                  this.t = 0;
                  decremento = 0;
                  this.InfOpacidade = 100;
               }else{
                
               }
          

           },5);

    }

}