import React from 'react'

import Routes from './routes'

import Navbar from './components/Navbar'

function App() {

	return (
		<>
			<Navbar />
			<main role="main">
				<Routes />
			</main>
		</>
	);
}

export default App;
