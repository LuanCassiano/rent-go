import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    mainStyle: {
        paddingTop: 60
    },

    mainCover: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/mystore-1e767.appspot.com/o/travel.jpg?alt=media&token=23be2197-d6fc-4d9a-99d8-1076d73ca788)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },

    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
    },

    mainTitle: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
        },
    }
}))

export default useStyles