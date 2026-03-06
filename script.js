// FOR MENU BUTTION
const menuButtonContainer = document.querySelector('.manuButtonContainer');
const menuButtonContainedContainer = document.querySelector(
  '.manuButtonContainedContainer'
);
const manuButton = document.querySelector('.manuButton');
const navMenu = document.querySelector('.navManu');
const navManuContainer = document.querySelector('.navManuContainer');

let menuOpen = false;

menuButtonContainer.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navMenu.classList.toggle('open', menuOpen);
  manuButton.classList.toggle('open', menuOpen);
  navManuContainer.classList.toggle('open', menuOpen);
  menuButtonContainedContainer.classList.toggle('open');
  menuButtonContainer.classList.toggle('open');
});

const selectors = [
  '.manuAndNavContainer',
  '.headLine',
  '.imgAndBottomLine',
  '.mainBoxContainer',
  '.footer',
].map((className) => document.querySelector(className));

document.addEventListener('DOMContentLoaded', function () {
  // Entry transition
  setTimeout(() => {
    for (const [index, item] of selectors.entries()) {
      if (!item) continue;
      // item.style.transitionDelay = `${index * 0.2}s`;
      item.style.transitionDelay = `${index * 0.15}s`;
      item.style.transform = 'scale(1)';
      item.style.opacity = '1';
    }
  }, 100);
  setTimeout(() => {
    window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
  }, 100);

  // FOR TYPE WRITER LINE
  const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Virtual Craftsman'];
  let roleIndex = 0;
  let text = roles[roleIndex];
  let index = 0;
  let repeatCount = 0;
  const repeatLimit = 12;
  const randomChars = '!@#$%^&*()_+=-{}[];:<>,.?/\\|~`';

  const bottomLine = document.querySelector('.typewrite');

  function getRandomChar() {
    return randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  function revealCharWithGlitch(actualChar, callback) {
    const span = document.createElement('span');
    bottomLine.appendChild(span);

    let scrambleCount = 0;
    const maxScramble = 4;

    function scramble() {
      if (scrambleCount < maxScramble) {
        span.textContent = getRandomChar();
        scrambleCount++;
        setTimeout(scramble, 40);
      } else {
        span.textContent = actualChar;
        span.classList.add('fade-in');
        setTimeout(() => span.classList.add('visible'), 10);
        callback();
      }
    }

    scramble();
  }

  function typeWriter() {
    if (index < text.length) {
      // Show each character with scramble effect
      revealCharWithGlitch(text.charAt(index), () => {
        index++;
        setTimeout(typeWriter, 0); // type quickly after glitch finishes
      });
    } else if (repeatCount < repeatLimit) {
      // Animate the dots
      bottomLine.textContent = text + '.'.repeat(repeatCount % 4);
      repeatCount++;
      setTimeout(typeWriter, 700);
    } else {
      // Change to next role, but don't remove existing content instantly
      setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        text = roles[roleIndex];
        index = 0;
        repeatCount = 0;

        // Remove all spans slowly while keeping the last text visible
        const spans = bottomLine.querySelectorAll('span');
        let fadeOutIndex = 0;

        function fadeOutNextSpan() {
          if (fadeOutIndex < spans.length) {
            spans[fadeOutIndex].classList.remove('visible');
            spans[fadeOutIndex].style.opacity = '0.1';
            fadeOutIndex++;
            setTimeout(fadeOutNextSpan, 15);
          } else {
            bottomLine.textContent = ''; // clear and restart
            typeWriter();
          }
        }

        fadeOutNextSpan();
      }, 1000);
    }
  }

  typeWriter();

  // ======FOR MAIN BOX ELEMENTS ANIMATION=======
  const sections = ['projects', 'tools', 'service', 'about', 'connect'].map(
    (id) => document.getElementById(id)
  );
  const [projects, tools, service, about, connect] = sections;

  const [professional, upToDateDesign, responsiveAndSecure] = [
    ...document.querySelectorAll(
      '.professional, .upToDateDesign, .responsiveAndSecure'
    ),
  ];

  const header = document.querySelector('header');
  const manuAndNav = document.querySelector('.manuAndNavContainer');
  const navMenuBtns = document.querySelector('.navManu').querySelectorAll('li');

  const mainAndFooter = document.querySelector('.mainAndFooter');
  const starContainer = document.querySelectorAll('.starContainer');

  // ======= STATE TRACKING =======
  let currentSectionIndex = 0;
  let serviceSlideIndex = 0;
  let isScrolling = false;
  let isSecondPage = false;
  let inServiceMode = false;
  const serviceSlides = [professional, upToDateDesign, responsiveAndSecure];

  // ======= STYLE HELPERS =======
  function showWithTransition(element, enterFrom = 'bottom') {
    const footer = document.querySelector('footer');
    if (element.id === 'connect') {
      footer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      footer.style.transform = 'translateY(100px)';
      footer.style.opacity = '0';
      setTimeout(() => {
        footer.style.display = 'none';
      }, 500);
    } else if (footer.style.display === 'none') {
      footer.style.display = 'flex';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          footer.style.transform = 'translateY(0px)';
          footer.style.opacity = '1';
        });
      });
    }
    element.style.display = 'flex';
    element.style.transition = 'none';
    element.style.opacity = '0';
    element.style.transform =
      enterFrom === 'bottom' ? 'translateY(100px)' : 'translateY(-100px)';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0px)';
      });
    });
  }

  function hideWithTransition(element, exitTo = 'top') {
    element.style.transition = 'opacity 0.3s ease, transform 0.5s ease';
    element.style.opacity = '0';
    element.style.transform =
      exitTo === 'top' ? 'translateY(-100px)' : 'translateY(100px)';
    setTimeout(() => {
      element.style.display = 'none';
    }, 500);
  }

  function toggleNavBtnColor(index) {
    for (const btn of navMenuBtns) {
      if (btn.dataset.name === sections[index].id) {
        btn.style.background = '#ffffff3b';
      } else {
        btn.style.background = '';
      }
    }
  }

  // ======= UTILS =======
  function showSection(index, enterFrom) {
    toggleNavBtnColor(index);

    sections.forEach((sec, i) => {
      if (i === index) {
        showWithTransition(sec, enterFrom === 'bottom' ? 'bottom' : 'top');
      } else if (sec.style.display !== 'none') {
        hideWithTransition(sec, enterFrom === 'bottom' ? 'top' : 'bottom');
      }
    });
    if (sections[index] === service) {
      inServiceMode = true;
      showServiceSlide(serviceSlideIndex);
    } else {
      inServiceMode = false;
      updateStarColors();
    }
  }

  function showServiceSlide(index) {
    serviceSlides.forEach((slide, i) => {
      const h3 = slide.querySelector('h3');
      slide.style.width = i === index ? '80vw' : '0';
      slide.style.opacity = i === index ? '1' : '0';
      slide.style.zIndex = i === index ? '1' : '0';
      slide.style.fontSize = i === index ? '' : '0vw';
      slide.style.transform =
        i === index ? 'translateY(0px)' : 'translateY(0px)';
      h3.style.fontSize = i === index ? '100%' : '0';
    });
    serviceSlideIndex = index;
    updateStarColors();
  }

  function updateStarColors() {
    const mainAndFooter = document.querySelector('.mainAndFooter');
    const h2 = document.getElementById('service').querySelectorAll('h2');
    const reachUs = mainAndFooter.querySelector('.reachUs');
    const h3 = mainAndFooter.querySelector('footer').querySelectorAll('h3');
    const stars =
      starContainer[starContainer.length - 1].querySelectorAll('.star');
    stars.forEach((star) => {
      if (inServiceMode) {
        if (serviceSlides[serviceSlideIndex] === professional) {
          star.style.backgroundColor = '#60b94f';
          h2.forEach((el) => (el.style.color = 'rgb(140 247 154 / 89%)'));
          reachUs.style.color = 'rgb(140 247 154 / 89%)';
          h3.forEach(
            (el) => (el.style.backgroundColor = 'rgb(140 247 154 / 89%)')
          );
        } else if (serviceSlides[serviceSlideIndex] === upToDateDesign) {
          star.style.backgroundColor = 'rgb(223,88,17)';
          h2.forEach((el) => (el.style.color = 'rgb(246,143,37)'));
          reachUs.style.color = 'rgb(246,143,37)';
          h3.forEach((el) => (el.style.backgroundColor = 'rgb(246,143,37)'));
        } else if (serviceSlides[serviceSlideIndex] === responsiveAndSecure) {
          star.style.backgroundColor = 'rgb(255 104 178)';
          h2.forEach((el) => (el.style.color = '#e884b5'));
          reachUs.style.color = '#e884b5';
          h3.forEach((el) => (el.style.backgroundColor = '#e884b5'));
        }
      } else {
        star.style.backgroundColor = 'rgb(0, 149, 149)';
        reachUs.style.color = 'mediumturquoise';
        h3.forEach((el) => (el.style.backgroundColor = 'mediumturquoise'));
      }
    });
  }

  function handleScroll(direction) {
    if (isScrolling) return;
    isScrolling = true;

    if (direction === 'down') {
      if (inServiceMode) {
        const nextIndex = serviceSlideIndex + 1;
        if (nextIndex < serviceSlides.length) {
          showServiceSlide(nextIndex);
        } else {
          inServiceMode = false;
          moveToNextSection();
        }
      } else {
        moveToNextSection();
      }
    } else if (direction === 'up') {
      if (inServiceMode) {
        const nextIndex = serviceSlideIndex - 1;
        if (nextIndex >= 0 && nextIndex < serviceSlides.length) {
          showServiceSlide(nextIndex);
        } else {
          inServiceMode = false;
          moveToPrevSection();
        }
      } else {
        moveToPrevSection();
      }
    }

    setTimeout(() => (isScrolling = false), 500);
  }

  function moveToNextSection() {
    currentSectionIndex = currentSectionIndex + 1;

    if (currentSectionIndex < sections.length) {
      showSection(currentSectionIndex, (enterFrom = 'bottom'));
    } else {
      currentSectionIndex = sections.length - 1;
    }
  }
  function moveToPrevSection() {
    currentSectionIndex = currentSectionIndex - 1;

    if (currentSectionIndex >= 0) {
      showSection(currentSectionIndex, (enterFrom = 'top'));
    } else {
      currentSectionIndex = 0;
      window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    }
  }

  // ======= EVENT BINDING =======
  // ====== FOR WHEEL ======
  header.addEventListener('wheel', (e) => {
    if (e.ctrlKey) return;
    e.preventDefault();
    if (e.deltaY > 0 && !isScrolling) {
      isScrolling = true;
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      setTimeout(() => (isScrolling = false), 500);
      isSecondPage = true;
    } else if (e.deltaY < 0) {
      handleScroll('up');
      isSecondPage = false;
    }
  });

  mainAndFooter.addEventListener(
    'wheel',
    (e) => {
      if (e.ctrlKey) return;
      e.preventDefault();
      if (e.deltaY > 0) {
        handleScroll('down');
      } else {
        handleScroll('up');
        isSecondPage = false;
      }
    },
    { passive: false }
  );

  // ======= FOR TOUCH =======
  let touchStartY = 0;
  header.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });
  header.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touchMoveY = e.touches[0].clientY;
    if (touchMoveY < touchStartY && !isScrolling) {
      isScrolling = true;
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      setTimeout(() => (isScrolling = false), 500);
      isSecondPage = true;
    }
  });
  mainAndFooter.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });
  mainAndFooter.addEventListener(
    'touchmove',
    (e) => {
      e.preventDefault();
      const touchMoveY = e.touches[0].clientY;
      if (touchMoveY < touchStartY) {
        handleScroll('down');
      } else {
        handleScroll('up');
        isSecondPage = false;
        console.log('touch');
      }
    },
    { passive: false }
  );

  // ====== THIS ENABLES SCROLLING ON manuAndNav WHICH IS A FIXED ITEM OF FIRST PAGE AND OVERLAPPED BY mainAndFooter OF THE SECOND PAGE IN THE SECOND PAGE ========
  // ===== FOR WHEEL ======
  manuAndNav.addEventListener(
    'wheel',
    (e) => {
      if (e.ctrlKey) return;
      if (e.deltaY < 0) {
        handleScroll('up');
        isSecondPage = false;
      } else if (e.deltaY > 0 && isSecondPage) {
        handleScroll('down');
      }
    },
    { passive: false }
  );

  // ======= FOR TOUCH =======
  manuAndNav.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });
  manuAndNav.addEventListener(
    'touchmove',
    (e) => {
      const touchMoveY = e.touches[0].clientY;
      if (touchMoveY < touchStartY && isSecondPage) {
        handleScroll('down');
      } else if (isSecondPage) {
        handleScroll('up');
        isSecondPage = false;
      }
    },
    { passive: false }
  );

  // ====== RESET TOUCH COORDS ========
  manuAndNav.addEventListener('touchend', () => {
    touchStartY = 0;
  });
  manuAndNav.addEventListener('touchcancel', () => {
    touchStartY = 0;
  });

  showSection(currentSectionIndex);

  //=======Navigate with buttons=======
  function navigatePage(event) {
    isSecondPage = true;
    event.preventDefault();

    const sectionMap = {
      [projects.id]: 0,
      [tools.id]: 1,
      [service.id]: 2,
      [about.id]: 3,
      [connect.id]: 4,
    };

    currentSectionIndex = sectionMap[event.target.dataset.name];
    showSection(currentSectionIndex);
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }

  navMenuBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => navigatePage(e));
  });
});

