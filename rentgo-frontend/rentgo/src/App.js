import React from 'react'

import Routes from './routes'

import useStyles from './global/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
import Navbar from './components/Navbar'

function App() {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Navbar />
			<main>
				<Routes />
			</main>
		</div>
	);
}

export default App;
