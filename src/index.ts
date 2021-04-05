import { App } from './app';

App.Init(4000, (port, error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('running on', port);
  }
});
App.Run();