//header icons move
const icons = document.querySelectorAll('.headerIcons');
let directionY = -10;
let sharedInterval;
let iconIntervals = [];

function applyMovement(icon) {
  icon.style.transition = 'transform 3s ease-in-out';
  icon.style.transform = `translateY(${directionY}px)`;
}

// Start moving all icons with shared vertical direction
function startAllMoving() {
  icons.forEach((icon, index) => {
    let delay = index * 700;
    const move = () => applyMovement(icon);
    const id = setInterval(move, 700 + delay);
    iconIntervals.push({ icon, id });
  });

  sharedInterval = setInterval(() => {
    directionY = directionY === -10 ? 10 : -10;
  }, 3000);
}

// Stop movement and clean up interval
function stopIconMovement(icon) {
  const index = iconIntervals.findIndex((obj) => obj.icon === icon);
  if (index !== -1) {
    clearInterval(iconIntervals[index].id);
    iconIntervals.splice(index, 1);
  }

  icon.style.transition = 'none';
  icon.style.transform = 'translateY(0)';

  setTimeout(() => {
    icon.style.transition = 'transform 3s ease-in-out';
  }, 50);
}

// Resume with clean interval (prevent duplicates)
function resumeIconMovement(icon) {
  stopIconMovement(icon);

  const move = () => {
    icon.style.transition = 'transform 3s ease-in-out';
    icon.style.transform = `translateY(${directionY}px)`;
  };

  const id = setInterval(move, 700);
  iconIntervals.push({ icon, id });
}

