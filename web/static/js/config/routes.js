import store from 'app/store';
import {
  AuthPanel, BaseLayout
} from 'app/layouts';
import views from '../views';

const {
  Auth,
  Pages,
  Users,
  Organizations,
  ErrorViews
} = views

export default [
  {
    path: '/auth',
    component: AuthPanel,
    children: [
      {
        name: 'login',
        path: 'login',
        component: Auth.Login,
        beforeEnter: requireLoggedOff()
      },

      {
        name: 'register',
        path: 'register',
        component: Auth.Register,
        beforeEnter: requireLoggedOff()
      },

      {
        name: 'logout',
        path: 'logout',
        component: Auth.Logout
      },
    ]
  },

  {
    path: '/',
    component: BaseLayout,
    children: [
      // Pages
      {
        path: '/',
        name: 'home',
        component: Pages.Home
      },

      // Users
      {
        name: 'userShow',
        path: '@:username',
        component: Users.Show
      },

      {
        name: 'usersList',
        path: 'users',
        component: Users.List
      },

      {
        name: 'userEdit',
        path: 'profile/edit',
        component: Users.Edit,
        beforeEnter: requireAuth()
      },

      // Organizations
      {
        name: 'organizationCreate',
        path: 'organization/create',
        component: Organizations.Create,
      },

      {
        name: 'organizationShow',
        path: 'organization/:organization',
        component: Organizations.Show
      },

      {
        name: 'organizationEdit',
        path: 'organization/edit',
        component: Organizations.Edit,
        beforeEnter: requireAuth()
      },

      {
        name: 'organizationsList',
        path: 'organizations',
        component: Organizations.List
      },
    ]
  },

  {
    path: '*',
    name: 'error404',
    component: ErrorViews.Error404
  },
]

// Helpers

function requireAuthStatus(should) {
  return (to, from, next) => {
    const token = store.state.auth.token;

    if (should === 'on' && !token) {
      next({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      });
    } else if (should === 'off' && token) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  }
}

function requireAuth() {
  return requireAuthStatus('on');
}

function requireLoggedOff() {
  return requireAuthStatus('off');
}
