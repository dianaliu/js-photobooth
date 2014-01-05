### About
This is me trying to cram as many new techs in one app while making something fun.

View at http://mysterious-shore-4281.herokuapp.com/

### TODO
- Add tests
- Fix error message not displaying after quota exceeded
- Fix camera doesn't always initialize
- Don't use localStorage?
- Use Twitter [update with media API](https://dev.twitter.com/docs/api/1/post/statuses/update_with_media) to tweet pics
- Use node with browserify for getusermedia?
- Serve pages off node?
- Camera on mobile? - nope, just like opera.
- Auto gif videos?
- Obfuscate urls - user and photo number. Add guids or use usernames? checkout https://github.com/norman/friendly_id
- Individual page has next and previous buttons to users photos
- Add format.png for download link on photo#show
- Don't make user log in to take and save imgs, create anons - would they have delete permission then? or auto delete from server after x minutes? scheduler.
- tweet button script blocks loading of page, esp when many
- disable turbolinks so ember will work
- clean up commits
- use rails-api gem
- visualization and graphics libs like raphael and d3
- Modernizr? for getUserMedia?
- Double check error callbacks
- Update Ember Data version
- Fallback to localstorage for anon user, but you can't use two adapters at once http://stackoverflow.com/questions/14814472/caching-remote-data-in-local-storage-with-emberdata
- Add warning, log in to save pictures or else they will disappear when you navigate away.
- You'd need to save the pictures under local storage (would run out of space very quickly) or to db first, then when you get back from oauth, update db with credentials, username, etc.

