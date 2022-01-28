const puppeteer = require("puppeteer");
var fs = require("fs");

let parsedData = [];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // RUN
  // node index.js 'url' depth

  const args = process.argv.slice(2);
  let url = args[0];
  let depth = args[1];

  await page.goto(url, { waitUntil: "networkidle2" });

  // get emails from first level
  let auxEmails = await page.evaluate(() => {
    const htmlTag = document.querySelector("html");
    return htmlTag.innerHTML.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
  });

  if (auxEmails === null) {
    auxEmails = [];
  }

  if (depth == 2) {
    // let's go!
    let links = await page.evaluate(() => {
      const anchorTags = document.querySelectorAll("a");
      let hrefs = [];
      for (let index = 0; index < anchorTags.length; index++) {
        const element = anchorTags[index];
        hrefs.push(element.href);
      }
      return hrefs;
    });

    for (const [i, link] of links.entries()) {
      console.log(`Link ${i} of ${links.length - 1} :  ${link}`);
      try {
        await page.goto(link, { waitUntil: "networkidle2" });
        let emailsDepth2 = await page.evaluate(() => {
          const htmlTag = document.querySelector("html");
          return htmlTag.innerHTML.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
        });

        if (emailsDepth2) {
          auxEmails = auxEmails.concat(emailsDepth2);
        }
      } catch (error) {
        console.log(`\nERROR: Link ${i}:${link}`);
        console.log(`ERROR: ${error}\n`);
      }
    }
  }

  // clean & remove duplicates
  let emails = [];
  auxEmails.forEach((email) => {
    if (!emails.includes(email)) emails.push(email);
  });

  fs.writeFile("emails.json", JSON.stringify(emails, null, 4), () => {});
  browser.close();
})();
