/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

/*Title,
■ 4-5 lines of description,
■ Product Image
■ Founder’s profile
■ Actions: Upvote (Total number of upvotes should also be visible on the
product card) and Bookmark.
*/

'use strict';
import Colors from './Colors';
import openURLInBrowser from 'react-native/Libraries/Core/Devtools/openURLInBrowser';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import { AsyncStorage } from '@react-native-community/async-storage';
//const STORAGE_KEY = 'CURRENTFILTER';

const links = [
  {
    id: 0,
    title: 'Whatsapp privacy policy modified',
    link: 'https://gadgets.ndtv.com/apps/news/whatsapp-privacy-policy-details-data-sharing-practices-change-for-business-accounts-facebook-2349610#:~:text=WhatsApp%20recently%20updated%20its%20privacy,with%20Facebook%20have%20not%20changed.',
    description: "Whatsapp privacy Policy ",
    upvotes: 0,
    bookmarked: false,
    tags: ["Trending", "Ed Tech", "Machine Learning", "Medical Technology"]
  },
  {
    id: 1,
    title: 'hyperlocal-digital-payment',
    link: 'https://yourstory.com/2021/01/product-roadmap-hyperlocal-digital-payment-cashfree-fintech-startup',
    description: 'From enabling hyperlocal digital payments to building a suite of products, Cashfree’s three years of profitability',
    upvotes: 0,
    bookmarked: false,
    tags: ["Trending", "Ed Tech"]
  },
  {
    id: 2,
    title: 'tech-30-techsparks-superpro-artificial-intelligence',
    link: 'https://yourstory.com/2020/10/tech-30-techsparks-superpro-artificial-intelligence-video-services',
    description: 'tech-30-techsparks-superpro-artificial-intelligence',
    upvotes: 0,
    bookmarked: false,
    tags: ["Trending", "Ed Tech", "Medical Technology"]
  },
  {
    id: 3,
    title: 'infosys-founder-narayana-murthy-warns-entrepreneur',
    link: 'https://yourstory.com/2021/01/infosys-founder-narayana-murthy-warns-entrepreneur',
    description: 'infosys-founder-narayana-murthy-warns-entrepreneur',
    upvotes: 0,
    bookmarked: false,
    tags: ["Trending", "Ed Tech", "Machine Learning"]
  },
  {
    id: 4,
    title: 'Tirupur-based 2nd generation entrepreneur says',
    link: 'https://yourstory.com/2021/01/tirupur-entrepreneur-flipkart-sellers-brand-business',
    description:
      'How to handle moving between screens inside your application.',
    upvotes: 0,
    bookmarked: false,
    tags: ["Trending", "Ed Tech", "Machine Learning"]
  },
  {
    id: 5,
    title: 'indian-brands-success-story',
    link: 'https://yourstory.com/smbstory/indian-brands-success-story-ipo-nilkamal-polycab-shalimar-paints-solar-industries-shahlon-entrepreneur',
    description: 'indian-brands-success-story-ipo-nilkamal-polycab-shalimar-paints-solar-industries',
    upvotes: 0,
    bookmarked: false,
    tags: ["Trending", "Ed Tech", "Machine Learning"]
  },
  {
    id: 6,
    title: 'youtube-puts-a-temporary-freeze-on-uploads',
    link: 'https://techcrunch.com/2021/01/13/youtube-puts-a-temporary-freeze-on-uploads-to-trumps-channel/',
    description:
      'youtube-puts-a-temporary-freeze-on-uploads',
    upvotes: 0,
    bookmarked: false,
    tags: ["Trending", "Ed Tech", "Medical Technology"]
  },
  {
    id: 7,
    title: 'is-there-still-room-in-the-cloud-security-market',
    link: 'https://techcrunch.com/2021/01/12/is-there-still-room-in-the-cloud-security-market/',
    description:
      'is-there-still-room-in-the-cloud-security-market',
    upvotes: 0,
    bookmarked: false,
    tags: ["Trending", "Ed Tech", "Machine Learning"]
  },
];

