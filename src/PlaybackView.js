/**
 * @flow
 */

import React from 'react';
import {
  Animated,
  Easing,
  Dimensions,
  Image,
  Slider,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { Asset, Audio, Font, Video } from 'expo';
import { MaterialIcons } from '@expo/vector-icons';

class Icon {
  constructor(module, width, height) {
    this.module = module;
    this.width = width;
    this.height = height;
    Asset.fromModule(this.module).downloadAsync();
  }
}

class PlaylistItem {
  constructor(name, uri, isVideo) {
    this.name = name;
    this.uri = uri;
    this.isVideo = isVideo;
  }
}
let _source=null;




const PLAYLIST = [
  new PlaylistItem(
    '"Bobby Schmurda - Hot N*gga',
    'https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4',
    false
  ),
  new PlaylistItem(
    'White Iverson',
'https://r5---sn-8xgp1vo-p5qs.googlevideo.com/videoplayback?c=WEB&expire=1537376860&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Crequiressl%2Csource%2Cxtags%2Cexpire&mime=audio%2Fmp4&pl=21&itag=140&dur=283.585&mv=m&source=youtube&keepalive=yes&clen=4504713&ipbits=0&initcwndbps=1256250&mn=sn-8xgp1vo-p5qs%2Csn-p5qlsndd&mm=31%2C29&id=o-AFYUog3MSIJeXLvbgXtawn5Rv_SKmHc_K5charowZmLY&key=yt6&ip=108.31.232.160&gir=yes&mt=1537355160&ms=au%2Crdu&requiressl=yes&xtags=tx%3D9474457&lmt=1501183963361757&fvip=3&ei=_C2iW6rlFsPE8wTM2Z7ICg&ratebypass=yes&signature=14C07B1812C0CA9530EB8517C4AD7BA03EC044D7.5823A6BFB862C8388ED69EACF7359D2BA5643E6D&ir=1&rr=12&fexp=23755740,23763599',
   false
  ),
  new PlaylistItem(
    '"Fleetwood Mac- Dreams"”',
    'https://r1---sn-8xgp1vo-p5ql.googlevideo.com/videoplayback?lmt=1517939608662103&initcwndbps=1325000&source=youtube&keepalive=yes&ei=7NShW_2mKKiihwazlpqYDg&c=WEB&ip=108.31.232.160&requiressl=yes&ms=au%2Crdu&mt=1537332348&mv=m&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Crequiressl%2Csource%2Cexpire&id=o-AASGWnPcEF2HkHq8U3JD38g2daxYy-JBx475FJi2m5FM&pl=21&mm=31%2C29&mn=sn-8xgp1vo-p5ql%2Csn-p5qlsnzd&ipbits=0&fvip=1&dur=253.654&expire=1537354060&gir=yes&mime=audio%2Fmp4&key=yt6&clen=4029344&itag=140&ratebypass=yes&signature=403800B4BF4ECC11DD955950A30A21745C3EE328.014495D8D1E8FD7CED0B6055EF09EAEA997F1DEA',
    false
  ),
  new PlaylistItem(
    "Popeye - I don't scare",
    'https://ia800501.us.archive.org/11/items/popeye_i_dont_scare/popeye_i_dont_scare_512kb.mp4',
    false
  ),
  new PlaylistItem(
    'Podington Bear - “Rubber Robot”',
    'https://r3---sn-8xgp1vo-p5qs.googlevideo.com/videoplayback?c=WEB&clen=4504713&requiressl=yes&fvip=3&itag=140&initcwndbps=1325000&mime=audio%2Fmp4&ipbits=0&mt=1537344833&gir=yes&key=yt6&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpcm2%2Cpl%2Crequiressl%2Csource%2Cexpire&expire=1537366570&source=youtube&mv=m&keepalive=yes&ei=ygWiW4bkB5eThgaw76SQCA&ms=au%2Crdu&ip=108.31.232.160&lmt=1532746568000612&dur=283.585&pl=21&pcm2=yes&mm=31%2C29&mn=sn-8xgp1vo-p5qs%2Csn-p5qlsndd&id=o-ALCgGFBabdAl_FGgoeQNRfAwSO0lWh3-MDKTtDFp5VeA&ratebypass=yes&signature=35404BFAF9908EE54426D01247022E76EED69ADF.668EDCD07030AB724FCB1FB749A68C89383F4A0C',
    false
  ),
];

const ICON_THROUGH_EARPIECE = 'speaker-phone';
const ICON_THROUGH_SPEAKER = 'speaker';

const ICON_PLAY_BUTTON = new Icon(require('../assets/images/play_button.png'), 34, 51);
const ICON_PAUSE_BUTTON = new Icon(require('../assets/images/pause_button.png'), 34, 51);
const ICON_STOP_BUTTON = new Icon(require('../assets/images/stop_button.png'), 22, 22);
const ICON_FORWARD_BUTTON = new Icon(require('../assets/images/forward_button.png'), 33, 25);
const ICON_BACK_BUTTON = new Icon(require('../assets/images/back_button.png'), 33, 25);

const ICON_LOOP_ALL_BUTTON = new Icon(require('../assets/images/loop_all_button.png'), 77, 35);
const ICON_LOOP_ONE_BUTTON = new Icon(require('../assets/images/loop_one_button.png'), 77, 35);

const ICON_MUTED_BUTTON = new Icon(require('../assets/images/muted_button.png'), 67, 58);
const ICON_UNMUTED_BUTTON = new Icon(require('../assets/images/unmuted_button.png'), 67, 58);

const ICON_TRACK_1 = new Icon(require('../assets/images/track_1.png'), 166, 5);
const ICON_THUMB_1 = new Icon(require('../assets/images/thumb_1.png'), 18, 19);
const ICON_THUMB_2 = new Icon(require('../assets/images/thumb_2.png'), 15, 19);

const LOOPING_TYPE_ALL = 0;
const LOOPING_TYPE_ONE = 1;
const LOOPING_TYPE_ICONS = { 0: ICON_LOOP_ALL_BUTTON, 1: ICON_LOOP_ONE_BUTTON };

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');
const BACKGROUND_COLOR = '#FFFFFF';
const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = '... loading ...';
const BUFFERING_STRING = '...buffering...';
const RATE_SCALE = 1.0;
const VIDEO_CONTAINER_HEIGHT = DEVICE_HEIGHT * 2.0 / 5.0 - FONT_SIZE * 2;



export default class PlaybackView extends React.Component {
  constructor(props) {
    super(props);
    this.index = 0;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.unmounted = null,
    this.spinValue = new Animated.Value(0),
    this.playbackInstance = null;
    this.state = {
      opacity: new Animated.Value(0),
      showVideo: false,
      playbackInstanceName: LOADING_STRING,
      loopingType: LOOPING_TYPE_ALL,
      muted: false,
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      fontLoaded: false,
      shouldCorrectPitch: false,
      volume: 1.0,
      rate: 0.727,
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
      poster: false,
      useNativeControls: false,
      fullscreen: false,
      throughEarpiece: false,
      mediaFile:null,
      
      youtubeId:this.props.navigation.state.params.youtubeId
    };
  }

    static navigationOptions = {
      title: '♪ ♪♪  ♪  ♪',
    };


  spin () {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true
      }
    ).start(() => this.spin())
  }


  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }


  componentDidMount() {
  
    this.spin()

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
    });
    (async () => {
      await this._getMediaSource(this.props.navigation.state.params.youtubeId),
      await Font.loadAsync({
        ...MaterialIcons.font,
        'cutive-mono-regular': require('../assets/fonts/CutiveMono-Regular.ttf'),
      });

  
       console.log('Player mounting');
      // PLAYLIST.push(new PlaylistItem('test',this._getMediaSource(this.props.youtubeId),false));
      this.setState({ fontLoaded: true });
    })();
  }


 componentWillUnmount(){
      this.unmounted = true;
      this.playbackInstance.unloadAsync();
  }
 

  async _loadNewPlaybackInstance(playing) {
    console.log('Load New Playback Instance');
    console.log('this playback props',this.props.navigation);
    console.log('this state props youtubeId', this.state.youtubeId);
    if (this.playbackInstance != null && this.unmounted) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
    if(!this.unmounted){
    const source = {name: this.props.navigation.state.params.youtubeName, uri:_source};
    // const source = { uri: PLAYLIST[this.index].uri };
    const initialStatus = {
      shouldPlay: playing,
      rate: this.state.rate,
      shouldCorrectPitch: this.state.shouldCorrectPitch,
      volume: this.state.volume,
      isMuted: this.state.muted,
      isLooping: this.state.loopingType === LOOPING_TYPE_ONE,
      // // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
      // androidImplementation: 'MediaPlayer',
    };

    if (PLAYLIST[this.index].isVideo) {
      this._video.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
      await this._video.loadAsync(source, initialStatus);
      this.playbackInstance = this._video;
      const status = await this._video.getStatusAsync();
    } else {
      const { sound, status } = await Audio.Sound.create(
        source,
        initialStatus,
        this._onPlaybackStatusUpdate,
        false
      );
      this.playbackInstance = sound;
    }

    this._updateScreenForLoading(false);
  }
  }

  _mountVideo = component => {
    this._video = component;
    this._loadNewPlaybackInstance(false);
  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        showVideo: false,
        isPlaying: false,
        playbackInstanceName: LOADING_STRING,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true,
      });
    } else {
      this._onPlayPausePressed();
      this.setState({
        playbackInstanceName: this.props.navigation.state.params.youtubeTitle,
        showVideo: PLAYLIST[this.index].isVideo,
        isLoading: false,
      });
    }
  }

  _onPlaybackStatusUpdate = status => { 
    if (!status.isLoaded) {
      // Update your UI for the unloaded state
      if (status.error) {
        console.log(`Encountered a fatal error during playback: ${status.error}`);
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      if (status.isLoaded) {
      // console.log("status.isLoaded")

        if (this.unmounted) {
            console.log("IF THIS.UNMOUNTED IS TRUE")
        } else {
          // console.log("in this.unmounted conditional")
          this.setState({
            playbackInstancePosition: status.positionMillis,
            playbackInstanceDuration: status.durationMillis/2,
            shouldPlay: status.shouldPlay,
            isPlaying: status.isPlaying,
          });
        }
      } else {
        if (status.error) {
          console.log(`FATAL PLAYER ERROR: ${status.error}`);
        }
      }
    }
  };

  _onLoadStart = () => {
    console.log(`ON LOAD START`);
  };

  _onLoad = status => {
    console.log(`ON LOAD : ${JSON.stringify(status)}`);
  };

  _onError = error => {
    console.log(`ON ERROR : ${error}`);
  };

  _onReadyForDisplay = event => {
    const widestHeight = DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width;
    if (widestHeight > VIDEO_CONTAINER_HEIGHT) {
      this.setState({
        videoWidth: VIDEO_CONTAINER_HEIGHT * event.naturalSize.width / event.naturalSize.height,
        videoHeight: VIDEO_CONTAINER_HEIGHT,
      });
    } else {
      this.setState({
        videoWidth: DEVICE_WIDTH,
        videoHeight: DEVICE_WIDTH * event.naturalSize.height / event.naturalSize.width,
      });
    }
  };

  _onFullscreenUpdate = event => {
    console.log(`FULLSCREEN UPDATE : ${JSON.stringify(event.fullscreenUpdate)}`);
  };

  _advanceIndex(forward) {
    this.index = (this.index + (forward ? 1 : PLAYLIST.length - 1)) % PLAYLIST.length;
  }

  async _updatePlaybackInstanceForIndex(playing) {
    this._updateScreenForLoading(true);

    this.setState({
      videoWidth: DEVICE_WIDTH,
      videoHeight: VIDEO_CONTAINER_HEIGHT,
    });

    this._loadNewPlaybackInstance(playing);
  }

  _onPlayPausePressed = () => {
    if (this.playbackInstance != null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync();
      } else {
        this.playbackInstance.playAsync();
      }
    }
  };

  _onStopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.stopAsync();
    }
  };

  _onForwardPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(true);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onBackPressed = () => {
    if (this.playbackInstance != null) {
      this._advanceIndex(false);
      this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
    }
  };

  _onMutePressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsMutedAsync(!this.state.muted);
    }
  };

  _onLoopPressed = () => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setIsLoopingAsync(this.state.loopingType !== LOOPING_TYPE_ONE);
    }
  };

  _onVolumeSliderValueChange = value => {
    if (this.playbackInstance != null) {
      this.playbackInstance.setVolumeAsync(value);
    }
  };

  _trySetRate = async (rate, shouldCorrectPitch) => {
    if (this.playbackInstance != null) {
      try {
        await this.playbackInstance.setRateAsync(rate, shouldCorrectPitch);
      } catch (error) {
        // Rate changing could not be performed, possibly because the client's Android API is too old.
      }
    }
  };

  _onRateSliderSlidingComplete = async value => {
    this._trySetRate(value * RATE_SCALE, this.state.shouldCorrectPitch);
  };

  _onPitchCorrectionPressed = async value => {
    this._trySetRate(this.state.rate, !this.state.shouldCorrectPitch);
  };

  _onSeekSliderValueChange = value => {
    if (this.playbackInstance != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
      this.playbackInstance.pauseAsync();
    }
  };

  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance != null) {
      this.isSeeking = false;
      const seekPosition = value * this.state.playbackInstanceDuration;
      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition);
      } else {
        this.playbackInstance.setPositionAsync(seekPosition);
      }
    }
  };

  _getSeekSliderPosition() {
    // console.log('playbackposition',  this.state.playbackInstancePosition /
    // this.state.playbackInstanceDuration)
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {

      if (this.state.playbackInstancePosition/this.state.playbackInstanceDuration >= 1) {
        console.log("end slider reached");
        this.playbackInstance.stopAsync();
      } else{

        return (
          this.state.playbackInstancePosition /
          this.state.playbackInstanceDuration
        );
        }
    }  

    
    return 0;
  };

  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = number => {
      const string = number.toString();
      if (number < 10) {
        return '0' + string;
      }
      return string;
    };
    return padWithZero(minutes) + ':' + padWithZero(seconds);
  }

  _getTimestamp() {
    if (
      this.playbackInstance != null &&
      this.state.playbackInstancePosition != null &&
      this.state.playbackInstanceDuration != null
    ) {
      return `${this._getMMSSFromMillis(
        this.state.playbackInstancePosition
      )} / ${this._getMMSSFromMillis(this.state.playbackInstanceDuration)}`;
    }
    return '';
  }

  _onPosterPressed = () => {
    this.setState({ poster: !this.state.poster });
  };

  _onUseNativeControlsPressed = () => {
    this.setState({ useNativeControls: !this.state.useNativeControls });
  };

  _onFullscreenPressed = () => {
    try {
      this._video.presentFullscreenPlayer();
    } catch (error) {
      console.log(error.toString());
    }
  };

  _onSpeakerPressed = () => {
    this.setState(
      state => {
        return { throughEarpiece: !state.throughEarpiece };
      },
      ({ throughEarpiece }) =>
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: throughEarpiece,
        })
    );
  };

  _getMediaSource =(youtubeId)=>{
    console.log("FETCH YOUTUBE ID",youtubeId);
    return fetch(`https://slowjam-server.herokuapp.com/${youtubeId}`)
        .then(res =>res.json())
        .then((responseJson) =>{
          _source = responseJson.fileURL;
        PLAYLIST.push(new PlaylistItem('TEST',responseJson.fileURL,false));
          //responseJson.fileUrl
            // this.setState({ 
            //     mediaFile : responseJson.fileUrl
            // });
        }) 
        // .then(()=>console.log('lol playlist', PLAYLIST))
        .catch(err => console.log(err));
  }

  render() {
    const { navigate } = this.props.navigation;
  
   

    // Second interpolate beginning and end values (in this case 0 and 1)
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })


    return !this.state.fontLoaded ? (
      <View style={styles.emptyContainer} />
    ) : (
      <View style={styles.container}>
        <View />
        <View style={styles.nameContainer}>
          <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
            {this.state.playbackInstanceName}
          </Text>
         
        </View>
        <View style={styles.space} />
       
        <View style={styles.videoContainer}>
        <Animated.Image
            onLoad={this.onLoad}
            style={{ opacity: this.state.opacity, transform: [{rotate: spin}],width: 200, height: 200,borderRadius:100}}
            source={{uri:this.props.navigation.state.params.coverImageURL}} />
          <Video
            ref={this._mountVideo}
            style={[
              styles.video,
              {
                opacity: this.state.showVideo ? 1.0 : 0.0,
                // width: this.state.videoWidth,
                // height: this.state.videoHeight,
              },
            ]}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            // onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            onLoadStart={this._onLoadStart}
            onLoad={this._onLoad}
            onError={this._onError}
            onFullscreenUpdate={this._onFullscreenUpdate}
            onReadyForDisplay={this._onReadyForDisplay}
            useNativeControls={this.state.useNativeControls}
          />
         
        </View>
        <View
          style={[
            styles.playbackContainer,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}>
          <Slider
            style={styles.playbackSlider}
            trackImage={ICON_TRACK_1.module}
            thumbImage={ICON_THUMB_1.module}
            value={this._getSeekSliderPosition()}
            onValueChange={this._onSeekSliderValueChange}
            onSlidingComplete={this._onSeekSliderSlidingComplete}
            disabled={this.state.isLoading}
          />
          <View style={styles.timestampRow}>
            <Text style={[styles.text, styles.buffering, { fontFamily: 'cutive-mono-regular' }]}>
              {this.state.isBuffering ? BUFFERING_STRING : ''}
            </Text>
            <Text style={[styles.text, styles.timestamp, { fontFamily: 'cutive-mono-regular' }]}>
              {this._getTimestamp()}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.buttonsContainerBase,
            styles.buttonsContainerTopRow,
            {
              opacity: this.state.isLoading ? DISABLED_OPACITY : 1.0,
            },
          ]}>
          {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onBackPressed}
            disabled={this.state.isLoading}>
            <Image style={styles.button} source={ICON_BACK_BUTTON.module} />
          </TouchableHighlight> */}
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onPlayPausePressed}
            disabled={this.state.isLoading}>
            <Image
              style={styles.button}
              source={this.state.isPlaying ? ICON_PAUSE_BUTTON.module : ICON_PLAY_BUTTON.module}
            />
          </TouchableHighlight>
          {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onStopPressed}
            disabled={this.state.isLoading}>
            <Image style={styles.button} source={ICON_STOP_BUTTON.module} />
          </TouchableHighlight> */}
          {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onForwardPressed}
            disabled={this.state.isLoading}>
            <Image style={styles.button} source={ICON_FORWARD_BUTTON.module} />
          </TouchableHighlight> */}
        </View>
        <View style={[styles.buttonsContainerBase, styles.buttonsContainerMiddleRow]}>
          <View style={styles.volumeContainer}>
            <TouchableHighlight
              underlayColor={BACKGROUND_COLOR}
              style={styles.wrapper}
              onPress={this._onMutePressed}>
              <Image
                style={styles.button}
                source={this.state.muted ? ICON_MUTED_BUTTON.module : ICON_UNMUTED_BUTTON.module}
              />
            </TouchableHighlight>
            <Slider
              style={styles.volumeSlider}
              trackImage={ICON_TRACK_1.module}
              thumbImage={ICON_THUMB_2.module}
              value={1}
              onValueChange={this._onVolumeSliderValueChange}
            />
          </View>
          {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onLoopPressed}>
            <Image
              style={styles.button}
              source={LOOPING_TYPE_ICONS[this.state.loopingType].module}
            />
          </TouchableHighlight> */}
        </View>
        <View style={[styles.buttonsContainerBase, styles.buttonsContainerBottomRow]}>
          <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={() => this._trySetRate(1.0, this.state.shouldCorrectPitch)}>
            <View style={styles.button}>
              <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>Rate:</Text>
            </View>
          </TouchableHighlight>
          <Slider
            style={styles.rateSlider}
            trackImage={ICON_TRACK_1.module}
            thumbImage={ICON_THUMB_1.module}
            value={this.state.rate / RATE_SCALE}
            onSlidingComplete={this._onRateSliderSlidingComplete}
          />
          {/* <TouchableHighlight
            underlayColor={BACKGROUND_COLOR}
            style={styles.wrapper}
            onPress={this._onPitchCorrectionPressed}>
            <View style={styles.button}>
              <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
                PC: {this.state.shouldCorrectPitch ? 'yes' : 'no'}
              </Text>
            </View>
          </TouchableHighlight> */}
          <TouchableHighlight onPress={this._onSpeakerPressed} underlayColor={BACKGROUND_COLOR}>
            <MaterialIcons
              name={this.state.throughEarpiece ? ICON_THROUGH_EARPIECE : ICON_THROUGH_SPEAKER}
              size={32}
              color="black"
            />
          </TouchableHighlight>
        </View>
        <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={onPress=()=>navigate('Home')}>
                <View style={styles.button}>
                  <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
                   Return to Search 
                  </Text>
                </View>
              </TouchableHighlight>
        
        <View />
        {this.state.showVideo ? (
          <View>
            <View style={[styles.buttonsContainerBase, styles.buttonsContainerTextRow]}>
              <View />
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onPosterPressed}>
                <View style={styles.button}>
                  <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
                    Poster: {this.state.poster ? 'yes' : 'no'}
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={this._onFullscreenPressed}>
                <View style={styles.button}>
                  {/* <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
                    Fullscreen
                  </Text> */}
                </View>
              </TouchableHighlight>
              <View />
            </View>
            <View style={styles.space} />
            <View style={[styles.buttonsContainerBase, styles.buttonsContainerTextRow]}>
              <View />
              <TouchableHighlight
                underlayColor={BACKGROUND_COLOR}
                style={styles.wrapper}
                onPress={onPress=()=>navigate('Home')}>
                <View style={styles.button}>
                  <Text style={[styles.text, { fontFamily: 'cutive-mono-regular' }]}>
                      Return to Search
                  </Text>
                </View>
              </TouchableHighlight>
              <View />
            </View>
            
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignSelf: 'stretch',
    backgroundColor: BACKGROUND_COLOR,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
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
  videoContainer: {
    height: VIDEO_CONTAINER_HEIGHT,
  },
  video: {
    maxWidth: DEVICE_WIDTH,
  },
  playbackContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    minHeight: ICON_THUMB_1.height * 2.0,
    maxHeight: ICON_THUMB_1.height * 2.0,
  },
  playbackSlider: {
    alignSelf: 'stretch',
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
  buttonsContainerTopRow: {
    maxHeight: ICON_PLAY_BUTTON.height,
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  buttonsContainerMiddleRow: {
    maxHeight: ICON_MUTED_BUTTON.height,
    alignSelf: 'stretch',
    paddingRight: 20,
  },
  volumeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: DEVICE_WIDTH / 2.0,
    maxWidth: DEVICE_WIDTH / 2.0,
  },
  volumeSlider: {
    width: DEVICE_WIDTH / 2.0 - ICON_MUTED_BUTTON.width,
  },
  buttonsContainerBottomRow: {
    maxHeight: ICON_THUMB_1.height,
    alignSelf: 'stretch',
    paddingRight: 20,
    paddingLeft: 20,
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