const percentageSeen = (element, offset) => {
  // Get the relevant measurements and positions
  const viewportHeight = window.innerHeight;
  const scrollTop = window.scrollY;
  const elementOffsetTop = element.offsetTop;
  const elementHeight = element.offsetHeight;

  // Calculate percentage of the element that's been seen
  const distance = scrollTop + viewportHeight - elementOffsetTop - offset;
  const percentage = Math.round(
    distance / ((viewportHeight + elementHeight) / 100)
  );

  // Restrict the range to between 0 and 100
  return Math.min(100, Math.max(0, percentage));
};

(function () {
  const stackedCardsSection = document.getElementById("stacked-cards-section");
  const stickyHeader = stackedCardsSection.children[0];
  const stackedCards = document.getElementById("stacked-cards");
  const cardsArray = Array.from(stackedCards.children);
  const cardsHeights = cardsArray.map(
    (card) => card.getBoundingClientRect().height
  );

  cardsArray.forEach((card) => {
    card.style.top = `${stickyHeader.getBoundingClientRect().height + 64}px`;
  });

  stickyHeader.children.item(0).style.paddingBottom =
    cardsHeights.reduce((acc, height) => acc + height, 0) -
    cardsArray[0].getBoundingClientRect().height +
    "px";

  document.addEventListener("scroll", function () {
    const percentageOfSecondCardSeen = percentageSeen(cardsArray[1], 64);
    const percentageOfThirdCardSeen = percentageSeen(cardsArray[2], 128);

    cardsArray[0].children.item(0).style.scale =
      1 -
      (0.1 * percentageOfSecondCardSeen) / 100 -
      (0.1 * percentageOfThirdCardSeen) / 100;
    cardsArray[0].children.item(0).style.opacity =
      1 -
      (0.1 * percentageOfSecondCardSeen) / 100 -
      (0.1 * percentageOfThirdCardSeen) / 100;
    cardsArray[0].children.item(0).style.filter = `blur(${
      (10 * percentageOfSecondCardSeen) / 100 +
      (10 * percentageOfThirdCardSeen) / 100
    }px)`;

    cardsArray[1].children.item(0).style.scale =
      1 - (0.1 * percentageOfThirdCardSeen) / 100;
    cardsArray[1].children.item(0).style.opacity =
      1 - (0.1 * percentageOfThirdCardSeen) / 100;
    cardsArray[1].children.item(0).style.filter = `blur(${
      (10 * percentageOfThirdCardSeen) / 100
    }px)`;
  });
})();
