import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeIcon from '@mui/icons-material/Home';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

export const items = [
    {
        index: 0,
        href: '/home',
        icon: (
            <HomeIcon fontSize="large"/>
        ),
        label: 'Inicio'
    },
    {
        index: 1,
        href: '/support',
        icon: (
            <HelpOutlineIcon fontSize="large"/>
        ),
        label: 'Sporte'
    },
    {
        index: 2,
        href: '/loan-opening',
        icon: (
            <CreditScoreIcon fontSize="large"/>
        ),
        label: 'Apertura de garantía'
    },
    {
        index: 3,
        href: '/loan-management',
        icon: (
            <ManageHistoryIcon fontSize="large"/>
        ),
        label: 'Gestión de garantías'
    },

];
