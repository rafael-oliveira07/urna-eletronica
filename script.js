let seuVt=document.getElementById('seuVotoPara')
let imgGrande=document.querySelector('.imgPrincipal')
let imgPequena=document.querySelector('.imgVice')
let tituloCargo=document.querySelector('.cargo')
let dadosCandidatos=document.querySelector('.dados')
let instrucoes=document.getElementById('ajuda')
let dig1=document.getElementById('digito1')
let dig2=document.getElementById('digito2')
let dig3=document.getElementById('digito3')
let dig4=document.getElementById('digito4')
let dig5=document.getElementById('digito5')

let etapa=0
let votoBrancoAtivo=false
let numeroDigitado=[dig1,dig2,dig3,dig4,dig5]
let numeroFinal=''
let votoVereador=''
let votoPrefeito=''
let candidatos={
    vereador1: {
        num: '12345',
        nome: 'Beltrano da Silva',
        partido: 'CSS'
    },
    vereador2: {
        num: '67890',
        nome: 'Fulano Pereira',
        partido: 'GIT'
    },
    prefeito1: {
        num: '12',
        nome: 'Sicrano Alves',
        partido: 'CSS',
        vice: 'Thor'
    },
    prefeito2: {
        num: '67',
        nome: 'Anônimo Lopes',
        partido: 'GIT',
        vice: 'Stark'
    }
}
let contagem=0

seuVt.style.display='none'
instrucoes.style.display='none'

function clicou(num){
    if(etapa==0 || etapa==1){
        if(etapa==0 && contagem<5 && votoBrancoAtivo==false || etapa==1 && contagem<2 && votoBrancoAtivo==false){
            numeroDigitado[contagem].innerHTML=num
            numeroDigitado[contagem].classList.remove('pisca')
            numeroFinal+=numeroDigitado[contagem].innerHTML
            
            if(contagem!=4){
                numeroDigitado[contagem+1].classList.add('pisca')
            }
            
            if(etapa==0 && contagem==4 || etapa==1 && contagem==1){
                seuVt.style.display='block'
                instrucoes.style.display='block'
            }

            if(contagem==4 && numeroFinal==candidatos.vereador1.num){
                imgGrande.innerHTML='<img src="images/person.png">'
                dadosCandidatos.innerHTML+='Nome: '+candidatos.vereador1.nome
                dadosCandidatos.innerHTML+='<br> Partido: '+candidatos.vereador1.partido
                votoVereador=candidatos.vereador1
            }else if(contagem==4 && numeroFinal==candidatos.vereador2.num){
                imgGrande.innerHTML='<img src="images/person.png">'
                dadosCandidatos.innerHTML+='Nome: '+candidatos.vereador2.nome
                dadosCandidatos.innerHTML+='<br> Partido: '+candidatos.vereador2.partido
                votoVereador=candidatos.vereador2
            }else if(etapa==1 && contagem==1 && numeroFinal==candidatos.prefeito1.num){
                imgGrande.innerHTML='<img src="images/person.png">'
                imgPequena.innerHTML='<img src="images/person.png">'
                dadosCandidatos.innerHTML+='Nome: '+candidatos.prefeito1.nome
                dadosCandidatos.innerHTML+='<br> Vice-Prefeito: '+candidatos.prefeito1.vice
                dadosCandidatos.innerHTML+='<br> Partido: '+candidatos.prefeito1.partido
                votoPrefeito=candidatos.prefeito1
            }else if(etapa==1 && contagem==1 && numeroFinal==candidatos.prefeito2.num){
                imgGrande.innerHTML='<img src="images/person.png">'
                imgPequena.innerHTML='<img src="images/person.png">'
                dadosCandidatos.innerHTML+='Nome: '+candidatos.prefeito2.nome
                dadosCandidatos.innerHTML+='<br> Vice-Prefeito: '+candidatos.prefeito2.vice
                dadosCandidatos.innerHTML+='<br> Partido: '+candidatos.prefeito2.partido
                votoPrefeito=candidatos.prefeito2
            }else if(etapa==0 && contagem==4 && numeroFinal!=candidatos.vereador1.num && numeroFinal!=candidatos.vereador2.num 
                || etapa==1 && contagem==1 && numeroFinal!=candidatos.prefeito1.num && numeroFinal!=candidatos.prefeito2.num){
                dadosCandidatos.innerHTML='<span>NÚMERO ERRADO</span>'
                dadosCandidatos.innerHTML+='<span class="pisca">VOTO NULO</span>'
                if(etapa==0){
                    votoVereador='Voto Nulo'
                }else{
                    votoPrefeito='Voto Nulo'
                }
            }
            contagem++
        }else{
            alert('Aperte em CORRIGE para reiniciar seu voto!')
        }
    }
}

function vtBranco(){
    if(votoBrancoAtivo==false && contagem==0){
        seuVt.style.display='block'
        instrucoes.style.display='block'
        document.getElementById('numerosVoto').style.display='none'
        document.getElementById('votoBR').style.display='block'
        votoBrancoAtivo=true
        if(etapa==0){
            votoVereador='Voto em Branco'
        }else if(etapa==1){
            votoPrefeito='Voto em Branco'
        }
    }else{
        alert('Aperte em CORRIGE para reiniciar seu voto!')
    }
}

function corrigir(){
    for(let i in numeroDigitado){
        numeroDigitado[i].innerHTML=''
        numeroDigitado[i].classList.remove('pisca')
    }
    dig1.classList.add('pisca')
    numeroFinal=''
    contagem=0
    votoBrancoAtivo=false
    seuVt.style.display='none'
    instrucoes.style.display='none'
    imgGrande.innerHTML=''
    imgPequena.innerHTML=
    dadosCandidatos.innerHTML=''
    document.getElementById('numerosVoto').style.display='flex'
    document.getElementById('votoBR').style.display='none'
}

function confirmar(){
    if(etapa==0 && numeroFinal.length==5 || etapa==0 && votoBrancoAtivo==true){
        corrigir()
        console.log(votoVereador)
        tituloCargo.innerHTML='<span>PREFEITO</span>'
        etapa++
        for(let i=2;i<5;i++){
            numeroDigitado[i].style.display='none'
        }
    }else if(etapa==1 & numeroFinal.length==2 || etapa==1 && votoBrancoAtivo==true){
        corrigir()
        console.log(votoPrefeito)
        document.querySelector('.tela').innerHTML='<div class="telaFinal pisca"> <span>FIM</span> </div>'
        etapa++
    }else if(etapa==2){
        alert('FIM DA VOTAÇÃO!')
    }else{
        alert('Termine seu voto antes de CONFIRMAR!')
    }
}