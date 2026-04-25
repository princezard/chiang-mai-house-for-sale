(function () {
    'use strict';

    var navbar = document.getElementById('navbar');
    var mobileMenuBtn = document.getElementById('mobileMenuBtn');
    var navLinks = document.getElementById('navLinks');
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightboxImg');
    var lightboxClose = document.getElementById('lightboxClose');
    var lightboxPrev = document.getElementById('lightboxPrev');
    var lightboxNext = document.getElementById('lightboxNext');
    var lightboxCounter = document.getElementById('lightboxCounter');
    var galleryItems = document.querySelectorAll('.gallery-item');
    var currentImageIndex = 0;
    var totalImages = galleryItems.length;

    function openLightbox(index) {
        currentImageIndex = index;
        var item = galleryItems[index];
        var img = item.querySelector('img');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCounter.textContent = (index + 1) + ' / ' + totalImages;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        openLightbox(currentImageIndex);
    }

    function showNext() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        openLightbox(currentImageIndex);
    }

    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            openLightbox(parseInt(item.getAttribute('data-index'), 10));
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrev);
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNext);
    }

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
    });

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('open');
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    window.addEventListener('scroll', function () {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;
            if (!/^[#][a-zA-Z0-9_-]+$/.test(targetId)) return;
            var target = document.getElementById(targetId.substring(1));
            if (target) {
                e.preventDefault();
                var offset = navbar ? navbar.offsetHeight : 0;
                var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    if (!('IntersectionObserver' in window)) return;

    var lazyImages = document.querySelectorAll('img[loading="lazy"]');
    var imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '200px' });

    lazyImages.forEach(function (img) {
        imageObserver.observe(img);
    });

    var sections = document.querySelectorAll('section[id]');
    var navAnchors = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];

    function highlightNav() {
        var scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navAnchors.forEach(function (a) {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();

    var e = ['p','r','i','n','c','e','z','a','r','d','@','g','m','a','i','l','.','c','o','m'];
    document.querySelectorAll('[data-email]').forEach(function (el) {
        el.href = 'mailto:' + e.join('');
        el.addEventListener('click', function (ev) {
            el.href = 'mailto:' + e.join('');
        });
    });
})();