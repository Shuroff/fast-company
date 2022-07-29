const professionMock = require('../mock/professions.json')
const qualitiesMock = require('../mock/qualities.json')
const Profession = require('../models/Profession')
const Quality = require('../models/Quality')
module.exports = async () => {
  const professions = await Profession.find()
  if (professions.length !== professionMock.length) {
    await createIntialEntity(Profession, professionMock)
  }

  const qualities = await Quality.find()
  if (qualities.length !== qualitiesMock.length) {
    await createIntialEntity(Quality, qualitiesMock)
  }
}
async function createIntialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async item => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
      } catch (error) {
        return e
      }
    })
  )
}
