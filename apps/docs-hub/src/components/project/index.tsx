import { FC } from 'react';
import { cn } from '@docs-hub/ui/utils';

interface Props {
  className?: string;
}

const ProjectTemplate: FC<Props> = ({ className }) => {
  return (
    <>
      <div className={cn(className)}>Hello World from ProjectTemplate</div>
    </>
  );
};

export default ProjectTemplate;
