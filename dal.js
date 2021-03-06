var catsData = [
  {
    id: 2,
    type: 'cat',
    breed: 'Siamese',
    desc:
      'The Siamese cat is one of the first distinctly recognized breeds of Asian cat. Derived from the rtgs: wichianmat landrace, one of several varieties of cat native to Thailand.'
  },
  {
    id: 3,
    type: 'cat',
    breed: 'Maine Coon',
    desc:
      'The Maine Coon is the largest domesticated breed of cat. It has a distinctive physical appearance and valuable hunting skills.'
  },
  {
    id: 4,
    type: 'cat',
    breed: 'Pixie-bob',
    desc:
      'The Pixie-bob is a breed of domestic cat claimed by breed founder Carol Ann Brewer of Washington State to be the progeny of naturally occurring bobcat hybrids.'
  }
]

const { append, find, compose, reject } = require('ramda')

function add(cat, callback) {
  catsData = append(cat, catsData)
  callback(null, cat)
}

function listCats(callback) {
  callback(null, catsData)
}

function showCat(catId, callback) {
  const foundCat = find(cat => cat.id === catId, catsData)
  callback(null, foundCat)
}

function updateCat(id, cat, callback) {
  catsData = compose(append(cat), reject(c => c.id === id))(catsData)

  callback(null, cat)
}

function removeCat(id, callback) {
  catsData = compose(reject(c => c.id === id)(catsData))

  callback(null, catsData)
}

const dal = {
  add,
  listCats,
  showCat,
  updateCat,
  removeCat
}

module.exports = dal
