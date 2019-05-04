const events = [{
  id: 1,
  name: 'Mario Party',
  description: 'A funny festival with lots of games and shows',
}, {
  id: 2,
  name: 'The Beatles: return',
  description: 'The world\'s most famous band returns from the grave for this amazing and unique show #superFun',
}]

export const getRandomEvents = () => {
  const amount = Math.round(Math.random() * events.length)
  return events
    .sort(() => (Math.random() > 0.5 ? 1 : -1)) // shuffle
    .slice(0, amount)
}

export default events
