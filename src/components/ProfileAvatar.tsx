import { profile } from '@/data/profile'

const sizes = {
  sm: 'h-10 w-10',
  md: 'h-24 w-24',
  lg: 'h-48 w-48 sm:h-56 sm:w-56',
  xl: 'h-64 w-64 sm:h-72 sm:w-72',
} as const

type ProfileAvatarProps = {
  size?: keyof typeof sizes
  className?: string
}

export default function ProfileAvatar({ size = 'lg', className = '' }: ProfileAvatarProps) {
  return (
    <img
      src={profile.avatar}
      alt={profile.avatarAlt}
      width={400}
      height={400}
      className={[
        sizes[size],
        'shrink-0 rounded-2xl border border-border object-cover shadow-md shadow-accent/20 ring-2 ring-accent/20 transition-shadow duration-200 hover:shadow-lg hover:shadow-accent/30',
        className,
      ].join(' ')}
    />
  )
}
