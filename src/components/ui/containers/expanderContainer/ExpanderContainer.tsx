import type {ReactNode} from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  expanded: boolean;
}

function ExpanderContainer({ children, className, expanded }: Props) {
  return (
    <div className={`expander ${expanded && 'expanded'} ${className}`}>
      <div className="expander-content">{children}</div>
    </div>
  );
}

export default ExpanderContainer;
