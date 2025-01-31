import { ReactElement, ReactNode, useEffect, cloneElement } from 'react';

import { useDisclosure } from '@/hooks/useDisclosure';

import { Button } from '../Elements/Button';
import { Drawer, DrawerProps } from '../Elements/Drawer';

type FormDrawerProps = {
  isDone: boolean;
  triggerButton: ReactElement;
  submitButton: ReactElement;
  title: string;
  children: ReactNode;
  size?: DrawerProps['size'];
};

export const FormDrawer = ({
  title,
  children,
  isDone,
  triggerButton,
  submitButton,
  size = 'md',
}: FormDrawerProps) => {
  const { close, open, isOpen } = useDisclosure();

  useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  return (
    <>
      {cloneElement(triggerButton, { onClick: open })}
      <Drawer
        isOpen={isOpen}
        onClose={close}
        title={title}
        size={size}
        renderFooter={() => (
          <>
            <Button variant="inverse" size="sm" onClick={close}>
              Cancel
            </Button>
            {submitButton}
          </>
        )}
      >
        {children}
      </Drawer>
    </>
  );
};
