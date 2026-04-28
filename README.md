# frontend

Dashboard de exercícios em HTML, CSS e JavaScript modular.

## Estrutura

- index.html: estrutura da dashboard e componentes de interface.
- styles.css: estilos globais e visuais dos exercícios.
- js/main.js: inicialização geral da aplicação.
- js/modules: módulos separados por exercício.

## Exercícios e Funções

### 1) Calculadora de IMC

Arquivo: js/modules/imc.js

- calcularIMC: lê peso/altura, calcula IMC, classifica resultado e aplica cor por faixa.
- initIMC: expõe calcularIMC para uso no botão do HTML.

### 2) Lista de Tarefas

Arquivo: js/modules/todo.js

- adicionarTarefa: adiciona nova tarefa na lista.
- toggleTarefa: marca/desmarca tarefa como concluída.
- removerTarefa: remove tarefa da lista.
- renderTarefas: atualiza lista e contadores (total, pendentes, concluídas).
- initTodo: registra funções globais para os eventos inline.

### 3) Contador Interativo

Arquivo: js/modules/counter.js

- incrementar: soma 1 ao contador.
- decrementar: subtrai 1 do contador.
- resetar: volta o contador para zero.
- definirValor: define valor digitado pelo usuário.
- atualizarContador: renderiza valor e cor por sinal.
- initCounter: registra funções globais e estado inicial.

### 4) Conversor de Temperatura

Arquivo: js/modules/temperature.js

- syncFromInput: sincroniza input numérico com slider e resultado.
- syncFromSlider: sincroniza slider com input e resultado.
- cToF: converte Celsius para Fahrenheit (com mínimo 0°F).
- clampCelsius: limita Celsius entre -17.8 e 100.
- atualizarTemp: atualiza valor convertido e feedback visual.
- initTemperature: registra funções globais e inicializa o módulo.

### 5) Relógio Digital

Arquivo: js/modules/clock.js

- startClock: inicia o intervalo de atualização a cada segundo.
- alternarFormato: alterna entre 12h e 24h.
- tickClock: renderiza hora e data atuais.
- initClock: registra ação para o botão da interface.

### 6) Quiz Interativo

Arquivo: js/modules/quiz.js

- proximaPergunta: avança no quiz ou finaliza com resultado.
- reiniciarQuiz: reinicia pontuação e índice de perguntas.
- renderPergunta: desenha pergunta atual e opções.
- responder: processa resposta e feedback correto/incorreto.
- initQuiz: registra funções globais e render inicial.

### 7) Gerador de Cores

Arquivo: js/modules/color-generator.js

- atualizarCor: aplica cor RGB, HEX e atualiza preview.
- gerarCorAleatoria: sorteia valores RGB e atualiza a interface.
- copiarHex: copia o código HEX para área de transferência.
- initColorGenerator: registra ações globais e render inicial.

### 8) Validação de Formulário

Arquivo: js/modules/form-validation.js

- validarNome: exige nome e sobrenome.
- validarEmail: valida formato de e-mail.
- validarSenha: valida tamanho mínimo e força da senha.
- validarConfirma: valida confirmação da senha.
- validarFormulario: impede envio inválido e exibe sucesso.
- setFieldState: padroniza estado visual e mensagens dos campos.
- initFormValidation: registra validadores para os eventos do formulário.

### 9) Carrinho de Compras

Arquivo: js/modules/cart.js

- adicionarAoCarrinho: adiciona item ou incrementa quantidade.
- removerDoCarrinho: decrementa quantidade ou remove item.
- limparCarrinho: zera o carrinho.
- renderCart: atualiza produtos, itens e total.
- salvarCarrinho: persiste carrinho no localStorage.
- initCart: registra funções globais e render inicial.

### 10) Previsão do Tempo

Arquivo: js/modules/weather.js

- atualizarPrevisao: consulta API wttr.in e atualiza interface.
- fetchWttr: busca dados da API sem necessidade de chave.
- toViewModel: adapta resposta da API para formato da UI.
- renderWeather: atualiza cartão principal e previsão dos dias.
- setTemperatureTheme: altera cores conforme temperatura.
- initWeather: registra atualização e carrega previsão inicial.

## Observação

O módulo de clima possui fallback local para manter a tela funcionando caso a API não responda.
