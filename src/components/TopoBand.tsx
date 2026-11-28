import topographySvg from '@/assets/topography.svg'
import { cn } from '@/lib/utils'

interface TopoBandProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * A full-width band with the topographic-map pattern behind it.
 *
 * The pattern sits on its own layer, so in dark mode it can be inverted to
 * pale lines; the file itself draws dark lines, which vanish on a dark page.
 */
const TopoBand: React.FC<TopoBandProps> = ({ className, children }) => (
  <div className={cn('relative w-full', className)}>
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 bg-contain bg-repeat dark:invert dark:opacity-40"
      style={{ backgroundImage: `url(${topographySvg})` }}
    />
    <div className="relative">{children}</div>
  </div>
)

export default TopoBand
