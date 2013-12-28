Use yeoman ember and [heroku generators](https://github.com/passy/generator-heroku).

To deploy to heroku: `git subtree push --prefix dist heroku master`

To force push: `git push heroku `git subtree split --prefix dist master`:master --force`

Read more about [the mysterious deploy command](http://yeoman.io/deployment.html)

View at http://mysterious-shore-4281.herokuapp.com/

### TODO
- Add tests
- Fix error message not displaying after quota exceeded
- Fix camera doesn't always initialize
- Don't use localStorage?
- Use Twitter [update with media API](https://dev.twitter.com/docs/api/1/post/statuses/update_with_media) to tweet pics
- Use node with broserify for getusermedia?
- Serve pages off node?
- Camera on mobile?
- Auto gif videos?
