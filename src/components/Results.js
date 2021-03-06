
import React, { Component } from 'react';
import Alert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import {
    CircularProgress,
    Typography,
    Avatar,
    CardContent,
    CardHeader,
    CardMedia,
    Card
} from '@material-ui/core';


// Redux Props
const mapStateToProps = (state) => {
    return {
        articles: state.articles,
        loading: state.loading,
        error: state.error,
        searchButton: state.searchButton,
        input: state.input,
        filterDate: state.filterDate,
    };
};


class Results extends Component {

    render() {
        return (
            <section>
                {/* Loading */}
                {this.props.loading &&
                    <div className="circular-progress">
                        <CircularProgress color="secondary" />
                    </div>
                }

                {/* Error Feedback */}
                {this.props.error && !this.props.loading &&
                    <Alert severity="error">{this.props.error}</Alert>
                }

                  {/* Empty Results */}
                  {this.props.articles && !this.props.articles.length &&
                    <Alert severity="error">Your search results returned empty, check your date query</Alert>
                }


                {/* Articles */}
                { this.props.articles && this.props.articles.length > 1 && !this.props.loading &&

                    <div className="articles-wrapper">
                        {
                            this.props.articles.length &&
                            this.props.articles.map(val => {
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
    };

};

export default connect(mapStateToProps)(Results)
