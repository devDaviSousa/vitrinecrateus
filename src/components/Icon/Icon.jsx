import { IconSvg } from './Icon.styles.js';
import SearchIcon from '../../assets/icons/search/Icon.jsx';
import PinIcon from '../../assets/icons/pin/Icon.jsx';
import PeopleIcon from '../../assets/icons/people/Icon.jsx';
import CheckIcon from '../../assets/icons/check/Icon.jsx';
import ArrowIcon from '../../assets/icons/arrow/Icon.jsx';
import GridIcon from '../../assets/icons/grid/Icon.jsx';
import ChevronDownIcon from '../../assets/icons/chevronDown/Icon.jsx';
import PawIcon from '../../assets/icons/paw/Icon.jsx';
import BeautyIcon from '../../assets/icons/beauty/Icon.jsx';
import FoodIcon from '../../assets/icons/food/Icon.jsx';
import HeartIcon from '../../assets/icons/heart/Icon.jsx';
import BookIcon from '../../assets/icons/book/Icon.jsx';
import PlaneIcon from '../../assets/icons/plane/Icon.jsx';
import CarIcon from '../../assets/icons/car/Icon.jsx';
import SportIcon from '../../assets/icons/sport/Icon.jsx';
import ArtIcon from '../../assets/icons/art/Icon.jsx';
import HomeIcon from '../../assets/icons/home/Icon.jsx';
import LeafIcon from '../../assets/icons/leaf/Icon.jsx';
import ShoppingIcon from '../../assets/icons/shopping/Icon.jsx';
import BusinessIcon from '../../assets/icons/business/Icon.jsx';
import MusicIcon from '../../assets/icons/music/Icon.jsx';
import ToolsIcon from '../../assets/icons/tools/Icon.jsx';
import TagIcon from '../../assets/icons/tag/Icon.jsx';
import SunIcon from '../../assets/icons/sun/Icon.jsx';
import MoonIcon from '../../assets/icons/moon/Icon.jsx';
import TrashIcon from '../../assets/icons/trash/Icon.jsx';

const iconComponents = {
  search: SearchIcon,
  pin: PinIcon,
  people: PeopleIcon,
  check: CheckIcon,
  arrow: ArrowIcon,
  grid: GridIcon,
  chevronDown: ChevronDownIcon,
  paw: PawIcon,
  beauty: BeautyIcon,
  food: FoodIcon,
  heart: HeartIcon,
  book: BookIcon,
  plane: PlaneIcon,
  car: CarIcon,
  sport: SportIcon,
  art: ArtIcon,
  home: HomeIcon,
  leaf: LeafIcon,
  shopping: ShoppingIcon,
  business: BusinessIcon,
  music: MusicIcon,
  tools: ToolsIcon,
  tag: TagIcon,
  sun: SunIcon,
  moon: MoonIcon,
  trash: TrashIcon,
};

export function Icon({ name, size = 20, strokeWidth = 1.8, ...props }) {
  const IconShape = iconComponents[name] ?? TagIcon;

  return (
    <IconSvg
      aria-hidden="true"
      $size={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <IconShape />
    </IconSvg>
  );
}
