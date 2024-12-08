let page;
//let timeoutFunc = 10_000;
jest.setTimeout(60_000);

beforeEach(async () => {
  page = await browser.newPage();
  //page.setDefaultTimeout(timeoutFunc);
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const expected =
      "GitHub · Build and ship software on a single, collaborative platform · GitHub";
    page.setDefaultTimeout(10_000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1"); //Ждёт появление селектора
    const title2 = await page.title();
    expect(title2).toEqual(expected);
  });

  test("The first link attribute", async () => {
    const expected = "#start-of-content";
    page.setDefaultTimeout(5_000);
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual(expected);
  });

  test("The page contains Sign in button", async () => {
    const expected = "Get started with Team";
    page.setDefaultTimeout(5_000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain(expected);
  });
});

describe("Testing the Solutions menu", () => {
  beforeEach(async () => {
    await page.goto("https://github.com");
    page.setDefaultTimeout(20_000);
  });

  test("1. Go to page Enterprise", async () => {
    const expected = "The AI Powered Developer Platform. · GitHub";

    await page.hover("li:nth-child(2) button:nth-child(1)"); //наводит курсор и открывает всплывающее окно
    const firstLink = await page.$("a[href='https://github.com/enterprise']");
    await firstLink.click();
    await page.waitForNavigation(); //Ждём смены страницы
    const title = await page.title();

    expect(title).toEqual(expected);
  });

  test("2. Go to page Startups", async () => {
    const expected =
      "GitHub for Startups: Build your startup on GitHub · GitHub";

    await page.hover("li:nth-child(2) button:nth-child(1)"); //наводит курсор и открывает всплывающее окно
    const firstLink = await page.$(
      "a[href='https://github.com/enterprise/startups']"
    );
    await firstLink.click();
    await page.waitForNavigation(); //Ждём смены страницы

    const title = await page.title();
    expect(title).toEqual(expected);
  });

  test("3. Go to page DevOps", async () => {
    const expected =
      "Unified AI-Powered Platforms for DevOps Solutions | GitHub · GitHub";

    await page.hover("li:nth-child(2) button:nth-child(1)"); //наводит курсор и открывает всплывающее окно
    const firstLink = await page.$("a[href='/solutions/use-case/devops']");
    await firstLink.click();
    await page.waitForNavigation(); //Ждём смены страницы
    const title = await page.title();

    expect(title).toEqual(expected);
  });
});
