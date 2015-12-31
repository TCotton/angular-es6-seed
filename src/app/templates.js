// templates
import header from 'app/todo/views/header.html!text';
import main from 'app/todo/views/main.html!text';
import footer from 'app/todo/views/footer.html!text';

const appViews = {
  header: {
    template: header,
    controller: 'TodoCtrl as TCtrl',
  },
  main: {
    template: main,
    controller: 'TodoCtrl as TCtrl',
  },
  footer: {
    template: footer,
    controller: 'TodoCtrl as TCtrl',
  },
};

export { appViews };
