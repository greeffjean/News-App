import React from 'react';
import { useAppContext } from '../libs/useContext'
import Alert from '@material-ui/lab/Alert';
import {
  CircularProgress,
  Typography,
  Avatar,
  CardContent,
  CardHeader,
  CardMedia,
  Card
} from '@material-ui/core';



function Results() {
  const { mainState } = useAppContext()
  

    return (
      <section>
        {/* Loading */}
            {mainState.loading &&
                <div className="circular-progress">
                    <CircularProgress color="secondary" />
                </div>
            }

          {/* Error Feedback */}
            {mainState.error &&
                <Alert severity="error">{mainState.error}</Alert>
        }
        

          {/* Articles */}
            { mainState.articles &&

                <div className="articles-wrapper">
                    {
                        mainState.articles.length &&
                        mainState.articles.map(val => {
                            return <Card>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="initial">
                                            {val.author ? val.author.charAt(0) : "N"}
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
