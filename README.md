
<p align="center">
<img src="https://github.com/thinkful-ei22/Donny-Playground/blob/master/screenshots/godsplan.gif">
</p>

# Slowjam - Slow your roll 🐌🐢

Created using React Native and Expo SDK. 
Slowjam is a Youtube music application, with a twist - the audio is processed so that it's sl o w w w e d down (with the pitch being affected as well). This has the effect of elevating the pathos of certain songs - for example, try listening to **The Smith's "Heaven knows I'm miserable now"** at 70% speed - *it becomes epically tragicomic*. As for the current contemporary cultural interest in slowed-down music, I'd say it originates in the pioneering efforts of Robert Earl Davis Jr. (July 20, 1971 – November 16, 2000), better known under his *nomme-de-guerre* DJ Screw, whose "chopped-and-screwed" mixes are a deep and compelling exploration of slowness as form.

## Technical Challenges

This app was created as part of Flex Week in the Thinkful Engineering Immersion Program. The goal of Flex Week is to practice learning a new technology/framework/etc in a week by yourself. I chose React Native (with no previous experience or knowledge of it) because I thought it would be fun (which, to be fair, it was).

After reading the React Native docs and perusing links and tinkering with example code, I decided on an idea only to run into an immediate issue:

The Problem - I want to use Expo for its ease-of-use in rapid prototyping; however, Expo does not have a Youtube player component.

Possible, popular solutions include:

* Detach the project and install the react-native-youtube library.

* Load Youtube Videos from a React Native WebView.


Both of these solutions have their own advantages and disadvantages,with loading Youtube videos from a WebView being the simplest and fastest workaround since I could remain within a completely Expo-contained workflow.

However neither of these solutions offer a straightforward method of to processing the audio stream itself.

In order to achieve this, I came up with an addition solution:

* Run a Node server that takes a Youtube stream and processes it using FFmpeg, then stream the processed stream back to the client.

This works fine, but Expo's Audio API already allows you to process audio in the way I want - e.g. slow it down, so all I really need to do is send the client the audio data in a format that it can play (mp4/mp3). You can extract the streams from a Youtube video following a method used by Youtube downloader sites, which works by querying an AJAX endpoint used internally by YouTube's iframe embed API. An excellent explanation of this approach can be found here : [https://tyrrrz.me/Blog/Reverse-engineering-YouTube] 

A JavaScript implementation of the above can be found at [https://github.com/fent/node-ytdl-core].

Although it's concievable to do this all client-side (query the Youtube iframe API, process the results), I set up a server with ytdl-core and an endpoint that takes in a youtube video ID and then returns a JSON object with the link to the desired audio stream. 

Once that was setup, things (mostly) worked! 

## Further Thoughts

Currently, the app has minimal functionality other than being able to take a search term, render a simple list of Youtube results which you can click to then play the (slowed-down) audio. It's lacking certain features that are expected for this type of app, such as making a playlist and backgrounding of audio when the application is not in focus, although the lack of this last feature is due to a current limitation of Expo - you can detach the project and then implement it, which is something I'm going to explore. On further thought, pretty much all of the project could be implemented outside of React Native as just a plain ol' React + HTML/CSS web application (which if you really wanted, I suppose you could wrap in some kind of wrapper to make a mobile app) since I'm not really using any underlying features of the phone currently like the camera, GPS, local storage. Also, separating a Youtube video's media streams is against Youtubes ToS, so making an app that utilizes that is not the best idea if you are planning on making a commercial app - but this is more of a speculative fun idea that I'll keep working on after Flex Week, fixing things, improving it, learning and having fun :)



