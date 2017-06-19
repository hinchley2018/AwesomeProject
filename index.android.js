/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    Image,
    StyleSheet,
    Text,
    View,
    ListView,

} from 'react-native';

var MOCKED_MOVIES_DATA = [
    {title: 'Title', year:'2015',posters:{thumbnail:'http://i.imgur.com/UePbdph.jpg'}}
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

export default class AwesomeProject extends Component {

  constructor(props){
    super(props);
    //dataSource is best to go directly into ListView
    this.state={
      dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
      }),
        loaded: false,
    };
  }

  render() {
    if(!this.state.movies){
        return this.renderLoadingView();
    }

    return (
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderMovie()}
            style={styles.listView}
            initialListSize=""
            onEndReachedThreshold=""
            pageSize=""
            renderScrollComponent=""
            scrollRenderAheadDistance=""
            stickyHeaderIndices=""
        />
    );
  }

  componentDidMount(){
    this.fetchData();
  }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
              this.setState({
                  dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
                  loaded: true,
              });
            })
            .done();
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading movies...
                </Text>
            </View>
        );
    }

    renderMovie(movie) {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: movie.posters.thumbnail}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>
                        {movie.title}
                    </Text>
                    <Text style={styles.year}>
                        {movie.year}
                    </Text>

                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  rightContainer: {
      flex: 1,
  },

  title: {
    fontSize:20,
    textAlign: 'center',
    marginBottom: 8,
  },
  year: {
      textAlign: 'center',


  },
  thumbnail: {
    width: 80,
    height: 80,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
