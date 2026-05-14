interface BadgeProps {
  children: React.ReactNode;
  variant?: 'taste' | 'nature' | 'channel' | 'primary' | 'accent';
}

const variantClasses: Record<string, string> = {
  taste: 'bg-amber-50 text-amber-700 border border-amber-200',
  nature: 'bg-blue-50 text-blue-700 border border-blue-200',
  channel: 'bg-green-50 text-green-700 border border-green-200',
  primary: 'bg-red-50 text-tcm-primary border border-red-200',
  accent: 'bg-emerald-50 text-tcm-accent border border-emerald-200',
}

export default function Badge({ children, variant = 'primary' }: BadgeProps) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}
