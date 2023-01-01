const { getRandomAdjective } = require('../adjectives');

class Generator {
  constructor(dateObject) {
    this.dateObject = dateObject;
  }

  days() {
    this.string = 'Estamos há ';
    if (this.dateObject?.days > 1) {
      this.string += `${this.dateObject?.days} dias`;
      return this;
    }

    if (this.dateObject?.days <= 1) {
      this.string += `${this.dateObject?.days} dia`;
      return this;
    }
  }

  hours() {
    this.string = 'Estamos há ';
    if (this.dateObject?.hours > 1) {
      this.string += `${this.dateObject?.hours} horas`;
      return this;
    }

    if (this.dateObject?.hours <= 1) {
      this.string += `${this.dateObject?.hours} hora`;
      return this;
    }
  }

  minutes() {
    if (this.dateObject?.minutes > 1) {
      this.string += ` e ${this.dateObject?.minutes} minutos`;
      return this;
    }

    if (this.dateObject?.minutes <= 1) {
      this.string += ` e ${this.dateObject?.minutes} minuto`;
      return this;
    }
  }

  secret() {
    return `${this.string} esperando o fim dos sigilos do Bolsonaro..`
  }

  prison() {
    return `${this.string} esperando a prisão da familía Bolsonaro.`;
  }
}

module.exports = Generator;
