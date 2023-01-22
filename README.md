# scripts

JavaScripts used by www.christmas-baking.com

In my work, we use Stimulus, but that felt like overkill for such simple features. Scripts have been moving from jQuery to vanilla JS as much as an intellectual exercise as to reduce overhead.

## socialLinks.js

JavaScript library to create all those social links for you, without you needing to do anything but include this script, jQuery, and perhaps an element to hold the links. The script will pull the header, description, URL and even an image (for Pinboard) for you.

Attribution decay is very common on social networks like Pinterest and Tumblr because they emphasize the source within the network (re-pinned/blogged from...) rather than the creator. By offering links to post to your readers' social network accounts, you can influence, if not control, what is posted about your content, including links to your original work.

1. Include the file on the web page.
2. Create an element where the links should appear with the id **linksToShareParent**
3. Update the object's configuration to your preferences.

## saveTextAreas.js

Will save the contents of all text areas inside a form to local storage (not cookies, which have a size limit).

1. Include the file on the web page with the form.

## advent.js

The Advent calendar slowly reveals a seasonal background as the user opens each day's link. Because CSS will not allow link:visited to hide or show images, the Advent calendars at www.christmas-baking.com/cgi-bin/advent.cgi use cookies to track which days the user has clicked through, and apply the **seen** class to show the background image.

(The calendar's naming convention is a holdover from when it was first written for the site in the late nineties or early aughts.)
