import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  onConfirm: () => void;
  popUpDescription: string;
};

export default function DeleteButton({ onConfirm, popUpDescription }: Props) {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleMenuDelete = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    onConfirm();
    setIsDialogOpen(false);
  }, []);

  const handleCancelDelete = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  return (
    <>
      <Button onClick={handleMenuDelete} variant="outlined" sx={{ mt: 2 }}>
        {t('menuItemMessages.deleteButton')}
      </Button>
      <Dialog
        open={isDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('menuItemMessages.deleteDialogTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{popUpDescription}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            {t('menuItemMessages.dialogCancel')}
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            {t('menuItemMessages.dialogAccept')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
