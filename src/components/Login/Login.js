import React, { useState, useEffect } from 'react';
import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
//debouncing, debounce


const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState(''); // здесь пишется email пользователя
  const [emailIsValid, setEmailIsValid] = useState(); // здесь проверяется email на правильность true/false
  const [enteredPassword, setEnteredPassword] = useState(''); // здесь пишется пароль пользователя
  const [passwordIsValid, setPasswordIsValid] = useState(); // здесь проверяется пароль на правильность true/false
  const [formIsValid, setFormIsValid] = useState(false); // если email и пароль прошли проверку успешно то значения станет true иначе false, это включает кнопку отправить или не включает


  useEffect(() => { // в начале один раз работает useEffect

    const timer = setTimeout(() => {
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6); 
      console.log('changed');
    }, 3000); // когда запускется useEffect он создает timer, а таймер через 3 секунды проверяет email и пароль. Но если мы кликаем 5 раз useEffect 5 раз создает timer и 5 раз будет проверятся. Но здесь мы хотим чтоб useEffect проверял только один раз а для этого он должен только один раз создать timer независимо сколько раз мы кликали. Для этого нам нужна функция которая перед запуском очищает прежний timer

    // clean up function
    return () => {
      console.log('clear')
      clearTimeout(timer); // это функция заработает перед тем когда создается timer и очищает прежний timer
    };


  }, [enteredEmail, enteredPassword]); // каждый раз когда изменяется состояние enteredEmail и enteredPassword useEffect будет перезапускаться 



  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value); // это работает каждый раз когда кликаем на клавишу и данные передает к состоянию enteredEmail
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value); // это работает каждый раз когда кликаем на клавишу и передает данные к состоянию enteredPassword
  };
  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@')); // это проверяет email на правильность, работает когда потеряется фокус
  };
  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6); // это проверяет пароль на правильность, работает когда потеряется фокус
  };

  const submitHandler = (event) => { // это функция работает когда мы нажимаем на кнопку отправить
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword); // здесь мы передаем данные на родительский компонент
  };

  
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${emailIsValid === false ? classes.invalid : ''}`}> 
        {/* если наша проверка email почты будет успешно то убирает класс classes.invalid  */}
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler} 
            onBlur={validateEmailHandler} // здесь мы указали функцию validateEmailHandler (это функция проверяет email на правильность), когда потеряется фокус это функция работает
          />
        </div>
        <div className={`${classes.control} ${passwordIsValid === false ? classes.invalid : ''}`}>
          {/* если наша проверка пароля будет успешно то убирает класс classes.invalid  */}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler} // здесь мы указали функцию validatePasswordHandler (это функция проверяет пароль на правильность), когда потеряется фокус это функция работает
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            {/* если email и пароль будет успешно то кнопка станет доступным */}
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};
export default Login;