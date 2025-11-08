// Re-export shadcn/ui Button component with custom variants
import { Button as ShadcnButton } from '@/components/ui/button';
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'ghost' | 'outline' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading = false, children, disabled, ...props }, ref) => {
    // Map our custom variants to shadcn variants
    const getShadcnVariant = (variant: string): "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" => {
      switch (variant) {
        case 'primary':
          return 'default';
        case 'success':
          return 'default';
        case 'warning':
          return 'default';
        case 'danger':
          return 'destructive';
        default:
          return variant as "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
      }
    };

    // Get custom styles for our variants
    const getVariantStyles = (variant: string) => {
      switch (variant) {
        case 'primary':
          return 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg';
        case 'success':
          return 'bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg';
        case 'warning':
          return 'bg-yellow-600 hover:bg-yellow-700 text-white shadow-md hover:shadow-lg';
        default:
          return '';
      }
    };

    return (
      <ShadcnButton
        className={cn(getVariantStyles(variant), className)}
        variant={getShadcnVariant(variant)}
        size={size}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </ShadcnButton>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export default Button;