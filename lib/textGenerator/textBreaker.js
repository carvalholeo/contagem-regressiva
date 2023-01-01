function textBreaker(text) {
  const splited = text.split('esperando ');
  const newText = [splited[0], `esperando ${splited[1]}`]
  return newText;
}

module.exports = textBreaker;
