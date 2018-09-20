import React, { Component } from 'react';
import {Dimensions,
        FlatList,
        TextInput,
        StyleSheet,
        Text, 
        View, 
        TouchableOpacity, 
        ScrollView, 
        Image }
        from 'react-native';
import { Button, ListItem, List } from 'react-native-elements';

import { Asset, Audio, Font, Video } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';
import PlaybackView from './PlaybackView';
import MediaList from './MediaList';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFFFFF';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;

class Icon {
    constructor(module, width, height) {
      this.module = module;
      this.width = width;
      this.height = height;
      Asset.fromModule(this.module).downloadAsync();
    }
  }


const ICON_LOGO= new Icon(require('../assets/logotype.png'), 200, 135);
const ICON_SMALL_LOGO= new Icon(require('../assets/logo-trans.png'), 25, 33);





class DashboardView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
             text: 'Post Malone', 
             searchMedia:[],
             fontLoaded:false,
             searching:false
             
            };
      }

    static navigationOptions = {
      title: '',
    };

    async componentDidMount() {
      

          await Font.loadAsync({
            ...MaterialIcons.font,
            'cutive-mono-regular': require('../assets/fonts/CutiveMono-Regular.ttf'),
          });
           console.log('Seach view mounting');
          // PLAYLIST.push(new PlaylistItem('test',this._getMediaSource(this.props.youtubeId),false));
          this.setState({ fontLoaded: true });
     
      }
    
    render() {
      const { navigate } = this.props.navigation;
      return !this.state.fontLoaded ? (
        <View style={styles.emptyContainer} />
      ) : (
        <View style={styles.container}>
            {/* <Button
            title='Play Music'
            onPress={() =>
                navigate('Profile', { name: 'Jane' })
            }
            /> */}


           {/* <Text>HELLO</Text> */}
               {/* <MediaList searchMedia={this.state.searchMedia}/> */}
            
            <View style={this.state.searching ? styles.nullContainer : styles.imageContainer}>  
             
             <Image
              style={this.state.searching ? styles.smallLogo  : styles.logo}
              source={this.state.searching ? ICON_SMALL_LOGO.module : ICON_LOGO.module} /> 
              {/* <Text style={this.state.searching ? null : [{fontWeight:'800'},{fontSize:18}]}>Howdy!</Text> */}
                <View style={   [{justifyContent: 'center'},
    {alignItems: 'center'},{marginTop:0},{marginBottom:10}]}>
                    <TextInput
                    style={[styles.input, styles.text, { fontFamily: 'cutive-mono-regular' }]}
                    ref={ref => {this._textInput = ref}}
                    autoFocus={false}
                    value={this.state.text}
                    onChangeText={(text) => this.setState({text})}
                    keyboardType="default"
                    returnKeyType="send"
                    onSubmitEditing={this._submit}
                    blurOnSubmit={true}
                     />
               </View>  
           </View>
            
         

                 <FlatList
          data={this.state.searchMedia}
          keyExtractor={(i) => i.etag}
          renderItem={({ item }) =><ListItem titleStyle={{fontFamily :'cutive-mono-regular',fontSize:14,fontWeight:'400'}} title={item.snippet.title} onPress={()=>navigate('Profile',{youtubeId : item.id.videoId, youtubeTitle : item.snippet.title })}/>} 
           />



         


        {/* //    <Text>{`${item.snippet.title} ${item.id.videoId}`}</Text> */}
            

              

                
        </View>

    

     


      );
    }
    _submit = () => {
     
    //  alert(`Searching Youtube for ${this.state.text}!`);
        this.setState({searching:true});
         this._fetchYoutubeList(this.state.text);
     };


    _fetchYoutubeList(searchString){
        console.log("FETCH ACTINO",searchString);
        return fetch(`http://localhost:8090/search/${this.state.text}`)
            .then(res =>res.json())
            .then((responseJson) =>{
                this.setState({ 
                    searchMedia : responseJson.items
                });
            }) 
            .then(()=>console.log(this.state.searchMedia))
            .catch(err => console.log(err));

        }

    _loadYoutubeResults(results){
        console.log(results);


    }

  }






  const styles = StyleSheet.create({
    logo:{
        height:135,
        width:200,
        alignSelf:'center'

      },
      smallLogo:{
        height:33,
        width:25,
        alignSelf:'center',
        marginTop:40
       

      },
      imageContainer:{
        justifyContent: 'center',
    alignItems: 'center',
    height: '70%'
       
      },
      nullContainer:{
        
      },
      backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    input: {
        margin: 20,
        marginBottom: 0,
        height: 40,
        width:250,
        paddingHorizontal: 10,
        borderRadius: 4,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize:18,
      },
    emptyContainer: {
      alignSelf: 'stretch',
      backgroundColor: BACKGROUND_COLOR,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
    
      backgroundColor: BACKGROUND_COLOR,
    },
    wrapper: {},
    nameContainer: {
      height: 50,
      paddingRight: 20,
      paddingLeft:20
    },
    space: {
      height: FONT_SIZE,
    },
   
    timestampRow: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
      minHeight: FONT_SIZE,
    },
    text: {
      fontSize: FONT_SIZE,
      minHeight: FONT_SIZE,
    },
    buffering: {
      textAlign: 'left',
      paddingLeft: 20,
    },
    timestamp: {
      textAlign: 'right',
      paddingRight: 20,
    },
    button: {
      backgroundColor: BACKGROUND_COLOR,
    },
    buttonsContainerBase: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  
    volumeContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: DEVICE_WIDTH / 2.0,
      maxWidth: DEVICE_WIDTH / 2.0,
    },
 
    rateSlider: {
      width: DEVICE_WIDTH / 2.0,
    },
    buttonsContainerTextRow: {
      maxHeight: FONT_SIZE,
      alignItems: 'center',
      paddingRight: 20,
      paddingLeft: 20,
      minWidth: DEVICE_WIDTH,
      maxWidth: DEVICE_WIDTH,
    },
  });

export default DashboardView;