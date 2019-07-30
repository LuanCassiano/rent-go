import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import useStyles from './styles' 

import travelImg from '../../assets/img/travel.jpg'

export default function Home() {
    const classes = useStyles()

    return (
        <>
            <CssBaseline />
            <main className={classes.mainStyle}>
                <Paper className={classes.mainCover}>
                    {
                        <img 
                            style={{display: 'none'}}
                            src={travelImg}
                            alt="cover"
                        />
                    }
                    <div className={classes.overlay}/>
                    <Grid>
                        <Grid item md={6}>
                            <div className={classes.mainTitle}>
                            <Typography component="h1" variant="h2" color="inherit" gutterBottom>
                                Viage para qualquer lugar do Brasil com a RentGo.
                            </Typography>
                            <Typography variant="h5" color="inherit">
                                Seja para um passeio ou um evento, a RentGo leva você.
                                Baixe nosso aplicativo pela PlayStore ou AppStore e confira.
                            </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </main>
        </>
    )
}