const cities = {
  'sao-paulo': { nome: 'São Paulo, SP', query: 'Sao Paulo' },
  rio: { nome: 'Rio de Janeiro, RJ', query: 'Rio de Janeiro' },
  bh: { nome: 'Belo Horizonte, MG', query: 'Belo Horizonte' },
  fortaleza: { nome: 'Fortaleza, CE', query: 'Fortaleza' },
  'porto-alegre': { nome: 'Porto Alegre, RS', query: 'Porto Alegre' }
};

const fallbackWeather = {
  'sao-paulo': {
    nome: 'São Paulo, SP',
    temp: 22,
    cond: 'Nublado',
    icon: '☁️',
    forecast: [
      { d: 'Amanhã', t: 19, c: 'Chuva', i: '🌧️' },
      { d: 'Quinta', t: 17, c: 'Tempestade', i: '⛈️' },
      { d: 'Sexta', t: 24, c: 'Sol', i: '☀️' }
    ]
  },
  rio: {
    nome: 'Rio de Janeiro, RJ',
    temp: 30,
    cond: 'Ensolarado',
    icon: '☀️',
    forecast: [
      { d: 'Amanhã', t: 29, c: 'Ensolarado', i: '☀️' },
      { d: 'Quinta', t: 27, c: 'Parcial', i: '⛅' },
      { d: 'Sexta', t: 31, c: 'Calor intenso', i: '🌞' }
    ]
  },
  bh: {
    nome: 'Belo Horizonte, MG',
    temp: 26,
    cond: 'Parcialmente nublado',
    icon: '⛅',
    forecast: [
      { d: 'Amanhã', t: 24, c: 'Nublado', i: '☁️' },
      { d: 'Quinta', t: 28, c: 'Sol', i: '☀️' },
      { d: 'Sexta', t: 22, c: 'Chuva leve', i: '🌦️' }
    ]
  },
  fortaleza: {
    nome: 'Fortaleza, CE',
    temp: 33,
    cond: 'Muito quente',
    icon: '🌞',
    forecast: [
      { d: 'Amanhã', t: 32, c: 'Calor', i: '☀️' },
      { d: 'Quinta', t: 31, c: 'Calor', i: '☀️' },
      { d: 'Sexta', t: 30, c: 'Calor', i: '🌤️' }
    ]
  },
  'porto-alegre': {
    nome: 'Porto Alegre, RS',
    temp: 14,
    cond: 'Frio e nublado',
    icon: '🌫️',
    forecast: [
      { d: 'Amanhã', t: 11, c: 'Chuva', i: '🌧️' },
      { d: 'Quinta', t: 9, c: 'Frio intenso', i: '❄️' },
      { d: 'Sexta', t: 16, c: 'Nublado', i: '☁️' }
    ]
  }
};

function setTemperatureTheme(temp) {
  const main = document.getElementById('previsaoAtual');
  let bg;
  let color;

  if (temp <= 10) {
    bg = 'linear-gradient(135deg,#dbeafe,#bfdbfe)';
    color = '#1e3a8a';
  } else if (temp <= 20) {
    bg = 'linear-gradient(135deg,#e0f2fe,#bae6fd)';
    color = '#0c4a6e';
  } else if (temp <= 27) {
    bg = 'linear-gradient(135deg,#fef9c3,#fde68a)';
    color = '#78350f';
  } else {
    bg = 'linear-gradient(135deg,#ffedd5,#fed7aa)';
    color = '#7c2d12';
  }

  main.style.background = bg;
  main.style.color = color;
}

function codeToEmoji(code) {
  const c = Number(code);
  if ([113].includes(c)) return '☀️';
  if ([116].includes(c)) return '⛅';
  if ([119, 122].includes(c)) return '☁️';
  if ([143, 248, 260].includes(c)) return '🌫️';
  if ([176, 263, 266, 281, 284, 293, 296, 299, 302, 305, 308, 311, 314, 317, 353, 356, 359].includes(c)) return '🌧️';
  if ([179, 182, 185, 227, 230, 323, 326, 329, 332, 335, 338, 350, 368, 371, 374, 377].includes(c)) return '❄️';
  if ([200, 386, 389, 392, 395].includes(c)) return '⛈️';
  return '🌤️';
}

