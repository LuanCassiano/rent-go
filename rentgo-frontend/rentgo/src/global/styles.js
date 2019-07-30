import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({ 
    root: {
        display: 'flex',
    },

    content: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },

    toolbar: {
        ...theme.mixins.toolbar
    }
}));

export default useStyles;