icons.forEach((icon) => {
  icon.addEventListener('mouseenter', () => stopIconMovement(icon));
  icon.addEventListener('mouseleave', () => resumeIconMovement(icon));
});

startAllMoving();

// =======tools======
const toolsNav = document.querySelector('.toolsNav');
const toolsContainer = document.querySelector('.toolsContainer');

const allTools = toolsContainer.querySelectorAll('.tool');

function sortItems(event) {
  allTools.forEach((tool) => {
    const buttons = toolsNav.querySelectorAll('button');
    buttons.forEach((button) => {
      if (event.target !== toolsNav) {
        button.style.backgroundColor = '#ffffff24';
      }
      if (event.target == button) {
        button.style.backgroundColor = '#ffffff54';

        if (tool.dataset.name !== event.target.dataset.name) {
          tool.style.display = 'none';
        } else if (tool.dataset.name == event.target.dataset.name) {
          tool.style.display = 'grid';
        }
        if (event.target.dataset.name == 'all') {
          console.log('tool', tool);
          tool.style.display = 'grid';
        }
      }
    });
  });
}

toolsNav.addEventListener('click', (e) => sortItems(e));

//====CONNECT=====
const form = document.querySelector('form');
const thankMessage = document.querySelector('.thank-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
    },
  });

  if (response.ok) {
    showMessage();
    form.reset();
  } else {
    alert('Something went wrong. Please try again.');
  }
});

function showMessage() {
  thankMessage.style.opacity = '1';
  setTimeout(() => {
    thankMessage.style.opacity = '0';
  }, 6000);
}
