import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Menu } from '../../types/commonTypes';

type Props = {
  menu: Menu;
};

export default function MenuItem({ menu }: Props) {
  const { t } = useTranslation();
  return (
    <Card sx={{ minWidth: 275, boxShadow: 3, borderRadius: 1 }}>
      <CardContent>
        <Typography sx={{ fontWeight: 'bold' }}>{menu.menuTitle}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/menus/${menu.id}`} variant="outlined">
          {t('menuItemMessages.specificPageButton')}
        </Button>
      </CardActions>
    </Card>
  );
}
