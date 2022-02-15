function textBreaker(text) {
  const splited = text.split('para ');
  const newText = [splited[0], `para ${splited[1]}`]
  return newText;
}

module.exports = textBreaker;
