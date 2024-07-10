import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'

const elements = {
    btnClear: document.querySelector('.search-form_clear-btn'),
    input: document.querySelector('.search-form__input'),
    auth: document.querySelector('.auth'),
    authModal: document.querySelector('.auth__modal'),
    authCloseBtn: document.querySelector('.auth__close'),
    loginBtn: document.querySelector('.row-btn-login'),
    loginBtnMenu: document.querySelectorAll('.login-btn_menu'),
    searchFormBtn: document.querySelector('.search-form_btn'),
    selectHeaders: document.querySelectorAll('.select__header'),
    passwordInput: document.querySelector('.password'),
    emailInput: document.querySelector('.email'),
    passwordVisibleBtn: document.querySelector('.password-visible'),
    catalog: document.querySelector('.catalog'),
    catalogBtn: document.querySelector('.second__row-catalog-btn'),
    firstColumn: document.querySelector('.first__column'),
    achievements: document.querySelector(".advantages__container"),
    selectHeader: document.querySelector('.select__city_header'),
    selectBody: document.querySelector('.select__body'),
    cityItem: document.querySelectorAll('.city-item'),
    selectedItem: document.querySelector('.city_item__selected'),
    cityItems: document.querySelectorAll(".city-item"),
    burgerMenu: document.querySelector('.burger-menu'),
    catalogMenuBtn: document.querySelectorAll('.catalog-btn_menu'),
    responsiveMenu: document.querySelector('.responsive-menu'),
    main: document.querySelector('.main'),
    tableNavbar: document.querySelector('.table-navbar'),
    sectionCards: document.querySelector('.section__cards'),
    responsiveCatalogBtn: document.querySelector('.responsive-menu__catalog'),
    responsiveCatalog: document.querySelectorAll('.responsive-catalog-wrapper'),
    responsiveCatalogMenu: document.querySelector('.responsive-catalog-wrapper.menu'),
    responsiveCatalogMenuLevel1: document.querySelector('.level1'),
    responsiveCatalogMenuLevel2: document.querySelector('.level2'),
    responsiveCatalogHeaderBtn: document.querySelectorAll('.responsive-catalog__header-btn'),
    responsiveCatalogHeaderBtnClose: document.querySelectorAll('.responsive-catalog__header-btn-close'),

};

const cities = {
    ekaterinburg: {
        coordinates: [56.8519, 60.6122],
        addresses: {
            chernyakhovskogo: [56.750492, 60.741762],
            bluchera: [56.865259, 60.667983],
        },
    },
    sankt_peterburg: {
        coordinates: [59.9349, 30.3720]
    },
    moscow: {
        coordinates: [55.7599, 37.6270]
    },
};


