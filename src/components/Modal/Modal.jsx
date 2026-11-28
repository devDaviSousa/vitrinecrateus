import { useEffect, useId, useRef } from 'react';
import {
  ModalCloseButton,
  ModalDialog,
  ModalHeader,
  ModalSubtitle,
  ModalTitle,
} from './Modal.styles.js';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = '420px',
  ariaLabel = 'Janela modal',
  hideScrollbar = false,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && dialog && !dialog.open) dialog.showModal();
  }, [isOpen]);

  const closeDialog = () => dialogRef.current?.close();

  if (!isOpen) return null;

  return (
    <ModalDialog
      ref={dialogRef}
      $maxWidth={maxWidth}
      $hideScrollbar={hideScrollbar}
      aria-labelledby={title ? titleId : undefined}
      aria-label={title ? undefined : ariaLabel}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) closeDialog();
      }}
    >
      <ModalHeader>
        <div>
          {subtitle && <ModalSubtitle>{subtitle}</ModalSubtitle>}
          {title && <ModalTitle id={titleId}>{title}</ModalTitle>}
        </div>
        <ModalCloseButton type="button" aria-label="Fechar" onClick={closeDialog}>
          ×
        </ModalCloseButton>
      </ModalHeader>
      {children}
    </ModalDialog>
  );
}