function translateCondition(text) {
  const t = String(text || '').toLowerCase();
  if (t.includes('sunny') || t.includes('clear')) return 'Céu limpo';
  if (t.includes('partly')) return 'Parcialmente nublado';
  if (t.includes('cloud')) return 'Nublado';
  if (t.includes('mist') || t.includes('fog')) return 'Nevoeiro';
  if (t.includes('thunder')) return 'Tempestade';
  if (t.includes('snow') || t.includes('ice') || t.includes('blizzard')) return 'Neve';
  if (t.includes('rain') || t.includes('drizzle') || t.includes('shower')) return 'Chuva';
  return text || 'Condição indefinida';
}

function dayLabel(index) {
  if (index === 0) return 'Hoje';
  if (index === 1) return 'Amanhã';
  if (index === 2) return 'Depois';
  return 'Próximo';
}

function renderWeather(data) {
  document.getElementById('iconeTempo').textContent = data.icon;
  document.getElementById('temperatura').textContent = `${data.temp}°C`;
  document.getElementById('condicao').textContent = data.cond;
  document.getElementById('w-city-name').textContent = data.nome;

  setTemperatureTheme(data.temp);

  const fc = document.getElementById('previsaoProximosDias');
  fc.innerHTML = '';
  data.forecast.forEach((f) => {
    const div = document.createElement('div');
    div.className = 'fc-card';
    div.innerHTML = `<div class="fd">${f.d}</div><div class="fi2">${f.i}</div><div class="ft">${f.t}</div><div class="fc">${f.c}</div>`;
    fc.appendChild(div);
  });
}

async function fetchWttr(cityQuery) {
  const endpoint = `https://wttr.in/${encodeURIComponent(cityQuery)}?format=j1`;
  const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error('Falha na API wttr.in');
  return response.json();
}

function toViewModel(raw, cityName) {
  const current = raw.current_condition?.[0];
  const forecastRaw = raw.weather?.slice(0, 3) || [];

  const temp = Number(current?.temp_C || 0);
  const condRaw = current?.weatherDesc?.[0]?.value || 'Condição indefinida';
  const code = current?.weatherCode;

  const forecast = forecastRaw.map((item, index) => {
    const itemCode = item?.hourly?.[0]?.weatherCode;
    const itemDescRaw = item?.hourly?.[0]?.weatherDesc?.[0]?.value || 'Condição indefinida';
    return {
      d: dayLabel(index),
      i: codeToEmoji(itemCode),
      t: `${item?.maxtempC ?? '--'}° / ${item?.mintempC ?? '--'}°`,
      c: translateCondition(itemDescRaw)
    };
  });

  return {
    nome: cityName,
    temp,
    cond: translateCondition(condRaw),
    icon: codeToEmoji(code),
    forecast
  };
}

export async function atualizarPrevisao() {
  const cityKey = document.getElementById('cidade').value;
  const city = cities[cityKey];
  if (!city) return;

  document.getElementById('iconeTempo').textContent = '⏳';
  document.getElementById('temperatura').textContent = 'Carregando...';
  document.getElementById('condicao').textContent = 'Consultando previsão';
  document.getElementById('w-city-name').textContent = city.nome;

  try {
    const raw = await fetchWttr(city.query);
    const view = toViewModel(raw, city.nome);
    renderWeather(view);
  } catch (error) {
    const fallback = fallbackWeather[cityKey];
    if (!fallback) return;
    renderWeather({
      nome: fallback.nome,
      temp: fallback.temp,
      cond: `${fallback.cond} (offline)`,
      icon: fallback.icon,
      forecast: fallback.forecast.map((f) => ({
        d: f.d,
        i: f.i,
        t: `${f.t}°C`,
        c: f.c
      }))
    });
  }
}

export function initWeather() {
  window.atualizarPrevisao = atualizarPrevisao;
  atualizarPrevisao();
}