const eventHandlers = {
    clearInput: function () {
        elements.btnClear.addEventListener('click', (ev) => {
            ev.preventDefault();
            elements.input.value = '';
            elements.btnClear.style.display = 'none';
        });
    },

    clearBtnVisible: function () {
        elements.input.addEventListener('input', () => {
            const inputValue = elements.input.value.trim();
            elements.btnClear.style.display = inputValue.length > 0 ? 'inline-block' : 'none';
        });
    },

    topNavigateSelect: function () {
        function closeSelectMenus() {
            elements.selectHeaders.forEach((value) => {
                value.parentElement.classList.remove('is-active');
            });
        }

        elements.selectHeaders.forEach((el) => {
            el.addEventListener('click', (e) => {
                e.stopPropagation();

                elements.selectHeaders.forEach((value) => {
                    if (value !== el) {
                        value.parentElement.classList.remove('is-active');
                    }
                });

                el.parentElement.classList.toggle('is-active');
                document.addEventListener('click', closeSelectMenus);
            });
        });
    },

    searchBtn: function () {
        elements.searchFormBtn.addEventListener('click', (ev) => ev.preventDefault());
    },

    scrollTop: function () {
        document.documentElement.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    },

    openAuthModal: function () {
        elements.loginBtn.addEventListener('click', () => {
            eventHandlers.scrollTop();
            elements.auth.classList.add('view');
            document.body.style.overflow = 'hidden';

        });
        elements.loginBtnMenu.forEach((item) => {
            item.addEventListener('click', () => {
                eventHandlers.scrollTop();
                elements.auth.classList.add('view');
                document.body.style.overflow = 'hidden';

            })
        });
    },

    closeAuthModal: function () {
        const closeModal = () => {
            elements.auth.classList.remove('view');
            elements.emailInput.value = '';
            elements.passwordInput.value = '';
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        };

        const onEscapePress = (ev) => {
            if (ev.key === 'Escape') {
                closeModal();
            }
        };

        const onClickOutside = () => {
            elements.authModal.parentNode.addEventListener('mousedown', (ev) => {
                if (ev.target === elements.auth && ev.target !== elements.authModal) {
                    closeModal();
                }
            })
        };

        elements.authCloseBtn.addEventListener('click', closeModal);
        document.addEventListener('keydown', onEscapePress);
        document.addEventListener('click', onClickOutside);
    },

    setVisiblePassword: function () {
        const passwordBtn = elements.passwordVisibleBtn
        passwordBtn.addEventListener('click', (ev) => {
            ev.preventDefault()
            if (elements.passwordInput.getAttribute("type") === "password") {
                passwordBtn.classList.add("view");
                elements.passwordInput.setAttribute("type", "text");
            } else {
                passwordBtn.classList.remove("view");
                elements.passwordInput.setAttribute("type", "password");
            }
        });
    },

    toggleCatalog: function () {
        const catalog = elements.catalog
        const btn = elements.catalogBtn
        btn.addEventListener('click', () => {
            catalog.classList.toggle('active')
            elements.main.classList.toggle('hide')
            if (catalog.classList.contains('active')) {
                btn.firstElementChild.src = './assets/img/header/close-catalog.svg'
            } else {
                btn.firstElementChild.src = './assets/img/header/btn-catalog.svg'
            }
        })
    },

    toggleCategoryView: function () {
        const firstColumn = elements.firstColumn;
        const categoryLists = document.querySelectorAll('.catalog__item-levels ul');
        let activeCategory = null;

        function openCategoryList(event) {
            const target = event.target.closest('.catalog_li');
            const categoryId = target && target.id;
            let parentId = target?.parentElement.getAttribute('data-category')


            if (categoryId && categoryId !== activeCategory) {
                closeCategoryList();
                const categoryList = document.querySelector(`[data-category=${categoryId}]`);
                const parentCategoryList = document.querySelector(`[data-category=${parentId}]`);

                categoryList?.classList.add('open');
                parentCategoryList?.classList.add('open');
                activeCategory = categoryId;

                if (parentId !== null) {
                    document.querySelector(`#${parentId} a`).classList.add('hover')
                }
            }
            if (!categoryId) {
                let prevLevelParentId = target?.parentElement.getAttribute('data-category')
                document.querySelector(`#${prevLevelParentId} a`)?.classList.add('hover');
            }
        }

        function closeCategoryList() {
            document.querySelectorAll('[data-category]').forEach(category => {
                category.classList.remove('open');
            });
            document.querySelectorAll('.first__column .catalog__item').forEach((item) => {
                item.classList.remove('hover')
            })
            document.querySelectorAll('.catalog__item-levels .catalog__item').forEach((item) => {
                item.classList.remove('hover')
            })
            activeCategory = null;

        }

        function handleMouseOut(event) {
            const relatedTarget = event.relatedTarget;
            const isOutCategoryList = relatedTarget && !relatedTarget.closest('.catalog__item-levels');

            if (isOutCategoryList) {
                closeCategoryList();
            }
        }

        firstColumn.addEventListener('mouseover', openCategoryList);
        firstColumn.addEventListener('mouseout', handleMouseOut);

        document.querySelectorAll('.level1__wrapper ul li').forEach((li) => {
            li.addEventListener('mouseover', openCategoryList)
        })
        document.querySelectorAll('.level2__wrapper ul li').forEach((li) => {
            li.addEventListener('mouseover', openCategoryList)
        })

        categoryLists.forEach(categoryList => {
            categoryList.addEventListener('mouseover', () => {
                activeCategory = null;
            });
        });
    },

    slider: function () {
        const swiper = new Swiper(".swiper", {
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
            },
            mousewheel: true,
            keyboard: true,
        });
    },

    scrollAdvantages: function () {
        let isMouseDown = false;
        let startX, startY;
        const achievements = elements.achievements;

        const handleStart = function (event) {
            event.preventDefault();
            isMouseDown = true;
            const touch = event.type === 'touchstart' ? event.touches[0] : event;
            startX = touch.clientX;
            startY = touch.clientY;
        };

        const handleEnd = function () {
            isMouseDown = false;
            startX = null;
            startY = null;
        };

        const handleMove = function (event) {
            if (isMouseDown) {
                event.preventDefault();
                const touch = event.type === 'touchmove' ? event.touches[0] : event;
                if (startX && startY) {
                    achievements.scrollBy(startX - touch.clientX, startY - touch.clientY);
                }
                startX = touch.clientX;
                startY = touch.clientY;
            }
        };

        achievements.addEventListener("mousedown", handleStart);
        achievements.addEventListener("touchstart", handleStart);

        achievements.addEventListener("mousemove", handleMove);
        achievements.addEventListener("touchmove", handleMove);

        document.addEventListener("mouseup", handleEnd);
        document.addEventListener("touchend", handleEnd);
    },

    selectCity: function () {
        elements.selectHeader.addEventListener('click', () => {
            elements.selectBody.classList.toggle('view')
        })

        elements.cityItem.forEach((el) => {
            el.addEventListener('click', (ev) => {
                toggleCity(ev)
            })
        })

        function toggleCity(ev) {
            elements.selectedItem.innerText = ev.target?.innerText;
            elements.selectBody.classList.remove('view')
        }
    },

    toggleHandlerMenu: function () {
        const openBugerMenu = function () {
            elements.burgerMenu.classList.add('open')
            elements.tableNavbar.classList.add('catalog-open');
            elements.responsiveMenu.classList.add('open')
            elements.sectionCards.classList.add('menu-open')
        };
        const closeBugerMenu = function () {
            elements.burgerMenu.classList.remove('open')
            elements.sectionCards.classList.remove('menu-open')
            elements.tableNavbar.classList.remove('catalog-open');
            elements.responsiveMenu.classList.remove('open')
        }

        const openMenu = function (levelMenu) {
            elements.responsiveCatalog.forEach((item) => {
                item.classList.remove('open')
                item.classList.add('closed')
                closeBugerMenu()
            })
            levelMenu.classList.add('open')
            levelMenu.classList.remove('closed')
            elements.tableNavbar.classList.remove('catalog-open');
            elements.main.classList.add('hide')
        }


        const closeLevel = function (levelMenu) {
            levelMenu.classList.remove('open')
            levelMenu.classList.add('close')
            setTimeout(() => {
                levelMenu.classList.remove('close')
                levelMenu.classList.add('closed')
            }, 150)
            if (levelMenu.classList.contains('menu')) {
                elements.main.classList.remove('hide')
                openBugerMenu()
            }
            if (levelMenu.classList.contains('level1')) {
                openMenu(elements.responsiveCatalogMenu)
            }
            if (levelMenu.classList.contains('level2')) {
                openMenu(elements.responsiveCatalogMenuLevel1)
            }
        };

        const closeAllLevels = function () {
            elements.responsiveCatalog.forEach((item) => {
                item.classList.remove('open')
                item.classList.add('closed')
                closeBugerMenu()
                elements.main.classList.remove('hide')
            })
        }

        elements.responsiveCatalogHeaderBtn.forEach(item => {
            item.addEventListener('click', () => {
                closeLevel(item.parentElement.parentElement)
            })
        })

        elements.responsiveCatalogBtn.addEventListener('click', () => {
            openMenu(elements.responsiveCatalogMenu)
        })

        elements.responsiveCatalogHeaderBtnClose.forEach((item) => {
            item.addEventListener('click', () => {
                closeAllLevels()
            })
        })

        elements.burgerMenu.addEventListener('click', () => {
            if (!elements.burgerMenu.classList.contains('open')) {
                openBugerMenu();
            } else {
                closeBugerMenu();
            }
        })

        elements.catalogMenuBtn.forEach((item) => {
            item.addEventListener('mousedown', () => {
                if (item.classList.contains('open-catalog')) {
                    openBugerMenu();
                    eventHandlers.scrollTop();
                    if (elements.main.classList.contains('hide')) {
                        closeAllLevels()
                    }
                } else {
                    closeBugerMenu()
                }
            })
        })

        const wrappers = []
        document.querySelectorAll(`.responsive-catalog-wrapper + [data-responisve]`).forEach((wrapper) => {
            wrappers.push({
                wrapper: wrapper,
                value: wrapper.getAttribute('data-responisve')
            })
        })

        document.querySelectorAll(`.responsive-catalog__ul li + [data-responisve]`).forEach((li) => {
            li.addEventListener('click', () => {
                let value = li.getAttribute('data-responisve')
                wrappers.forEach((item) => {
                    if (value === item.value) {
                        openMenu(item.wrapper)
                    }
                })
            })
        })
    },
};

