// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'
import AccountSupervisorCircle from 'mdi-material-ui/AccountSupervisorCircle';

const navigation = () => {
  return [
    {
      title: 'NewsFeed',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'List of Users',
      icon: AccountCogOutline,
      path: '/user-info'
    },
    {
      sectionTitle: 'Service'
    },
    {
      title: 'General Fixing',
      icon: AccountSupervisorCircle,
      path: '/general-fixing'
    },
    {
      title: 'Environments Fixing',
      icon: AlertCircleOutline,
      path: '/environment-fixing',
    },   
    {
      sectionTitle: 'Bill Payment'
    },
    {
      title: 'Electric/Water Bill',
      icon: AccountSupervisorCircle,
      path: '/electric-bill',
    },
        
    {
      title: 'Security Bill',
      icon: AlertCircleOutline,
      path: '/security-bill',
    },
    {
      sectionTitle: 'E-Suggestion'
    },
    {
      title: 'Survey',
      icon: FormatLetterCase,
      path: '/survey'
    },
    {
      title: 'Request Form',
      icon: CreditCardOutline,
      path: '/request-form'
    },
  ]
}

export default navigation
