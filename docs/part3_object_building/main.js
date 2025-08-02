const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const speciesInput = document.getElementById('species');
const colorInput = document.getElementById('color');
const button = document.querySelector('button');
const output = document.querySelector('.output');

button.addEventListener('click', () => {
  const name = nameInput.value;
  const age = ageInput.value;
  const species = speciesInput.value;
  const color = colorInput.value;

  const creature = {
    name: name,
    age: age,
    species: species,
    color: color,
    description() {
      return `${this.name} is a ${this.age} year old ${this.color} ${this.species}.`;
    }
  };

  output.textContent = creature.description();
});


