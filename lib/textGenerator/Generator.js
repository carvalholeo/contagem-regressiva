const { getRandomAdjective } = require('../adjectives');

class Generator {
  constructor(dateObject) {
    this.dateObject = dateObject;
  }

  days() {
    if (this.dateObject?.days > 1) {
      this.string = `Faltam ${this.dateObject?.days} dias, `;
      return this;
    }

    if (this.dateObject?.days === 1) {
      this.string = `Falta ${this.dateObject?.days} dia, `;
      return this;
    }

    if (this.dateObject?.days === 0) {
      this.string = `Faltam `;
      return this;
    }
  }

  hours() {
    if (this.dateObject?.hours > 1) {
      this.string += `${this.dateObject?.hours} horas`;
      return this;
    }

    if (this.dateObject?.hours === 1) {
      this.string += `${this.dateObject?.hours} hora`;
      return this;
    }

    if (this.dateObject?.hours === 0) {
      return this;
    }
  }

  minutes() {
    if (this.dateObject?.minutes > 1) {
      this.string += ` e ${this.dateObject?.minutes} minutos`;
      return this;
    }

    if (this.dateObject?.minutes === 1) {
      this.string += ` e ${this.dateObject?.minutes} minuto`;
      return this;
    }

    if (this.dateObject?.minutes === 0) {
      return this;
    }
  }

  async predicate() {
    return `${this.string} para o fim do governo do ${await getRandomAdjective()}.`
  }

  firstRound() {
    return `${this.string} para o 2º turno.`;
  }
}

module.exports = Generator;
