/**
 * A JavaScript library to create all those social links for you, without you
 * needing to do anything but include this.#script, jQuery, and perhaps an
 * element to hold the links. The script will pull the header, description, URL
 * and even an image (for Pinboard) for you.
 *
 * Attribution decay is very common on social networks like Pinterest and
 * Tumblr because they emphasize the source within the network (re-pinned/blogged
 * from...) rather than the creator. By offering links to post to your readers'
 * social network accounts, you can influence, if not control, what is posted
 * about your content, including links to your original work.
 *
 * To use:
 *    Download and install jQuery: //jquery.com/download/
 *    Add the following line to the head section of every page:
 *        <script type="text/javascript" src="/<path where your JavaScript lives>/socialLinks.js"></script>
 *    Optionally, add an element to store the links:
 *        <p id="linksToShareParent"></p>
 *    Use any element you want, just be sure to specify the id.
 *
 * Details:
 *    After the document loads, the script finds the page's title (in the title
 *    element) and URL, text from the description meta tag (if one exists), and
 *    the first image (which can be limited to a specific class). It creates
 *    links for multiple social platforms, as you desire. Each link is given the socialLink class. The script
 *    positions the links either in the element identified as
 *    linksToShareParent, or before the first footer element, or before the
 *    element identified as footer, or before the first element with the class
 *    footer. When positioning before a footer, the script creates a paragraph
 *    element identified as linksToShareParent.
 *
 * Customize:
 *    Setting properties of the config object changes how the links are
 *    displayed and where the links are positioned.
 *    Each link type has a corresponding show property (e.g., showTwitter). If
 *    the property is false, no link to that service is shown.
 *    When selecting a default image for Pinboard, images on the page can be
 *    limited by a class, so that navigation elements and logs are not shown.
 *    The default image class is 'photo', because that is the class I give to
 *    all my photos.
 *    Identifying the footer: set either the footerId or footerClass property
 *    (or both). The default for both is 'footer', because it's obvious and,
 *    again, what I used.
 *    Specifying your own element to hold tags: change the
 *    idOfElementStoringLinks, which defaults to 'linksToShareParent'. The
 *    element can be any html element and will REPLACE the contents.
 *    Styling the links with CSS: all the links created have a CSS class of
 *    "socialLink"
 *
 * Author: Susan J. Talbutt, www.christmas-baking.com
 */

class SocialLinks {
  #config;
  #metaData;

  constructor (config) {
    this.#config = {
      showTwitter : true,
      twitterAccount: '',
      showFacebook : true,
      showPinterest : true,
      showPinboard : true,
      showTumblr : true,
      includeURLinText : true, // Combatting attribution decay since 2013
      hashtags: encodeURI ('Baking'), // Comma separated list
      imageClass : 'photo',
      idOfElementStoringLinks : 'linksToShareParent',
      footerId : 'footer',
      footerClass : 'footer'
    };
    this.#updateConfiguration (config);

