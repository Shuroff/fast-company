import { render } from '@testing-library/react'
import { Badge } from '../badge/badge'
export const SearchStatus = ({ numOfUsers }) => {
  const renderPhrase = number => {
    let peoplesParty
    if ((number % 10 === 1 && number > 20) || number === 1) {
      peoplesParty = 'человек тусанет'
    } else if (
      ([2, 3, 4].includes(number % 10) && number > 20) ||
      [2, 3, 4].includes(number)
    ) {
      peoplesParty = 'человека тусанут'
    } else {
      peoplesParty = 'человек тусанет'
    }

    return `${number} ${peoplesParty} с тобой сегодня`
  }
  let phrase, color

  if (numOfUsers === 0) {
    phrase = `Никто с тобой не тусанет`
    color = `danger`
  } else {
    phrase = renderPhrase(numOfUsers) + `с тобой сегодня`
    color = `primary`
  }

  return (
    <h3>
      <Badge color={color} name={phrase} />
    </h3>
  )
}
