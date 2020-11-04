import useFetch from '@utils/useFetch';
import auth from './auth';
import consult from './consult';
import sign from './sign';
import follow from './follow';
import system from './system';
import todo from './todo';
import message from './message';

export default useFetch({
  auth,
  system,
  sign,
  follow,
  todo,
  consult,
  message
});