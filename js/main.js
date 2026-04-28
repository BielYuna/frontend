import { registerPanelHooks, registerPanelChangeHook, initNavigation } from './modules/navigation.js';
import { initIMC } from './modules/imc.js';
import { initTodo } from './modules/todo.js';
import { initCounter } from './modules/counter.js';
import { initTemperature } from './modules/temperature.js';
import { startClock, initClock } from './modules/clock.js';
import { initQuiz } from './modules/quiz.js';
import { initColorGenerator } from './modules/color-generator.js';
import { initFormValidation } from './modules/form-validation.js';
import { renderCart, initCart } from './modules/cart.js';
import { atualizarPrevisao, initWeather } from './modules/weather.js';
import { handlePanelChange, initServiceAnimation } from './modules/service-animation.js';

function initApp() {
  initNavigation();
  initIMC();
  initTodo();
  initCounter();
  initTemperature();
  initClock();
  initQuiz();
  initColorGenerator();
  initFormValidation();
  initCart();
  initWeather();
  initServiceAnimation();

  registerPanelHooks({
    '5': startClock,
    '9': renderCart,
    '10': atualizarPrevisao
  });

  registerPanelChangeHook(handlePanelChange);
}

initApp();