eventHandlers.clearInput();
eventHandlers.clearBtnVisible();
eventHandlers.searchBtn();
eventHandlers.topNavigateSelect();
eventHandlers.openAuthModal();
eventHandlers.closeAuthModal();
eventHandlers.setVisiblePassword();
eventHandlers.toggleCatalog();
eventHandlers.toggleCategoryView();
eventHandlers.slider();
eventHandlers.scrollAdvantages();
eventHandlers.selectCity();
eventHandlers.toggleHandlerMenu();


ymaps.ready(init);

function init() {
    var myMap = new ymaps.Map("map", {
        center: cities.ekaterinburg.coordinates,
        zoom: 10,
        controls: []
    });
    var btnLocation = new ymaps.control.Button({
        options: {
            layout: ymaps.templateLayoutFactory.createClass(
                "<div class='btnLocation'><div/>"
            )
        },
    });

    btnLocation.events.add("click", function (event) {
        var geolocation = ymaps.geolocation;
        geolocation.get({
            provider: 'auto',
            mapStateAutoApply: true,
        }).then(function (result) {

            myMap.geoObjects.add(new ymaps.Placemark(
                result.geoObjects.get(0).geometry.getCoordinates()
            ));
            myMap.setCenter(result.geoObjects.get(0).geometry.getCoordinates(), 12, {duration: 300});
            myMap.balloon.close()
        });
    });


    var btnZoomIn = new ymaps.control.Button({
        options: {
            layout: ymaps.templateLayoutFactory.createClass(
                "<div class='btnZoomIn btn'></div>"
            ),
            maxWidth: 150,
        },
    });

    var btnZoomOut = new ymaps.control.Button({
        options: {
            layout: ymaps.templateLayoutFactory.createClass(
                "<div class='btnZoomOut btn'></div>"
            ),
            maxWidth: 150,
        },
    });

    btnZoomIn.events.add('click', function () {
        myMap.setZoom(myMap.getZoom() + 1, {
            duration: 500,
        });
    });

    btnZoomOut.events.add('click', function () {
        myMap.setZoom(myMap.getZoom() - 1, {
            duration: 500,
        });
    });

    myMap.controls.add(btnZoomIn, {
        float: 'none',
        position: {
            top: '240px',
            right: '10px',
        },
    });
    myMap.controls.add(btnZoomOut, {
        float: 'none',
        position: {
            top: '280px',
            right: '10px',
        },
    });
    myMap.controls.add(btnLocation, {
        float: 'none',
        position: {
            top: '330px',
            right: '10px',
        },
    });

    function setPosition() {
        switch (elements.selectedItem.textContent) {
            case "Екатеринбург":
                myMap.setCenter(cities.ekaterinburg.coordinates, 10, {duration: 500});
                myMap.balloon.close()
                break;
        }
    }

    elements.cityItems.forEach((item) => {
        item.addEventListener("click", setPosition);
    });

    function stringBaloon(title, street, numberPhone, schedule, linkY, linkG) {
        let baloonContent = `
        <div class="balloon">
            <button class="balloon__close"><img src="./assets/img/map/close-btn.svg"></button>
            <div class="balloon__content">
                <div class="balloon__content-title">
                  <h3>${title}</h3>
                </div>
                <div class="balloon__content-body">
                    <span>${street}</span>
                    <span>${numberPhone}</span>
                    <span>${schedule}</span>
                </div>
                <span class="balloon__title-routes">Построить маршрут</span>
                <div class="balloon-links">
                    <a target="blank" 
                        href="${linkY}">
                        <img src="./assets/img/map/yandex-navigator.svg"></img>
                    </a>
                    <a target="blank" 
                        href="${linkG}">
                        <img src="./assets/img/map/google-maps.svg"></img>
                    </a>
                </div>
            </div>
        </div>`
        return baloonContent
    }


    let shopOnBluchera = new ymaps.Placemark(
        cities.ekaterinburg.addresses.bluchera,
        {},
        {
            iconLayout: "default#image",
            iconImageHref: "./assets/img/map/mark.svg",
            iconImageSize: [48, 54],
            iconImageOffset: [-19, -44],
            balloonLayout: ymaps.templateLayoutFactory.createClass(stringBaloon(
                    'Магазин на Блюхера',
                    'улица Блюхера, 99',
                    '+7 (999) 012-34-56 (доб. 02)',
                    'Ежедневно с 10:00 до 21:00',
                    'https://yandex.ru/maps/54/yekaterinburg/?ll=60.620800%2C56.837653&mode=routes&rtext=~56.865259%2C60.667983&rtt=auto&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgoxOTA1NTIyODkxEm7QoNC-0YHRgdC40Y8sINCh0LLQtdGA0LTQu9C-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0JXQutCw0YLQtdGA0LjQvdCx0YPRgNCzLCDRg9C70LjRhtCwINCR0LvRjtGF0LXRgNCwLCA5OSIKDQSsckIVBnZjQg%2C%2C&z=13.23',
                    'https://www.google.com/maps/dir//%D1%83%D0%BB%D0%B8%D1%86%D0%B0+%D0%91%D0%BB%D1%8E%D1%85%D0%B5%D1%80%D0%B0,+99,+%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3/@56.865232,60.5859305,12z/data=!4m9!4m8!1m0!1m5!1m1!1s0x43c16db16bb16b07:0xf9adfafc27d7b029!2m2!1d60.66833!2d56.8652591!3e0?entry=ttu'
                ),
                {
                    build: function () {
                        this.constructor.superclass.build.call(this);
                        this._element.querySelector('.balloon__close')
                            .addEventListener('click', this._onCloseClick.bind(this));
                    },
                    _onCloseClick: function () {
                        this.events.fire('userclose');
                    }
                }
            ),
            balloonPanelMaxMapArea: 0,
            balloonOffset: [-220, -120],
        }
    );


    let shopOnChern = new ymaps.Placemark(
        cities.ekaterinburg.addresses.chernyakhovskogo,
        {},
        {
            iconLayout: "default#image",
            iconImageHref: "./assets/img/map/mark.svg",
            iconImageSize: [54, 62],
            iconImageOffset: [-19, -44],
            balloonLayout: ymaps.templateLayoutFactory.createClass(stringBaloon('Магазин на Черняховского',
                    'улица Черняховского, 99',
                    '+7 (999) 012-34-56',
                    'Ежедневно с 09:00 до 22:00',
                    'https://yandex.ru/maps/54/yekaterinburg/?ll=60.692828%2C56.788139&mode=routes&rtext=~56.750492%2C60.741762&rtt=auto&ruri=~ymapsbm1%3A%2F%2Fgeo%3Fdata%3DCgo1Mzk5NzQxMzQ2EnrQoNC-0YHRgdC40Y8sINCh0LLQtdGA0LTQu9C-0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwg0JXQutCw0YLQtdGA0LjQvdCx0YPRgNCzLCDRg9C70LjRhtCwINCn0LXRgNC90Y_RhdC-0LLRgdC60L7Qs9C-LCA5OSIKDZD3ckIVggBjQg%2C%2C&z=12',
                    'https://www.google.com/maps/dir//%D1%83%D0%BB.+%D0%A7%D0%B5%D1%80%D0%BD%D1%8F%D1%85%D0%BE%D0%B2%D1%81%D0%BA%D0%BE%D0%B3%D0%BE,+99,+%D0%95%D0%BA%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B1%D1%83%D1%80%D0%B3,+%D0%A1%D0%B2%D0%B5%D1%80%D0%B4%D0%BB%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB.,+620010/@56.7515598,60.7514987,16z/data=!4m9!4m8!1m0!1m5!1m1!1s0x43c16a1ea171b9cd:0x20c8ff1f30a0910e!2m2!1d60.7566485!2d56.7515599!3e0?entry=ttu'
                ),
                {
                    build: function () {
                        this.constructor.superclass.build.call(this);
                        this._element.querySelector('.balloon__close')
                            .addEventListener('click', this._onCloseClick.bind(this));
                    },
                    _onCloseClick: function () {
                        this.events.fire('userclose');
                        document.querySelector('.balloon')?.classList.toggle('view');
                    }
                }
            ),
            balloonPanelMaxMapArea: 0,
            balloonOffset: [-220, -120],
        }
    );


    shopOnChern.events.add("balloonopen", function () {
        myMap.options.set('maxAnimationZoomDifference', Infinity);
        if (myMap.getZoom() !== 15) {
            myMap.setCenter(cities.ekaterinburg.addresses.chernyakhovskogo, 15, {duration: 500}).then(() => {
                setTimeout(() => {
                    document.querySelector('.balloon')?.classList.add('view');
                }, 200)
            });
        } else {
            if (myMap.getCenter() !== cities.ekaterinburg.addresses.chernyakhovskogo) {
                myMap.setCenter(cities.ekaterinburg.addresses.chernyakhovskogo, 15, {duration: 300}).then(() => {
                    document.querySelector('.balloon')?.classList.add('view');
                })
            }
            document.querySelector('.balloon')?.classList.add('view');
        }
        myMap.behaviors.disable(['drag', 'dblClickZoom', 'scrollZoom', 'multiTouch'])
    });


    shopOnBluchera.events.add("balloonopen", function () {
        myMap.options.set('maxAnimationZoomDifference', Infinity);
        if (myMap.getZoom() !== 15) {
            myMap.setCenter(cities.ekaterinburg.addresses.bluchera, 15, {duration: 500}).then(() => {
                setTimeout(() => {
                    document.querySelector('.balloon')?.classList.add('view');
                }, 200)
            });
        } else {
            myMap.setCenter(cities.ekaterinburg.addresses.bluchera, 15, {duration: 300}).then(() => {
                document.querySelector('.balloon')?.classList.add('view');
            })
        }
        myMap.behaviors.disable(['drag', 'dblClickZoom', 'scrollZoom', 'multiTouch'])

    });

    myMap.geoObjects.add(shopOnChern);
    myMap.geoObjects.add(shopOnBluchera);

    myMap.events.add('balloonclose', function () {
        myMap.behaviors.enable(['drag', 'dblClickZoom', 'scrollZoom', 'multiTouch'])
    });


    const listTitle = document.querySelectorAll('.list_item-title');
    listTitle.forEach(item => {
        item.addEventListener('click', function () {
            if (item.classList.contains('bluchera')) {
                if (!!!document.querySelector('.balloon')) {
                    shopOnBluchera.balloon.open()
                } else {
                    myMap.balloon.close().then(() => [
                        shopOnBluchera.balloon.open()
                    ])
                }
            }
            if (item.classList.contains('chern')) {
                if (!!!document.querySelector('.balloon')) {
                    shopOnChern.balloon.open()
                } else {
                    myMap.balloon.close().then(() => [
                        shopOnChern.balloon.open()
                    ])
                }
            }
        });
    });
}










