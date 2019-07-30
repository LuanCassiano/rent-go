import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 0,
    },
    menuButton: {
      marginRight: theme.spacing(4),
    },
    title: {
      flexGrow: 1,
    },

    barColor: {
        backgroundColor: '#1C2331'
    },

    signButton: {
        backgroundColor: '#3F729B'
    },

    navLink: {
        textDecoration: 'none', 
        textTransform: 'uppercase', 
        color: '#FFFFFF', 
        fontWeight: 500,
        padding: 6,
        marginRight: 5,
        '&:hover': {
            backgroundColor: '#3F729B',
            color: '#FFFFFF',
            padding: 6,
            borderRadius: 5
        }
    }
}))

export default useStyles