    this.#metaData = {
      title : this.#encodeTitle(),
      url : this.#encodeUrl(),
      description : this.#encodeDescription(),
      image : this.#encodeImage()
    }
  }

  writeSocialLinks() {
    let wrapper = this.#findWrapper();
    if (wrapper != undefined) { this.#updateConfiguration (wrapper.dataset); }

    var links = this.#twitterLink() + "\n"
      + this.#facebookLink() + "\n"
      + this.#pinterestLink() + "\n"
      + this.#pinboardLink() + "\n"
      + this.#tumblrLink() + "\n"
      ;
    this.#displayLinks (links);
  }

  #encodeTitle() {
      return encodeURI (document.title);
  }

  #encodeUrl() {
      return encodeURI (document.URL);
  }

  #encodeDescription() {
      var descriptionTags = document.querySelector('meta[name=description]');
      if (descriptionTags.length) {
          return encodeURI (descriptionTags[0].content);
      } else {
          return '';
      }
  }

  #encodeImage() {
    var lookFor = 'img';
    if (this.#config.imageClass) {
      lookFor = lookFor + '.' + this.#config.imageClass;
    }
    var imageTag = document.querySelector(lookFor);
    if (imageTag != undefined) {
      return encodeURI (imageTag.src);
    }
    return undefined;
  }

  // https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview
  #twitterLink() {
    if (this.#config.showTwitter) {
      var via = '';
      var tags = '';
      if (this.#config.twitterAccount) {
        via = '&via=' + this.#config.twitterAccount;
      }
      if (this.#config.hashtags) {
        tags = '&hashtags=' + this.#config.hashtags;
      }
      return '<a class="socialLink" href="//twitter.com/intent/tweet?text='
        + this.#metaData.title  + ':+' + this.#metaData.url + via + tags
        + '" rel="nofollow"><img src="https://about.twitter.com/etc/designs/about-twitter/public/img/favicon-16x16.png" alt="[Tweet this!]" height="16" width="16" /></a>';
    }
    return '';
  }

  #facebookLink() {
    if (this.#config.showFacebook) {
      return '<a class="socialLink" href="//www.facebook.com/share.php?u=' + this.#metaData.url
        + '&t=' + this.#metaData.title + ':+' + this.#metaData.description + '"><img src="//t3.gstatic.com/images?q=tbn:ANd9GcQiCkFSG-spWaRHe2EW9wi867x4GTaH3asxQHDOCdmaKOqr5ZO90RBxahQ" width="16" height="16" alt="[Share on Facebook]" /></a>';
    }
    return '';
  }

  #pinterestLink() {
    if (this.#config.showPinterest && this.#metaData.image) {
      var preventAttributionDecay = '';
      if (this.#config.includeURLinText) {
        preventAttributionDecay = '+(' + this.#metaData.url + ')';
      }
      return '<a class="socialLink" href="//pinterest.com/pin/create/button/?url=' + this.#metaData.url
        + '&media=' + this.#metaData.image + '&description=' + this.#metaData.title + ':+'
        + this.#metaData.description + preventAttributionDecay
        + '"><img border="0" src="//assets.pinterest.com/images/PinExt.png" alt="[Pin It]" /></a>';
    }
    return '';
  }

  #pinboardLink() {
    if (this.#config.showPinboard) {
      return '<a class="socialLink" href="https://api.pinboard.in/v1/posts/add?url='
        + this.#metaData.url + '&description=' + this.#metaData.title + '&extended='
        + this.#metaData.description + '"><img src="//www.pinboard.in/bluepin.gif" alt="[Share on Pinboard]"></a>';
    }
    return '';
  }

  #tumblrLink() {
      if (this.#config.showTumblr) {
          var preventAttributionDecay = '';
          if (this.#config.includeURLinText) {
              preventAttributionDecay = '+(' + this.#metaData.url + ')';
          }
          return '<a class="socialLink" href="//www.tumblr.com/share/link?url='
              + this.#metaData.url + '&name=' + this.#metaData.title + '&description=' + this.#metaData.description
              + preventAttributionDecay
              + '" ><img alt="[Share on Tumblr]" src="//platform.tumblr.com/v1/share_3.png" /></a>';
      }
      return '';
  }

  #displayLinks (links) {
      let parentElement = this.#findWrapper();
      if (parentElement != undefined) {
          parentElement.innerHTML = links;
          return true;
      }
      let footerElement = this.#findFooter();
      if (footerElement != undefined) {
        let idAttribute = '';
        if (this.#config.idOfElementStoringLinks) {
            idAttribute = ' id="' + this.#config.idOfElementStoringLinks + '"';
        }

        let links = '<p' + idAttribute + '>' + links + '</p>';
        footerElement.before(links);
        return true;
      }
      return false; // A good C programmer can write C in anything.
  }

  #findWrapper() {
    if (this.#config.idOfElementStoringLinks == undefined) { return undefined; }

    return document.getElementById (this.#config.idOfElementStoringLinks)
  }

  #findFooter() {
    let footerElement = undefined;
    if (this.#config.footerId) {
      footerElement = document.getElementById (this.#config.footerId);
      if (footerElement != undefined) { return footerElement; }
    }
    if (this.#config.footerClass) {
      footerElement = document.getElementsByClass (this.#config.footerClass);
      if (footerElement != undefined) { return footerElement; }
    }

    return document.getElementsByTagName ('footer');
  }

  #updateConfiguration (newConfig) {
    for (const [key, value] of Object.entries(newConfig)) {
      this.#config[key] = value;
    }
  }
}

// Alternative to load event
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    const links = new SocialLinks ({});
    links.writeSocialLinks();
  }
};
