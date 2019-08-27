import React from 'react'

import Routes from './routes'

function App () {

	const Screens = Routes(true)

	return (
		<Screens />
	)
}

export default App