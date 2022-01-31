# TheRealEmailExtractor

This is a simple, yet powerful, email extractor for any website. 

You just have to input the url and the bot will write into a file the emails that was able to find.


## HOW TO INSTALL

* it's built on [puppeteer](https://github.com/puppeteer/puppeteer)


COPY & PASTE
```
git clone https://github.com/AFornio/TheRealEmailExtractor.git;
cd TheRealEmailExtractor;
yarn install;
```

## HOW TO RUN

You run this from the console; it requires two arguemnts:
- full url where you want to extract emails
- depth level (only 1 or 2)


**EXAMPLES**

1. The following example will extract all the emails from the given url (1 depth):
```
node index.js https://github.com/ 1
```

2. The following example will extract, from the given url:
- all the emails
- all existing links (anchor tags)

For each of anchor tags will try to visit each link (2 depth) and extract the emails
```
node index.js https://github.com/ 2
```
**SPOILER:** It may take some time to run it with the 2 depth

*All founded emails are written into emails.json file

### ENJOY
