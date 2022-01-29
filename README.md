# TheRealEmailExtractor

I can't believe no one did this before. 

This is a simple, yet powerful, email extractor for any website. 

You just have to input the url and the bot will write into a file the emails that was able to find.


## HOW TO INSTALL

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

###ENJOY
