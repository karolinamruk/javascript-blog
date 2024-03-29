/* eslint-disable no-inner-declarations */
{
  ('use strict');

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.sidebar .list.tags',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size',
    optAuthorsListSelector = '.sidebar .list.authors';

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    // console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    // console.log('clicedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    // console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    // console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  function generateTitleLinks(customSelector = '') {
    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] for each article */

    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );

    let html = '';

    for (let article of articles) {
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */

      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';

      /* insert link into titleList */
      html = html + linkHTML;
      // console.log(html);
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  generateTitleLinks();

  function calculateTagsParams(tags) {
    const params = {
      max: 0,
      min: 999999,
    };

    for (let tag in tags) {
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }

    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + '-' + classNumber;
  }
  console.log();

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* [DONE] START LOOP: for every article: */
    for (let article of articles) {
      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      // console.log(articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      // console.log(articleTagsArray);

      /* [DONE] START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* [DONE] generate HTML of the link */
        const tagHtml = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

        /* [DONE]  add generated code to html variable */
        html = html + tagHtml;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* [DONE] END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

      /* [DONE] END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);
    console.log(tagList);

    const tagsParams = calculateTagsParams(allTags);
    // console.log('tagsParams:', tagsParams);

    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML =
        '<li><a class="' +
        calculateTagClass(allTags[tag], tagsParams) +
        '" href="#tag-' +
        tag +
        '">' +
        tag +
        '</a></li>';

      allTagsHTML += tagLinkHTML;

      // console.log('tagLinkHTML:', tagLinkHTML);
    }

    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }

  generateTags();

  function tagClickHandler(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* [DONE] START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {
      /* [DONE] remove class active */
      activeTagLink.classList.remove('active');

      /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* [DONE] add class active */
      tagLink.classList.add('active');

      /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthors() {
    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* [DONE] START LOOP: for each article */
    for (let article of articles) {
      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* [DONE] get author from post-author attribute */
      const articleAuthor = article.getAttribute('data-author');

      /* [DONE] generate HTML of the link */
      const authorHtml =
        '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
      /* [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors[articleAuthor]) {
        /* [NEW] add Author to allAuthors object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* [DONE] insert HTML of the link into the author wrapper */
      authorWrapper.innerHTML = authorHtml;

      // [DONE] END LOOP: for each article
    }
    /* [NEW] find list of Authors in right column */
    const authorList = document.querySelector(optAuthorsListSelector);

    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let author in allAuthors) {
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      const authorLinkHTML =
        '<li><a href="#author-' +
        author +
        '">' +
        author +
        ' (' +
        allAuthors[author] +
        ')' +
        '</a></li>';

      allAuthorsHTML += authorLinkHTML;

      // console.log('tagLinkHTML:', tagLinkHTML);
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    authorList.innerHTML = allAuthorsHTML;
  }
  generateAuthors();

  function addClickListenersToAuthors() {
    /* [DONE] find all links to authors */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    /* [DONE] START LOOP: for each link */
    for (let authorLink of authorLinks) {
      /* [DONE] add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

      /* [DONE] END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();

  function authorClickHandler(event) {
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');

    /* [DONE] find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll(
      optArticleAuthorSelector + ' a.active'
    );

    /* [DONE] START LOOP: for each active author link */
    for (let activeAuthorLink of activeAuthorLinks) {
      /* [DONE] remove class active */
      activeAuthorLink.classList.remove('active');

      /* [DONE] END LOOP: for each active author link */
    }

    /* [DONE] find all author links with href attribute equal to the href constant */
    const authorLinks = document.querySelectorAll(
      optArticleAuthorSelector + ' a[href="#' + author + '"]'
    );

    /* [DONE] START LOOP: for each found author link */
    for (let authorLink of authorLinks) {
      /* [DONE] add class active */
      authorLink.classList.add('active');

      /* [DONE] END LOOP: for each found author link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }
}