let filterSelected = 'ORIGINAL FEED';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      links, filterSelected
    }
    this.toggleBookmark = this.toggleBookmark.bind(this);
    this.changeCount = this.changeCount.bind(this);
    this.changefilter = this.changefilter.bind(this);
    this.saveData = this.saveData.bind(this);
    this.readData = this.readData.bind(this);
  };

  toggleBookmark(id) {
    return () => {
      console.log("toggleBookmark Clicked");
      var linksCopy = this.state.links.slice(0);
      "Bookmarks"
      var loc = linksCopy[id];
      loc.bookmarked = !loc.bookmarked;
      this.setState({ links: linksCopy });
      console.log(this.state.links[id].bookmarked);
    }
  }

  changeCount(id, diff) {
    if (this.state.links[id].upvotes + diff >= -1 && this.state.links[id].upvotes + diff <= 1) {
      return () => {
        console.log("Change Count Clicked");
        var linksCopy = this.state.links.slice(0);
        var loc = linksCopy[id];
        loc.upvotes += diff;
        this.setState({ links: linksCopy });
        console.log(this.state.links[id].upvotes);
      }
    }
  }
  ///////////////////////////////////////////(For async storage of filter)
  async saveData() {
    try {
      console.log(148);
      console.log(this.state.filterSelected);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.filterSelected));
      alert('Data successfully saved')
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  async readData() {
    try {
      const currentFilter = await AsyncStorage.getItem(STORAGE_KEY);
      if (currentFilter !== null) {
        this.setState({ filterSelected: currentFilter });
      }
    } catch (e) {
      alert('Failed to fetch the data from storage')
    }
  }

  UNSAFE_componentWillMount() {
    //this.readData(); 
  }
  ////////////////////////////////////////////////////

  changefilter(newfilter) {
    return () => {
      console.log("Change Filter Clicked");
      this.setState({ filterSelected: newfilter });
      //this.saveData();
      console.log(this.state.filterSelected);
    }
  }

  render() {
    return (<View style={styles.container}>
      <Text style={styles.header}> News Feed</Text>

      <Text style={styles.header1}> Some Quick Filters</Text>

      <View style={styles.containerb}>
        <View style={styles.buttonContainer}>
          <Button onPress={this.changefilter("Ed Tech")}
            title={"Ed Tech"}
            color="#123584" />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.changefilter("Trending")}
            title={"Trending"}
            color="#843584" />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.changefilter("Machine Learning")}
            title={"ML"}
            color="#841514" />
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={this.changefilter("Medical Technology")}
            title={"MediTech"}
            color="#321584" />
        </View>
      </View>

      <View style={styles.space} />

      <Button
        onPress={this.changefilter("Bookmarks")}
        title={"My Bookmarks"}
        color="#431584"
        accessibilityLabel="Click to see your BookMarks"
      />

      <View style={styles.space} />

      <Button
        onPress={this.changefilter("ORIGINAL FEED")}
        title="Original Feed"
        color="#324534"
        accessibilityLabel="Click to see your Original Feed"
      />

      <Text style={styles.description}>Showing {this.state.filterSelected}....</Text>
      {this.state.links.map(({ id, title, link, description, upvotes, tags, bookmarked }) => {
        if ((this.state.filterSelected == 'ORIGINAL FEED' || tags.includes(this.state.filterSelected)) || (this.state.filterSelected == "Bookmarks" && this.state.links[id].bookmarked)) {
          return (
            <React.Fragment key={id}>
              <View style={styles.separator} />

              <TouchableOpacity
                accessibilityRole={'button'}
                onPress={() => openURLInBrowser(link)}
                style={styles.linkContainer}>
                <Text style={styles.link}>{title}</Text>
              </TouchableOpacity>

              <Text style={styles.description}>{description}</Text>
              <Text style={styles.description}>votes : {upvotes}</Text>
              <View style={styles.containerb}>
                <View style={styles.buttonContainer}>
                  <Button title="Upvote" onPress={this.changeCount(id, 1)} />
                </View>
                <View style={styles.buttonContainer}>
                  <Button title="Downvote" onPress={this.changeCount(id, -1)} />
                </View>
                <View style={styles.buttonContainer}>
                  <Button title={bookmarked ? "UnBookmark" : "Bookmark"} onPress={this.toggleBookmark(id)} />
                </View>
              </View>
            </React.Fragment>
          );
        }
      })}
    </View>)
  }
}

const styles = StyleSheet.create({
  containerb: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  space: {
    width: 20, // or whatever size you need
    height: 20,
  },
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  linkContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  link: {
    flex: 2,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.primary,
  },
  description: {
    fontFamily: 'Verdana',
    flex: 3,
    paddingVertical: 16,
    fontWeight: '400',
    fontSize: 18,
    color: Colors.dark,
  },
  header: {
    flex: 3,
    paddingVertical: 16,
    fontWeight: '400',
    fontSize: 30,
    color: Colors.dark,
  },
  header1: {
    flex: 3,
    paddingVertical: 16,
    fontWeight: '400',
    fontSize: 20,
    color: Colors.dark,
  },
  separator: {
    backgroundColor: Colors.light,
    height: 1,
  },
});

export default Feed;
