import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../Icon/Icon.jsx';
import { getCategoryIcon } from '../../utils/categoryIcons.js';
import {
  CategoryButton,
  CategoryIcon,
  CategoryName,
  Carousel,
  CategoryFilters,
  Header,
  Navigation,
  NavigationButton,
  Scroller,
  SectionTitle,
} from './CategoryCarousel.styles.js';

function getLabel(category) {
  return category === 'Todas' ? 'Todas as categorias' : category;
}

export const CategoryCarousel = memo(function CategoryCarousel({
  categories,
  selectedCategory,
  onCategoryChange,
  isSearching = false,
  isLoading = false,
}) {
  const scrollerRef = useRef(null);
  const buttonRefs = useRef(new Map());
  const buttonRefCallbacksRef = useRef(new Map());
  const navigationStateRef = useRef({ left: false, right: false });
  const mouseGestureRef = useRef({ active: false, dragging: false });
  const touchGestureRef = useRef({ active: false, dragging: false });
  const suppressClickUntilRef = useRef(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const updateNavigation = () => {
      const nextCanScrollLeft = scroller.scrollLeft > 2;
      const nextCanScrollRight = scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 2;
      setHasScrolled(nextCanScrollLeft);
      const previous = navigationStateRef.current;

      if (previous.left !== nextCanScrollLeft || previous.right !== nextCanScrollRight) {
        navigationStateRef.current = { left: nextCanScrollLeft, right: nextCanScrollRight };
        setCanScrollLeft(nextCanScrollLeft);
        setCanScrollRight(nextCanScrollRight);
      }
    };

    updateNavigation();
    scroller.addEventListener('scroll', updateNavigation, { passive: true });
    window.addEventListener('resize', updateNavigation);

    return () => {
      scroller.removeEventListener('scroll', updateNavigation);
      window.removeEventListener('resize', updateNavigation);
    };
  }, [categories]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (selectedCategory === 'Todas') {
      scroller?.scrollTo({ left: 0, behavior: 'smooth' });
      return;
    }

    buttonRefs.current.get(selectedCategory)?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [selectedCategory]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const gesture = mouseGestureRef.current;
      const scroller = scrollerRef.current;
      if (!gesture.active || !scroller) return;

      const deltaX = event.clientX - gesture.startX;
      if (!gesture.dragging && Math.abs(deltaX) > 5) {
        gesture.dragging = true;
        scroller.setAttribute('data-dragging', 'true');
      }

      if (gesture.dragging) {
        event.preventDefault();
        scroller.scrollLeft = gesture.startScrollLeft - deltaX;
      }
    };

    const handleMouseUp = () => {
      const gesture = mouseGestureRef.current;
      if (gesture.dragging) suppressClickUntilRef.current = Date.now() + 350;
      gesture.active = false;
      gesture.dragging = false;
      scrollerRef.current?.removeAttribute('data-dragging');
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('blur', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('blur', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) {
        touchGestureRef.current.active = false;
        return;
      }

      const touch = event.touches[0];
      touchGestureRef.current = {
        active: true,
        dragging: false,
        startX: touch.clientX,
        startY: touch.clientY,
        startScrollLeft: scroller.scrollLeft,
      };
    };

    const handleTouchMove = (event) => {
      const gesture = touchGestureRef.current;
      if (!gesture.active || event.touches.length !== 1) return;

      const touch = event.touches[0];
      const deltaX = touch.clientX - gesture.startX;
      const deltaY = touch.clientY - gesture.startY;

      if (!gesture.dragging && Math.abs(deltaX) > 7 && Math.abs(deltaX) > Math.abs(deltaY)) {
        gesture.dragging = true;
        scroller.setAttribute('data-dragging', 'true');
      }

      if (gesture.dragging) {
        if (event.cancelable) event.preventDefault();
        scroller.scrollLeft = gesture.startScrollLeft - deltaX;
      }
    };

    const handleTouchEnd = () => {
      if (touchGestureRef.current.dragging) {
        suppressClickUntilRef.current = Date.now() + 350;
      }
      touchGestureRef.current.active = false;
      touchGestureRef.current.dragging = false;
      scroller.removeAttribute('data-dragging');
    };

    scroller.addEventListener('touchstart', handleTouchStart, { passive: true });
    scroller.addEventListener('touchmove', handleTouchMove, { passive: false });
    scroller.addEventListener('touchend', handleTouchEnd, { passive: true });
    scroller.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      scroller.removeEventListener('touchstart', handleTouchStart);
      scroller.removeEventListener('touchmove', handleTouchMove);
      scroller.removeEventListener('touchend', handleTouchEnd);
      scroller.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  const scrollByPage = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.scrollBy({
      left: direction * Math.max(240, scroller.clientWidth * 0.72),
      behavior: 'smooth',
    });
  };

  const startMouseDrag = (event) => {
    if (event.button !== 0) return;

    mouseGestureRef.current = {
      active: true,
      dragging: false,
      startX: event.clientX,
      startScrollLeft: scrollerRef.current?.scrollLeft ?? 0,
    };
  };

  const getButtonRef = useCallback((category) => {
    if (!buttonRefCallbacksRef.current.has(category)) {
      buttonRefCallbacksRef.current.set(category, (element) => {
        if (element) buttonRefs.current.set(category, element);
        else buttonRefs.current.delete(category);
      });
    }
    return buttonRefCallbacksRef.current.get(category);
  }, []);

  const handleCategoryClick = useCallback((event) => {
    onCategoryChange(event.currentTarget.dataset.category);
  }, [onCategoryChange]);

  const preventClickAfterSwipe = (event) => {
    if (Date.now() <= suppressClickUntilRef.current) {
      event.preventDefault();
      event.stopPropagation();
      suppressClickUntilRef.current = 0;
    }
  };

  return (
    <Carousel>
      <Header>
        <SectionTitle>Categorias</SectionTitle>
        <Navigation>
          <span>{isLoading ? 'Carregando...' : `${categories.length - 1} opções`}</span>
          <NavigationButton
            type="button"
            aria-label="Categorias anteriores"
            disabled={!canScrollLeft}
            onClick={() => scrollByPage(-1)}
          >
            <Icon name="chevronDown" size={17} />
          </NavigationButton>
          <NavigationButton
            type="button"
            aria-label="Próximas categorias"
            disabled={!canScrollRight}
            onClick={() => scrollByPage(1)}
          >
            <Icon name="chevronDown" size={17} />
          </NavigationButton>
        </Navigation>
      </Header>

      <CategoryFilters>
        {categories.includes('Todas') && (
          <CategoryButton
            data-category="Todas"
            type="button"
            $selected={selectedCategory === 'Todas'}
            $compact={isSearching || hasScrolled}
            aria-label="Todas as categorias"
            aria-pressed={selectedCategory === 'Todas'}
            onClick={handleCategoryClick}
          >
            <CategoryIcon $selected={selectedCategory === 'Todas'}>
              <Icon name={getCategoryIcon('Todas')} size={17} />
            </CategoryIcon>
            <CategoryName $compact={isSearching || hasScrolled} title={getLabel('Todas')}>
              {getLabel('Todas')}
            </CategoryName>
          </CategoryButton>
        )}

        <Scroller
          ref={scrollerRef}
          role="group"
          aria-label="Selecionar categoria"
          onMouseDown={startMouseDrag}
          onClickCapture={preventClickAfterSwipe}
        >
          {categories.filter((category) => category !== 'Todas').map((category) => {
            const selected = category === selectedCategory;

            return (
              <CategoryButton
                key={category}
                ref={getButtonRef(category)}
                data-category={category}
                type="button"
                $selected={selected}
                aria-pressed={selected}
                onClick={handleCategoryClick}
              >
                <CategoryIcon $selected={selected}>
                  <Icon name={getCategoryIcon(category)} size={17} />
                </CategoryIcon>
                <CategoryName title={getLabel(category)}>{getLabel(category)}</CategoryName>
              </CategoryButton>
            );
          })}
        </Scroller>
      </CategoryFilters>
    </Carousel>
  );
});
