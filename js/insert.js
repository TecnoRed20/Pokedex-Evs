// Guardamos la respuesta de la API en un Vector
const getPokeData = []

// Hacemos la peticion a la API
for (i = 1; i <= 898; i++){    
  getPokeData.push(new Promise ((datos) => {
    datos(fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then(response => response.json())
      .then(data => data)
    )
  }))
}

// Injectamos el pokemon pasado por parametro
function InsertPokemon(pokemon){
  let vectorCrudeName = pokemon.name.split("-");
  for (let i = 0; i < vectorCrudeName.length; i++) {
    vectorCrudeName[i] = vectorCrudeName[i].charAt(0).toUpperCase() + vectorCrudeName[i].slice(1)
  }
  let GoodName = vectorCrudeName.join(" ")

  let Insert = document.getElementById('insert')
  let card = document.createElement('div')
  card.className = 'card'
  let name = document.createElement('div')
  name.className = 'name'
  name.innerHTML = GoodName
  let content = document.createElement('div')
  content.className = 'content'
  let img = document.createElement('img')
  img.src = pokemon.sprites.front_default
  let evs = document.createElement('div')
  evs.className = 'evs'
  let hp = document.createElement('spam')
  hp.innerHTML = "HP: " + pokemon.stats[0].effort
  let atk = document.createElement('spam')
  atk.innerHTML = "Atk: " + pokemon.stats[1].effort
  let def = document.createElement('spam')
  def.innerHTML = "Def: " + pokemon.stats[2].effort
  let spa = document.createElement('spam')
  spa.innerHTML = "Spa: " + pokemon.stats[3].effort
  let spd = document.createElement('spam')
  spd.innerHTML = "Spd: " + pokemon.stats[4].effort
  let spe = document.createElement('spam')
  spe.innerHTML = "Spe: " + pokemon.stats[5].effort

  evs.appendChild(hp)
  evs.appendChild(atk)
  evs.appendChild(def)
  evs.appendChild(spa)
  evs.appendChild(spd)
  evs.appendChild(spe)
  content.appendChild(img)
  content.appendChild(evs)
  card.appendChild(name)
  card.appendChild(content)
  Insert.appendChild(card)
}

// Injectamos todos los pokemons
function InsertAllPokemons(){
  Promise.all(getPokeData).then((pokemon) => {
    for (var i=0;i<pokemon.length;i++) {
      InsertPokemon(pokemon[i])
    }
  });
}

// Funcion para tomar datos del formulario
function InputForm() {
  let HP = document.getElementById("HP").value;
  let Atk = document.getElementById("Atk").value;
  let Def = document.getElementById("Def").value;
  let Spa = document.getElementById("Spa").value;
  let Spd = document.getElementById("Spd").value;
  let Spe = document.getElementById("Spe").value;
  
  Reset()
  
  if(HP === '' && Atk === '' && Def === '' && Spa === '' && Spd === '' && Spe === ''){
    InsertAllPokemons()
  }
  else {
    Filter(HP, Atk, Def, Spa, Spd, Spe);
  }
}

// Para Reiniciar las anteriores busquedas
function Reset(){
  document.getElementById('MiForm').reset();
  document.getElementById('insert').innerHTML = "";
  // document.getElementById("HP").focus()
}

// Filtrar por los parametros del Formulario
function Filter(Ps, Atk, Def, Spa, Spd, Spe) {
  Promise.all(getPokeData).then((pokemon) => {
    for (var i=0;i<pokemon.length;i++) {
      if(pokemon[i].stats[0].effort == Ps && 
        pokemon[i].stats[1].effort == Atk && 
        pokemon[i].stats[2].effort == Def && 
        pokemon[i].stats[3].effort == Spa && 
        pokemon[i].stats[4].effort == Spd && 
        pokemon[i].stats[5].effort == Spe) {
          InsertPokemon(pokemon[i])
        }
    }
  })
}

InsertAllPokemons()