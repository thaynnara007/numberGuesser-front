const normalizeName = (string) => string.replace(/ /g, '_');

const toBlankSpace = (string) => string.replace(/_/g, ' ');

const randomNumberBetween = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);  

const validateNumber = (value) => {
    let validated = true

    if (isNaN(value)){
        validated = false
        alert('Esse campo precisa ser um número')
    }

    if (value <= 0) {
        validated = false
        alert('Esse campo precisa ser maior que zero')
    }
    return validated
}

module.exports = {
    normalizeName,
    toBlankSpace,
    randomNumberBetween,
    validateNumber,
}