function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    });
}

populateUFs();

function getCities(event) {
    console.log(event);
    const citySelect = document.querySelector("select[name=city]");
    
    const stateInput = document.querySelector("input[name=state]");

    const ufValue = event.target.value;

    //event. - objeto .target - para acessar onde tem as options .value para conseguir 
    //o valor que refere a um estado  
    // .selectedIndex para acessar dentro do objeto options o qual foi selecionado
    //.text para conseguir o nome



    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>";
    citySelect.disabled = true;


    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url)
    .then(res => res.json() )
    .then(cities => {
        
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false;
    })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//itens de coleta

//pegando a lista do itens
const itemsToCollect = document.querySelectorAll(".items-grid li");

//rodo um for para renderizar cada item dos itemsToCollect
//e nesse item que será renderizado, um addEventListener de click e de uma função
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//hidden input
const collectedItems = document.querySelector("input[name=items]");

//array para armazenar os itens selecionados
let selectedItems = [];
//console.log(selectedItems);

//função a ser chamada no event listener
function handleSelectedItem(event) {
    
    //const para saber o li que selecionei, o event - click .target mostra o li selecionad
    const itemLi = event.target
    //console.log(itemLi);
    
    //add or remove class selected - ou seja vai pegar o selecionado através do itemLi que tem um event.target 
    //e o toggle funciona, caso o li for clicado e tiver a classe, ele tira, se não tive adiciona
    itemLi.classList.toggle("selected")

    //vai pegar o número, na verdade, o id, que está como um número, referente ao li clicado 
    //através do event.target.dataset (para acessar o data-id ou algum outro atributo que carrega o data) .id (no caso o id)
    //pois é <li data-id="" class="">...</li>
    const itemId = event.target.dataset.id;
    //console.log(itemId);

    //verficiar se há itens selecionados, caso tenha, irá pegá-los
                            //findIndex - vai mostrar os index dos itens dentro do array
    //o item vai representar o array e vai verificar com o itemId, que é o item selecionado
    //se o itemId for o mesmo do número do item, ou seja, se o id selecionad for igual ao número do array
    //vem true, e o número do array, se não, vem false, -1.
    const alreadySelected = selectedItems.findIndex( item => item == itemId);
    //console.log(selectedItems);
    console.log(alreadySelected);

    //se já estiver selecionado, tirar da seleção
    if(alreadySelected>=0) {
        //tirar da seleção - se for false o filter tira, se for true add ao filteredItems
        const filteredItems = selectedItems.filter( item => item != itemId)
        selectedItems = filteredItems;
        
    } else {
        selectedItems.push(itemId)
    }
    
    

    collectedItems.value = selectedItems;
    
}
