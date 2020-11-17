import React from 'react';
import { useAppContext } from '../libs/useContext'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';



function Results() {
    const { mainState } = useAppContext()



    return (
        <section>
            {mainState.loading &&
                <div className="circular-progress">
                    <CircularProgress color="secondary" />
                </div>

            }

            {mainState.error &&
                <Alert severity="error">{mainState.error}</Alert>
            }

            { mainState.articles &&

                <div className="articles-wrapper">
                    {
                        mainState.articles.length &&
                        mainState.articles.map(val => {
                            return <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe">
                                            {val.author.charAt(0)}
                                        </Avatar>
                                    }
                                    title={val.title}
                                    subheader={val.publishedAt}
                                />
                                <CardMedia
                                    image={val.urlToImage}
                                    title="Paella dish"
                                />
                                <CardContent>
                                    <Typography color="pink" component="h4">
                                        {val.source.name}
                                    </Typography>

                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {val.description}
                                    </Typography>
                                </CardContent>

                            </Card>
                        })
                    }
                </div>


            }

        </section>
    )
}

export default Results


/*


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (

  );
}

*/